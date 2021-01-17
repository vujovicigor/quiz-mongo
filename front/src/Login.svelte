
<script>
  import { session } from '@/store/loginStore.js'
  import { fetch2 } from '@/utils/fetch2.js'
  import Toast from '@/utils/toast.js'
  const toast = new Toast({duration:2000}) 

  let obj = {
    email:'',
    password:''
  }

  if ($session.token && $session.isLogedIn){
    toast.success('Welcome back');
  }

  async function tryLogin(){
    var [resp,err] = await fetch2('post','auth', obj)
    if (!resp || !resp.token) { 
      //toast.error('Wrong credentials'); 
      return 
    }
    toast.success('Welcome'); 
    $session = { ...resp.results, isLogedIn:true, token:resp.token }
    if (!document.location.hash || document.location.hash=='#page=register')
      document.location.hash='#page=allquizes'
  }

	function handleKeydown(event) {
    if (event.key == 'Enter') tryLogin()
	}
</script>

<svelte:window on:keydown={handleKeydown}/>

<div class="jumbotron jumbotron-fluid">
  <div class="container" style="max-width: 30rem !important">
    <div class="row">
      <div class="col-12">
        <h1 class="mb-3 text-center">Please log in</h1>
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
          <button type="button" on:click={tryLogin} class="btn btn-primary btn-block mt-5">
            Login
          </button>
        </form>
        <div class="text-center">
          <p>or</p>
          <a href="#page=register" class="btn btn-link">Create account</a>
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
