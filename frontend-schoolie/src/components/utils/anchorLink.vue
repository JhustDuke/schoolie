<template>
	<div>
		<a
			:href="href ?? '#'"
			class="nav-link"
			:data-bs-toggle="bs5Toggle"
			:data-bs-target="bs5ToggleTargetId"
			:id="id"
			:class="[customClass, { active: isActive ?? false }]">
			{{ linkName }}
		</a>
	</div>
</template>

<script setup lang="ts">
	interface AnchorLink {
		linkName: string;
		customClass?: string | string[];
		id?: string;
		isActive?: boolean;
		bs5Toggle?: string;
		bs5ToggleTargetId?: string;
		href?: string;
	}

	withDefaults(defineProps<AnchorLink>(), {
		customClass: "fw-medium text-medium", // default styling lives here
		isActive: false,
	});
</script>
