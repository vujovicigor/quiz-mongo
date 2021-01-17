<script>
  import Modal from '@/Modal.svelte'
  import Toast from '@/utils/toast.js'
  import shallowEqual from '@/utils/shallowEqual.js'
  import { fetch2 } from '@/utils/fetch2.js' 
  import { status, refresh, insert, update, remove } from '@/store/QuizStore.js'
  import EmojiSelector from 'svelte-emoji-selector';
  const toast = new Toast()  
  let busy = false
  export let show
  export let selectedRow = {}
  export let expanded_quiz_id

  function onEmoji(event) {
    selectedRow.quizTitle += event.detail;
  }
  
  let clonedSelectedRow = { ...selectedRow }
  $: disabled = shallowEqual(clonedSelectedRow, selectedRow)
  
  async function save(){
    let [response, error] =  selectedRow._id ? await update(selectedRow) : await insert(selectedRow)
    if (error) return
    toast.success('Quiz saved')
    if (response.results._id) {
      selectedRow = response.results
      expanded_quiz_id = response.results._id
    }
    refresh()
    show = false
  }
  
  async function removeQuiz(){
    let [response, error] = await remove( { _id:selectedRow._id } )
    if (error) return
    toast.success('Quiz removed')
    refresh()
    show = false
  }
</script>

<Modal on:close={()=>show=false} height="30rem">
  <h2 slot='header' style="width:100%">
    Quiz details
  </h2>


    <div class="form-group">
      Quiz title
      <input style="display: inline-block; width: 19rem;" type="text" class="form-control" bind:value={selectedRow.quizTitle} >
      <EmojiSelector on:emoji={onEmoji} />      
    </div>

  <h2 slot='footer' class="d-flex justify-content-between px-3">
    <div>
      <button class="btn" on:click={()=>{ show=false }}>Cancel</button>
      <button disabled={!selectedRow._id || $status.loading} class="btn btn-warning" on:click={removeQuiz}>Delete quiz</button>
    </div>
    <button disabled={disabled || $status.loading} on:click={save} class="btn btn-primary">Save</button>
  </h2>    
</Modal>