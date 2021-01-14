<script>
  import Table from '@/Table.svelte'
  import { fetch2 } from '@/utils/fetch2.js'
  import { writable } from 'svelte/store'
  import { fade , fly} from 'svelte/transition';
  import { tick} from 'svelte';
  import Client from '@/Client.svelte'
	import { setContext } from 'svelte';

  setContext('refresh', refresh);  
  let showModal = false
  let selectedRow = {}
  let loading = false
  let last_page = 0
  let params = writable({
    sort:'name_first_asc',
    page:1,
    addr_city:null,
    show_all:true
  })
  let countries_list = []
  let cities_list = []
  let list = []
  let info = {}
  
  async function refresh(refreshcountriesToo=false){
    if ( loading ) return
    loading = true
    let [response, error] = await fetch2('get', 'clients_list', $params)
    if (error) { loading = false; return }
    ( {list, info} = response.results )
    tick().then(()=>{ last_page = $params.page })
    loading = false
    if ($params.page !== 1 && $params.page > info.total_pages_count)
      $params.page = info.total_pages_count  
    console.log('refreshcountriesToo',refreshcountriesToo)
    if (refreshcountriesToo) refreshcountries()
  }

  function refreshcountries(){
    fetch2('get', 'countries_list', null)
    .then(([response, error])=>{
      if (response)
        countries_list = response.results 
    })
    fetch2('get', 'cities_list', null)
    .then(([response, error])=>{
      if (response)
        cities_list = response.results 
    })    
  }
  setTimeout(refreshcountries, 1500)

  params.subscribe( ()=> refresh() ) //$p=>{
  
  function addNew(){
    selectedRow = { customer_uuid:null, email:null, name_first:null, name_last:null, phone:null, addr_street:null, addr_post_code:null, addr_city:null, addr_country:null, is_active:true }
    showModal=true
  }
</script>
<h1 class="p-2 text-center">Clients List</h1>  
<div style="display:flex; flex-flow:column;overflow: auto;flex: 1;">
  <div>
    <label for="sortClients">Sort by</label>
    <select id="sortClients" bind:value={$params.sort} class="form-control form-control-sm" style="width:12rem; display:inline-block;margin-left: 0.5rem;">
      <option value="name_first_asc">First Name (ascending)</option>
      <option value="name_first_desc">First Name (descending)</option>
      <option value="name_last_asc">Last Name (ascending)</option>
      <option value="name_last_desc">Last Name (descending)</option>
    </select>
  </div>
	<div style="display:flex; align-items: center;justify-content: space-between;">
    <label id="filters">Filter by
      <input placeholder="Last name" bind:value={$params.name_last} type="search" class="filter form-control form-control-sm ml-1" >
      <input list="countries" id="countryFilter" placeholder="Country" bind:value={$params.addr_country} type="search" class="filter form-control form-control-sm" >
      <datalist id="countries">
        {#each countries_list as country}
          <option value="{country}">
        {/each}
      </datalist>    
      <input list="cities" id="cityFilter" placeholder="City" bind:value={$params.addr_city} type="search" class="filter form-control form-control-sm" >
      <datalist id="cities">
        {#each cities_list as city}
          <option value="{city}">
        {/each}
      </datalist>    
      <input placeholder="Postal" bind:value={$params.addr_post_code} type="search" class="filter form-control form-control-sm" >
      <div class="form-check" style="display: inline-block;">
        <input type="checkbox" bind:checked={$params.show_all} class="form-check-input" id="show_all">
        <label class="form-check-label" for="show_all">Include deactivated</label>    
      </div>  
    </label>
    <button on:click={addNew} id="addCustomer" class="btn" style="white-space: nowrap">Add New</button>
	</div>
	<div class="table-parent" id="customersList">
		<Table>
      <thead slot="thead">
        <tr>
          <th class="th-sm" style="width: 3rem;text-align: right;">#</th>
          <th class="th-sm sorting sorting_{$params.sort.endsWith('_desc')?'desc':'asc'}" style="width: 40%">Name/email/phone</th>
          <th class="th-sm">Address/post code</th>
          <th class="th-sm" style="width: 4rem">Active</th>
        </tr>        
      </thead>
      {#if true || !loading}
        {#each list as row, i (row.customer_uuid)}
          <tr in:fly="{{delay: i*60, duration: 100,  x: 90*Math.sign($params.page - last_page), y:Math.sign($params.page - last_page)===0?30:0, opacity: 0}}"
            on:click={()=>{ selectedRow = {...row}; showModal=true}} 
            class:table-active={selectedRow.customer_uuid == row.customer_uuid} >
            <td style="text-align: right;">{i+1+($params.page-1) * 10}.
            </td>
            <td ><b>{row.name_last} {row.name_first}</b><br>
              <i>{row.email}</i><br>
              <i>{row.phone}</i>
            </td>

            <td>
              {row.addr_street}<br> 
              {row.addr_city}, 
              {#if row.addr_country}{row.addr_country}{/if} <br>
              {#if row.addr_post_code}
                Post code: <i>{row.addr_post_code}</i>
              {/if}
            </td>

            <td>
                <span style="color:{row.is_active?'green':'red'}">{@html row.is_active?'&#10004':'&#10006'}</span>
            </td>
          </tr>
        {/each}
        {/if}
    </Table>
	</div>
	<nav>
		<ul class="pagination justify-content-between pt-2 align-items-center">
			<span style="font-weight:bold">Showing {1+($params.page-1) * 10} to {($params.page-1) * 10 + list.length} of {info.total_item_count} entries</span>
			<div class="d-flex">
				<li class="page-item">
					<button on:click={()=>{ $params.page = Math.max($params.page - 1, 1) }}
            disabled = {$params.page == 1} 
            class="page-link"  aria-label="Previous">
						<span aria-hidden="true">&laquo;</span>
					</button>
				</li>
        {#each Array(info.total_pages_count) as page, i}
				  <li on:click={()=>{ $params.page = i+1 }} class="page-item" class:active={(i+1) == $params.page}>
            <button class="page-link" >{i+1}</button>
          </li>
        {/each}
        
				<li class="page-item">
					<button on:click={()=>{ $params.page = Math.min($params.page + 1,info.total_pages_count) }} 
            disabled = {$params.page == info.total_pages_count} 
            class="page-link" aria-label="Next">
						<span aria-hidden="true">&raquo;</span>
					</button>
				</li>				
			</div>

		</ul>
	</nav>	
</div>

{#if showModal}
  <Client bind:show={showModal} bind:selectedRow></Client>
{/if}

<style>
.filter {
  width: 7rem; 
  display: inline-block;
}
.table-parent{
  flex:1; 
  overflow:auto; 
  border-top: solid 1px #dee2e6;
}
</style>