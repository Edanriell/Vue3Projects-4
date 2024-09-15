<script lang="ts" setup>
	import type { Ref } from "vue";
	import { ref, watch } from "vue";

	const emit = defineEmits(["searchSubmit"]);

	interface Props {
		isSearching: boolean;
	}

	const props = defineProps<Props>();

	const query: Ref<string> = ref("");
	let timeout: number;

	const search = (): void => {
		emit("searchSubmit", query.value);
	};

	const debouncedSearch = (): void => {
		clearTimeout(timeout);
		timeout = setTimeout(async () => {
			search();
		}, 500);
	};

	watch(query, (): void => {
		debouncedSearch();
	});
</script>

<template>
	<form class="flex justify-center my-8" v-on:submit.prevent="search">
		<input
			v-model="query"
			:disabled="isSearching"
			class="px-3 py-2 border rounded-md rounded-r-none disabled:opacity-40 border-slate-300 text-slate-800 focus:outline-none focus:border-slate-500"
			placeholder="Search..."
			type="text"
		/>
		<button
			:disabled="isSearching"
			class="px-4 py-2 text-sm font-bold text-white transition-colors duration-300 rounded-md rounded-l-none disabled:opacity-40 bg-slate-500 hover:bg-slate-600"
			type="submit"
		>
			🔍 Search
		</button>
	</form>
</template>
