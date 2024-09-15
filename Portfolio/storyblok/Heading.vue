<template>
	<div v-if="blok" v-editable="blok" class="heading">
		{{ blok.headline }}
	</div>
</template>

<script lang="ts" setup>
	defineProps({ blok: Object });
</script>
