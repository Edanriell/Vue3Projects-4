<script lang="ts" setup>
	import type { Ref } from "vue";
	import { onMounted, ref } from "vue";
	import type { Question } from "@/types/quiz";
	import { storeToRefs } from "pinia";
	import FormQuestion from "../../components/FormQuestion.vue";

	import { useQuizStore } from "@/stores/quiz";

	const route = useRoute();

	const quizStore = useQuizStore();

	const { quizLoading } = storeToRefs(quizStore);
	const formKey: Ref<number> = ref(0);

	onMounted(async (): Promise<void> => {
		await quizStore.getQuiz(route.params.quiz_id);
	});

	const emptyQuestion = {
		id: "",
		question: "",
		answer_1: "",
		answer_2: "",
		answer_3: "",
		answer_4: "",
		correct: 0
	};

	const currentQuestion = ref(emptyQuestion);
	const isQuestionEditing = ref(false);

	const cancelQuestionForm = (): void => {
		isQuestionEditing.value = false;
		currentQuestion.value = emptyQuestion;
	};
	const toggleQuestionForm = (question?: Question): void => {
		formKey.value++;
		isQuestionEditing.value = true;
		currentQuestion.value = question;
	};

	const removeQuestion = async (id: string): Promise<void> => {
		await quizStore.removeQuestion(id);
		await quizStore.getQuiz(route.params.quiz_id);
	};

	const saveQuestion = async (formQuestion: Question): Promise<void> => {
		await quizStore.upsertQuestion(route.params.quiz_id, formQuestion);
		await quizStore.getQuiz(route.params.quiz_id);
		isQuestionEditing.value = false;
		currentQuestion.value = emptyQuestion;
	};
</script>
<template>
	<div class="my-8">
		<h1 class="text-h3 mb-8">Editing</h1>

		<v-progress-circular
			v-if="quizLoading"
			class="mx-auto my-8"
			color="primary"
			indeterminate
		></v-progress-circular>

		<v-card v-else class="pa-4">
			<v-card-title> Questions: </v-card-title>

			<v-list>
				<v-list-item v-for="question in quizStore.quiz.questions" :key="question.id">
					<v-list-item-title>
						<v-btn flat @click="toggleQuestionForm(question)">
							{{ question.question }}
						</v-btn>
					</v-list-item-title>
					<template v-slot:append>
						<v-btn
							color="grey-lighten-1"
							icon="mdi-delete-outline"
							variant="text"
							@click="removeQuestion(question.id)"
						></v-btn>
					</template>
				</v-list-item>
			</v-list>
			<v-divider />
			<v-card-actions>
				<v-btn class="my-4 mx-4" primary @click="toggleQuestionForm">✨ Create new Question</v-btn>
			</v-card-actions>
		</v-card>

		<v-dialog v-model="isQuestionEditing" width="500">
			<v-card title="Dialog">
				<v-card-text>
					<form-question :key="formKey" :question="currentQuestion" @save="saveQuestion" />
				</v-card-text>

				<v-card-actions>
					<v-spacer></v-spacer>

					<v-btn text="Cancel" @click="cancelQuestionForm"></v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>
