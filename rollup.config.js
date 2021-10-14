import { babel } from '@rollup/plugin-babel';
import multiEntry from '@rollup/plugin-multi-entry';
import typescript from '@rollup/plugin-typescript';
import url from 'rollup-plugin-url'

const config = {
  input: 'src/**/*.ts',
  output: {
    dir: 'build',
    format: 'iife',
    name: 'bundle'
  },
  plugins: [
    babel({ babelHelpers: 'bundled' }),
    multiEntry(),
    typescript(),
    url({
      include: ['**/*.css'],
      limit: Infinity,
      publicPath: '/public'
    })
  ]
};

export default config;
