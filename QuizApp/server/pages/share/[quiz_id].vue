<script lang="ts" setup>
	import { computed } from "vue";

	const route = useRoute();

	const appLink = computed(() => `http://localhost:5173/start/${route.params.quiz_id}`);
</script>
<template>
	<div class="my-8">
		<h1 class="text-h3 mb-8">Share Quiz</h1>
		<v-card class="pa-4">
			<v-card-actions>
				<v-btn flat>
					<nuxt-link :href="appLink" rel="noopener" target="_blank" title="Open quiz in app"
						>Open quiz in app</nuxt-link
					>
				</v-btn>
			</v-card-actions>
		</v-card>
	</div>
</template>
