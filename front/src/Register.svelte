
<script>
  import { session } from '@/store/loginStore.js'
  import { fetch2 } from '@/utils/fetch2.js'
  import Toast from '@/utils/toast.js'
  const toast = new Toast({duration:2000}) 

  let obj = {
    email:'',
    password:'',
    name_first:'',
    name_last:''
  }

  async function tryRegister(){
    var [resp,err] = await fetch2('post','signup', obj)
    if (!resp || !resp.token) { 
      //toast.error('Wrong credentials'); 
      return 
    }
    toast.success('Welcome'); 
    $session = { ...resp.results, isLogedIn:true, token:resp.token }
  }

	function handleKeydown(event) {
    if (event.key == 'Enter') tryRegister()
	}
</script>

<svelte:window on:keydown={handleKeydown}/>

<div class="jumbotron jumbotron-fluid">
  <div class="container" style="max-width: 30rem !important">
    <div class="row">
      <div class="col-12">
        <h1 class="mb-3 text-center">Create account</h1>
        <form class="mb-3">
          <div class="form-group">
            <label for="email">Email:</label>
            <input
              type="email"
              class="form-control"
              id="email"
              required
              bind:value={obj.email}
            />
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input
              type="password"
              class="form-control"
              id="password"
              required
              bind:value={obj.password}
            />
          </div>
          <div class="form-group">
            <label for="firstname">First name:</label>
            <input
              type="text"
              class="form-control"
              placeholder=""
              id="firstname"
              required
              bind:value={obj.name_first}
            />
          </div>
          <div class="form-group">
            <label for="lastname">Last name:</label>
            <input
              type="text"
              class="form-control"
              placeholder=""
              id="lastname"
              required
              bind:value={obj.name_last}
            />
          </div>
          <button type="button" on:click={tryRegister} class="btn btn-primary btn-block mt-5">
            Create account
          </button>
        </form>
        <div class="text-center">
          <p>Already have an account?</p>
          <a href="#page=login" class="btn btn-link">Login here</a>
          <!--
          <p class="small">
            <a href="#">Have you forgotten your account details?</a>
          </p>
          -->
        </div>
      </div>
    </div>
  </div>
</div>
