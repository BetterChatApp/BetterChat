import { defineStore } from 'pinia';

interface AppStoreState {
	roomId: string;
}

export const useAppStore = defineStore('app', {
	state: (): AppStoreState => ({
		roomId: undefined!,
	}),
});
