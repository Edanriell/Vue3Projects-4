<script lang="ts" setup>
	import type { Ref } from "vue";
	import { PropType, ref } from "vue";
	import type { Question } from "../types/quiz";

	defineEmits(["save"]);

	const props = defineProps({
		question: {
			type: Object as PropType<Question>,
			required: false,
			default: {}
		}
	});

	const formQuestion: Ref<Question> = ref({ ...props.question } || ({} as Question));

	const setAsCorrect = (index: number): void => {
		formQuestion.value.correct = index;
	};
</script>
<template>
	<form @submit.prevent="$emit('save', formQuestion)">
		<v-list>
			<v-list-item>
				<v-text-field v-model="formQuestion.question" label="Question"></v-text-field>
			</v-list-item>
			<v-list-item v-for="n in 4" :key="`answer-${n}`">
				<v-text-field v-model="formQuestion[`answer_${n}`]" :label="`Answer ${n}`"></v-text-field>
				<template v-slot:append>
					<v-btn
						:color="formQuestion.correct === n - 1 ? 'green' : 'red'"
						:icon="`${formQuestion.correct === n - 1 ? 'mdi-check-bold' : 'mdi-close'}`"
						variant="text"
						@click="setAsCorrect(n - 1)"
					></v-btn>
				</template>
			</v-list-item>
			<v-separator></v-separator>
			<v-btn primary @click="$emit('save', formQuestion)">Save</v-btn>
		</v-list>
	</form>
</template>
