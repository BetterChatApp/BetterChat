import onetime from 'onetime';
import type { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';

export const getSocket: () => Socket = onetime(() =>
	io('http://localhost:5000')
);
