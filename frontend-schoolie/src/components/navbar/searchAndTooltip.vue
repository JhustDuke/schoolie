<template>
	<div
		class="d-flex align-items-center gap-2 px-2 py-1 rounded-pill"
		:class="{ 'border border-danger': isInvalid, border: !isInvalid }">
		<input
			ref="inputRef"
			type="text"
			class="form-control form-control-sm shadow-none white-text"
			placeholder="Search..."
			v-model="query"
			@keyup.enter="onEnter"
			:style="{
				outline: 'none',
				border: 'none',
				backgroundColor: 'transparent',
			}" />

		<span>
			<i
				ref="tipRef"
				class="fa fa-info blue-grey yellow-text text-lighten-4 px-1 py-1 rounded-pill"
				@mouseenter="onHoverStart"
				@mouseleave="onHoverEnd"
				:title="tooltipText">
			</i>
		</span>
	</div>
</template>

<script setup lang="ts">
	import { ref } from "vue";

	const emit = defineEmits<{
		(e: "search-started"): void;
		(e: "search-valid", data: Record<string, string>): void;
	}>();

	const query = ref<string>("");
	const tooltipText = ref<string>("");
	const tipRef = ref<HTMLElement | null>(null);
	const isInvalid = ref<boolean>(false);
	let hoverTimer: number | null = null;

	function validateSearch(input: string): false | Record<string, string> {
		const blacklist = /[<>/"'`]|(script|onerror|onload|javascript):?/i;
		if (blacklist.test(input)) return false;

		// Accept sessionYear=yyyy/yyyy as well as other key=value pairs
		const criteria = /@(\w+)=([\w\-\/]+)/g;
		const matches = [...input.matchAll(criteria)];
		const obj: Record<string, string> = {};
		matches.forEach((entry) => {
			obj[entry[1]] = entry[2];
		});

		return Object.keys(obj).length > 0 ? obj : false;
	}

	const onEnter = function () {
		const value = query.value.trim();
		const validated = validateSearch(value);

		if (validated === false || Object.keys(validated).length === 0) {
			isInvalid.value = true;
			tooltipText.value = "Invalid input: must match @key=value format";
			return;
		}

		isInvalid.value = false;
		tooltipText.value = "";
		emit("search-started");
		emit("search-valid", validated);
	};

	const onHoverStart = function () {
		hoverTimer = window.setTimeout(function () {
			if (!tooltipText.value) {
				tooltipText.value =
					"Press Enter to search. e.g@firstname=test@sessionYear=yyyy/yyyy";
			}
			if (tipRef.value) tipRef.value.dispatchEvent(new Event("mouseenter"));
		}, 500);
	};

	const onHoverEnd = function () {
		if (!isInvalid.value) tooltipText.value = "";
		if (hoverTimer) clearTimeout(hoverTimer);
		hoverTimer = null;
	};
</script>
