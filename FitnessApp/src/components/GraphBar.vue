<script lang="ts" setup>
	import type { Ref } from "vue";
	import { onMounted, ref } from "vue";

	import type { GraphData } from "@/types/graph";
	import { useGraphStore } from "@/store/graph";
	import { Bar } from "vue-chartjs";
	import {
		BarElement,
		CategoryScale,
		Chart as ChartJS,
		Legend,
		LinearScale,
		Title,
		Tooltip
	} from "chart.js";

	const graphStore = useGraphStore();

	ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
	const chartData: Ref<GraphData> = ref({ labels: [], datasets: [] });

	const chartOptions = {
		responsive: true
	};

	onMounted(async () => {
		const res = await graphStore.getGraphMonthlyAverage();
		if (res?.labels && res?.datasets) {
			chartData.value = {
				labels: res.labels,
				datasets: res.datasets
			};
		}
	});
</script>
<template>
	<Bar
		v-if="chartData && chartData.datasets"
		id="bar-chart-id"
		:data="chartData"
		:options="chartOptions"
	/>
</template>
