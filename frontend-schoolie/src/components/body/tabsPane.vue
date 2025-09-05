<template>
	<div
		class="tab-pane fade"
		:class="{ active, show: active }"
		:id="id">
		<slot />
	</div>
</template>

<script setup lang="ts">
	interface TabPaneInterface {
		id: string;
		active?: boolean;
	}

	defineProps<TabPaneInterface>();
</script>
