<script lang="ts" setup>
	import type { Ref } from "vue";
	import { computed, ref } from "vue";

	import { useCategoriesStore } from "src/stores/categories";
	import { useExpensesStore } from "src/stores/expenses";
	import { storeToRefs } from "pinia";

	const categoriesStore = useCategoriesStore();
	const { categories } = storeToRefs(categoriesStore);

	const expensesStore = useExpensesStore();

	const showDialog: Ref<boolean> = ref(false);
	const loading: Ref<boolean> = ref(false);
	const fCategoryName: Ref<string> = ref("");
	const fAmount: Ref<number> = ref(0);
	const fDescription: Ref<string> = ref("");

	const categorieValues = computed(() => categories.value.map((c: { name: string }) => c.name));

	const fCategoryId = computed(() => {
		const category = categories.value.find((c: { name: string }) => c.name === fCategoryName.value);
		return category ? category.id : "";
	});

	const upsertCategory = async () => {
		if (fCategoryId.value && fAmount.value && fDescription.value) {
			try {
				loading.value = true;
				expensesStore.upsertExpense({
					category_id: fCategoryId.value,
					amount: fAmount.value,
					description: fDescription.value
				});
			} catch (error: unknown) {
				const { message } = error as Error;
				console.error(message);
			} finally {
				resetForm();
				showDialog.value = false;
				loading.value = false;
			}
		}
	};

	const resetForm = () => {
		fCategoryName.value = "";
		fAmount.value = 0;
		fDescription.value = "";
	};
</script>
<template>
	<q-dialog v-model="showDialog" no-backdrop-dismiss>
		<q-card class="q-py-md">
			<form class="q-pa-md column flex-center flex" @submit.prevent="upsertCategory">
				<q-card-section class="row items-center q-pb-none">
					<div class="text-h6">Add expense</div>
					<q-space />
					<q-btn v-close-popup dense flat icon="close" round />
				</q-card-section>
				<q-card-section>
					<q-input
						id="amount"
						v-model="fAmount"
						:rules="[(val) => val > 0 || 'Amount must be greater than 0']"
						label="Amount"
						min="0"
						step="any"
						type="number"
					/>
				</q-card-section>
				<q-card-section>
					<q-select
						v-model="fCategoryName"
						:options="categorieValues"
						:rules="[(val) => val > 0 || 'A category is required']"
						label="Please select a category"
					/>
				</q-card-section>
				<q-card-section>
					<q-input
						id="description"
						v-model="fDescription"
						:rules="[(val) => !!val || 'Description is required']"
						label="Description"
						type="text"
					/>
				</q-card-section>
				<q-card-actions align="center" class="q-gutter-md">
					<q-btn
						:disabled="loading"
						:label="loading ? 'Saving ...' : 'Add Expense'"
						color="primary"
						type="submit"
					/>
				</q-card-actions>
			</form>
		</q-card>
	</q-dialog>

	<q-page-sticky :offset="[18, 18]" position="bottom-right">
		<q-btn color="accent" fab icon="add" @click="showDialog = true" />
	</q-page-sticky>
</template>

<style scoped>
	form > div {
		min-width: calc(400px - 32px);
		max-width: 80vw;
	}
</style>
