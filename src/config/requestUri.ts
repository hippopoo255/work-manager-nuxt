export default {
  activity: {
    index: '/activity',
  },
  current: '/current',
  blog: {
    chart: '/blog/chart',
  },
  chat: {
    chart: '/chat/chart',
  },
  minutes: {
    chart: '/meeting_record/chart',
  },
  user: {
    index: '/user',
    create: '/user',
    show: '/user/{id}',
    update: '/user/{id}',
    destroy: '/user/{id}',
    activity: '/user/{id}/activity',
  },
  admin: {
    index: '/admin',
    create: '/admin',
    show: '/admin/{id}',
    update: '/admin/{id}',
    profile: '/admin/{id}/profile',
    activity: '/admin/{id}/activity',
  },
  department: {
    index: '/department',
    create: '/department',
    update: '/department/{id}',
    destroy: '/department/{id}',
  },
  progress: {
    index: '/progress',
    create: '/progress',
    update: '/progress/{id}',
    destroy: '/progress/{id}',
  },
  meeting_room: {
    index: '/meeting_place',
    create: '/meeting_place',
    update: '/meeting_place/{id}',
    destroy: '/meeting_place/{id}',
  },
  organization: {
    update: '/organization/{id}',
  },
  prefecture: {
    index: '/prefecture',
  },
} as { [k: string]: any }
