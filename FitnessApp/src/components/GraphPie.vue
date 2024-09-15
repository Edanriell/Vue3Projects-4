<script lang="ts" setup>
	import type { Ref } from "vue";
	import { onMounted, ref } from "vue";

	import type { GraphData } from "@/types/graph";
	import { useGraphStore } from "@/store/graph";
	import { Pie } from "vue-chartjs";
	import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";

	const graphStore = useGraphStore();

	ChartJS.register(ArcElement, Tooltip, Legend);

	const chartData: Ref<GraphData> = ref({ labels: [], datasets: [] });

	const chartOptions = {
		responsive: true
	};

	onMounted(async () => {
		const res = await graphStore.getGraphPie();
		if (res?.labels && res?.datasets) {
			chartData.value = {
				labels: res.labels,
				datasets: res.datasets
			};
		}
	});
</script>
<template>
	<Pie
		v-if="chartData.labels && chartData.datasets"
		id="pie-chart-id"
		:data="chartData"
		:options="chartOptions"
	/>
</template>
