import onetime from 'onetime';
import type { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';

export const getSocket: () => Socket = onetime(() =>
	io('http://localhost:4000')
);

export function broadcast({
	socket,
	data,
}: {
	socket: Socket;
	data: Record<string, unknown>;
}) {
	socket.emit('server-broadcast', JSON.stringify(data));
}
