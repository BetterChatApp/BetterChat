import { execa } from 'execa';
import { getProjectDir, preCommit } from 'lion-system';
import * as fs from 'node:fs';
import * as path from 'node:path';
export async function pmPreCommit(options) {
    if (!options.fromRoot) {
        return;
    }
    preCommit();
    // Add the changed files in all packages: https://stackoverflow.com/a/33620540
    const monorepoDir = getProjectDir(import.meta.url, { monorepoRoot: true });
    const packagesDir = path.join(monorepoDir, 'packages');
    const packageNames = fs.readdirSync(packagesDir);
    await Promise.allSettled(packageNames.map(async (packageName) => {
        const packageDir = path.join(packagesDir, packageName);
        if (!fs.existsSync(path.join(packageDir, '.git'))) {
            return;
        }
        await execa('git', ['add', '.'], { cwd: packageDir, stdio: 'inherit' });
    }));
}
