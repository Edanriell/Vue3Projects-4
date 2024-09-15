<script lang="ts" setup>
	import type { Ref } from "vue";
	import { ref } from "vue";

	import { useRatingStore } from "@/stores/rating";

	const store = useRatingStore();

	const props = defineProps<{
		id: number;
		readonly?: boolean;
	}>();

	const rating: Ref<number> = ref(store.getRatingById(props.id));

	const saveRating = () => {
		store.saveRating({ id: props.id, rating: rating.value });
	};
</script>
<template>
	<div class="flex items-center">
		<v-rating
			v-model="rating"
			:readonly="readonly"
			color="light-green"
			half-increments
			hover
			item-aria-label="This item is rated {0} of {1}"
			@click="saveRating"
		></v-rating>
	</div>
</template>
