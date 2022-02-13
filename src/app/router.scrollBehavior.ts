import { Route } from 'vue-router/types/router'
type Position = { x: number; y: number }

export default function (
  _to: Route,
  _from: Route,
  _savedPosition: Position | void
) {
  return { x: 0, y: 0 }
}
