import createStore from '@/store/createStore.js'
let {list, status, refresh, insert, update, remove} = createStore('take-a-quiz')
export {list, status, refresh, insert, update, remove}