var SVG_NS = 'http://www.w3.org/2000/svg';
var XLink_NS = 'http://www.w3.org/1999/xlink';
var stage = document.getElementById("stage");

addNode();

function click(){
	console.log("CLICKED");
	var node = document.getElementsByClassName("node")[0];
  var root = document.documentElement;
  var curColor = root.style.getPropertyValue("--node-color");
  
  if (curColor == "green"){
  	root.style.setProperty("--node-color", "blue");
	  root.style.setProperty("--pos-x", "50px");
	  root.style.setProperty("--pos-y", "50px");

  } else {
  	root.style.setProperty("--node-color", "green");
	  root.style.setProperty("--pos-x", "100px");
	  root.style.setProperty("--pos-y", "100px");
  }
}

function addNode(){
	var nodeContainer = document.createElementNS(SVG_NS, "g");
  nodeContainer.setAttribute("class", "node-container");

  var node = document.createElementNS(SVG_NS, "svg");
  node.setAttribute("class", "node");
  node.setAttribute("width", "150");
  node.setAttribute("height", "150");
	
  var dev_outline = document.createElementNS(SVG_NS, "rect");
  dev_outline.setAttribute("class", "dev_outline");
  dev_outline.setAttribute("width", "100%");
  dev_outline.setAttribute("height", "100%");

  var background = document.createElementNS(SVG_NS, "circle");
  background.addEventListener("click", click);	
  background.setAttribute("r", "50%");
  background.setAttribute("cx", "50%");
  background.setAttribute("cy", "50%");
  background.setAttribute("class", "node_background");

  //node.appendChild(dev_outline);
  node.appendChild(background);
  nodeContainer.appendChild(node);
  stage.appendChild(nodeContainer);
}
