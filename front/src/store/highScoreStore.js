import createStore from '@/store/createStore.js'
let {list, status, refresh, insert, update, remove} = createStore('high-score')
export {list, status, refresh, insert, update, remove}