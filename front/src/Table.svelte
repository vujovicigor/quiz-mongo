<script>
	let name = 'world';
</script>
<style>
  :global(.table td) {
    vertical-align: middle !important;
  }
	:global(.th-sm) {
		position:sticky;
		top:0;
		background-color:white;
    z-index: 1;
    cursor: pointer;
    border-top:none !important;
	}
	:global(.sorting_desc:after) {
    opacity: 1 !important;
    content: "\2193" !important;
	}	
	:global(.sorting_asc:after) {
    opacity: 1 !important;
    content: "\2191" !important;
	}
	:global(.sorting:after) {
    position: absolute;
    bottom: 0.7rem;
    right: 0.5rem;
    display: block;
    font-family: 'Glyphicons Halflings';
    opacity: 0.2;
    content: "\2195";
}
</style>
<table class="table table-striped table-hover table-lg table-borderless" cellspacing="0" width="100%">
  <slot name="thead">
    <tr>
      <th class="th-sm sorting">Column1</th>
    </tr>  
  </slot>
  <tbody>
    <slot></slot>
  </tbody>
</table>