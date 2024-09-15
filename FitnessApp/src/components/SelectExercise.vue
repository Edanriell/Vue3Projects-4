<script lang="ts" setup>
	import { storeToRefs } from "pinia";
	import { useFitnessStore } from "@/store/fitness";

	const fitnessStore = useFitnessStore();

	const { exercises } = storeToRefs(fitnessStore);
</script>

<template>
	<v-select
		v-if="exercises"
		:items="exercises"
		item-title="name"
		item-value="id"
		label="Select exercise"
	></v-select>
</template>
