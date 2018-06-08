// the game's canvas element
var canvas = null;
// the canvas 2d context
var ctx = null;

// the world grid: a 2d array of tiles
var world = [[]];


var path=[];

var nodeGrid=[[]];
var nodeGridSizeX;
var nodeGridSizeY;
var startNode;
var startNodeStatus=false;
var goalNode;
var goalNodeStatus=false;
var allowDiagonalMove=false;
// size in the world in sprite tiles
var worldWidth = 16;
var worldHeight = 16;
var gridGenerated=false;
var heigthGrid=false;

// size of a tile in pixels
var tileWidth = 42;
var tileHeight = 42;

// start and end of path
var pathStart = [worldWidth,worldHeight];
var pathEnd = [0,0];
var currentPath = [];

  var openList= [];
    var closeList= [];
    path=[];

//Visualitation
var speedVisualitation=0;
// ensure that concole.log doesn't cause errors
if (typeof console == "undefined") var console = { log: function() {} };


var pi_2 = Math.PI * 2;

var fixedDeltaTime = 0.01666666; // 60fps: 1 frame each 16.66666ms
var deltaTime = fixedDeltaTime;

var time = 0,
    FPS  = 0,
    frames    = 0,
    acumDelta = 0;


var fpsSpan;
var deltaTimeSpan;
var lastSearchSpan;
//var extraSpan = clock.querySelector('.seconds');


// the html page is ready
function onload() 
{
    
  console.log('Page loaded.');
  canvas = document.getElementById('gameCanvas');
  canvas.addEventListener("click", canvasClick, false);
  fpsSpan = document.getElementById('fps');
  deltaTimeSpan = document.getElementById("deltaTime");
  lastSearchSpan = document.getElementById("lastSearch");
  //canvas.addEventListener("click", canvasClick, false);
     
  

  ctx = canvas.getContext("2d");
    
    window.requestAnimationFrame = (function (evt) {
        return window.requestAnimationFrame    ||
            window.mozRequestAnimationFrame    ||
            window.webkitRequestAnimationFrame ||
            window.msRequestAnimationFrame     ||
            function (callback) {
                window.setTimeout(callback, fixedDeltaTime * 1000);
            };
    }) ();

    
    
    Loop();
 
    
}

function Loop ()
{
    requestAnimationFrame(Loop);
    
      var now = Date.now();
        deltaTime = now - time;
        if (deltaTime > 1000) // si el tiempo es mayor a 1 seg: se descarta
            deltaTime = 0;
        time = now;

        frames++;
        acumDelta += deltaTime;

        if (acumDelta > 1000)
        {
            FPS = frames;
            frames = 0;
            acumDelta -= 1000;
        }
        
        // transform the deltaTime from miliseconds to seconds
        deltaTime /= 1000;
    // Game logic -------------------
    Update();

    // Draw the game ----------------
    Draw();
}

function Update ()
{
  
}

function Draw ()
{
     // draw the FPS
    
    fpsSpan.innerHTML=FPS;
    deltaTimeSpan.innerHTML=Math.round(1 / deltaTime);
    
	
}


function loaded() 
{
 
  createWorld();
}

// fill the world with walls
function generateMap()
{
    reset();
  console.log('Generating Map...');
    //asign data
    worldWidth = document.getElementById('columns').value;
    worldHeight = document.getElementById('rows').value;
    canvas.width = worldWidth * tileWidth;
  canvas.height = worldHeight * tileHeight;
    
  
  // create emptiness
  for (var x=0; x < worldWidth; x++)
  {
    
      nodeGrid[x]=[];
    
    
    for (var y=0; y < worldHeight; y++)
    {
      
    nodeGrid[x][y]=Node({walkable:true,x: x, y: y});
    }
  }
  
  // scatter some walls
  for (var x=0; x < worldWidth; x++)
  {
    for (var y=0; y < worldHeight; y++)
    {
      if (Math.random() > 0.60){
         
        nodeGrid[x][y].walkable=false;
      }
        
    }
  }
  
  // calculate initial possible path
  // note: unlikely but possible to never find one...
  /*currentPath = [];
  while (currentPath.length == 0) 
  {
    pathStart = [Math.floor(Math.random()*worldWidth),Math.floor(Math.random()*worldHeight)];
    pathEnd = [Math.floor(Math.random()*worldWidth),Math.floor(Math.random()*worldHeight)];
    if (world[pathStart[0]][pathStart[1]] == 0)
      currentPath = findPath(world,pathStart,pathEnd,'Manhattan');
  }*/
    gridGenerated=true;
    heigthGrid=false;
  redraw();
  
}

function redraw() 
{
  

	console.log('drawing...');

	var spriteNum = 0;

	// clear the screen
	ctx.fillStyle = '#000000';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
    if(heigthGrid){
         for (var x=0; x < worldWidth; x++)
	   {
            for (var y=0; y < worldHeight; y++)
		  {
  		     
            if(nodeGrid[x][y].walkable){
                
                switch (nodeGrid[x][y].height) {
            case (1):
                ctx.fillStyle = "rgba(255, 0, 255, 0.8)";
                    
                break
            case (2):
                ctx.fillStyle = "rgba(255, 0, 255, 0.7)";
              
                break
            case (3):
                ctx.fillStyle = "rgba(255, 0, 255, 0.6)";
                   
                break
            case (4):
                ctx.fillStyle = "rgba(255, 0, 255, 0.5)";
                    
                break
            case(5):
               ctx.fillStyle = "rgba(255, 0, 255, 0.4)";
                 
                break
            case(0):
                ctx.fillStyle = "rgba(255, 0, 255, 0.9)";
                   
                break
                }
                //ctx.fillStyle = "rgba(255, 0, 255, 0.5)";
            }
  		    
            else
  		    ctx.fillStyle = "rgba(0, 0, 255, 0.5)";
            if(nodeGrid[x][y].goal)
            ctx.fillStyle = "rgba(0, 255, 255, 0.5)";
            if(nodeGrid[x][y].start)
            ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
            
            
            //DrawFunctions
                ctx.fillRect(x*tileWidth, y*tileHeight, tileWidth, tileHeight);
            
                ctx.strokeStyle = "red";

                ctx.strokeRect(x*tileWidth, y*tileHeight, tileWidth, tileHeight);
            
            ctx.fillStyle = "rgba(255, 255, 255, 1)";
            ctx.fillText("H: "+nodeGrid[x][y].height,x*tileWidth, y*(tileHeight)+tileHeight/2);
		  }
	       }
    }
    else {
         for (var x=0; x < worldWidth; x++)
	   {
            for (var y=0; y < worldHeight; y++)
		  {
  		     
            if(nodeGrid[x][y].walkable)
            ctx.fillStyle = "rgba(255, 0, 255, 0.5)";	    
            else
  		    ctx.fillStyle = "rgba(0, 0, 255, 0.5)";
            if(nodeGrid[x][y].goal)
            ctx.fillStyle = "rgba(0, 255, 255, 0.5)";
            if(nodeGrid[x][y].start)
            ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
            
            
            //DrawFunctions
                ctx.fillRect(x*tileWidth, y*tileHeight, tileWidth, tileHeight);
            
                ctx.strokeStyle = "red";

                ctx.strokeRect(x*tileWidth, y*tileHeight, tileWidth, tileHeight);
            
           
		  
	       }
    }

    }
    
}

function canvasClick(e)
{
	var x;
	var y;

	// grab html page coords
	if (e.pageX != undefined && e.pageY != undefined)
	{
		x = e.pageX;
		y = e.pageY;
	}
	else
	{
		x = e.clientX + document.body.scrollLeft +
		document.documentElement.scrollLeft;
		y = e.clientY + document.body.scrollTop +
		document.documentElement.scrollTop;
	}

	// make them relative to the canvas only
	x -= canvas.offsetLeft;
	y -= canvas.offsetTop;

	// return tile x,y that we clicked
	var cell =
	[
	Math.floor(x/tileWidth),
	Math.floor(y/tileHeight)
	];

	
        
    
     var ctrlPressed=0;
    var altPressed=0;
  var shiftPressed=0;



  var evt = e ? e:window.event;

   shiftPressed=evt.shiftKey;
   altPressed  =evt.altKey;
   ctrlPressed =evt.ctrlKey;
   self.status=""
    +  "shiftKey="+shiftPressed 
    +", altKey="  +altPressed 
    +", ctrlKey=" +ctrlPressed 
  
  /*if (shiftPressed || altPressed || ctrlPressed) 
   alert ("Mouse clicked with the following keys:\n"
    + (shiftPressed ? "Shift ":"")
    + (altPressed   ? "Alt "  :"")
    + (ctrlPressed  ? "Ctrl " :"")
   )
    */
      
  if (shiftPressed) 
   {
       //alert ("Shift Clicked")
       if(!startNodeStatus){
           nodeGrid[cell[0]][cell[1]].start=true;
           startNodeStatus=true;
           startNode=nodeGrid[cell[0]][cell[1]];
           console.log('start node '+ startNode.position.x+','+startNode.position.y);
           
           
       }       
       else if(!goalNodeStatus){
            nodeGrid[cell[0]][cell[1]].goal=true;
            goalNodeStatus=true;
            goalNode= nodeGrid[cell[0]][cell[1]];
            console.log('goal '+ goalNode.position.x+','+goalNode.position.y);
       }
   }
    else{
        // now we know while tile we clicked
	console.log('we clicked tile '+cell[0]+','+cell[1]);
    if(nodeGrid[cell[0]][cell[1]].walkable){
        nodeGrid[cell[0]][cell[1]].walkable=false;
    }
    else{
        nodeGrid[cell[0]][cell[1]].walkable=true;
        console.log('normal');
    }
    }
    
	redraw();
    
    
}

function reset ()
{
    
path=[];
    if(startNode){
        startNode.start=false;
startNode=null;
startNodeStatus=false;
goalNode.goal=false;
goalNode=false;
goalNodeStatus=false;
    redraw();
    }

    
}
