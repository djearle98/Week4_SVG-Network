var SVG_NS = 'http://www.w3.org/2000/svg';
var XLink_NS = 'http://www.w3.org/1999/xlink';
var stage = document.getElementById("stage");
var nodes = [];

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
		stage.appendChild(this.nodeContainer);
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

nodes.push(new Node("NODE 1", 0, 0, 50));
nodes.push(new Node("NODE 2", 100, 100, 70));
nodes.push(new Node("NODE 3", 200, 200, 90));
nodes.push(new Node("NODE 4", 400, 400, 110));
