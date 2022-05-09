import vue from '@vitejs/plugin-vue';
import { join } from 'desm';
import jsImports from 'vite-plugin-js-imports';
import WindiCSS from 'vite-plugin-windicss';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	resolve: {
		alias: {
			'~': join(import.meta.url, './src'),
			'~test': join(import.meta.url, 'test'),
		},
	},
	plugins: [vue({ reactivityTransform: true }), WindiCSS(), jsImports()],
});
