var SVG_NS = 'http://www.w3.org/2000/svg';
var XLink_NS = 'http://www.w3.org/1999/xlink';
var stage = document.getElementById("stage");

addNode();

function click(){
	var node = document.getElementById("svg").setAttribute("fill", "green");
}

function addNode(){
	var node = document.createElementNS(SVG_NS, "circle");
  node.setAttribute("r", "30");
  node.setAttribute("cx", "30");
  node.setAttribute("cy", "30");
  node.setAttribute("id", "svg");
  node.addEventListener("click", click);
  stage.appendChild(node);
}
