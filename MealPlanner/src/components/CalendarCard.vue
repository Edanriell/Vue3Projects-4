<script lang="ts" setup>
	import { useFormatDate } from "@/composables/formatters";
	import { usePlannerStore } from "@/stores/planner";
	import AppLink from "./AppLink.vue";

	const emits = defineEmits(["daySelected"]);

	const store = usePlannerStore();

	interface Today {
		id: number;
		title: string;
		readyInMinutes: number;
	}

	interface Card {
		date: Date;
		today: Today[];
	}

	const props = defineProps<{
		card: Card;
	}>();
	console.log(props.card);
	const addRecipeToDay = (card: Card): void => {
		emits("daySelected", card);
	};

	const removeFromDay = (recipes: { id: number; date: Date }): void => {
		const { id, date } = recipes;
		store.removeRecipeByIdDate({ id, date });
	};
</script>
<template>
	<v-sheet class="d-flex justify-space-between">
		<v-sheet class="ma-2 pa-2">
			<h2 class="text-h2">{{ useFormatDate(card.date) }}</h2>
		</v-sheet>
		<v-sheet class="ma-2 pa-2">
			<v-btn icon="mdi-plus" text @click="addRecipeToDay(card)"></v-btn>
		</v-sheet>
	</v-sheet>
	<v-col>
		<v-card v-for="today in card.today" :key="today.id" class="my-4">
			<v-card-title>
				<app-link :to="`/recipe/${today.id}`">{{ today.title }}</app-link>
			</v-card-title>
			<v-card-text>{{ today.readyInMinutes }} minutes</v-card-text>

			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn
					icon="mdi-trash-can-outline"
					text
					@click="removeFromDay({ id: today.id, date: card.date })"
				></v-btn>
			</v-card-actions>
		</v-card>
	</v-col>
</template>
