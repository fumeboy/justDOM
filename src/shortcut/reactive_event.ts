export let reactive_event = (k:keyof HTMLElementEventMap,fn) => {
    let old;
    return (v,e) => {
        let event = fn(v)
        if(event!==old){
            e.elem.removeEventListener(k, old)
            e.elem.addEventListener(k, event)
            old = event
        }
    }
}