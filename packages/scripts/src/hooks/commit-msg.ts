import { execa } from 'execa';
import { commitMsg, getProjectDir } from 'lion-system';
import * as fs from 'node:fs';
import * as path from 'node:path';
import process from 'node:process';

commitMsg();

// Also make the commit in all the sub-packages
// This is a `commit-msg` hook because it's the only hook where we get access to the commit message

const monorepoDir = getProjectDir(import.meta.url, { monorepoRoot: true });
const packagesDir = path.join(monorepoDir, 'packages');

const packageNames = fs.readdirSync(packagesDir);

const commitMessage = process.argv.at(-1)!;

await Promise.allSettled(
	packageNames.map(async (packageName) => {
		const packageDir = path.join(packagesDir, packageName);
		await execa(
			'git',
			['commit', '-m', fs.readFileSync(commitMessage, 'utf8'), '--no-verify'],
			{ cwd: packageDir, stdio: 'inherit' }
		);
	})
);
