//Node

function Node (options)
{
    return{
    walkable: options.walkable,        
    position: 
    {
        x: options.x,
        y:options.y
    },
        goal:false,
        start:false,
        gCost:0,
        hCost:0,
        fCost:0,
        getFCost:function() {
            this.fCost=this.gCost+this.hCost;
            return this.fCost;
        },
        parent:null,
        height:0
    }
   
    
    
}
