<script>
 // import Clients from '@/Clients.svelte'
//  import Validator from 'jsonschema'
  import { Router, isActive, url, beforeUrlChange } from "@roxi/routify";

  import { afterUpdate } from 'svelte';
//  import { session } from '@/store/loginStore.js'
  import { clickOutside} from '@/utils/clickOutside.js';

  import Tour, { startTour } from '@/utils/Tour.svelte'
  
  let collapse_el
  function toggleMenu(){
    collapse_el.classList.toggle('collapse');
  }
  // collapse menu on page change
  $beforeUrlChange(closeMenu)
  /*(event, store) => {
    if (collapse_el) collapse_el.classList.add('collapse');
    return true
  })
*/
  function closeMenu(){
    if (collapse_el) collapse_el.classList.add('collapse');
  }

  // Main navigation
  let links = [];
  $: links = [
    ['/clients', 'Clients'],
  ].map(([path, name]) => {
    return {
      name,
      href: $url(path),
      active: $isActive(path)
    }
  });

	function onTour() {
		startTour([
			{
				message: `Welcome, let's start the tour now.`,
			}, {
				element: '#sortClients',
				message: 'You can sort customers here.',
			}, {
				element: '#filters',
				message: 'You can use filters too.',
			}, {
				element: '#countryFilter',
				message: 'Country filter is already populated with the existing countries from our customers database',
			}, {
				element: '#cityFilter',
				message: 'City filter too.',
			}, {
				element: '#addCustomer',
				message: 'New customer can be added here.',
			}, {
				element: '#customersList',
				message: 'Edit/delete any user from the list by clicking on it.',
      }
      
		]);
	}
</script>

<Tour/>

<header>
  <nav class="navbar navbar-expand" use:clickOutside on:click_outside={closeMenu}>
    <a class="navbar-brand" href="/">thequiz</a>
    <button on:click={toggleMenu}  class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarCollapse">
      <ul class="navbar-nav mr-auto">
        {#each links as {name, href, active}}
          <li class="nav-item" class:active>
            <a {href} class="nav-link">{name}</a>
          </li>
        {/each}      
        <li class="nav-item">
          <a class="nav-link" style="color:red" on:click={onTour} href="#">Start Tour :)</a>
        </li>
      </ul>
    </div>
  </nav>
</header>