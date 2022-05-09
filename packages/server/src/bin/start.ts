import fastify from 'fastify';
import fastifySocketIO from 'fastify-socket.io';
import process from 'node:process';

import { registerMessageHandlers } from '~/handlers/message.js';

const app = fastify();
void app.register(fastifySocketIO, {
	cors: {
		origin: '*',
	},
});

app.addHook('onReady', () => {
	const { io } = app;
	io.on('connection', (socket) => {
		io.to(socket.id).emit('init-room');

		registerMessageHandlers({ socket, io: app.io });
	});
});

app.listen(process.env.PORT ?? 4000, (error, address) => {
	if (error !== null) {
		console.error(error);
		return;
	}

	console.info(`🚀 Server listening at ${address}`);
});
