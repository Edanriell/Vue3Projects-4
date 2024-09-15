<script lang="ts" setup>
	import type { Ref } from "vue";
	import { onMounted, ref } from "vue";
	import { storeToRefs } from "pinia";
	import type { Recipe } from "@/types/spoonacular";

	import { usePlannerStore } from "@/stores/planner";
	import RecipeTable from "./RecipeTable.vue";
	import CookingInstructions from "./CookingInstructions.vue";
	import AppLink from "./AppLink.vue";

	const store = usePlannerStore();

	const { pastRecipes, futureRecipes } = storeToRefs(store);

	const dialogVisible: Ref<boolean> = ref(false);
	const selectedRecipe: Ref<Recipe | null> = ref(null);

	const openPreview = (recipe: Recipe): void => {
		selectedRecipe.value = recipe;
		dialogVisible.value = true;
	};

	const tab: Ref<string> = ref("upcoming");

	onMounted(() => {
		if (futureRecipes.length === 0) {
			tab.value = "past";
		}
	});
</script>
<template>
	<div v-if="pastRecipes.length === 0 && futureRecipes.length === 0">
		No recipes yet. Add some to your planner!
	</div>
	<div v-else>
		<v-tabs v-model="tab" align-tabs="center" color="deep-purple-accent-4">
			<v-tab :disabled="pastRecipes.length === 0" value="past">Past</v-tab>
			<v-tab :disabled="futureRecipes.length === 0" value="upcoming">Upcoming</v-tab>
		</v-tabs>
		<v-window v-model="tab">
			<v-window-item key="past" value="past">
				<RecipeTable
					:recipes="pastRecipes"
					removable
					title="Past recipes"
					@openPreview="openPreview"
				/>
			</v-window-item>
			<v-window-item key="upcoming" value="upcoming">
				<RecipeTable :recipes="futureRecipes" title="Upcoming recipes" @openPreview="openPreview" />
			</v-window-item>
		</v-window>

		<v-dialog v-model="dialogVisible" class="dialog" scrollable>
			<v-card v-if="selectedRecipe">
				<cooking-instructions :id="selectedRecipe.id" />
				<v-card-actions>
					<v-btn text>
						<app-link :to="`/recipe/${selectedRecipe.id}`">Cooking instructions</app-link></v-btn
					>
					<v-spacer />
					<v-btn icon="mdi-close" @click="dialogVisible = false"></v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>
