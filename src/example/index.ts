import {router}  from '@c/@page/router'
import page1 from './counter'
import page2 from './todolist'
router.add('/', () => page1.elem)
router.add('/page2', () => page2.elem)
router.run()