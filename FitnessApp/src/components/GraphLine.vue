<script lang="ts" setup>
	import type { Ref } from "vue";
	import { onMounted, ref } from "vue";

	import type { GraphData } from "@/types/graph";
	import { useGraphStore } from "@/store/graph";
	import { Line } from "vue-chartjs";
	import {
		CategoryScale,
		Chart as ChartJS,
		Legend,
		LinearScale,
		LineElement,
		PointElement,
		Title,
		Tooltip
	} from "chart.js";

	const graphStore = useGraphStore();

	ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

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
	<Line
		v-if="chartData && chartData.datasets"
		id="line-chart-id"
		:data="chartData"
		:options="chartOptions"
	/>
</template>
