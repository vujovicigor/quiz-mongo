
<script>
  import Table from '@/Table.svelte'
  import TakeAQuizSingle from '@/TakeAQuizSingle.svelte'
  import Toast from '@/utils/toast.js'
  import { list, refresh }from '@/store/takeAQuizStore.js'
  refresh()
  let showModal = false
  const toast = new Toast()    
  export let selectedRow = {}
</script>

<h1 class="p-2 text-center">Pick a quiz 
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
          <td>{row.quizTitle}</td>
          <td>{row.createdBy?.name_first} {row.createdBy?.name_last}</td>
          <td>
            <span class="badge badge-primary">{row.questions?.length} question{row.questions?.length>1?'s':''}</span>
          </td>
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
  <TakeAQuizSingle bind:show={showModal} bind:selectedRow></TakeAQuizSingle>
{/if}

<style>
.table-parent{
  height: 100%;
  overflow:auto; 
  border-top: solid 1px #dee2e6;
}
</style>