<template>
	<v-btn
		:disabled="!canStart"
		append-icon="mdi-trophy"
		color="primary"
		prepend-icon="mdi-trophy"
		size="x-large"
		@click="newGame"
		><slot>Start game!</slot></v-btn
	>
</template>
<script lang="ts" setup>
	import { useAppStore } from "@/store/app";
	import { useGameStore } from "@/store/game";
	import { storeToRefs } from "pinia";

	const gameStore = useGameStore();
	const appStore = useAppStore();
	const { canStart } = storeToRefs(gameStore);
	const { reset } = gameStore;

	const newGame = () => {
		reset();
		appStore.navigateToPage("/find");
	};
</script>
