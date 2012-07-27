function Box(id, color) {
	this.id = id;
	this.color = color;
}
var boxes = [];
var doneBoxes = [];
var pallet = ['red', 'yellow', 'green', 'purple'];
var dimension = 20;
var boxWidth = 20;
var canvasSize = dimension * boxWidth + 100;
var canvas, ctx;
var steps = 0;

function init() {
	canvas = document.getElementById("color");  
	ctx = canvas.getContext("2d");  
	steps = 0;

	var id = 0;
	for (var i = 0; i < dimension; i++) {
		for (var j = 0; j < dimension; j++) {
			var c = getColor();
			var b = new Box(id, c);
			boxes.push(b);
			ctx.fillStyle = c;
			var col = to2d(id).col;
			var row = to2d(id).row;
			var x = col * boxWidth + 100;
			var y = row * boxWidth + 100;
			ctx.fillRect(x, y, boxWidth, boxWidth);
			id++;
		}
	}
	document.getElementById('steps').innerHTML = steps;

	eventBind();
}
function eventBind() {
	var red = document.getElementById('red-button');
	var yellow = document.getElementById('yellow-button');
	var green = document.getElementById('green-button');
	var purple = document.getElementById('purple-button');

	red.addEventListener("click", function(){convertboxes('red')}, false);
	yellow.addEventListener("click", function(){convertboxes('yellow')}, false);
	green.addEventListener("click", function(){convertboxes('green')}, false);
	purple.addEventListener("click", function(){convertboxes('purple')}, false);

}

function draw() {
	var id = 0;
	for (var i = 0; i < dimension; i++) {
		for (var j = 0; j < dimension; j++) {
			var b = boxes[id];
			var c = b.color;
			ctx.fillStyle = c;
			var col = to2d(id).col;
			var row = to2d(id).row;
			var x = col * boxWidth + 100;
			var y = row * boxWidth + 100;
			ctx.fillRect(x, y, boxWidth, boxWidth);
			id++;
		}
	}
	document.getElementById('steps').innerHTML = steps;

}
function getSurroundBoxes(box){
	var result = [];
	if (to2d(box.id).col+1 < dimension) result.push(boxes[box.id+1]);
	if (to2d(box.id).col-1 >= 0) result.push(boxes[box.id-1]);
	if (to2d(box.id+dimension).row < dimension) result.push(boxes[box.id+dimension]);
	if (to2d(box.id-dimension).row >= 0) result.push(boxes[box.id-dimension]);
	return result;
}

function getColor() {
	return pallet[Math.floor(Math.random()*4)];
}

function to2d(id) {
	var col = id % dimension;
	var row = id / dimension;
	return {row: Math.floor(row), col: col};
} 
function toId(dim) {
	var col = dim.col;
	var row = dim.row;
	return row * 20 + col;
}
function changeColor(box, color) {
	boxes[box].color = color;

}
function convertboxes(color) {
	if (doneBoxes.length == 0) {
		doneBoxes.push(boxes[0]);
	}
	var pre = doneBoxes.length;
	for(var i = 0; i < pre; i++) {
		var b = doneBoxes[i];
		var surround = getSurroundBoxes(b);
		for (var x = 0, len = surround.length; x < len; x++) {
			if ((surround[x].color == color)&& !contain(doneBoxes, surround[x])) {
				doneBoxes.push(surround[x]);
			}
		}
	}
	var after = doneBoxes.length;
	if (pre == after) {
		for (var i = 0, len = doneBoxes.length; i < len; i++) {
			boxes[doneBoxes[i].id].color = "grey";
		}
		draw();
		steps ++;
	} else {
		convertboxes(color);
	}


}
function contain(mother, child) {
	for (var i = 0; i < mother.length; i++) {
		if (mother[i].id == child.id) {
			return true;
		}
	}
	return false;
}
