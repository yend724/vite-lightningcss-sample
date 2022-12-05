import browserslist from 'browserslist';
import {
  transform as CSSTransform,
  browserslistToTargets as CSSBrowserslistToTargets,
} from 'lightningcss';
import { type Plugin } from 'vite';

const cssRegex = /\.(css)$/;
// browserslistでtargetsを指定
const browserTargets = CSSBrowserslistToTargets(browserslist('>= 0.25%'));

const vitePluginLightningcss = (): Plugin => {
  return {
    // vite-plugin-*で名前をつける
    name: 'vite-plugin-lightningcss',
    // transformフックでCSSの変換処理
    transform(src, id) {
      // CSSファイルの処理
      if (cssRegex.test(id)) {
        // https://github.com/parcel-bundler/lightningcss/blob/master/node/index.d.ts
        // オプションについては上記参照
        const { code, map } = CSSTransform({
          filename: id,
          code: Buffer.from(src),
          targets: browserTargets,
          // デフォルトではnestingとcustomMediaがfalseなのでtrueにする
          drafts: {
            nesting: true,
            customMedia: true,
          },
        });

        return {
          code: code.toString(),
          map: map?.toString(),
        };
      }

      // CSSファイル以外は何も処理せず返す
      return {
        code: src,
      };
    },
  };
};

export default vitePluginLightningcss;
