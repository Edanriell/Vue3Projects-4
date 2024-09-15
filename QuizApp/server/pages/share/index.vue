<script lang="ts" setup>
	import { onMounted } from "vue";
	import { useQuizStore } from "@/stores/quiz";
	import { storeToRefs } from "pinia";

	const quizStore = useQuizStore();

	const { quizesLoading } = storeToRefs(quizStore);

	onMounted(() => async (): Promise<void> => {
		await quizStore.getQuizes();
	});
</script>
<template>
	<div class="my-8">
		<h1 class="text-h3 mb-8">Choose quiz to share</h1>

		<v-progress-circular
			v-if="quizesLoading"
			class="mx-auto my-8"
			color="primary"
			indeterminate
		></v-progress-circular>

		<v-card v-else class="mx-auto" max-width="600">
			<v-list>
				<v-list-item v-for="quiz in quizStore.quizes" :key="quiz.id">
					<v-list-item-title
						><nuxt-link :to="`/share/${quiz.id}`"
							><v-btn flat>
								{{ quiz.id }}
							</v-btn>
						</nuxt-link></v-list-item-title
					>
				</v-list-item>
			</v-list>
		</v-card>
	</div>
</template>
