<script lang="ts" setup>
	const props = defineProps<{
		totalPages: number;
		maxPagesShown?: number;
		currentPage: number;
		path: string;
	}>();

	const isOnFirstPage = props.currentPage === 0;
	const isOnLastPage = props.currentPage === props.totalPages;
</script>

<template>
	<nav v-if="totalPages > 1" class="flex justify-center my-8">
		<span class="mr-4">
			<RouterLink v-if="!isOnFirstPage" :to="`${path}`">First</RouterLink>
			<span v-else aria-hidden="true" class="opacity-50">First</span>
		</span>
		<span class="mr-4">
			<RouterLink v-if="!isOnFirstPage" :to="`${path}${currentPage - 1}`">Previous</RouterLink>
			<span v-else aria-hidden="true" class="opacity-50">Previous</span>
		</span>
		<span>Page {{ currentPage + 1 }} of {{ totalPages }}</span>
		<span class="ml-4">
			<RouterLink v-if="!isOnLastPage" :to="`${path}${currentPage + 1}`">Next</RouterLink>
			<span v-else aria-hidden="true" class="opacity-50">Next</span>
		</span>
		<span class="ml-4">
			<RouterLink v-if="!isOnLastPage" :to="`${path}${totalPages - 1}`">Last</RouterLink>
			<span v-else aria-hidden="true" class="opacity-50">Last</span>
		</span>
	</nav>
</template>
