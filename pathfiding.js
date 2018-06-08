var start;


//Pathfiding algorithm
function findP(){
    start = new Date().getTime();
    openList= [];
    closeList= [];
    path=[];
    allowDiagonalMove = document.getElementById("allowDiagonal").checked;
    console.log(allowDiagonalMove);
    openList.push(startNode);
    speedVisualitation=document.getElementById("speedVisu").value;
    console.log(speedVisualitation);
    //console.log('Adding start node'+startNode.getFCost());
    //showLists(openList);
    //console.log("tamaño"+openList.length);
     for (var x=0; x < worldWidth; x++)
  {
    for (var y=0; y < worldHeight; y++)
    {
      
          //nodeGrid[x][y].gCost=0;
        //console.log(nodeGrid[x][y].gCost);
      
      
        
    }
  }
    //console.log(getFCost(startNode));
    setTimeout(nextFrame, 0);
    
    
    
    
}

function nextFrame() {
    console.log("next frame");
    if(openList.length>0){
        // console.log('Bucle');
        var currentNode=openList[0];
       
        for(var i=1;i<openList.length;i++){
            
            //console.log(getFCost(openList[i]));
            if(getFCost(openList[i])<getFCost(currentNode)||getFCost(openList[i])==getFCost(currentNode)&&openList[i].hCost<currentNode.hCost){
                currentNode=openList[i];
                
               /* ctx.fillStyle = "rgba(100, 100, 0, 0.5)";
                ctx.fillRect(openList[i].position.x*tileWidth, openList[i].position.y*tileHeight, tileWidth, tileHeight);*/
                    
            }
            
        }
        //ctx.fillStyle = "rgba(100, 100, 0, 0.3)";
        //ctx.fillRect(neighbours[i].position.x*tileWidth, neighbours[i].position.y*tileHeight, tileWidth, tileHeight);
        //ctx.fillRect(currentNode.position.x*tileWidth, currentNode.position.y*tileHeight, tileWidth, tileHeight);
        //ctx.fillStyle = "rgba(0, 0, 0, 1)";
                    //ctx.fillText(getFCost(neighbours[i]),neighbours[i].position.x*tileWidth, neighbours[i].position.y*tileHeight-10);
                            //ctx.fillText(getFCost(currentNode),currentNode.position.x*tileWidth, currentNode.position.y*tileHeight-10);
               
        //We remove the current node and push to the close list
        this.remove(openList,currentNode);
        
    
        closeList.push(currentNode);
        
        if(currentNode==goalNode){
            lastSearchSpan.innerHTML=new Date().getTime() - start;
            console.log('Finalizado');
            getPath(startNode,goalNode);
            return;
        }
        
    
    let neighbours = getNeighbours(currentNode);
   
        //Search nodes neigbours
       
        
        for(var i=0;i<neighbours.length;i++)
        {
            
            
            if(!neighbours[i].walkable||this.contains(closeList,neighbours[i])||!this.checkCanGo(currentNode.height,neighbours[i].height)){
               
                
            }
            else{
           
            var newCostToNeighbour= currentNode.gCost+getDistance(currentNode,neighbours[i]);
                //mirar coste multiplicar por altura de la diferencia o multiplicar por altura
                    if(currentNode.height!=neighbours[i].height)
                        newCostToNeighbour+=(20*neighbours[i].height);
            if(newCostToNeighbour<neighbours[i].gCost||!this.contains(openList,neighbours[i])){
                
               
                
                neighbours[i].gCost=newCostToNeighbour;
                neighbours[i].hCost=getDistance(neighbours[i],goalNode);
                neighbours[i].parent=currentNode;
                /*ctx.fillStyle = "rgba(255, 100, 100, 0.5)";
                    ctx.fillRect(neighbours[i].position.x*tileWidth, neighbours[i].position.y*tileHeight, tileWidth, tileHeight);*/
                ctx.fillStyle = "rgba(0, 0, 0, 1)";
                    ctx.fillText("F: "+getFCost(neighbours[i]),neighbours[i].position.x*tileWidth, neighbours[i].position.y*(tileHeight)+10);
                 ctx.fillText("h: "+neighbours[i].hCost,neighbours[i].position.x*tileWidth+5, neighbours[i].position.y*(tileHeight)+25);
                ctx.fillText("g: "+neighbours[i].gCost,neighbours[i].position.x*tileWidth+5, neighbours[i].position.y*(tileHeight)+40);
                
                if(!this.contains(openList,neighbours[i])){
                    openList.push(neighbours[i]);
                    
                   
                     
                    //ctx.fillRect(currentNode.position.x*tileWidth, currentNode.position.y*tileHeight, tileWidth, tileHeight);
                    
                }
            }
            }
            
            
                                           
        }
    }
        setTimeout(nextFrame,speedVisualitation );
    };

function getPath(node1,node2){
   
    var tempNode=goalNode;
    while(tempNode!=startNode){
        //console.log("añadiendo a path nodo");
        path.push(tempNode);
        tempNode=tempNode.parent;
    }
    path.reverse();
    draw(path);
    
    
}

function getFCost(node){
   return node.hCost+node.gCost;   
}

function checkCanGo(n1,n2){
    console.log(Math.abs(n1-n2));
    if(Math.abs(n1-n2)>1){
        
        return false;
    }
    else
        return true;
}

function getDistance(node1,node2){
    var distanceX=Math.abs(node1.position.x-node2.position.x);
    var distanceY=Math.abs(node1.position.y-node2.position.y);
   
    if(distanceX>distanceY){
        return 14*distanceY+(10*distanceX-distanceY);
    }
    else{
        return 14*distanceX+(10*distanceY-distanceX);
    }
    
}
function getNeighbours(elem){
    //console.log('getting neighbours');
    var neighbours= [];
    for(var x=-1;x<=1;x++){
         for(var y=-1;y<=1;y++){
             if(allowDiagonalMove){
                 //console.log("Alow DIAGONAL");
                 if((x==0&&y==0))
                    continue;
             }                 
             else if((x==0&&y==0)||(x!=0&&y!=0))
                continue;
            
             var checkX=elem.position.x+x;
             var checkY=elem.position.y+y;
             if(checkX>=0&&checkX<(worldWidth)&&checkY>=0&&checkY<(worldHeight)){
                 neighbours.push(nodeGrid[checkX][checkY]);
                
                 
             }
             
        }
    }
    return neighbours;
}
function remove(array, element) {
    const index = array.indexOf(element);
     //console.log('Elemento'+array.indexOf(element));
    if (index !== -1) {
        array.splice(index, 1);
   }
    
    
//array.splice( list.indexOf(element), 1 );
}
function showLists(list){
    
for (var i in list) 
{
   console.log("OpenList" );
  
}
    console.log(list.length);
  
}

function draw(list){
   // console.log("Pintando"+list.length);
    var i;
    
    for (i = 0; i < list.length;i++){
        (function(i) {
        setTimeout(function() { 
    
        //console.log("Pintando"+list.length);
        ctx.fillStyle = "rgba(0, 200, 0, 0.8)";
        ctx.fillRect(list[i].position.x*tileWidth, list[i].position.y*tileHeight, tileWidth, tileHeight);
        ctx.fillStyle = "rgba(0, 0, 0, 1)";
        ctx.fillText("F: "+getFCost(list[i]),list[i].position.x*tileWidth, list[i].position.y*(tileHeight)+10);
        ctx.fillText("h: "+list[i].hCost,list[i].position.x*tileWidth+5, list[i].position.y*(tileHeight)+25);
        ctx.fillText("g: "+list[i].gCost,list[i].position.x*tileWidth+5, list[i].position.y*(tileHeight)+40);
                
        /*ctx.fillStyle = "rgba(0, 0, 0, 1)";
        
        ctx.font="10px Georgia";
        console.log(list[i].hCost);*/
       // ctx.fillText(list[i].fCost,list[i].position.x*tileWidth, list[i].position.y*tileHeight);
       // console.log("x: "+list[i].position.x+" y:"+list[i].position.y)
        //DrawFunctions
                               }, 100 * i);
    })(i);
    }
    
    
}
    
function contains(a, obj) {
    var i = a.length;
    while (i--) {
       if (a[i] === obj) {
           return true;
       }
    }
    return false;
}


