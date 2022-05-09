import { exec } from 'child_process';
import * as fs from 'node:fs';

// Clones all the repos under `packages/`
if (!fs.existsSync('./packages/server')) {
	exec(
		'git clone git@github.com:BetterChatApp/BetterChatServer ./packages/server'
	);
}

if (!fs.existsSync('./packages/website')) {
	exec(
		'git clone git@github.com:BetterChatApp/BetterChatWebsite ./packages/website'
	);
}

if (!fs.existsSync('./packages/extension')) {
	exec(
		'git clone git@github.com:BetterChatApp/BetterChatExtension ./packages/extension'
	);
}
