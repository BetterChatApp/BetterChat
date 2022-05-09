import { execa } from 'execa';
import { commitMsg, getProjectDir } from 'lion-system';
import * as fs from 'node:fs';
import * as path from 'node:path';
import process from 'node:process';

import type { PseudoMonorepoHookOptions } from '../types/options.js';

export async function pmCommitMsg(options: PseudoMonorepoHookOptions) {
	if (!options.fromRoot) {
		return;
	}

	commitMsg();

	// Also make the commit in all the sub-packages
	// This is a `commit-msg` hook because it's the only hook where we get access to the commit message

	const monorepoDir = getProjectDir(import.meta.url, { monorepoRoot: true });
	const packagesDir = path.join(monorepoDir, 'packages');

	const packageNames = fs.readdirSync(packagesDir);

	const commitMessageFile = process.argv.at(-1)!;
	const commitMessage = fs.readFileSync(
		path.join(monorepoDir, commitMessageFile),
		'utf8'
	);

	await Promise.allSettled(
		packageNames.map(async (packageName) => {
			const packageDir = path.join(packagesDir, packageName);
			if (!fs.existsSync(path.join(packageDir, '.git'))) {
				return;
			}

			await execa('git', ['commit', '-m', commitMessage], {
				cwd: packageDir,
				stdio: 'inherit',
			});
		})
	);
}
