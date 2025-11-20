<template>
	<nav class="navbar px-2 py-3 blue darken-3">
		<div
			class="container-fluid justify-content-between align-items-center isRelative">
			<Logo />

			<SearchAndTooltip
				@search-started="onSearchStart"
				@search-valid="onSearchSubmit" />

			<LoginORsignup class="d-none" />
			<SessionAndCog />
		</div>
		<!-- modal hidden by default -->
		<SearchResultModal
			:results="searchResults"
			:visible="isModalVisible"
			:loading="isLoading"
			:error="errorState"
			@close="toggleModal" />
	</nav>
</template>

<script setup lang="ts">
	import { ref } from "vue";
	import Logo from "./logo.vue";
	import LoginORsignup from "./loginORsignup.vue";
	import SessionAndCog from "./sessionSelectAndCog.vue";
	import SearchAndTooltip from "./searchAndTooltip.vue";
	import SearchResultModal from "./searchResultModal.vue";
	import { navBarModel } from "@models/navBarModel";

	const searchResults = ref<Array<Record<string, unknown>>>([]);
	const isModalVisible = ref<boolean>(false);
	const isLoading = ref<boolean>(false);
	const errorState = ref<null | {
		title: string;
		iconClass?: string;
		errorMessage: string;
		redirectTo?: string;
		wrapperClass?: string;
		mainContainerClass?: string;
		width?: string;
	}>(null);

	const onSearchStart = function () {
		isLoading.value = true;
		errorState.value = null;
		isModalVisible.value = true;
		searchResults.value = [];
		console.log("search started");
	};

	const onSearchSubmit = async function (query: Record<string, string>) {
		try {
			const result = await navBarModel.searchModel(query);
			console.log(result);
			searchResults.value = Array.isArray(result) ? result : [];
			errorState.value = null;
			console.log("search success");
		} catch (err: unknown) {
			searchResults.value = [];
			errorState.value = {
				title: "Search Failed",
				iconClass: "fa fa-warning red-text",
				errorMessage: err instanceof Error ? err.message : "Unknown error",
			};
			console.log("search failed");
		} finally {
			isLoading.value = false;
			isModalVisible.value = true;
		}
	};

	const toggleModal = function () {
		isModalVisible.value = false;
	};
</script>
