// /src/stores/sessionStore.ts
import { defineStore } from "pinia";

export const useClassesStore = defineStore("classesStore", {
	state: function () {
		return {
			allClasses: [] as string[],
		};
	},

	actions: {
		setClasses: function (newClasses: string[]): void {
			this.allClasses = [...newClasses]; // replace old array safely
		},
	},
});
