<template>
	<div :class="mainContainerClass">
		<h4 class="text-center text-capitalize">{{ title }}</h4>
		<div
			:class="wrapperClass"
			:style="{ width }">
			<div class="text-center my-3">
				<i :class="iconClass"></i>
			</div>

			<div class="red-text text-capitalize fw-bold">{{ errorMessage }}</div>
			<small>{{ formMessage }}</small>

			<form
				v-if="formMessage"
				class="my-3 flex-wrap p-2"
				:style="{ maxWidth: width }">
				<input
					type="email"
					class="form-control me-2"
					:placeholder="placeholder" />
				<button
					class="btn btn-primary mt-3 d-block w-100"
					type="submit">
					{{ buttonText }}
				</button>
			</form>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { defineProps } from "vue";

	interface BrokenLinkInterface {
		title: string;
		iconClass?: string;
		errorMessage: string;
		formMessage?: string;
		placeholder?: string;
		buttonText?: string;
		wrapperClass?: string;
		mainContainerClass?: string;
		width?: string;
	}

	const props = defineProps<BrokenLinkInterface>();

	// defaults
	const {
		title = "not found",
		iconClass = "fa fa-ban fa-2x mb-2 red-text",
		errorMessage = "Oops, nothing to display at the moment.",
		formMessage = "Drop your email to be notified when it is:",
		placeholder = "Enter your email",
		buttonText = "Notify Me",
		wrapperClass = "grey lighten-1",
		mainContainerClass = "d-flex flex-column align-items-center text-muted flex-wrap p-3 text-center",
		width = "300px",
	} = props;
</script>
