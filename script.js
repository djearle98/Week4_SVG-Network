var SVG_NS = 'http://www.w3.org/2000/svg';
var XLink_NS = 'http://www.w3.org/1999/xlink';
var graphicNodes = [];
var graphicLines = [];
var dataNodes = new Map();
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

class GraphicNode {
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
    this.shadowOffset = 6;
    
    //shadow, the visible shadow of the node
    this.shadow = document.createElementNS(SVG_NS, "circle");
    this.shadow.setAttribute("r", r);
    this.shadow.setAttribute("cx", r+this.shadowOffset);
    this.shadow.setAttribute("cy", r+this.shadowOffset);
    this.shadow.setAttribute("class", "node_shadow");
    
    //background, the visible circle of the node
    this.background = document.createElementNS(SVG_NS, "circle");
    this.background.setAttribute("r", r);
    this.background.setAttribute("cx", r);
    this.background.setAttribute("cy", r);
    this.background.setAttribute("class", "node_background");
		
    //status ring, the circlular color indicator
    this.statusRing = document.createElementNS(SVG_NS, "circle");
    this.statusRing.setAttribute("r", r-5);
    this.statusRing.setAttribute("cx", r);
    this.statusRing.setAttribute("cy", r);
    this.statusRing.setAttribute("class", "node_status-ring");
    
    //title, the node's title field
    this.title = document.createElementNS(SVG_NS, "text");
    this.title.setAttribute("x", r);
    this.title.setAttribute("y", r+5);
    this.title.setAttribute("text-anchor", "middle");
    this.title.setAttribute("class", "title");
    //titleText, the text in the title
    this.titleText = document.createTextNode(title)
    
    //blanket, a circlular transparent layer atop the entire node just for detecting click events
    this.blanket = document.createElementNS(SVG_NS, "circle");
    this.blanket.addEventListener("click", GraphicNode.demoMove.bind(this));	
    this.blanket.setAttribute("r", r);
    this.blanket.setAttribute("cx", r);
    this.blanket.setAttribute("cy", r);
		this.blanket.setAttribute("class", "blanket");
		
    //ADD ELEMENTS TO DOCUMENT
    //add text nodes to title
    this.title.appendChild(this.titleText);
    
    //add shapes to node
    this.node.appendChild(this.shadow);
    this.node.appendChild(this.background);
    this.node.appendChild(this.statusRing);
    this.node.appendChild(this.title);
    this.node.appendChild(this.blanket);
    
    //add node to node container
    this.nodeContainer.appendChild(this.node);
		
    //add node container to stage
		nodeLayer.appendChild(this.nodeContainer);
  }
  set radius(r){
  	this.r = r;
  	this.node.setAttribute("width", r*2+this.shadowOffset);
    this.node.setAttribute("height", r*2+this.shadowOffset);
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
class GraphicLine{
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
}

graphicNodes.push(new GraphicNode("NODE 1", 130, 153, 196/2));
graphicNodes.push(new GraphicNode("NODE 2", 220, 373, 118/2));
graphicNodes.push(new GraphicNode("NODE 3", 435, 381, 174/2));
graphicNodes.push(new GraphicNode("NODE 4", 372, 169, 138/2));
graphicNodes.push(new GraphicNode("NODE 5", 353, 553, 118/2));
graphicNodes.push(new GraphicNode("NODE 6", 546, 553, 118/2));
graphicNodes.push(new GraphicNode("NODE 7", 640, 383, 118/2));
graphicNodes.push(new GraphicNode("NODE 8", 555, 243, 118/2));
graphicNodes.push(new GraphicNode("NODE 9", 555, 94, 118/2));

graphicLines.push(new GraphicLine(graphicNodes[0],graphicNodes[1]));
graphicLines.push(new GraphicLine(graphicNodes[0],graphicNodes[2]));
graphicLines.push(new GraphicLine(graphicNodes[0],graphicNodes[3]));
graphicLines.push(new GraphicLine(graphicNodes[3],graphicNodes[7]));
graphicLines.push(new GraphicLine(graphicNodes[3],graphicNodes[8]));
graphicLines.push(new GraphicLine(graphicNodes[2],graphicNodes[4]));
graphicLines.push(new GraphicLine(graphicNodes[2],graphicNodes[5]));
graphicLines.push(new GraphicLine(graphicNodes[2],graphicNodes[6]));
graphicLines.push(new GraphicLine(graphicNodes[3],graphicNodes[2]));
