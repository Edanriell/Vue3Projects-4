<template>
	<v-layout class="">
		<v-app-bar color="info" title="Quiz Admin Panel"></v-app-bar>
		<v-navigation-drawer permanent>
			<v-list>
				<v-list-item>
					<nuxt-link to="/">
						<v-btn flat>
							<template v-slot:prepend>
								<v-icon icon="mdi-home"></v-icon>
							</template>
							Home
						</v-btn>
					</nuxt-link>
				</v-list-item>
				<v-list-item>
					<nuxt-link to="/quiz">
						<v-btn flat>
							<template v-slot:prepend>
								<v-icon icon="mdi-wrench-cog"></v-icon>
							</template>
							Manage Quizes</v-btn
						>
					</nuxt-link>
				</v-list-item>
				<v-list-item>
					<nuxt-link to="/share">
						<v-btn flat>
							<template v-slot:prepend>
								<v-icon icon="mdi-share"></v-icon>
							</template>
							Share</v-btn
						>
					</nuxt-link>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-main class="d-flex align-center justify-center" style="min-height: 300px">
			<slot />
		</v-main>
	</v-layout>
</template>
