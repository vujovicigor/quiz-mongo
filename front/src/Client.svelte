<script>
  import Modal from '@/Modal.svelte'
  import { getContext } from 'svelte';
  import Toast from '@/utils/toast.js'
  import shallowEqual from '@/utils/shallowEqual.js'
  import ClientHistory from '@/ClientHistory.svelte'
  const toast = new Toast()  
  const refresh = getContext('refresh');
  let busy = false
  export let show
  let showClientHistory = false
  export let selectedRow = {}
  let clonedSelectedRow = { ...selectedRow }
  $: disabled = shallowEqual(clonedSelectedRow, selectedRow)
  
  async function save(){
    busy = true
    let method = selectedRow.customer_uuid?'patch':'post'
    let service = selectedRow.customer_uuid?'client_update':'client_insert'
    let [response, error] = await fetch2(method, service, selectedRow)
    busy = false
    if (error) return 
    refresh(true)
    toast.success('Record saved')
    show = false
  }
  
  async function deleteClient(){
    busy = true
    let [response, error] = await fetch2('delete', 'client_delete', {customer_uuid:selectedRow.customer_uuid})
    busy = false
    if (error) return 
    refresh(true)
    toast.success('Record removed')
    show = false
  }
</script>

<Modal on:close={()=>show=false}>
  <h2 slot='header' style="width:100%">
    Customer details
    <!--
    <button class="btn btn-small" style="color:red; position:absolute; right:2rem">Tour?</button>
    -->
  </h2>

  <form>
    <div class="d-flex" style="justify-content: space-between;">
      <div class="form-group">
        <label style="display:block">Email address
          <input type="email" class="form-control" bind:value={selectedRow.email} >
        </label>
      </div>
      <div class="form-group">
        <label style="display:block">Phone
          <input type="telephone" class="form-control" bind:value={selectedRow.phone} >
        </label>
      </div>
    </div>
    <div class="d-flex" style="justify-content: space-between;">
      <div class="form-group">
        <label style="display:block">First name
          <input type="text" class="form-control" bind:value={selectedRow.name_first} >
        </label>
      </div>
      <div class="form-group">
        <label style="display:block">Last name
          <input type="text" class="form-control" bind:value={selectedRow.name_last} >
        </label>
      </div>
    </div>

    <div class="form-group">
      <label style="display:block">Street
        <input type="text" class="form-control" bind:value={selectedRow.addr_street} >
      </label>
    </div>
    <div class="form-group">
      <label style="display:block">City
        <input type="text" class="form-control" bind:value={selectedRow.addr_city} >
      </label>
    </div>
    <div class="form-group">
      <label style="display:block">Country
        <input type="text" class="form-control" bind:value={selectedRow.addr_country} >
      </label>
    </div>
    <div class="form-group">
      <label style="display:block">Post code
        <input type="text" class="form-control" bind:value={selectedRow.addr_post_code} >
      </label>
    </div>
    
    <div class="form-group form-check">
      <input type="checkbox" class="form-check-input" id="active" bind:checked={selectedRow.is_active}>
      <label class="form-check-label" for="active">Active</label>
    </div>
  </form>

  <h2 slot='footer' class="d-flex justify-content-between px-3">
    <div>
      <button class="btn" on:click={()=>{ show=false }}>Cancel</button>
      <button class="btn" on:click={()=>{ showClientHistory=true }}>Show history</button>
      <button disabled={!selectedRow.customer_uuid || busy} class="btn btn-warning" on:click={deleteClient}>Delete</button>
    </div>
    <button disabled={disabled || busy} on:click={save} class="btn btn-primary">Save</button>
  </h2>    
</Modal>

{#if showClientHistory}
<ClientHistory  bind:show={showClientHistory} {selectedRow}></ClientHistory>
{/if}