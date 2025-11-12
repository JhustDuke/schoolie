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

			<div class="d-flex flex-column gap-2 mt-4">
				<button
					class="btn btn-outline-primary"
					@click="backToOverview">
					Back to Overview
				</button>
				<button
					class="btn btn-outline-secondary"
					@click="redirectUser">
					Go
				</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { defineProps } from "vue";
	import { useTabStore } from "../../store/tabStore";

	interface BrokenLinkInterface {
		title: string;
		iconClass?: string;
		errorMessage: string;
		redirectTo?: string;
		wrapperClass?: string;
		mainContainerClass?: string;
		width?: string;
	}

	withDefaults(defineProps<BrokenLinkInterface>(), {
		wrapperClass: "grey lighten-1",
		mainContainerClass:
			"d-flex flex-column align-items-center text-muted flex-wrap p-3 text-center",
		width: "300px",
		redirectTo: "#",
		title: "not found",
		iconClass: "fa fa-ban fa-2x mb-2 red-text",
		errorMessage: "Oops, nothing to display at the moment.",
	});

	const tabStore = useTabStore();

	function backToOverview(): void {
		tabStore.goto("overview");
	}

	function redirectUser(): void {
		window.location.reload();
	}
</script>
