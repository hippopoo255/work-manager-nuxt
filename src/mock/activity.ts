// import { Activity } from '@/types/ts-axios'

// type ActionType = {
//   readonly id: number
//   key: string
//   link: string
// }
// export type Activity = {
//   action_type: ActionType
//   created_at: string
//   content: string
// }

const actionTypes = {
  minutes: {
    id: 1,
    key: 'meeting_record_joined',
    link: '/mypage/meeting_record/:id',
  },
  blog_report: {
    id: 2,
    key: 'blog_report',
    link: '/mypage/meeting_record/:id',
  },
  chat_report: {
    id: 3,
    key: 'chat_report',
    link: '/mypage/meeting_record/:id',
  },
  user_create: {
    id: 4,
    key: 'user_create',
    link: '/user/:id',
  },
  admin_create: {
    id: 5,
    key: 'admin_create',
    link: '/admin/:id',
  },
  department_create: {
    id: 6,
    key: 'department_create',
    link: '/master/department',
  },
  progress_create: {
    id: 7,
    key: 'progress_create',
    link: '/master/progress',
  },
  meeting_place_create: {
    id: 8,
    key: 'meeting_place_create',
    link: '/master/meeting_room',
  },
}

export const adminActivities = [
  {
    action_type: actionTypes.department_create,
    created_at: '2022-02-23T05:30:48.000000Z',
    content: 'テスト 太郎さんが部署に「ゴルフ事業部」を追加しました',
    created_by: {
      full_name: 'テスト 太郎',
    },
  },
  {
    action_type: actionTypes.meeting_place_create,
    created_at: '2022-02-23T05:30:48.000000Z',
    content: 'テスト 太郎さんが会議室に「亀」を追加しました',
    created_by: {
      full_name: 'テスト 太郎',
    },
  },
  {
    action_type: actionTypes.progress_create,
    created_at: '2022-02-23T05:30:48.000000Z',
    content: 'テスト 太郎さんが進捗度に「差し戻し」を追加しました',
    created_by: {
      full_name: 'テスト 太郎',
    },
  },
]
export const activities = [
  {
    action_type: actionTypes.minutes,
    created_at: '2022-02-23T05:30:48.000000Z',
    title: '議事録を作成しました',
    content: '定例ミーティング',
  },
  {
    action_type: actionTypes.blog_report,
    created_at: '2022-02-23T05:30:48.000000Z',
    title: 'ブログを報告しました',
    content: '誹謗中傷誹謗中傷',
  },
  {
    action_type: actionTypes.chat_report,
    created_at: '2022-02-23T05:30:48.000000Z',
    title: 'チャットを報告しました',
    content: '誹謗中傷誹謗中傷',
  },
]
