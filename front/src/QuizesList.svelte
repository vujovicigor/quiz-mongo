
<script>
  import Table from '@/Table.svelte'
  import TakeAQuizSingle from '@/TakeAQuizSingle.svelte'
  import Toast from '@/utils/toast.js'
  import { list, refresh, status }from '@/store/takeAQuizStore.js'
  refresh()
  let showModal = false
  const toast = new Toast()    
  export let selectedRow = {}
  function perc(row){
    let r = ( row.totalCorrectAnswersCount || 0 ) / (row.totalQuestionsCount || 1) * 100
    return r.toFixed(2)
  }
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
          <th class="th-sm">Stats</th>
        </tr>        
      </thead>
      {#each $list as row, ix}
        <tr on:click={()=>{ selectedRow = {...row}; showModal=true}} >
          <td>{ix+1}.</td>
          <td>{row.quizTitle}</td>
          <td>{row.createdBy?.name_first} {row.createdBy?.name_last}</td>
          <td>
            <span class="badge badge-primary">{row.questions?.length} question{row.questions?.length>1?'s':''}</span>
            <span class="badge badge-primary">{row.totalAttemptsCount || 0} attempt{row.totalAttemptsCount>1?'s':''}</span>
            <span class="badge badge-primary">Success rate {perc(row)}%</span>          
          </td>
        </tr>
      {:else}
      <tr>
        {#if $status.loading}
          <td colspan="4">
            <center>
              <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </center>
          </td>
        {:else}
          <td colspan="4"><center><i>No data</i></center></td>
        {/if}
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