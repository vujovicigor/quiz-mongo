
export function dragisa(node, t) {
	//console.log(node, t)
	let targetDiv = t
	let isDown = false
	let initialX = 0
  let initialY = 0
  let x0 = 0
  let y0 = 0
  
  function unify(e) {	return e.changedTouches ? e.changedTouches[0] : e };

	function getTranslateXY(el) {
		var style = window.getComputedStyle(el);
		var matrix = new WebKitCSSMatrix(style.webkitTransform);
		//console.log('translateX: ', matrix.m41, 'translatey: ', matrix.m42);
		return [matrix.m41, matrix.m42]
	}	

	const handleMouseDown = e => {
    let event = unify(e)
    x0 = event.clientX
    y0 = event.clientY
    isDown = true
    let xy = getTranslateXY(targetDiv)
    initialX = xy[0] || 0
    initialY = xy[1] || 0
    document.addEventListener('mousemove', handleMouseMove, true);
    document.addEventListener('touchmove', handleMouseMove, true);
    
    document.addEventListener('mouseup', handleMouseUp, true);
    document.addEventListener('touchend', handleMouseUp, true);

      // node.dispatchEvent(
      //   new CustomEvent('click_outside', node)
      // )
  }  
	
  const handleMouseMove = e => {
    let event = unify(e)
		var deltaX = event.clientX - x0 //event.movementX;
		var deltaY = event.clientY - y0 //event.movementY;
    targetDiv.style.transform = "translate3d(" + (initialX+deltaX) + "px, " + (initialY+deltaY) + "px, 0)";
    return false
  }

  const handleMouseUp = event => {
	  isDown = false
		//cleanup
		document.removeEventListener('mousemove', handleMouseMove, true);
		document.removeEventListener('touchmove', handleMouseMove, true);
		document.removeEventListener('mouseup', handleMouseUp, true);
		document.removeEventListener('touchend', handleMouseUp, true);
  }

	node.addEventListener('mousedown', handleMouseDown, true);
	node.addEventListener('touchstart', handleMouseDown, true);
  
//  container.addEventListener("touchstart", dragStart, false);
//  container.addEventListener("touchend", dragEnd, false);
//  container.addEventListener("touchmove", drag, false);

  return {
		update(t) {
			targetDiv = t
		},
    destroy() {
      node.removeEventListener('mousedown', handleMouseDown, true);
      node.removeEventListener('touchstart', handleMouseDown, true);
			document.removeEventListener('mousemove', handleMouseMove, true);
			document.removeEventListener('touchmove', handleMouseMove, true);
			document.removeEventListener('mouseup', handleMouseUp, true);
			document.removeEventListener('touchend', handleMouseUp, true);
    }
	}
}