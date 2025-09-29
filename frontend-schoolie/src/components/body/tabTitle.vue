<template>
	<div>
		<!-- Single mode -->
		<a
			v-if="typeof label === 'string' && typeof targetElemId === 'string'"
			:href="href"
			class="nav-link fw-medium"
			data-bs-toggle="tab"
			:data-bs-target="targetElemId">
			{{ label }}
		</a>

		<!-- Multiple mode -->
		<div
			:class="customClass"
			v-else-if="Array.isArray(tabTitles) && Array.isArray(targetElemIds)">
			<a
				v-for="(title, index) in tabTitles"
				:key="index"
				:href="href ?? '#'"
				data-bs-toggle="tab"
				class="nav-link fw-medium"
				:class="index === 0 ? 'show active' : ''"
				:data-bs-target="targetElemIds[index]">
				{{ title }}
			</a>
		</div>
	</div>
</template>

<script setup lang="ts">
	interface TabTitleInterface {
		label?: string; // for single
		targetElemId?: string; // for single
		tabTitles?: string[]; // for multiple
		targetElemIds?: string[]; // for multiple
		href?: string;
		isActive?: boolean;
		customClass?: string | string[];
	}

	const props = withDefaults(defineProps<TabTitleInterface>(), {
		isActive: false,
		customClass: "gray lighten-1 nav",
	});

	// Validation: tabTitles and targetElemIds must match length
	if (
		Array.isArray(props.tabTitles) &&
		Array.isArray(props.targetElemIds) &&
		props.tabTitles.length !== props.targetElemIds.length
	) {
		throw new Error(
			`tabTitles (${props.tabTitles.length}) and targetElemIds (${props.targetElemIds.length}) must have the same length.`
		);
	}

	//what do i want
	//when i click a particular tab, it should look for its target id and remove tab-pane out of it
	//
</script>

<style scoped>
	.active {
		background-color: rgba(90, 90, 90, 0.425) !important;
		color: white !important;
	}
</style>
