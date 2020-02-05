import {createHashRouter}  from 'franxx'
import page1 from './counter'
import page2 from './todolist'
const router = createHashRouter()
router.add('/', () => page1.elem)
router.add('/page2', () => page2.elem)
router.run()