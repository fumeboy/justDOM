import { createBrowserHistory } from 'history'
import { Router } from './router'

export interface BrowserRouterOptions {
  /**
   * The base URL of the app.
   */
  base?: string
}

export const createBrowserRouter = (router_view, options: BrowserRouterOptions = {}) => {
  const history = createBrowserHistory({
    basename: options.base
  })
  return new Router(history, router_view)
}
