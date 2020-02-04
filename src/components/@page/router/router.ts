import regexparam from 'regexparam'
import { History, Location as HistoryLocation } from 'history'
import {
  getParams,
  pathToLocation,
  LooseLocation,
  locationToPath
} from './utils'

export type path_fn = (...args) => string
export interface Route {
  path: string
  handler: RouteHandler
  pattern: RegExp
  keys: string[]
}

export interface ResolvedRoute {
  /** Full path */
  readonly path: string
  /** Path name only, excluding search and query */
  readonly pathname: string
  /** Route parameters */
  readonly params: {
    [k: string]: any
  }
  /** Parsed `location.search` */
  readonly query: {
    [k: string]: any
  }
  /** Original `location.search`  */
  readonly search: string
  /** An empty string or a string starting with `#` */
  readonly hash: string
  /** Matched route definition */
  readonly route: Route
}

export type RouteHandler = (currentRoute: ResolvedRoute) => void | Element

/**
 * - `string|LooseLocation` Navigate to another route
 * - `true|undefined` Continue to next hook
 * - `Error` Abort the navigate and pass the error to callbacks registered via `router.onError()`
 * - `false` Abort the navigation
 */
export class Router {
  public routes: Route[]
  private currentLocation: HistoryLocation

  constructor(public history: History, private router_view: Element) {
    this.currentLocation = history.location
    this.routes = []

    this.history.listen(() => {
      // const from = this.resolveFromCurrentLocation()
      this.currentLocation = this.history.location
      const to = this.resolveFromCurrentLocation()
      if(!to){
        this.back()
      }else{
        this.run(to)
      }
    })
  }

  go(n: number) {
    this.history.go(n)
  }

  forward() {
    this.history.goForward()
  }

  back() {
    this.history.goBack()
  }

  push(path: string | LooseLocation) {
    this.history.push(locationToPath(path))
  }

  /** Add a route handle */
  add(path: string, handler: RouteHandler) : path_fn {
    const { pattern, keys } = regexparam(path)
    this.routes.push({ path, handler, pattern, keys })
    return (...args) => {
      return [path, ...args].join('/')
    }
  }
  /** Remove a route handler */
  remove(path: string) {
    this.routes = this.routes.filter(route => route.path !== path)
  }

  /**
   * Run matched route handler
   */
  run(to?) {
    if(!to){
      to = this.currentRoute
    }
    let e = to!.route.handler(to!)
    if(e instanceof Element){
      this.router_view.replaceWith(e)
      this.router_view = e
    }
  }

  /** Find a route that matches give path */
  resolve(path: string | LooseLocation): ResolvedRoute | null {
    const location = pathToLocation(path)
    for (const route of this.routes) {
      const params = getParams(location.pathname, route.pattern, route.keys)
      if (params) {
        return {
          params,
          path: location.pathname,
          pathname: location.pathname,
          search: location.search,
          query: location.query,
          hash: location.hash,
          route
        }
      }
    }
    return null
  }

  private resolveFromCurrentLocation() {
    return this.resolve({
      pathname: this.currentLocation.pathname,
      query: this.currentLocation.search,
      hash: this.currentLocation.hash
    })
  }

  /** Get the route that matches current path */
  get currentRoute(): ResolvedRoute | null {
    return this.resolveFromCurrentLocation()
  }
}
