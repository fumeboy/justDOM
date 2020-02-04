import { Status } from '@d/status'

export let reactive_text = (s: Status, fn?) => {
    let text = document.createTextNode(fn?fn(s.get()):s.get()+'')
    if (fn) s.with((v) => (text.data = fn(v)))
    else s.with((v) => (text.data = v))
    return text
}
