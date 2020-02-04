import { createMemoryHistory } from 'history'
import { Router } from './router'

export const createMemoryRouter = (router_view) => {
  const history = createMemoryHistory()
  return new Router(history, router_view)
}
