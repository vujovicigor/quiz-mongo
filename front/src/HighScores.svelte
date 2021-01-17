
<script>
  import Table from '@/Table.svelte'
  import Toast from '@/utils/toast.js'
  import { list, refresh, status }from '@/store/highScoreStore.js'

  function perc(row){
    let r = ( row.totalCorrectAnswersCount || 0 ) / (row.totalQuestionsCount || 1) * 100
    return r.toFixed(2)
  }  

  refresh()
</script>

<h1 class="p-2 text-center">Hall of fame</h1>  
<div style="display:flex; flex-flow:column;overflow: auto;flex: 1;">
  <div class="table-parent">
    <Table>
      <thead slot="thead">
        <tr>
          <th class="th-sm">#</th>
          <th class="th-sm">email</th>
          <th class="th-sm">Name</th>
          <th class="th-sm">Score</th>
        </tr>        
      </thead>
      {#each $list as row, ix}
        <tr>
          <td>{ix+1}. 
            {#if ix==0}🥇 {/if}
            {#if ix==1}🥈 {/if}
            {#if ix==2}🥉 {/if}          
          </td>
          <td>{row._id.email}</td>
          <td>{row._id.name_first} {row._id.name_last} 
          </td>
          <td>
          
            <span class="badge badge-primary">{row.totalCorrectAnswersCount || 0} correct answers{row.totalCorrectAnswersCount>1?'s':''}</span>
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


<style>
.table-parent{
  height: 100%;
  overflow:auto; 
  border-top: solid 1px #dee2e6;
}
</style>