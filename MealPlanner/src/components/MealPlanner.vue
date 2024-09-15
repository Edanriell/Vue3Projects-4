<script lang="ts" setup>
	import { storeToRefs } from "pinia";

	import CalendarDays from "./CalendarDays.vue";

	import { usePlannerStore } from "@/stores/planner";

	const store = usePlannerStore();
	const { recipes } = storeToRefs(store);
</script>

<template>
	<calendar-days
		:key="`recipes-${recipes.length}`"
		:date="new Date()"
		:days="7"
		:recipes="recipes"
	/>
</template>
