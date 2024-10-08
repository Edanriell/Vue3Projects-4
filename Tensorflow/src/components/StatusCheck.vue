<template>
	<v-list>
		<v-list-subheader>Status</v-list-subheader>
		<v-list-item>
			<v-list-item-title>AI Model</v-list-item-title>
			<v-list-item-subtitle v-if="isModelLoading"
				>Loading...
				<v-progress-circular :size="16" color="primary" indeterminate></v-progress-circular>
			</v-list-item-subtitle>
			<v-list-item-subtitle v-if="isModelLoaded">Loaded!</v-list-item-subtitle>
			<template v-if="isModelLoaded" v-slot:append>
				<v-icon color="success" icon="mdi-check"></v-icon>
			</template>
		</v-list-item>
		<v-list-item>
			<v-list-item-title>Camera Access</v-list-item-title>
			<v-list-item-subtitle v-if="cameraAccess === 'prompt'">Prompting...</v-list-item-subtitle>

			<template v-if="cameraAccess === 'granted' || cameraAccess === 'denied'" v-slot:append>
				<v-icon v-if="cameraAccess === 'granted'" color="success" icon="mdi-check"></v-icon>
				<v-icon v-else color="error" icon="mdi-close"></v-icon>
			</template>
			<v-list-item-subtitle v-if="cameraAccess === 'granted'">Granted!</v-list-item-subtitle>
			<v-list-item-subtitle v-if="cameraAccess === 'denied'">Denied!</v-list-item-subtitle>
		</v-list-item>
	</v-list>
</template>

<script lang="ts" setup>
	import { onMounted, watch } from "vue";
	import { useObjectStore } from "@/store/object";
	import { useGameStore } from "@/store/game";
	import { usePermission } from "@vueuse/core";
	import { storeToRefs } from "pinia";

	const objectStore = useObjectStore();
	const gameStore = useGameStore();

	const { isModelLoading, isModelLoaded } = storeToRefs(objectStore);
	const { canStart } = storeToRefs(gameStore);

	const cameraAccess = usePermission("camera");

	watch([isModelLoaded, cameraAccess], () => {
		if (isModelLoaded.value && cameraAccess.value === "granted") {
			canStart.value = true;
		}
	});

	onMounted(async () => {
		try {
			let localStream: MediaStream;

			const stream = await navigator.mediaDevices.getUserMedia({
				audio: false,
				video: true
			});
			localStream = stream;
			localStream.getTracks().forEach((track) => {
				track.stop();
			});
		} catch (e) {
			console.error(e.message);
		}
	});
</script>
