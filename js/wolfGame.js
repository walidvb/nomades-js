/*---------------------------IGNORER------------------------*/
function Game(wolf, sheepList, update, controls) {

//canvas
var c = document.createElement('canvas');
console.log(document.getElementById('instrucations'));
if(document.getElementById('instructions'))
{
	var offsetX = (document.getElementById('instructions') ? document.getElementById('instructions').offsetWidth*1.1 : 10)
	var width = document.getElementsByClassName('container')[0] ? document.getElementsByClassName('container')[0].offsetWidth : window.innerWidth*0.95;
	c.width = width-offsetX;
}
else
{
	c.width = window.innerWidth*0.95
}
var offsetY = (document.getElementById('menu') ? document.getElementById('menu').offsetHeight*1.2 : 10 );
c.height = window.innerHeight-offsetY;
if(document.getElementById('main'))
{
	document.getElementById('main').appendChild(c);
}
else {
		document.body.appendChild(c);

}
var ctx = c.getContext("2d");


//images
var wolfImg = new Image();
wolfImg.src = "http://pokemon.lebeaufourbi.fr/wp-content/uploads/2011/12/dessiner-loup_etape1.gif";
var defeatedWolfImg = new Image();
defeatedWolfImg.src = "http://ec.l.thumbs.canstockphoto.com/canstock5791371.jpg";

var sheepSickImg = new Image();
sheepSickImg.src = "http://bestclipartblog.com/clipart-pics/sheep-clipart-3.gif";
var sheepImg = new Image();
sheepImg.src = "http://free.clipartof.com/450/54-Free-Cartoon-Sheep-Clipart-Illustration.jpg";
var sheepDeadImg = new Image();
sheepDeadImg.src = "http://www.clipartoday.com/_thumbs/034/T/Tombstone_2_tns.png";
var charSize = {width: 100, height: 100};

wolf.pos = {
	x : 0,
	y : 0
};
wolf.img = wolfImg;
//dessiner un personnage
function draw(character) {
	var size = character.size || charSize;
	ctx.drawImage(character.img, character.pos.x, character.pos.y, charSize.width, charSize.height);
}

//dessiner tous les moutons de la liste
function drawSheep() 
{
		//nb maximum de moutons par colonne
		var maxLines = Math.floor(c.height / charSize.height);
		currentColumn = 0;

		for(var i = 0; i < sheepList.length; i++) 
		{
			var mySheep = sheepList[i];
			//Si on arrive au bout de la hauteur, passer a la colonne suivante
			if(i%maxLines == 0) 
			{
				currentColumn++;
			}
			mySheep.pos = {};
			mySheep.pos.x = c.width - currentColumn * charSize.width;
			mySheep.pos.y = i%maxLines * charSize.height;

			mySheep.img = mySheep.dead ? sheepDeadImg : (mySheep.sick ? sheepSickImg : sheepImg);
			draw(mySheep);
		}

	}
	//verifier que les fonctions existent:
	wolf.eat = wolf.eat || function(){};
	wolf.eatAll = wolf.eatAll || function(){};


	drawGame = function() {
		ctx.clearRect(0, 0, c.width, c.height);
		wolf.img = (wolf.defeated) ? defeatedWolfImg : wolfImg;
		draw(wolf);
		drawSheep();
	}

	//La fonction qui devrait pouvoir etre appelee depuis n'importe ou
	this.update = function(){
		update();
		drawGame();
	}

	this.pause = function() {
		this.paused = !this.paused;
	}
	this.paused = false;
	var game = this;
	setInterval(function(){
		if(!game.paused)
		{
			game.update();
		}

	}, 1000);

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

  	//retourner l'instance du jeu
	return this;
}
