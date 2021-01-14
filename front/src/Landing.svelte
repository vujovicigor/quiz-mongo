<script>
  import { session } from '@/store/loginStore.js'
  import { fetch2 } from '@/utils/fetch2.js'
  import Modal from '@/Modal.svelte'
  let services = []

  async function get_services(){
    let [response, error] = await fetch2('get', 'services_list', {})
    services = response.results || [] 
  }
  get_services()

  let test_service_response = false
  let selected_method, selected_sql_name
  async function test_service(method, sql_name){
    selected_method = method
    selected_sql_name = sql_name
    let [response, error] = await fetch2(method, sql_name, {})
    test_service_response = error?false:response
  } 
</script>
<div class="jumbotron jumbotron-fluid">
  <div class="container">
    <h2>thequiz Landing page</h2>
    <p>We have 2 roles/permissions: <b>Admin</b> and <b>Operator</b></p>
    <p><b>Admin</b> can read/write/insert/delete Customers and Users,<br>
    while <b>Operator</b> has only read privilegies - he can list the Customers, History and Users
    but he can't alter any record.<br>
    </p>
    <p>You are logged in as <b>{$session.rola}</b> <i>({$session.email})</i>
    </p>

    <label for="table">Available services list</label>
    <table class="table table-striped table-borderless " id="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Method</th>
          <th scope="col">Service name</th>
          <th scope="col">Allow role</th>
          <th scope="col">Input params json schema</th>
          
        </tr>
      </thead>
      <tbody>
        {#each services as {method, sql_name, params_schema, allow_role}, ix}
        <tr>
          <td >{ix+1}. 
          <button on:click={()=>{test_service(method, sql_name)}}  class="btn btn-primary">Test</button>
          </td>
          <td>{method}</td>
          <td>{sql_name}</td>
          <td>
            {#each allow_role as role}{role}<br>{/each}
          </td>
          <td><pre>{JSON.stringify(params_schema, null, 1)}</pre></td>
        </tr>
        {/each}

      </tbody>
    </table>

  </div>
</div>

{#if test_service_response}
  <Modal on:close={()=>test_service_response=false} max_width={'50rem'}>
    <h2 slot='header' style="width:100%">
      {selected_method} {selected_sql_name} response:
    </h2>  
    <pre>{JSON.stringify(test_service_response, null, 1)}</pre>
  </Modal>
{/if}

<style>
th{
  position: sticky;
  top: 0;
  background: white;
}
</style>