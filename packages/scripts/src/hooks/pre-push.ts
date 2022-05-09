import { execa } from 'execa';
import { getProjectDir, prePush } from 'lion-system';
import * as fs from 'node:fs';
import * as path from 'node:path';

prePush();

// Execute `git push` in all package directories

const monorepoDir = getProjectDir(import.meta.url, { monorepoRoot: true });
const packagesDir = path.join(monorepoDir, 'packages');

const packageNames = fs.readdirSync(packagesDir);

await Promise.allSettled(
	packageNames.map(async (packageName) => {
		const packageDir = path.join(packagesDir, packageName);

		if (!fs.existsSync(path.join(packageDir, '.git'))) {
			return;
		}

		await execa('git', ['push'], {
			cwd: packageDir,
			stdio: 'inherit',
		});
	})
);
