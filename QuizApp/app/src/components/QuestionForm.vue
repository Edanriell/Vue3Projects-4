<script lang="ts" setup>
	import type { Ref } from "vue";
	import { computed, ref } from "vue";
	import { socket, state } from "@/socket";
	import type { Question } from "@/types/quiz";

	const hasAnswered: Ref<boolean> = ref(false);
	const questionAnswered: Ref<number | undefined> = ref(undefined);
	const anwerQuestion = (index: number): void => {
		hasAnswered.value = true;
		questionAnswered.value = index;
		socket.emit("player:answer", index);
	};

	const question = computed((): Question => {
		return state.quizCurrentQuestion;
	});
</script>

<template>
	<v-card>
		<v-list>
			<v-list-item
				v-for="(answer, index) in question.answers"
				:key="`answer-${index}`"
				:disabled="hasAnswered"
				class="my-2"
				@click="anwerQuestion(index)"
			>
				<v-list-item-content>
					<v-list-item-title :class="{ 'font-weight-bold': questionAnswered === index }">{{
						answer
					}}</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
		</v-list>
	</v-card>
</template>
