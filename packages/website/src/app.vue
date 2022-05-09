<script setup lang="ts">
import { useAppStore } from '~/store.js';
import { getSocket } from '~/utils/socket.js';

const socket = getSocket();
const roomId = $ref('');

const appStore = useAppStore();
function createRoom() {
	appStore.roomId = roomId;
	socket.emit('join-room', roomId);
}

function joinRoom() {
	appStore.roomId = roomId;
	socket.emit('join-room', roomId);
}
</script>

<template>
	<div class="column items-center justify-center h-full">
		<div class="p-8 rounded-md border-2 column items-center gap-4">
			<div>
				<label for="room-code" class="font-bold">Room ID </label>
				<input
					id="room-code"
					v-model="roomId"
					placeholder="Leave empty for random"
					class="input input-sm input-bordered"
				/>
			</div>
			<div class="row gap-3">
				<button
					class="btn btn-sm bg-orange-500 border-orange-500"
					@click="createRoom"
				>
					Create Room
				</button>
				<button
					class="btn btn-sm bg-blue-500 border-blue-500"
					@click="joinRoom"
				>
					Join Room
				</button>
			</div>
		</div>
	</div>
</template>

<style>
html,
body,
#app {
	height: 100%;
}
</style>
