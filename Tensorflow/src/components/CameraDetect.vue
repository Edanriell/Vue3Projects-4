<template>
	<div>
		<v-row class="justify-center mx-0">
			<v-select
				v-if="cameras"
				v-model="currentCamera"
				:disabled="enabled"
				:items="cameras"
				class="mr-4"
				density="compact"
				item-title="label"
				item-value="deviceId"
				label="Select camera"
			></v-select>
			<v-btn class="mr-4" size="large" @click="enabled = !enabled">
				{{ enabled ? "Stop" : "Start" }} camera
			</v-btn>
		</v-row>
		<v-row class="justify-center mx-0 mt-8">
			<video ref="video" autoplay class="h-100 w-100" muted />
		</v-row>
	</div>
</template>

<script lang="ts" setup>
	import { ref, watch, watchEffect } from "vue";
	import { useDevicesList, useUserMedia } from "@vueuse/core";

	import { storeToRefs } from "pinia";

	import { useObjectStore } from "@/store/object";
	import { useGameStore } from "@/store/game";
	import { useAppStore } from "@/store/app";

	const objectStore = useObjectStore();
	const { detected } = storeToRefs(objectStore);
	const { detect } = objectStore;

	const gameStore = useGameStore();
	const { currentCategory } = storeToRefs(gameStore);

	const appStore = useAppStore();
	const { dialogVisible } = storeToRefs(appStore);

	const props = defineProps<{
		disabled?: { type: boolean; default: false };
	}>();

	const currentCamera = ref<string>();
	const { videoInputs: cameras } = useDevicesList({
		requestPermissions: true,
		onUpdated() {
			if (!cameras.value.find((i) => i.deviceId === currentCamera.value))
				currentCamera.value = cameras.value[0]?.deviceId;
		}
	});

	let videoConstraints: { deviceId?: string } = {};
	const video = ref<HTMLVideoElement>();
	const { stream, enabled } = useUserMedia({
		constraints: { video: videoConstraints }
	});

	watchEffect(() => {
		if (video.value) video.value.srcObject = stream.value!;
	});

	const detectObject = async (): Promise<void> => {
		if (!props.disabled && !dialogVisible.value) {
			await detect(video.value, currentCategory.value);
		}
		window.requestAnimationFrame(detectObject);
	};

	watch(enabled, () => {
		if (enabled.value && video.value) {
			video.value.addEventListener("loadeddata", detectObject);
		}
	});

	const emit = defineEmits(["found"]);
	watch(detected, () => {
		if (detected.value?.length > 0) {
			emit("found", detected.value[0]);
		}
	});
</script>
