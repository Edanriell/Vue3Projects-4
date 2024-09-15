<template>
	<q-layout view="lHh Lpr lFf">
		<q-header elevated>
			<q-toolbar>
				<q-btn aria-label="Menu" dense flat icon="menu" round @click="toggleLeftDrawer" />

				<q-toolbar-title>Expense Tracker App 💸 </q-toolbar-title>

				<div>Built with Quasar v{{ $q.version }}</div>
			</q-toolbar>
		</q-header>

		<q-drawer v-model="leftDrawerOpen" bordered show-if-above>
			<q-list>
				<q-item-label header> Essential Links </q-item-label>

				<EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
				<q-separator />
				<q-item class="q-py-lg justify-center">
					<ButtonSignOut />
				</q-item>
			</q-list>
		</q-drawer>

		<q-page-container>
			<router-view />
		</q-page-container>
	</q-layout>
</template>

<script lang="ts" setup>
	import { ref } from "vue";
	import EssentialLink, { EssentialLinkProps } from "components/EssentialLink.vue";

	import ButtonSignOut from "src/components/ButtonSignOut.vue";

	const essentialLinks: EssentialLinkProps[] = [
		{
			title: "Account",
			caption: "Manage my account settings",
			icon: "face",
			link: "/"
		},
		{
			title: "Expenses",
			caption: "Track my expenses",
			icon: "toll",
			link: "/expenses"
		},
		{
			title: "Categories",
			caption: "Manage my expense categories",
			icon: "settings",
			link: "/categories"
		}
	];

	const leftDrawerOpen = ref(false);

	function toggleLeftDrawer() {
		leftDrawerOpen.value = !leftDrawerOpen.value;
	}
</script>
