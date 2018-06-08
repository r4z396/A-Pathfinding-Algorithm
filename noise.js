
function generateHeigthMap()
{
    var seed=document.getElementById('seed').value;
var frequency=document.getElementById('frequency').value;
var amplitude=document.getElementById('amplitude').value;
var lacunarity=document.getElementById('lacunarity').value/10;
var persistance=document.getElementById('persistance').value/10;
var octaves=document.getElementById('octaves').value;

    reset();
    var pn = new Perlin(Math.random(0,1000));
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
        var tempA=amplitude;
        var tempF=frequency;
       
       for (var k=0; k < octaves; k++)
    {
        var tempH=pn.noise(x/10*frequency, (y/10*frequency*amplitude), 0);
        //console.log(tempH);
        switch (true) {
            case (tempH>0.2&&tempH<=0.44):
               
                nodeGrid[x][y].height=1;        
                break
            case (tempH>0.44&&tempH<=0.49):
                
                        nodeGrid[x][y].height=2;
                break
            case (tempH>0.49&&tempH<=0.52):
               
                        nodeGrid[x][y].height=3;
                break
            case (tempH>0.52&&tempH<=0.7):
              
                        nodeGrid[x][y].height=4;
                break
            case(tempH> 0.7&&tempH<=1):
               
                        nodeGrid[x][y].height=5;
                break
            default:
              
                        nodeGrid[x][y].height=0;
                break
               

                //ctx.fillStyle = "rgba(255, 0, 255, 0.5)";
            }
        frequency*=lacunarity;
        amplitude*=persistance;
        //console.log(pn.noise(x/10, y/10, 0));
    }
        amplitude=tempA;
        frequency=tempF;
    }       
    }
     gridGenerated=true;
    heigthGrid=true;
  redraw();
  }
  

   
  
