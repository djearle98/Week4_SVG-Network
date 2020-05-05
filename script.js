var SVG_NS = 'http://www.w3.org/2000/svg';
var XLink_NS = 'http://www.w3.org/1999/xlink';
var nodes = [];
var lines = [];
var stage = document.getElementById("stage");

var lineLayer = document.createElementNS(SVG_NS, "svg");
lineLayer.setAttribute("class", "line-layer");
let lineLayer_bg = document.createElementNS(SVG_NS, "rect");
lineLayer_bg.setAttribute("class","line-layer_bg");
lineLayer.appendChild(lineLayer_bg);
stage.appendChild(lineLayer);

var nodeLayer = document.createElementNS(SVG_NS, "svg");
nodeLayer.setAttribute("class", "node-layer");
let nodeLayer_bg = document.createElementNS(SVG_NS, "rect");
nodeLayer_bg.setAttribute("class","node-layer_bg");
nodeLayer.appendChild(nodeLayer_bg);
stage.appendChild(nodeLayer);

class Node {
	constructor(title,x,y,r) {
  	//CREATE ELEMENTS OF NODE
    //node container, a group for transformations
  	this.nodeContainer = document.createElementNS(SVG_NS, "g");
    this.nodeContainer.setAttribute("class", "node-container");
    
    //node, the SVG that contains all the graphics of a single node
    this.node = document.createElementNS(SVG_NS, "svg");
    this.node.setAttribute("class", "node");
    this.radius = r;
		this.coordinates = ([x, y]);
		
    //background, the visible circle of the node
    this.background = document.createElementNS(SVG_NS, "circle");
    this.background.setAttribute("r", "50%");
    this.background.setAttribute("cx", "50%");
    this.background.setAttribute("cy", "50%");
    this.background.setAttribute("class", "node_background");
		
    //title, the node's title field
    this.title = document.createElementNS(SVG_NS, "text");
    this.title.setAttribute("x", "50%");
    this.title.setAttribute("y", "50%");
    this.title.setAttribute("text-anchor", "middle");
    this.title.setAttribute("class", "title");
    //titleText, the text in the title
    this.titleText = document.createTextNode(title)
    
    //blanket, a circlular transparent layer atop the entire node just for detecting click events
    this.blanket = document.createElementNS(SVG_NS, "circle");
    this.blanket.addEventListener("click", Node.demoMove.bind(this));	
    this.blanket.setAttribute("r", "50%");
    this.blanket.setAttribute("cx", "50%");
    this.blanket.setAttribute("cy", "50%");
		this.blanket.setAttribute("class", "blanket");
		
    //ADD ELEMENTS TO DOCUMENT
    //add text nodes to title
    this.title.appendChild(this.titleText);
    
    //add shapes to node
    this.node.appendChild(this.background);
    this.node.appendChild(this.title);
    this.node.appendChild(this.blanket);
    
    //add node to node container
    this.nodeContainer.appendChild(this.node);
		
    //add node container to stage
		nodeLayer.appendChild(this.nodeContainer);
  }
  set radius(r){
  	this.r = r;
  	this.node.setAttribute("width", r*2);
    this.node.setAttribute("height", r*2);
  }
  get radius() {
  	return this.r;
  }
  set coordinates(c){
  	this.x = c[0];
    this.y = c[1];
    //when applying coordinates, offset by the radius so node is centered on the coordinate
  	this.nodeContainer.setAttribute("transform", "translate(" + (this.x-this.r) + ", " + (this.y-this.r) + ")");
  }
  get coordinates(){
    return [this.x,this.y];
  }
  static demoMove(){
    let c = this.coordinates;
    c[0]+=15;
    c[1]+=15;
    this.coordinates=c;
  }
}
class Line{
	constructor(parent, child){
  	this.parent = parent;
    this.child = child;
    this.line = document.createElementNS(SVG_NS,"line");
    this.line.setAttribute("class","node-line");
		
    let pc = parent.coordinates;
    let cc = child.coordinates;
  	this.line.setAttribute("x1", pc[0]);
    this.line.setAttribute("y1", pc[1]);
  	this.line.setAttribute("x2", cc[0]);
    this.line.setAttribute("y2", cc[1]);
    lineLayer.appendChild(this.line);
  }
  update(){ //TODO: DOESN'T WORK
  	//Uncaught DOMException: Blocked a frame with origin "https://fiddle.jshell.net" from accessing a cross-origin frame.

  	let pc = parent.coordinates;
    let cc = child.coordinates;
  	this.line.setAttribute("x1", pc[0]);
    this.line.setAttribute("y1", pc[1]);
  	this.line.setAttribute("x2", cc[0]);
    this.line.setAttribute("y2", cc[1]);
  }
}

nodes.push(new Node("NODE 1", 130, 153, 196/2));
nodes.push(new Node("NODE 2", 220, 373, 118/2));
nodes.push(new Node("NODE 3", 435, 381, 174/2));
nodes.push(new Node("NODE 4", 372, 169, 138/2));
nodes.push(new Node("NODE 5", 353, 553, 118/2));
nodes.push(new Node("NODE 6", 546, 553, 118/2));
nodes.push(new Node("NODE 7", 640, 383, 118/2));
nodes.push(new Node("NODE 8", 555, 243, 118/2));
nodes.push(new Node("NODE 9", 555, 94, 118/2));

lines.push(new Line(nodes[0],nodes[1]));
lines.push(new Line(nodes[0],nodes[2]));
lines.push(new Line(nodes[0],nodes[3]));
lines.push(new Line(nodes[3],nodes[7]));
lines.push(new Line(nodes[3],nodes[8]));
lines.push(new Line(nodes[2],nodes[4]));
lines.push(new Line(nodes[2],nodes[5]));
lines.push(new Line(nodes[2],nodes[6]));

//lines[0].update(); //throws error
