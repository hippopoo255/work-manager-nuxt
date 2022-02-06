// ブラウザの言語設定を検出するか
const detectBrowserLanguage = [
  // 検出した言語設定をクッキーに保存する
  {
    useCookie: true,
    // keyは任意に決められる
    cookieKey: 'i18n_redirected',
  },
  // クッキーには保存せず毎回検出したいとき
  {
    useCookie: false,
  },
  // ブラウザの設定を検出しない
  false,
]

const locales = {
  // 使用する言語
  locales: [
    { code: 'ja', name: 'Japanese', iso: 'ja_JP', file: 'ja.js' },
    { code: 'en', name: 'English', iso: 'en-US', file: 'en.js' },
    // ...
  ],
  // デフォルトの言語
  defaultLocale: 'ja',
  // 翻訳ファイルのディレクトリパス
  langDir: 'locales/',
  // デフォルト以外の言語ならURLにプレフィックスを追加する
  strategy: 'prefix_except_default',
  vueI18n: {
    // 翻訳ファイルが見つからなかった場合はja
    fallbackLocale: 'ja',
  },
  // Vuetifyのthemeに応じた<style>タグをバグらせるらしいのでfalse
  // あとからi18nの設定をdefault.vueでマージする
  seo: true,
  // SFCで<i18n>タグを使うか
  vueI18nLoader: false,
  // 遅延読み込みの有効化
  lazy: true,
  // 0: ブラウザの言語設定をクッキーに保存
  // 1: クッキーに保存せず毎回検出
  // 2: ブラウザの言語を検出してほしくない
  detectBrowserLanguage: detectBrowserLanguage[0],
}

export default locales
