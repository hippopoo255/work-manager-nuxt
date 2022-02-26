export default {
  app: {
    name: process.env.APP_NAME_JA,
    locale: '言語',
    theme: 'テーマ',
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
        'ご入力いただいたメールアドレスに検証用コードを送信しました。\n数秒後に画面が切り替わりますので、検証コードと新しいパスワードを入力してください。',
      forgotPassword:
        'ご入力いただいたメールアドレスに検証用コードを送信しました。\n数秒後に画面が切り替わりますので、検証コードと新しいパスワードを入力してください。',
      resetPassword:
        '再設定に成功しました。数秒後ログイン画面に移動しますので、ログインをお試しください',
      verify:
        '検証に成功しました。数秒後ログイン画面に移動しますので、ログインをお試しください',
      admin:
        '管理者アカウントを保存しました。\n相手の方には初期設定のご案内メールが送信されます',
      user: 'ユーザーアカウントを保存しました。',
      profile: 'プロフィールを更新しました。',
    },
    error: {
      signin: 'サインインに失敗しました。',
      signup: 'サインアップに失敗しました。',
      cognito: {
        UserNotFoundException: 'アカウントが存在しません',
        NotAuthorizedException: 'ユーザー名またはパスワードが違います',
        UserNotConfirmedException: 'アカウントの検証が完了していません',
        UsernameExistsException: '同じ名前のユーザーが既に登録されています',
        CodeMismatchException: '検証コードに誤りがあります',
        InvalidParameterException: '入力項目が正しくありません',
        InvalidPasswordException: 'パスワードの形式が正しくありません',
        LimitExceededException:
          'パスワードが試行回数を超えました。しばらくしてからもう一度お試しください',
        PasswordResetRequiredException:
          'パスワードリセットが必要なアカウントです',
        ExpiredCodeException:
          '既に検証済みのアカウントか、有効期限切れの可能性があります',
        default: '検証に失敗しました',
      },
    },
  },
  breadcrumb: {
    dashboard: 'ダッシュボード',
    user: {
      id: '{id}',
      index: '一般アカウント一覧',
      create: '一般アカウント登録',
    },
    admin: {
      id: '{id}',
      index: '管理アカウント一覧',
      create: '管理アカウント登録',
    },
    blog: {
      index: 'ブログ一覧',
      report: 'ブログ通報',
      id: {
        index: '{id}',
        comment: {
          index: 'コメント一覧',
          commentId: '{commentId}',
        },
      },
    },
    chat: {
      index: 'チャット一覧',
      report: 'チャット通報',
    },
    master: {
      index: 'マスター',
    },
    organization: {
      index: '組織情報',
    },
    profile: 'プロフィール',
    setting: {
      index: '設定',
      common: '一般',
      password: 'パスワード変更',
      notification: '通知設定',
    },
    signin: 'サインイン',
    signup: 'アカウントセットアップ',
    password: {
      forgot: 'パスワード再発行フォーム',
      reset: 'パスワードリセットフォーム',
    },
    account_verification: 'アカウント検証',
  },
  tab: {
    setting: {
      common: '一般',
      notification: '通知',
      changePassword: 'パスワード',
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
    imageSize: '{attribute}は{size}MB以下を指定してください',
  },
  attribute: {
    email: 'メールアドレス',
    login_id: 'ログインID',
    both: 'ログインIDまたはメールアドレス',
    old_password: '現在のパスワード',
    password: 'パスワード',
    password_confirmation: 'パスワード（確認）',
    new_password: '新しいパスワード',
    new_password_confirmation: '新しいパスワード（確認）',
    verification_code: '検証コード',
    family_name: '姓',
    family_name_kana: 'セイ',
    given_name: '名',
    given_name_kana: 'メイ',
    image: '画像',
  },
  link: {
    password: {
      forgot: 'パスワードをお忘れの方',
    },
    profile: 'プロフィール',
  },
  placeholder: {
    email: 'sample@example.com',
  },
  status: {
    inviteAdmin: '管理システムに招待済み',
  },
  submit: {
    create: '登録',
    inviteAdmin: '管理システムに招待する',
    resetPassword: '送信',
    save: '保存',
    sendVerificationCode: '検証コードを送信する',
    signin: 'サインイン',
    signout: 'サインアウト',
    signup: 'アカウント作成',
    theme: 'ダークモードにする',
    testSignin: 'デモユーザとして試す',
    update: '更新',
    changePassword: 'パスワード変更',
    upload: '画像をアップロード',
    clearUpload: '画像をクリア',
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
        index: 'チャット一覧',
        report: 'チャット通報',
      },
      master: {
        index: 'マスター',
      },
      organization: {
        index: '組織情報',
      },
      profile: 'プロフィール',
      setting: {
        index: '設定',
        common: '一般',
        password: 'パスワード変更',
        notification: '通知設定',
      },
      signin: 'サインイン',
      signup: 'アカウントセットアップ',
      user: {
        index: '一般アカウント一覧',
        create: '一般アカウント登録',
        id: '一般アカウント詳細',
      },
      password: {
        forgot: 'パスワード再発行フォーム',
        reset: 'パスワードリセット',
      },
      account_verification: 'アカウント検証',
    },
  },
}
