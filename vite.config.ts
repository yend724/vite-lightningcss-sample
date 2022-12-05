import { defineConfig } from 'vite';
import vitePluginLightningcss from './plugins/vite-plugin-lightningcss';

export default defineConfig({
  // 作成したプラグインを読み込む
  plugins: [vitePluginLightningcss()],
});
