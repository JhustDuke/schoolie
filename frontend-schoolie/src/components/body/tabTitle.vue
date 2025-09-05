<template>
	<div>
		<!-- Single mode -->
		<a
			v-if="typeof label === 'string' && typeof targetElemId === 'string'"
			:href="href"
			class="nav-link fw-medium"
			:data-bs-toggle="bsToggle"
			:data-bs-target="targetElemId"
			:class="[customClass, { active: isActive }]">
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
				class="nav-link fw-medium"
				:data-bs-toggle="bsToggle"
				:data-bs-target="targetElemIds[index]"
				:class="[customClass, { active: index === 0 && isActive }]">
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
		bsToggle?: string;
	}

	const props = withDefaults(defineProps<TabTitleInterface>(), {
		isActive: false,
		customClass: "gray lighten-1 nav",
		bsToggle: "tab",
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
</script>
