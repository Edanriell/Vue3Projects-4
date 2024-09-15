<script lang="ts" setup>
	import type { Ref } from "vue";
	import { ref } from "vue";
	import { supabase } from "boot/supabase";
	import { useRouter } from "vue-router";

	const loading: Ref<boolean> = ref(false);
	const email: Ref<string> = ref("");
	const password: Ref<string> = ref("");

	const errorMessage: Ref<string> = ref("");

	const router = useRouter();

	const handleLogin = async () => {
		try {
			loading.value = true;
			const { data, error } = await supabase.auth.signInWithPassword({
				email: email.value,
				password: password.value
			});
			if (error) throw error;
			if (data) {
				router.push("/");
			}
		} catch (error) {
			if (error instanceof Error) {
				console.error(error.message);
				errorMessage.value = error.message;
			}
		} finally {
			loading.value = false;
		}
	};
</script>

<template>
	<form class="q-pa-lg column flex-center flex" @submit.prevent="handleLogin">
		<q-card flat>
			<q-card-section class="q-gutter-md">
				<div><p>Sign in with your email address and password</p></div>
				<q-input
					v-model="email"
					:rules="[(val, rules) => rules.email(val) || 'Please enter a valid email address']"
					label="Your email"
					lazy-rules
					type="email"
				/>
				<q-input v-model="password" label="Your password" type="password" />
			</q-card-section>
			<p class="text-negative">{{ errorMessage }}</p>
			<q-card-actions class="q-gutter-md justify-center">
				<q-btn
					:disabled="loading"
					:label="loading ? 'Loading' : 'Log in'"
					color="primary"
					type="submit"
				/>
			</q-card-actions>
		</q-card>
	</form>
</template>
