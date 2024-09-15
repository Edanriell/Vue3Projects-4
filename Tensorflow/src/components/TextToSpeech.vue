<template>
	<v-btn :disabled="isSpeaking" prepend-icon="mdi-microphone" @click="tts">Speak</v-btn>
</template>
<script lang="ts" setup>
	import type { Ref } from "vue";
	import { ref } from "vue";

	const props = defineProps<{
		message: string;
	}>();

	const isSpeaking: Ref<boolean> = ref(false);

	const tts = async () => {
		const { message } = props;
		const msg = new SpeechSynthesisUtterance();
		msg.text = message;
		msg.volume = 1;
		msg.rate = 0.8;
		msg.pitch = 0.2;

		await window.speechSynthesis.speak(msg);
		msg.onstart = () => (isSpeaking.value = true);
		msg.onend = () => (isSpeaking.value = false);
	};
</script>
