<script>
  import Table from '@/Table.svelte'
  import QuizDetailAdmin from '@/QuizDetailAdmin.svelte'
  import Toast from '@/utils/toast.js'
  import { list, refresh, update } from '@/store/QuizStore.js'
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
    if (expanded_quiz_id == quiz_id)
      expanded_quiz_id = null
    else 
      expanded_quiz_id = quiz_id
    //selectedRow = { title:'' }
    //showModal=true
  }

  function addNewBlankQuestion(ix){
    list.update(d=>{
      d[ix].questions.push( {answers:[], correctAnswerIndex:-1, title:''} )
      return d
    })
  }
  
  function removeQuestion(ix, qix){
    list.update(d=>{
      d[ix].questions.splice(qix,1)
      return d
    })
  }
  
  function addNewBlankAnswer(ix,qix){
    list.update(d=>{
      d[ix].questions[qix].answers.push( {answer:''} )
      return d
    })
  }
  
  function removeAnswer(ix, qix, aix){
    list.update(d=>{
      d[ix].questions[qix].answers.splice(aix,1)
      return d
    })
  }
  
  async function saveOneQuiz(row){
    let [response, error] =  await update(row)
    if (error) return
    toast.success('Quiz saved')
    refresh()
  }
</script>

<h1 class="p-2 text-center">My Quizzes
	<div style="display:flex; align-items: center;justify-content: flex-end;">
    <button on:click={addNew} id="addUser" class="btn btn-link" style="white-space: nowrap">Add New Quiz</button>
	</div>
</h1> 
<div style="display:flex; flex-flow:column;overflow: auto;flex: 1;">
  <div class="table-parent">
    <ul class="list-group list-group-flush">

      {#each $list as row, ix}
        <li class="list-group-item d-flex justify-content-between align-items-center" 
        on:click={()=>showQuestions(row)} class:active={selectedRow?._id == row._id}>
          {row.quizTitle} 
          <div>
            <span class="badge badge-primary">{row.questions?.length} qestions</span>
            <button on:click|stopPropagation={()=>{ selectedRow = {...row}; showModal=true}}  class="btn btn-secondary" style="white-space: nowrap">Edit</button>
          </div>            
        </li>

        {#if expanded_quiz_id == row._id}
          <li class="list-group-item" >
            <ul class="list-group list-group-flush">
<!--
              <li class="list-group-item py-0" style="border-bottom-width:0">
                <button class="btn btn-link" >+ Add new Question</button>
              </li>
-->
              {#each row.questions as question, qix}
              <li class="list-group-item border-0">
                <div class="input-group mb-0">
                  <div class="input-group-prepend">
                    <span class="input-group-text">{qix+1}. Question</span>
                  </div>
                  <input type="text" class="form-control" placeholder="Enter quiz question here" bind:value={question.title}>
                  <div class="input-group-append">
                    <button on:click={()=>removeQuestion(ix, qix)} title="Remove question" class="btn btn-warning" type="button" ><span aria-hidden="true">&times;</span></button>
                  </div>
                </div>              
              </li>

              
              <li class="list-group-item">
                <ul class="list-group list-group-flush">
                  {#each question.answers as answer, aix}
                  <li class="list-group-item d-flex justify-content-between align-items-center border-0">

                    <div class="input-group mb-0">
                      <div class="input-group-prepend">
                        <span class="input-group-text">{aix+1}. Answer</span>
                      </div>
                      <input type="text" class="form-control" placeholder="Enter answer here" bind:value={answer.answer}>
                      <div class="input-group-append">
                        <button on:click={()=>removeAnswer(ix,qix, aix)} title="Remove answer" class="btn btn-warning" type="button" ><span aria-hidden="true">&times;</span></button>
                      </div>
                    </div>  

                    <div class="form-check ml-3">
                      <input class="form-check-input" type="radio" bind:group={$list[ix].questions[qix].correctAnswerIndex} id="r{qix}{aix}" value={aix} >
                      <label class="form-check-label" for="r{qix}{aix}">
                        Correct 
                      </label>
                    </div>
                  </li>
                  {/each}
                  <li class="list-group-item py-0" style="border-bottom-width:0">
                    <button on:click={()=>addNewBlankAnswer(ix,qix)} class="btn btn-link" >+ Add answer</button>
                  </li>
                </ul>
              </li>


              {/each}

              <li class="list-group-item py-0 footer" style="border-bottom-width:0">
                <button on:click={()=>addNewBlankQuestion(ix)} class="btn btn-link" >+ Add Question</button>
                <button on:click={()=>saveOneQuiz(row)} class="btn btn-primary float-right" >Save</button>
              </li>


            </ul>
          </li>
        {/if}
      {:else}
        <li class="list-group-item" >
          <center><i>Empty list, why don't you add a quiz on the button above &nearr;</i></center>
        </li>
      {/each}
    </ul>
  </div>
</div>

{#if showModal}
  <QuizDetailAdmin bind:show={showModal} bind:selectedRow bind:expanded_quiz_id ></QuizDetailAdmin>
{/if}

<style>
.list-group-item{
  padding: 0.5rem 1.25rem;
}
.footer{
  position: sticky;
  bottom: 0;
  z-index: 3;
}
</style>