import { writable, derived } from 'svelte/store'

const getLocalStorageItem = (key) => JSON.parse(localStorage.getItem(key))
const setLocalStorageItem = (key, value) => localStorage.setItem(key, JSON.stringify(value))

let loginLocalStorage = getLocalStorageItem('login') || { isLogedIn:false, token:null }
export const session = writable(loginLocalStorage)

// save store to localstorage on change
session.subscribe( $session=>{
  if (!$session) return
  if ( $session.isLogedIn) setLocalStorageItem('login', $session)
  if (!$session.isLogedIn) setLocalStorageItem('login', { isLogedIn:false, token:null })
})
