import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import css from 'rollup-plugin-css-only';
import { terser } from 'rollup-plugin-terser';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/main.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/build/bundle.js'
  },
  plugins: [
    svelte({
      compilerOptions: {
        dev: !production
      }
    }),

    // Add this to extract CSS into a separate file
    css({ output: 'bundle.css' }),

    resolve({
      browser: true,
      dedupe: ['svelte']
    }),
    commonjs(),

    production && terser()
  ],
  watch: {
    clearScreen: false
  }
};