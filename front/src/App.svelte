<script>
  import QuizesList from '@/QuizesList.svelte'
  import QuizListAdmin from '@/QuizListAdmin.svelte'
  
  import Users_list from '@/Users_list.svelte'
//  import Validator from 'jsonschema'
  import Login from '@/Login.svelte'
  import Register from '@/Register.svelte'
  import { session } from '@/store/loginStore.js'
  import { Match, Matcher } from 'svelte-store-router'
  import { route } from '@/store/routeStore.js'  
  import Landing from '@/Landing.svelte'
/*
  function setPath(name){
    $route.path = name
  }
*/
</script>


{#if !$session.isLogedIn }
  {#if $route.fragment.page=='register'}
    <Register></Register>
  {:else}
    <Login></Login>
  {/if}
{/if}

{#if $session.isLogedIn }
  <header>
    <nav class="navbar navbar-expand">
      <a class="navbar-brand" href="#page=home">thequiz</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">

        <ul class="navbar-nav mr-auto">
          <li class="nav-item active" class:active={$route.fragment.page=='allquizes'}>
            <a class="nav-link" href="#page=allquizes">All Quizes
              <span class="sr-only">(current)</span>
            </a>
          </li>
          <li class="nav-item active" class:active={$route.fragment.page=='quizlistadmin'}>
            <a class="nav-link" href="#page=quizlistadmin">Quiz Administration
              <span class="sr-only">(current)</span>
            </a>
          </li>
          <li class="nav-item active" class:active={$route.fragment.page=='users'}>
            <a class="nav-link" href="#page=users">Users 
              <span class="sr-only">(current)</span>
            </a>
          </li>
        </ul>

        <ul class="navbar-nav">
          <li class="nav-item" >
            <a href="#" class="nav-link" on:click={()=>{$session.isLogedIn = false; $session.token= null; location.reload()}}>Logout</a>
          </li>        
        </ul>

      </div>
    </nav>
  </header>

  <div class="container-fluid d-flex flex-column" style="flex: 1;overflow: auto;">
    <Matcher>
      <Match path={$route.fragment.page} pattern="allquizes">
        <QuizesList></QuizesList>
      </Match>
      <Match path={$route.fragment.page} pattern="quizlistadmin">
        <QuizListAdmin></QuizListAdmin>
      </Match>
      
      <Match path={$route.fragment.page} pattern="users">
        <Users_list></Users_list>
      </Match>
      <Match path={$route.fragment.page} >
        <Landing></Landing>
      </Match>
    </Matcher>
  </div>
{/if}

<style>
.nav-item {
  border-bottom: solid 1px transparent;
}
.active {
  border-bottom: solid 1px grey;
}
.navbar {
    border-width: 0 !important;
}
</style>


