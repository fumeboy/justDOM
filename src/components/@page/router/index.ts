import { createHashRouter } from './hash-router'
export * from './link'
let router_view: any = document.createTextNode('')
export const router = createHashRouter(router_view)
document.body.appendChild(router_view)