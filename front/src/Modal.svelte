<!--
USAGE:
{#if showModal}
	<Modal on:close={()=>showModal=false}>
		<h2 slot='header'>
			modal
			<small><em>adjective</em>  mod·al \ˈmō-dəl\</small>
		</h2>

		<ol class="definition-list">
			<li>of or relating to modality in logic</li>
			<li>containing provisions as to the mode of procedure or the manner of taking effect —used of a contract or legacy</li>
			<li>of or relating to a musical mode</li>
			<li>of or relating to structure as opposed to substance</li>
			<li>of, relating to, or constituting a grammatical form or category characteristically indicating predication</li>
			<li>of or relating to a statistical mode</li>
		</ol>

		<a href='https://www.merriam-webster.com/dictionary/modal'>merriam-webster.com</a>
	</Modal>
{:else}
	<button on:click={()=>showModal=true}>
		show modal
	</button>
{/if}


-->
<!-- {#if opaque} 
  <div bind:this={modal_element} class='modal-background' on:click={()=>(fire('close'))}>
   {/if} -->
  <div  bind:this={modal_element} class='modal-background ' on:click={onBgClick}>

<div bind:this={modal_div} class='modal modal-content' style="{max_width?'max-width:'+max_width+';':''}  {height?'height:'+height+';':''}">
  <div class="modal-header {headerClass}" use:dragisa={modal_div} style="cursor:move">
    <h4 class="modal-title">
      <slot name='header'></slot>
    </h4>
    <button type="button" class="close" data-dismiss="modal" aria-label="Close" on:click={()=>(fire('close'))} >
      <span aria-hidden="true">×</span>
    </button>
  </div>
<!--
	<div style="background-color:#679; color:white; margin:-1em; margin-bottom:1em; padding: 0">
    <slot name='header'></slot>
    <button xx primary style="display: inline; position: absolute; right:0; top:0; margin: 1em; padding: 1rem;" on:click={()=>(fire('close'))}>
    <i class="far fa-comments"></i>
    </button>
  </div>
  -->
<!--
	<button xx style="display: inline; position: absolute; right:4px; top:4px; margin: 0; padding: 1rem;" on:click={()=>(fire('close'))}>
  <i class="glyphicon glyphicon-remove"></i>
  </button>
	<slot name='header'></slot>
	<hr>
-->
  <div class="modal-body" style="overflow: auto;">
    <slot></slot>
  </div>
	
<!--	<hr> -->
	<slot name='footer'></slot>

</div>
</div>

<style>
	.modal-background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(90,90,90,0.3);
    z-index: 1050;
	}
	.modal {
    display: flex;
    flex-flow: column;        
		position: fixed;
		left: 50%;
		top: 50%;
/*		width: calc(100vw - 4em); */
		width: 100vw;
		max-height: calc(100vh - 4em);
		/* overflow: auto; */
		transform: translate(-50%,-50%);
		padding: 0;
		border-radius: 0.2em;
		background: white;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    z-index: 1051;
	}
	button {
		display: block;
	}
</style>

<script context="module">
  let modalsStack = []
	function handleKeydown(event) {
    // close topmost modal 
    if (event.keyCode == 27 && modalsStack && modalsStack.length>0){
      modalsStack[modalsStack.length-1].close()
    }

    if (event.key === 'Tab') {
      // trap focus
      const nodes = modalsStack[modalsStack.length-1].nodes.querySelectorAll('*');
      //console.log('tab', nodes)
      const tabbable = Array.from(nodes).filter(n => n.tabIndex >= 0);
      let index = tabbable.indexOf(document.activeElement);
      if (index === -1 && event.shiftKey) index = 0;
      index += tabbable.length + (event.shiftKey ? -1 : 1);
      index %= tabbable.length;
      tabbable[index].focus();
      event.preventDefault();
    }

    //if (event.keyCode == 13) onSave() // enter
	}
  let keyDownFnRef = window.addEventListener("keydown", handleKeydown);
</script>

<script>
  import { createEventDispatcher } from 'svelte';
  const fire = createEventDispatcher();
  import { onDestroy, onMount } from 'svelte';
  import {dragisa} from '@/utils//dragisa.js'

  //export let opaque = true
  export let max_width = '32em'
  export let height// = '30em'
  export let headerClass = 'bg-info'

  let modal_div 
  let modal_element

  function onBgClick(event){
    //()=>(fire('close'))
    //console.log(event, modal_element,event.target, modal_element.contains(event.target))
    if ( modal_element == event.target && !event.defaultPrevented ) 
      fire('close')
  }

// blur fix
  function roundCssTransformMatrix(el){
    //var el = document.getElementById(element);
    var mx = window.getComputedStyle(el, null); //gets the current computed style
    el.style.transform=""; //resets the redifined matrix to allow recalculation, the original style should be defined in the class not inline.
    mx = mx.getPropertyValue("-webkit-transform") ||
    mx.getPropertyValue("-moz-transform") ||
    mx.getPropertyValue("-ms-transform") ||
    mx.getPropertyValue("-o-transform") ||
    mx.getPropertyValue("transform") || false;
    var values = mx.replace(/ |\(|\)|matrix/g,"").split(",");
    for(var v in values) {  values[v]=Math.ceil(values[v]);  }
    el.style.transform = "matrix("+values.join()+")"
  }

  onMount(() => {
    document.body.appendChild(modal_element) // detach modal to body
    roundCssTransformMatrix(modal_div)
    //if (!window.modalsStack) window.modalsStack = []
    modalsStack.push({close:close, nodes:modal_div})
  });

  onDestroy(() => {
    //console.log('onDestroy modal')
    //if (modalsStack) 
    modalsStack.pop()
  });

  function close(event) {
    //console.log('closing modal event')
    fire('close')
    return false
  }
</script>