import * as path from 'path'
import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";
import tsconfigPaths from "vite-tsconfig-paths";
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import type { UserConfigFn, UserConfig } from "vite";

const defineConfig: UserConfigFn = ({ command, mode }) => {
  const config: UserConfig = {
    plugins: [
      react({
        babel: {
            parserOpts: {
              plugins: ['decorators-legacy']
            },
            plugins: [
                [
                    '@babel/plugin-transform-async-to-generator',
                    {
                        module: 'mobx',
                        method: 'flow',
                    },
                ],
            ]
          }
      }),
      tsconfigPaths(),
      legacy(),
    ],
    build: {
      outDir: 'build',
      rollupOptions: {
        output: {
          manualChunks: {
            react: ["react"],
            "react-dom": ["react-dom"],
          },
        },
      },
    },
  };
  return config;
};

export default defineConfig;
