export default {
  app: {
    name: process.env.APP_NAME_JA,
  },
  tooltip: {
    theme: {
      toLight: 'ライトモードにする',
      toDark: 'ダークモードにする',
    },
  },
  alert: {
    success: {
      signin: 'インデックスページです',
      signup:
        'ご登録いただいているメールアドレスに検証用コードを送信しました。\n数秒後に画面が切り替わりますので、検証コードと新しいパスワードを入力してください。',
      resetPassword:
        '再設定に成功しました。数秒後ログイン画面に移動しますので、ログインをお試しください',
      verify:
        '検証に成功しました。数秒後ログイン画面に移動しますので、ログインをお試しください',
    },
    error: {
      signin: 'サインインに失敗しました。',
    },
  },
  layout: {
    sidebar: {
      home: 'ホーム',
      signin: 'サインイン',
      signup: 'サインアップ',
      'password-reset': 'パスワードをリセットする',
      'password-forgot': 'パスワードをお忘れの方',
    },
  },
  validation: {
    required: '{attribute}は必須です',
    pattern: '{attribute}の形式が正しくありません',
    confirmation: '{attribute}が一致しません',
    min: '{attribute}は{length}文字以上で指定してください',
    max: '{attribute}は{length}文字以下で指定してください',
  },
  attribute: {
    email: 'メールアドレス',
    login_id: 'ログインID',
    both: 'ログインIDまたはメールアドレス',
    password: 'パスワード',
    password_confirmation: 'パスワード（確認）',
    verification_code: '検証コード',
    family_name: '姓',
    family_name_kana: 'セイ',
    given_name: '名',
    given_name_kana: 'メイ',
  },
  link: {
    'password-forgot': 'パスワードをお忘れの方',
  },
  placeholder: {
    email: 'sample@example.com',
  },
  submit: {
    resetPassword: '送信',
    signin: 'サインイン',
    signout: 'サインアウト',
    save: '保存',
    store: '登録',
    update: '更新',
    sendVerificationCode: '検証コードを送信する',
    testSignin: 'デモユーザとして試す',
  },
  page: {
    index: {
      message: 'インデックスページです',
    },
    title: {
      signin: 'サインイン',
      signup: 'サインアップ',
      user: {
        create: '一般ユーザ登録',
      },
      'password-forgot': 'パスワード再発行フォーム',
      'password-reset': 'パスワードリセット',
    },
  },
}
