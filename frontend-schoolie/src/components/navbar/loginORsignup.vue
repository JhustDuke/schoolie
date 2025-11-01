<template>
	<div>
		<!-- Login / Signup Button -->
		<button
			type="button"
			class="btn white blue-text text-darken-3 fw-semibold rounded-pill px-4 py-2 shadow-sm"
			@click="toggleModal">
			Login / Signup
		</button>

		<!-- Modal -->
		<div
			v-if="isModalVisible"
			class="modal fade show d-block"
			tabindex="-1"
			role="dialog">
			<div
				class="modal-dialog modal-dialog-centered modal-md"
				role="document">
				<div class="modal-content border-0 rounded-4 shadow mx-2 mx-sm-auto">
					<div class="modal-header blue darken-3 white-text">
						<h5 class="modal-title fw-semibold">{{ activeTab }}</h5>
						<button
							type="button"
							class="btn-close"
							@click="toggleModal"></button>
					</div>

					<div class="modal-body p-4">
						<!-- Tabs -->
						<ul
							class="nav nav-tabs mb-3"
							v-if="activeTab !== 'Update Password'">
							<li
								class="nav-item"
								v-for="tab in tabs"
								:key="tab">
								<a
									href="#"
									class="nav-link"
									:class="{ active: activeTab === tab }"
									@click.prevent="activeTab = tab">
									{{ tab }}
								</a>
							</li>
						</ul>

						<!-- LOGIN -->
						<div v-if="activeTab === 'Login'">
							<input
								v-model="loginEmail"
								class="form-control mb-3"
								placeholder="Email" />
							<input
								v-model="loginPassword"
								class="form-control mb-3"
								type="password"
								placeholder="Password" />

							<button
								class="btn blue darken-3 text-white w-100 rounded-3"
								@click="handleLogin"
								:disabled="loginDisabled">
								<span v-if="loading">Logging in...</span>
								<span v-else>Login</span>
							</button>

							<p
								class="text-center mt-3 text-primary fw-semibold"
								role="button"
								@click="activeTab = 'Update Password'">
								Update Password?
							</p>
						</div>

						<!-- SIGNUP -->
						<div v-else-if="activeTab === 'Signup'">
							<input
								v-model="signUpEmail"
								class="form-control mb-3"
								placeholder="Email" />
							<input
								v-model="signUpPassword"
								class="form-control mb-3"
								type="password"
								placeholder="Password" />
							<input
								v-model="confirmPassword"
								class="form-control mb-3"
								type="password"
								placeholder="Confirm Password" />

							<p
								v-if="!passwordsMatch && confirmPassword"
								class="red-text small mb-2">
								Passwords do not match.
							</p>

							<button
								class="btn blue darken-3 text-white w-100 rounded-3"
								@click="handleSignUp"
								:disabled="signUpDisabled">
								<span v-if="loading">Signing up...</span>
								<span v-else>Signup</span>
							</button>
						</div>

						<!-- UPDATE PASSWORD -->
						<div v-else>
							<input
								v-model="updateEmail"
								class="form-control mb-3"
								placeholder="Enter your registered email" />

							<button
								class="btn blue darken-3 text-white w-100 rounded-3"
								@click="handleUpdatePassword"
								:disabled="updateDisabled">
								<span v-if="loading">Sending reset link...</span>
								<span v-else>Send Reset Link</span>
							</button>
						</div>

						<!-- Feedback -->
						<p
							class="text-center mt-3 fw-semibold"
							:class="isSuccess ? 'green-text' : 'red-text'">
							{{ message }}
						</p>
					</div>
				</div>
			</div>
		</div>

		<!-- Backdrop -->
		<div
			v-if="isModalVisible"
			class="modal-backdrop grey fade show"
			@click="toggleModal"></div>
	</div>
</template>

<script setup lang="ts">
	import { ref, computed } from "vue";
	import { navBarModel } from "@models/navBarModel";
	import { classModel } from "@models/classModel";

	const isModalVisible = ref(false);
	const tabs = ["Login", "Signup"];
	const activeTab = ref("Login");
	const loading = ref(false);
	const message = ref("");
	const isSuccess = ref(false);

	function toggleModal(): void {
		isModalVisible.value = !isModalVisible.value;
		message.value = "";
		isSuccess.value = false;
		activeTab.value = "Login";
	}

	// --- LOGIN ---
	const loginEmail = ref("");
	const loginPassword = ref("");

	const loginDisabled = computed(function () {
		return (
			loading.value ||
			!isValidEmail(loginEmail.value) ||
			loginPassword.value.trim() === ""
		);
	});

	async function handleLogin(): Promise<void> {
		if (loginDisabled.value) return;
		loading.value = true;
		message.value = "";
		try {
			const res: any = await navBarModel.loginMock({
				email: loginEmail.value,
				password: loginPassword.value,
			});
			message.value = res.message;
			isSuccess.value = !!res.success;
		} catch {
			message.value = "Login failed.";
			isSuccess.value = false;
		} finally {
			loading.value = false;
		}
	}

	// --- SIGNUP ---
	const signUpEmail = ref("");
	const signUpPassword = ref("");
	const confirmPassword = ref("");

	const passwordsMatch = computed(function () {
		return signUpPassword.value === confirmPassword.value;
	});

	const signUpDisabled = computed(function () {
		return (
			loading.value ||
			!isValidEmail(signUpEmail.value) ||
			signUpPassword.value.trim() === "" ||
			!passwordsMatch.value
		);
	});

	async function handleSignUp(): Promise<void> {
		if (signUpDisabled.value) return;
		loading.value = true;
		message.value = "";
		try {
			const res: any = await navBarModel.signUpMock({
				email: signUpEmail.value,
				password: signUpPassword.value,
			});
			message.value = res.message;
			isSuccess.value = !!res.success;
		} catch {
			message.value = "Signup failed.";
			isSuccess.value = false;
		} finally {
			loading.value = false;
		}
	}

	// --- UPDATE PASSWORD ---
	const updateEmail = ref("");

	const updateDisabled = computed(function () {
		return loading.value || !isValidEmail(updateEmail.value);
	});

	async function handleUpdatePassword(): Promise<void> {
		if (updateDisabled.value) return;
		loading.value = true;
		message.value = "";
		try {
			const res: any = await classModel.forgotPassWordMock({
				email: updateEmail.value,
			});
			message.value = res.message;
			isSuccess.value = !!res.success;
		} catch {
			message.value = "Password reset failed.";
			isSuccess.value = false;
		} finally {
			loading.value = false;
		}
	}

	function isValidEmail(email: string): boolean {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}
</script>
