
<script>
  import Table from '@/Table.svelte'
  import User from '@/User.svelte'
  import Toast from '@/utils/toast.js'
  import { list, refresh }from '@/store/userStore.js'
  refresh()
  let showModal = false
  const toast = new Toast()    
  export let selectedRow = {}
  function addNew(){
    selectedRow = { user_uuid:null, email:null, name_first:null, name_last:null, rola:'ADMIN', pass:null}
    showModal=true
  }
</script>

<h1 class="p-2 text-center">Users List</h1>  
	<div style="display:flex; align-items: center;justify-content: flex-end;">
    <button on:click={addNew} id="addUser" class="btn btn-primary" style="white-space: nowrap">Add User</button>
	</div>
<div style="display:flex; flex-flow:column;overflow: auto;flex: 1;">
  <div class="table-parent">
    <Table>
      <thead slot="thead">
        <tr>
          <th class="th-sm">#</th>
          <th class="th-sm">email</th>
          <th class="th-sm">Name</th>
          <th class="th-sm">Role</th>
        </tr>        
      </thead>
      {#each $list as row, ix}
        <tr on:click={()=>{ selectedRow = {...row}; showModal=true}} >
          <td>{ix+1}.</td>
          <td>{row.email}</td>
          <td>{row.name_first} {row.name_last}</td>
          <td>{row.rola}</td>
        </tr>
      {:else}
      <tr>
        <td colspan="4"><center><i>No data</i></center></td>
      </tr>
      {/each}
    </Table>
  </div>
</div>

{#if showModal}
  <User bind:show={showModal} bind:selectedRow></User>
{/if}

<style>
.table-parent{
  height: 100%;
  overflow:auto; 
  border-top: solid 1px #dee2e6;
}
</style>