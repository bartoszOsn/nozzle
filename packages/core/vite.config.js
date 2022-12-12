/* eslint-env node */

import * as Path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
	build: {
		lib: {
			entry: Path.resolve(__dirname, 'src/index.ts'),
			name: 'core',
			fileName: 'index'
		},
		emptyOutDir: false
	}
});
