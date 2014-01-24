var wolf = {};
var sheepList = [];
var sheep1 = {sick: true};
sheepList.push(sheep1);


wolf.eat = function(){
	sheepList.pop();
	console.log(sheepList.length);
}

//--------------------------Déroulement d'un tour
function update() {

}

//---------------------------Controls
function controls(key) {
	switch(key)
	{
		case 69:
		wolf.eat();
		break;
	}
}


var gameInstance;
window.onload = function()
{
	gameInstance = new Game(wolf, sheepList, update);
}

window.onkeydown = function(e) {
	e = e || window.event;
	var key = e.which || e.keyCode;
	console.log("key pressed: ", key);
	switch(key){
		case 39:
			gameInstance.update();
			break;
		case 32:
			gameInstance.pause();
			break;
		default:
			controls(key);
			gameInstance.update();
	}
}

function addSheep() {
	sheepList.push({});
}