import createStore from '@/store/createStore.js'
let {list, status, refresh, insert, update, remove} = createStore('quiz-admin')
export {list, status, refresh, insert, update, remove}