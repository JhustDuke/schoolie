// /src/stores/sessionStore.ts
import { defineStore } from "pinia";

export const useSessionStore = defineStore("sessionStore", {
	state: function () {
		return {
			allSessions: [] as string[],
			showModal: false,
			selectedSession: "" as string,
		};
	},

	actions: {
		setSessions: function (sessions: string[]): void {
			this.allSessions = sessions;
		},

		setActiveSession: function (session: string): void {
			this.selectedSession = session;
		},

		toggleModal: function (): void {
			this.showModal = !this.showModal;
		},
	},
});
