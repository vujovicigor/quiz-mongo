import createStore from '@/store/createStore.js'
let {list, status, refresh, insert, update, remove} = createStore('user')
export {list, status, refresh, insert, update, remove}