import { existsSync, readdirSync, readFileSync } from 'fs';
import * as Path from 'path';

main();

function main() {
	const mainVersion = JSON.parse(readFileSync(Path.resolve(__dirname, '../package.json'), 'utf8')).version;

	const packages = getSubPackages();

	for (let pkg of packages) {
		if (pkg.version !== mainVersion) {
			console.error(`Version mismatch: ${pkg.name} is ${pkg.version} but main version is ${mainVersion}`);
			process.exit(1);
		}
	}

	console.log('✔️ All versions match');
}

function getSubPackages() {
	const subPackageDirs = readdirSync(Path.resolve(__dirname, '../packages'));
	const packages = [];

	for (let dir of subPackageDirs) {
		const path = Path.resolve(__dirname, `../packages/${dir}/package.json`);

		if (!existsSync(path)) {
			continue;
		}

		const pkg = JSON.parse(readFileSync(path, 'utf8'));
		packages.push(pkg);
	}

	return packages;
}