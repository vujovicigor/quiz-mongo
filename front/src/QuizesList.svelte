
<script>
  import Table from '@/Table.svelte'
  import User from '@/User.svelte'
  import Toast from '@/utils/toast.js'
  import { list, refresh }from '@/store/quizStore.js'
  refresh()
  let showModal = false
  const toast = new Toast()    
  export let selectedRow = {}
</script>

<h1 class="p-2 text-center">All Quizes
</h1>  
<div style="display:flex; flex-flow:column;overflow: auto;flex: 1;">
  <div class="table-parent">
    <Table>
      <thead slot="thead">
        <tr>
          <th class="th-sm">#</th>
          <th class="th-sm">Quiz name</th>
          <th class="th-sm">Author</th>
          <th class="th-sm">Todo stats</th>
        </tr>        
      </thead>
      {#each $list as row, ix}
        <tr on:click={()=>{ selectedRow = {...row}; showModal=true}} >
          <td>{ix+1}.</td>
          <td>{row.title}</td>
          <td>{row.createdBy?.name_first} {row.createdBy?.name_last}</td>
          <td>-</td>
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