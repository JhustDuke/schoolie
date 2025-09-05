<!-- <template>
	<div
		class="nav justify-content-start flex-wrap gap-2"
		id="tabsMenu">
		<TabsMenuItem
			v-for="(item, index) in items"
			:key="index"
			v-bind="item" />
	</div>
</template>

<script setup lang="ts">
	import TabsMenuItem from "./tabsMenuItem.vue";

	interface TabsMenuItemInterface {
		id: string;
		label: string;
		target: string;
		width?: string;
		active?: boolean;
	}

	defineProps<{ items: TabsMenuItemInterface[] }>();
</script> -->
