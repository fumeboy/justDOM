export let reactive_class = (fn) => {
    let old;
    return (v,e) => {
        let classes = e.elem.classList,
            cls = fn(v)
        if(cls!==old){
            if(old)classes.remove(old)
            if(cls)classes.add(cls)
            old = cls
        }
    }
}