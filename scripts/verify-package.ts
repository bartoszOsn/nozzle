import { existsSync, readdirSync, readFileSync, writeFileSync } from 'fs';
import * as Path from 'path';

interface PackageJson {
	name: string;
	version: string;
	license: string;
	author: string;
	repository: string;
}

main(process.argv[2] === '--fix');

function main(fix: boolean) {
	let failed = false;
	const validatedFields = ['version', 'license', 'author', 'repository'];

	const root = JSON.parse(readFileSync(Path.resolve(__dirname, '../package.json'), 'utf8'));

	const packages = getSubPackages();

	for (const [path, pkg] of packages) {
		for (const field of validatedFields) {
			if (root[field] !== pkg[field]) {
				console.error(`Mismatch: ${pkg.name} has ${field} ${pkg[field]} but root has ${root[field]}`);
				failed = true;
				if (fix) {
					pkg[field] = root[field];
					console.log(`Fixed ${pkg.name} ${field} to ${pkg[field]}`);
				}
			}

			if (fix) {
				const pkgPath = Path.resolve(__dirname, `../packages/${path}/package.json`);
				writeFileSync(pkgPath, JSON.stringify(pkg, null, '\t'));
			}
		}
	}

	if (failed && !fix) {
		process.exit(1);
	}

	console.log('✔️ All versions match');
}

function getSubPackages() {
	const subPackageDirs = readdirSync(Path.resolve(__dirname, '../packages'));
	const packages = new Map<string, PackageJson>();

	for (let dir of subPackageDirs) {
		const path = Path.resolve(__dirname, `../packages/${dir}/package.json`);

		if (!existsSync(path)) {
			continue;
		}

		const pkg = JSON.parse(readFileSync(path, 'utf8'));
		packages.set(dir, pkg);
	}

	return packages;
}