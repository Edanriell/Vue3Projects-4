<script lang="ts" setup>
	import type { Ref } from "vue";
	import type { StoryBlok, StoryblokProject } from "@/types/storyblok";

	const props = defineProps({
		blok: {
			type: Object as () => StoryBlok,
			required: true
		}
	});

	const projects: Ref<StoryblokProject[] | null> = ref(null);

	const storyblokApi = useStoryblokApi();
	const { data } = await storyblokApi.get("cdn/stories", {
		version: "draft",
		starts_with: "portfolio",
		is_startpage: false
	});

	const richTextBody = computed(() => renderRichText(props.blok.body));
	projects.value = data.stories;

	useHead({
		meta: [{ name: "description", content: props.blok.description }]
	});
</script>

<template>
	<div>
		<h1 class="text-2xl mb-4 text-primary">
			{{ blok.headline }}
		</h1>
		<div class="py-4" v-html="richTextBody" />
		<div class="grid grid-cols-2 gap-4">
			<UCard v-for="project in projects" :key="project.uuid" class="mx-4 text-center">
				<ULink :to="`/${project.full_slug}`">
					{{ project.content.title }}
					<img
						v-if="project.content.image"
						:alt="project.content.image.alt"
						:src="project.content.image.filename + '/m/300x0'"
					/>
				</ULink>
			</UCard>
		</div>
	</div>
</template>

<style scoped>
	.grid {
		grid-template-columns: 1fr;
		gap: 1em;
		@media only screen and (min-width: 400px) {
			grid-template-columns: 1fr 1fr;
		}
	}
</style>
