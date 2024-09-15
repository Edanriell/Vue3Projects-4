<script lang="ts" setup>
	import { RouterLink, RouterView } from "vue-router";
</script>

<template>
	<header>
		<div class="my-4 text-center">
			<h1 class="mb-4 text-6xl font-extrabold uppercase">Marvel Explorer 🔭</h1>
			<nav>
				<RouterLink class="px-4 py-2 border-2 rounded-s-md hover:text-slate-600" to="/"
					>📒 Comics</RouterLink
				>
				<RouterLink
					class="px-4 py-2 border-2 border-s-0 hover:text-slate-600 rounded-e-md"
					to="/search"
					>🦹 Heroes</RouterLink
				>
			</nav>
		</div>
	</header>

	<RouterView />
</template>
