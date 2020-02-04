import { createHashHistory } from 'history'
import { Router } from './router'

export interface HashRouterOptions {
  /**
   * The base URL of the app.
   */
  base?: string
}

export const createHashRouter = (router_view,options: HashRouterOptions = {}) => {
  const history = createHashHistory({ basename: options.base })
  return new Router(history, router_view)
}
