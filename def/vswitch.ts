// like v-if-else
import { Status, StatusCallback } from './status'

export const vswitch = (status: Status, fn: StatusCallback) => {
    status.with((v) => {
        let e = fn(v)
        if (e !== temp) temp.replaceWith(e)
    })
    let temp = document.createTextNode('')
    status.must_update((v) => v)
    return temp
}
