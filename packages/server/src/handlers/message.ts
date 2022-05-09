import type { Server, Socket } from 'socket.io';

export function registerMessageHandlers({
	io,
	socket,
}: {
	socket: Socket;
	io: Server;
}) {
	socket.on('join-room', async (roomId) => {
		await socket.join(roomId);
		if (io.sockets.adapter.rooms.get(roomId)!.size <= 1) {
			io.to(socket.id).emit('first-in-room');
		} else {
			socket.broadcast.to(roomId).emit('new-user', socket.id);
		}

		const roomSocketIds = [...io.sockets.adapter.rooms.get(roomId)!.keys()];

		io.in(roomId).emit('room-user-change', roomSocketIds);
	});

	socket.on('server-broadcast', (roomId: string, dataJson: string) => {
		console.log('server-broadcast', dataJson);
		socket.broadcast.to(roomId).emit('client-broadcast', dataJson);
	});

	socket.on('server-volatile-broadcast', (roomId: string, dataJson: string) => {
		socket.volatile.broadcast.to(roomId).emit('client-broadcast', dataJson);
	});

	socket.on('messageSent', (message: string) => {
		console.log(message);
	});

	socket.on('disconnecting', () => {
		const { rooms } = io.sockets.adapter;

		// Looping through all rooms the socket is connected to and sending an update about the socket leaving the room
		for (const roomId of socket.rooms) {
			const clients = [...rooms.get(roomId)!.keys()].filter(
				(id) => id !== socket.id
			);

			if (clients.length > 0) {
				// Sending the room the new array of clients in the room
				socket.broadcast.to(roomId).emit('room-user-change', clients);
			}
		}
	});

	socket.on('disconnect', () => {
		socket.removeAllListeners();
	});
}
