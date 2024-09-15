<script lang="ts" setup>
	import type { Ref } from "vue";
	import { ref, watch } from "vue";
	import type { Routine } from "@/types/fitness";
	import SelectExercise from "./SelectExercise.vue";

	const emit = defineEmits(["add"]);

	const routine: Ref<Routine> = ref({ exercise: "", routines: [] });
	const exercise = ref(null);
	const weight: Ref<Number> = ref(0);
	const repetitions: Ref<Number> = ref(0);

	const panel = ref([0]);

	const addRow = () => {
		routine.value.routines.push({
			weight: weight.value,
			repetitions: repetitions.value
		});
	};

	const removeRow = (index: number) => {
		routine.value.routines.splice(index, 1);
	};

	const resetForm = () => {
		exercise.value = null;
		weight.value = 0;
		repetitions.value = 0;
	};

	const add = () => {
		emit("add", routine.value);
		resetForm();
	};

	watch(exercise, () => {
		routine.value = { exercise: exercise.value, routines: [] };
	});
</script>
<template>
	<v-container>
		<v-card>
			<v-card-title>Add routine</v-card-title>
			<v-form>
				<v-container>
					<select-exercise v-model="exercise" />
				</v-container>

				<v-expansion-panels v-if="exercise" v-model="panel" multiple>
					<v-expansion-panel>
						<v-expansion-panel-title>Add</v-expansion-panel-title>
						<v-expansion-panel-text>
							<v-row>
								<v-col class="align-center" cols="4" sm="5">
									<v-text-field
										v-model="weight"
										autofocus
										label="Weight"
										type="number"
									></v-text-field>
								</v-col>
								<v-col class="align-center" cols="4" sm="5">
									<v-text-field v-model="repetitions" label="Reps" type="number"></v-text-field>
								</v-col>

								<v-spacer />
								<v-col class="justify-end align-center actionButtons" cols="4" sm="2">
									<v-btn color="primary" icon="mdi-plus" type="submit" @click.prevent="addRow" />
								</v-col>
							</v-row>
						</v-expansion-panel-text> </v-expansion-panel
					><v-expansion-panel>
						<v-expansion-panel-title
							>Summary

							<template v-slot:actions="{ expanded }">
								<v-badge
									v-if="routine.routines.length > 0"
									:content="routine.routines.length"
									color="error"
								>
									<v-icon :icon="expanded ? 'mdi-chevron-up' : 'mdi-chevron-down'"></v-icon>
								</v-badge>
								<v-icon v-else :icon="expanded ? 'mdi-chevron-up' : 'mdi-chevron-down'"></v-icon>
							</template>
						</v-expansion-panel-title>
						<v-expansion-panel-text>
							<v-row v-for="(entry, index) in routine.routines" :key="index">
								<v-col class="justify-end align-center" cols="4" sm="5">
									{{ entry.weight }}
								</v-col>
								<v-col class="justify-end align-center" cols="4" sm="5">
									{{ entry.repetitions }}
								</v-col>

								<v-spacer />
								<v-col class="justify-end align-center actionButtons" cols="4" sm="2">
									<v-btn
										icon="mdi-trash-can-outline"
										size="x-small"
										type="submit"
										@click.prevent="removeRow(index)"
									/>
								</v-col>
							</v-row>
						</v-expansion-panel-text>
					</v-expansion-panel>
				</v-expansion-panels>
			</v-form>
			<v-card-actions>
				<v-btn
					:disabled="routine.routines.length === 0"
					block
					color="primary"
					size="large"
					type="submit"
					@click.prevent="add"
				>
					Add
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-container>
</template>

<style scoped>
	.v-row .actionButtons {
		visibility: hidden;
	}

	.v-row:focus .actionButtons,
	.v-row:hover .actionButtons {
		visibility: visible;
	}
</style>
