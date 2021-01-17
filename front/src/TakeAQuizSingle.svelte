<script>
  import Modal from '@/Modal.svelte'
  import Confetti from '@/Confetti.svelte'
  import Toast from '@/utils/toast.js'
  import shallowEqual from '@/utils/shallowEqual.js'
  import { status, refresh, insert }from '@/store/takeAQuizStore.js'
  const toast = new Toast()  
  let busy = false
  export let show
  export let selectedRow = {}
  let step = 1
  let scoreObj = {}
  // Mark all user anwers
  for (let i=0; i<selectedRow.questions.length; i++)
    selectedRow.questions[i].userAnswerIndex = -1

  $: disabled = selectedRow.questions[currentQuestionIndex].userAnswerIndex === -1

  let currentQuestionIndex = 0
  $: isLastQuestion = (currentQuestionIndex+1) == selectedRow.questions.length

  async function save(){
    let [response, error] =  await insert(selectedRow)
    if (error) return
    scoreObj = response.results
    step = 2
    toast.success('Your score is ' + (( scoreObj.correctAnswersCount || 0 ) / (scoreObj.questionsCount || 1) * 100).toFixed(2) + '%')
    refresh()
    //show = false
  }

  function next(){
    currentQuestionIndex = currentQuestionIndex + 1
  }
</script>

{#if step==1}
  <Modal on:close={()=>show=false} height="auto" max_width="98vw">
    <h2 slot='header' style="width:100%">
      {selectedRow.quizTitle}
    </h2>

    <form >
      <h3>{selectedRow.questions[currentQuestionIndex].title}</h3>

      {#each selectedRow.questions[currentQuestionIndex].answers as answer, aix}
        <div class="input-group mb-3 border border-{selectedRow.questions[currentQuestionIndex].userAnswerIndex==aix?'success':'secondary'}">
          <div class="input-group-prepend">
            <div class="input-group-text">
            <input id="takeaqvuz{aix}" type="radio" bind:group={selectedRow.questions[currentQuestionIndex].userAnswerIndex} value={aix}>
            </div>
          </div>
          <label for="takeaqvuz{aix}" class="form-control"> {answer.answer} </label> 
        </div>
      {/each}

      <span>Question {currentQuestionIndex+1} / {selectedRow.questions.length}</span>
    </form>

    <h2 slot='footer' class="d-flex justify-content-between px-3">
      <div>
        <button class="btn" on:click={()=>{ show=false }}>Cancel</button>
      </div>
      {#if isLastQuestion}
        <button disabled={disabled} on:click={save} class="btn btn-primary">Submit</button>
      {:else}
        <button disabled={disabled} on:click={next} class="btn btn-primary">Next question</button>
      {/if}
    </h2>    
  </Modal>
{/if}



{#if step==2}
  <Modal on:close={()=>show=false} height="auto" max_width="98vw">
    <h2 slot='header' style="width:100%">
      Your score is 
      <span class="badge badge-primary">
      {scoreObj.correctAnswersCount} / {scoreObj.questionsCount}
      </span>
    </h2>

      {#each scoreObj.questions as question, qix}
        <form class="mb-5">
          <h3 class={question.correctAnswerIndex==question.userAnswerIndex?'text-success':'text-danger'}>{question.title}
          </h3>

          {#each question.answers as answer, aix}
            <div class="input-group mb-3 border border-{question.correctAnswerIndex==aix?'success':question.userAnswerIndex==aix?'warning':'secondary'}">
              <div class="input-group-prepend">
                <div class="input-group-text">
                <input id="takeaqvuz{aix}" type="radio" bind:group={scoreObj.questions[qix].userAnswerIndex} value={aix}>
                </div>
              </div>
              <label for="takeaqvuz{aix}" class="form-control"> {answer.answer} </label> 
            </div>
          {/each}

        </form>
      {/each}

      {#if scoreObj.correctAnswersCount == scoreObj.questionsCount }
        <Confetti></Confetti>
      {/if}


    <h2 slot='footer' class="d-flex justify-content-between px-3">
      <div>
        <button class="btn" on:click={()=>{ show=false }}>Close</button>
      </div>

    </h2>    
  </Modal>
{/if}