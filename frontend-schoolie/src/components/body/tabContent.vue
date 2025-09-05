<template>
	<div
		:id="id"
		class="tab-pane fade col-md rounded blue-grey lighten-5 shadow text-center text-md-start"
		:class="{ active: isActive ?? false, show: show ?? false }">
		<slot />
	</div>
</template>

<script setup lang="ts">
	interface TabContentsInterface {
		id: string;
		show?: boolean;
		isActive?: boolean;
		customClass?: string;
	}

	defineProps<TabContentsInterface>();
</script>
