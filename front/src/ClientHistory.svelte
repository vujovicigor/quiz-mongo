
<script>
  import Modal from '@/Modal.svelte'
  import Table from '@/Table.svelte'
  import Toast from '@/utils/toast.js'
  const toast = new Toast()    
  export let show
  export let selectedRow = {}
  let nice_names = { 
    name_first:"First name", 
    name_last:"Last name", 
    phone:"Phone", 
    addr_street:"Street", 
    addr_post_code:"Postal code", 
    addr_city:"City", 
    addr_country:"Country", 
    is_active:"Active" 
  }
  
  let list = []
  fetch2('get', 'client_history', {customer_uuid:selectedRow.customer_uuid})
  .then(([response, error])=>{
    if (error){ toast.error('Error!'); return }
    list = response.results
  })    
</script>

<Modal max_width={'50rem'} height={'30rem'} on:close={()=>show=false}>
  <h2 slot='header'>
    {selectedRow.name_first} {selectedRow.name_last} history
  </h2>

	<div class="table-parent">
		<Table>
      <thead slot="thead">
        <tr>
          <th class="th-sm sorting">Timestamp</th>
          <th class="th-sm">Key</th>
          <th class="th-sm">Changed from</th>
          <th class="th-sm">Changed to</th>
        </tr>        
      </thead>
      {#each list as row}
        {#each Object.entries(row.src) as [key, val]}
          <tr>
            <td>
              {new Intl.DateTimeFormat('de-DE',{weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' , hour: 'numeric', minute: 'numeric', second: 'numeric'}).format(new Date(row.ts))}
            </td>
            <td>{nice_names[key] || key}</td>
            <td>{val}</td>
            <td>{row.dest[key]}</td>
          </tr>
        {/each}
        {:else}
        <tr>
          <td colspan="4"><center><i>No data</i></center></td>
        </tr>
      {/each}
    </Table>
	</div>
</Modal>

<style>
.table-parent{
  height: 100%;
  overflow:auto; 
  border-top: solid 1px #dee2e6;
}
</style>