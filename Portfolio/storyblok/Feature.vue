<script lang="ts" setup>
	defineProps({
		blok: {
			type: Object as () => { name: string; image: any; link: any }
		}
	});
</script>

<template>
	<div v-if="blok" v-editable="blok" class="text-center">
		<ULink :to="blok.link.cached_url">
			<img v-if="blok.image" :alt="blok.image.alt" :src="blok.image.filename + '/m/200x0'" />
		</ULink>
		<header class="text-xl">
			{{ blok.name }}
		</header>
	</div>
</template>
