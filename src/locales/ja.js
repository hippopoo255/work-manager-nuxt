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
      signin: 'サインインに成功しました',
      signup:
        'ご登録いただいているメールアドレスに検証用コードを送信しました。\n数秒後に画面が切り替わりますので、検証コードと新しいパスワードを入力してください。',
      resetPassword:
        '再設定に成功しました。数秒後ログイン画面に移動しますので、ログインをお試しください',
      verify:
        '検証に成功しました。数秒後ログイン画面に移動しますので、ログインをお試しください',
      admin: '管理者アカウントを保存しました。',
    },
    error: {
      signin: 'サインインに失敗しました。',
    },
  },
  layout: {
    sidebar: {
      dashboard: 'ダッシュボード',
      user: {
        top: '一般ユーザー',
        index: '一覧',
        create: '追加',
      },
      admin: {
        top: '管理ユーザー',
        index: '一覧',
        create: '追加',
      },
      blog: {
        top: 'ブログ',
        index: '一覧',
        report: '通報',
      },
      chat: {
        top: 'チャット',
        report: '通報',
      },
      setting: {
        index: '一般',
        master: 'マスター',
        organization: '組織情報',
        top: '設定',
      },
    },
    table: {
      header: {
        user: {
          index: {
            id: 'ID',
            full_name: '氏名',
            full_name_kana: '氏名カナ',
            email: 'メールアドレス',
            email_verified_at: '検証完了日時',
            createdBy: '作成者',
            created_at: '作成日',
          },
        },
      },
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
    profile: 'プロフィール',
  },
  placeholder: {
    email: 'sample@example.com',
  },
  submit: {
    resetPassword: '送信',
    signin: 'サインイン',
    signout: 'サインアウト',
    save: '保存',
    create: '登録',
    update: '更新',
    sendVerificationCode: '検証コードを送信する',
    testSignin: 'デモユーザとして試す',
  },
  page: {
    index: {
      message: 'インデックスページです',
    },
    title: {
      admin: {
        index: '管理アカウント一覧',
        create: '管理アカウント登録',
        id: '管理アカウント詳細',
      },
      blog: {
        index: 'ブログ一覧',
        report: 'ブログ通報',
      },
      chat: {
        report: 'チャット通報',
      },
      master: {
        index: 'マスター',
      },
      organization: {
        index: '組織情報',
      },
      signin: 'サインイン',
      signup: 'サインアップ',
      setting: {
        index: '設定',
      },
      user: {
        index: '一般アカウント一覧',
        create: '一般アカウント登録',
        id: '一般アカウント詳細',
      },
      'password-forgot': 'パスワード再発行フォーム',
      'password-reset': 'パスワードリセット',
      'account-verification': 'アカウント検証',
    },
  },
}
