import { writable } from 'svelte/store'
//export 
function createStore(serviceName) {
  const list = writable([])
  const status = writable( { loading:false } )
  const crudMethods = {
    'list':'get',
    'insert':'post',
    'update':'patch',
    'delete':'delete'  
  }

  async function crud(operation='list', serviceName, data={}){
    let method = crudMethods[operation]
    status.set( { loading:true } )
//    let [response, error] = await fetch2(method, serviceName+'_'+operation, data)    
    let [response, error] = await fetch2(method, serviceName, data)    
    status.set( { loading:false } )
    if (error) return [response, error]
    if (operation == 'list') list.set( response.results )
    return [response, error]
  }

  async function refresh(data){
    return crud('list', serviceName, data)
  }

  async function insert(data){
    return crud('insert', serviceName, data)
  }

  async function update(data){
    return crud('update', serviceName, data)
  }

  async function remove(data){
    return crud('delete', serviceName, data)
  }

  return {
    list, status, refresh, insert, update, remove
  }
}

export default createStore
