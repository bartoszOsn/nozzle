import { defineConfig } from 'vite';
import * as Path from 'path';
import dtsPlugin from 'vite-plugin-dts';

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