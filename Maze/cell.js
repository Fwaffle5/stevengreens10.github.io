function Cell(x,y){ // Constructor for cell object
    this.col = x;
    this.row = y;
    
    //Booleans for drawing walls
    this.top = true;
    this.bottom = true;
    this.left = true;
    this.right = true;
    //Cell should only be visited once
    this.visited = false;

    this.display = function(){
        var x = this.col * scl;
        var y = this.row * scl;
        
        push();
            strokeWeight(0);
            noFill();
            if(this.visited) fill(200,0,220);
            if(this == current) fill(0,255,0,100);
            
            var inStack = false;
            for(var i = 0; i < stack.length ; i++){
                if(stack[i] == this) inStack = true;
            }
            
            if(inStack) fill(200,200,0);
            if(this == end) fill(255,0,0);

            
            rect(x,y,scl,scl);
        pop();
        
        stroke(255);
        //Top left to top right
        if(this.top) line(x,y,x+scl,y);
        //Top right to bottom right
        if(this.right) line(x+scl,y,x+scl,y+scl);
        //Bottom right to bottom left
        if(this.bottom) line(x+scl,y+scl,x,y+scl);
        //Bottom left to top left
        if(this.left) line(x,y+scl,x,y);
        
      
    }
    
    this.pickNeighbor = function(){
        
        var neighbors = [];
        var x = this.col;
        var y = this.row;
        var right = grid[this.getIndex(x+1,y)];
        var left = grid[this.getIndex(x-1,y)];
        var top = grid[this.getIndex(x,y-1)];
        var bottom = grid[this.getIndex(x,y+1)];
        
        //Push all the neighbors into an array if they haven't been visited
        if(right && !right.visited){
             neighbors.push(right);
        }
        if(left && !left.visited){
             neighbors.push(left);
        }
        if(top && !top.visited){
             neighbors.push(top);
        }
        if(bottom && !bottom.visited) {
             neighbors.push(bottom);
        }
        
        //Pick a random neighbor from the array if there are any available
        if(neighbors.length > 0){
            var r = floor(random(neighbors.length));
            var n =  neighbors[r];
            return n;
        }else{
            return undefined;
        }
        
    }
    
    this.getIndex = function(x,y){
        if(x < 0 || x > cols-1 || y < 0 || y > rows-1){
            return -1; //Returns an index that doesn't exist if the cell is out of the board
        }else{
            return x + y * cols;
        }
    }
}