<script>
  import Table from '@/Table.svelte'
  import QuizDetailAdmin from '@/QuizDetailAdmin.svelte'
  import Toast from '@/utils/toast.js'
  import { list, refresh } from '@/store/QuizStore.js'
  refresh()
  let showModal = false
  const toast = new Toast()    
  export let selectedRow = {}
  function addNew(){
    selectedRow = { title:'' }
    showModal=true
  }

  let expanded_quiz_id = null
  function showQuestions(row){
    selectedRow = {...row}
    let quiz_id = row._id
    console.log('quiz_id', quiz_id)
    if (expanded_quiz_id == quiz_id)
      expanded_quiz_id = null
    else 
      expanded_quiz_id = quiz_id
    //selectedRow = { title:'' }
    //showModal=true
  }
  
</script>

<h1 class="p-2 text-center">My Quizes
	<div style="display:flex; align-items: center;justify-content: flex-end;">
    <button on:click={addNew} id="addUser" class="btn btn-primary" style="white-space: nowrap">Add New Quiz</button>
	</div>
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
        <tr on:click={()=>{ selectedRow = {...row}; showModal=true}} class:table-active={selectedRow?._id == row._id}>
          <td>{ix+1}.</td>
          <td>{row.title}</td>
          <td>{row.createdBy?.name_first} {row.createdBy?.name_last}</td>
          <td>
            <button on:click|stopPropagation={()=>showQuestions(row)}  class="btn btn-secondary" style="white-space: nowrap">{expanded_quiz_id == row._id?'Hide':'Show'} Questions</button>
          </td>
        </tr>
        {#if expanded_quiz_id == row._id}
          <tr>
            <td></td>
            <td colspan="3">
              <ul class="list-group list-group-flush">
                <li class="list-group-item">Cras justo odio</li>
                <li class="list-group-item">Dapibus ac facilisis in</li>
                <li class="list-group-item">
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">Cras justo odio</li>
                    <li class="list-group-item">Dapibus ac facilisis in</li>
                    <li class="list-group-item">Morbi leo risus</li>
                    <li class="list-group-item">Porta ac consectetur ac</li>
                    <li class="list-group-item">Vestibulum at eros</li>
                  </ul>
                </li>
                <li class="list-group-item">Porta ac consectetur ac</li>
                <li class="list-group-item">Vestibulum at eros</li>
              </ul>
            </td>
          </tr>
        {/if}
      {:else}
      <tr>
        <td colspan="4"><center><i>Empty list, why don't you add a quiz on the button above &nearr;</i></center></td>
      </tr>
      {/each}
    </Table>
  </div>
</div>

{#if showModal}
  <QuizDetailAdmin bind:show={showModal} bind:selectedRow></QuizDetailAdmin>
{/if}

<style>
.table-parent{
  height: 100%;
  overflow:auto; 
  border-top: solid 1px #dee2e6;
}
</style>