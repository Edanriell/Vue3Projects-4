<template>
	<div class="bg-green-100">
		<div class="container mx-auto p-4 py-8 flex items-center justify-between">
			<div>
				Made with ❤️ using
				<ULink
					inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700"
					to="https://www.nuxt.com/"
					>NuxtJs</ULink
				>
				&amp;
				<ULink
					inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700"
					to="https://www.storyblok.com/"
					>Storyblok</ULink
				>
			</div>
			<div>Copyright {{ new Date().getFullYear() }}</div>
		</div>
	</div>
</template>
