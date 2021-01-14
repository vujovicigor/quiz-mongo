<script>
  import Modal from '@/Modal.svelte'
  import Toast from '@/utils/toast.js'
  import shallowEqual from '@/utils/shallowEqual.js'
  import { fetch2 } from '@/utils/fetch2.js' 
  import { status, refresh, insert, update, remove } from '@/store/QuizStore.js'
  const toast = new Toast()  
  let busy = false
  export let show
  export let selectedRow = {}
  let clonedSelectedRow = { ...selectedRow }
  $: disabled = shallowEqual(clonedSelectedRow, selectedRow)
  
  async function save(){
    let [response, error] =  selectedRow._id ? await update(selectedRow) : await insert(selectedRow)
    if (error) return
    toast.success('Quiz saved')
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

<Modal on:close={()=>show=false} height="auto">
  <h2 slot='header' style="width:100%">
    Quiz details
    <!--
    <button class="btn btn-small" style="color:red; position:absolute; right:2rem">Tour?</button>
    -->
  </h2>

  <form>
    <div class="form-group">
      <label style="display:block">Quiz title
        <input type="text" class="form-control" bind:value={selectedRow.title} >
      </label>
    </div>

    
  </form>

  <h2 slot='footer' class="d-flex justify-content-between px-3">
    <div>
      <button class="btn" on:click={()=>{ show=false }}>Cancel</button>
      <button disabled={!selectedRow._id || $status.loading} class="btn btn-warning" on:click={removeQuiz}>Delete</button>
    </div>
    <button disabled={disabled || $status.loading} on:click={save} class="btn btn-primary">Save</button>
  </h2>    
</Modal>