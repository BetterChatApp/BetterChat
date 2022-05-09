import fastify from 'fastify';
import fastifySocketIO from 'fastify-socket.io';
import process from 'node:process';

const app = fastify();
void app.register(fastifySocketIO);

app.get('/', async (request, reply) => {
	await reply.send('monke');
});

app.addHook('onReady', () => {
	app.io.on('connection', (socket) => {
		console.log(socket);
	});
});

app.listen(process.env.PORT ?? 4000, (error, address) => {
	if (error !== null) {
		console.error(error);
		return;
	}

	console.info(`🚀 Server listening at ${address}`);
});
