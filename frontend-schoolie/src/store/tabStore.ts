// /src/stores/sessionStore.ts
import { defineStore } from "pinia";

export const useTabStore = defineStore("activeTabStore", {
	state: function () {
		return {
			activeTab: "" as string,
			allTabs: [] as string[],
		};
	},

	actions: {
		setActiveTab(tabName: string) {
			this.activeTab = tabName;
		},
		goto(tabName: string) {
			this.activeTab = tabName;
		},
		setAllTabs(tabs: string[]) {
			this.allTabs = [...tabs];
		},
	},
});
