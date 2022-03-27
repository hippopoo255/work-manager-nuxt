export default {
  app: {
    name: process.env.APP_NAME_JA,
    locale: '言語',
    theme: 'テーマ',
    activity: {
      empty: 'アクティビティはありません',
    },
  },
  tooltip: {
    theme: {
      toLight: 'ライトモードにする',
      toDark: 'ダークモードにする',
    },
    edit: '編集',
    trash: {
      disabled: '削除できません',
      hasChildren: '関連付いたリソースが存在するため削除できません',
    },
  },
  alert: {
    modal: {
      invite: 'このユーザは既に管理者として登録されています。',
    },
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
      organization: '組織情報を保存しました。',
      profile: 'プロフィールを更新しました。',
      save: 'データを保存しました',
      delete: 'データを削除しました。',
    },
    error: {
      signin: 'サインインに失敗しました。',
      signup: 'サインアップに失敗しました。',
      unauthorized: 'サインインしてください',
      forbidden: '権限のない操作が行われました',
      notfound: 'データがありません',
      cognito: {
        UserNotFoundException: 'アカウントが存在しません',
        NotAuthorizedException:
          'ユーザー名またはパスワードが異なるか、無効化されています',
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
  confirm: {
    delete: '一度削除すると元に戻せません。削除してよろしいですか？',
    invite: 'このユーザーにメールが送信されます。管理システムに招待しますか？',
  },
  breadcrumb: {
    dashboard: 'ダッシュボード',
    user: {
      create: '一般アカウント登録',
      edit: '更新',
      id: '{id}',
      index: '一般アカウント一覧',
    },
    admin: {
      create: '管理者アカウント登録',
      id: '{id}',
      index: '管理者アカウント一覧',
    },
    blog: {
      index: 'ブログ一覧',
      report: 'ブログ報告',
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
      report: 'チャット報告',
    },
    master: {
      index: 'マスター',
      meeting_room: {
        index: '会議室',
      },
      progress: {
        index: '進捗度',
      },
      department: {
        index: '部署',
      },
    },
    organization: {
      index: '組織情報',
    },
    profile: {
      index: 'プロフィール',
    },
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
    userDetail: {
      activity: 'アクティビティ',
      base: '基本情報',
      score: 'スコア',
    },
    adminDetail: {
      activity: 'アクティビティ',
      base: '基本情報',
    },
  },
  unit: {
    default: '件',
  },
  card: {
    title: {
      activity: 'アクティビティ',
      minutes: '議事録',
      chat: 'チャット',
      chatPerPost: '書き込みごとの報告件数',
      chatPerUser: 'ユーザー別累計',
      reportCount: '報告を受けた件数',
      minutesCount: '議事録の作成件数',
      sub: {
        chat: '（チャット）',
      },
    },
  },
  chart: {
    label: {
      minutes: '作成件数',
      chat: '報告件数',
      chatPerPost: '報告された件数',
      chatPerUser: '報告された件数',
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
        report: '報告',
      },
      chat: {
        top: 'チャット',
        report: '報告',
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
        actions: '操作',
        chat_report: {
          index: {
            id: 'ID',
            roomName: 'ルーム名',
            messageId: '投稿ID',
            messageBody: '投稿文',
            writtenBy: '投稿者',
            createdBy: '報告者',
            reportCategory: '報告理由',
            count: '報告件数',
          },
        },
        user: {
          index: {
            id: 'ID',
            full_name: '氏名',
            full_name_kana: '氏名カナ',
            department: '部署',
            email: 'メールアドレス',
            email_verified_at: '検証完了日時',
            createdBy: '作成者',
            created_at: '作成日',
          },
        },
        admin: {
          index: {
            id: 'ID',
            full_name: '氏名',
            full_name_kana: '氏名カナ',
            department: '部署',
            email: 'メールアドレス',
            email_verified_at: '検証完了日時',
            createdBy: '作成者',
            created_at: '作成日',
          },
        },
        department: {
          index: {
            id: 'ID',
            department_code: '部署コード',
            name: '部署名',
            color: 'カラー',
            createdBy: '作成者',
            created_at: '作成日',
          },
        },
        progress: {
          index: {
            id: 'ID',
            name: '進捗度',
            value: '達成値',
            createdBy: '作成者',
            created_at: '作成日',
          },
        },
        meeting_room: {
          index: {
            id: 'ID',
            name: '会議室名',
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
    minNum: '{attribute}は{length}以上で指定してください',
    maxNum: '{attribute}は{length}以下で指定してください',
    imageSize: '{attribute}は{size}MB以下を指定してください',
  },
  attribute: {
    both: 'ログインIDまたはメールアドレス',
    email: 'メールアドレス',
    login_id: 'ログインID',
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
    department_code: '部署コード',
    department_id: '部署',
    color: 'カラー',
    name: {
      department: '部署名',
      progress: '進捗度の名前',
      meeting_room: '会議室名',
    },
    value: {
      progress: '達成値',
    },
    organization: {
      name: '組織名',
      name_kana: '組織名カナ',
      postal_code: '郵便番号',
      pref_id: '都道府県',
      city: '市区町村',
      address: '住所',
      tel: '電話番号',
    },
  },
  link: {
    password: {
      forgot: 'パスワードをお忘れの方',
    },
    profile: 'プロフィール',
    moreLink: 'もっと見る',
    edit: {
      profile: '基本情報を編集する',
    },
  },
  placeholder: {
    email: 'sample@example.com',
    department_code: '半角英数字',
  },
  status: {
    inviteAdmin: '管理システムに招待済み',
    isDefault: '初期値',
  },
  submit: {
    address: '住所検索',
    changePassword: 'パスワード変更',
    clearUpload: '画像をクリア',
    create: '登録',
    delete: '削除',
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
    upload: '画像をアップロード',
  },
  page: {
    index: {
      message: 'インデックスページです',
    },
    title: {
      admin: {
        index: '管理者アカウント一覧',
        create: '管理者アカウント登録',
        id: '管理者アカウント詳細',
        edit: '管理者アカウント編集',
        activity: 'アクティビティ',
        profile: 'プロフィール',
      },
      blog: {
        index: 'ブログ一覧',
        report: 'ブログ報告',
      },
      chat: {
        index: 'チャット一覧',
        report: 'チャット報告',
      },
      master: {
        index: 'マスター',
        meeting_room: '会議室マスター',
        department: '部署マスター',
        progress: 'タスク進捗度マスター',
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
        edit: '一般アカウント編集',
        activity: 'アクティビティ',
        profile: 'プロフィール',
      },
      password: {
        forgot: 'パスワード再発行フォーム',
        reset: 'パスワードリセット',
      },
      account_verification: 'アカウント検証',
    },
  },
}
