function Game()
{
	this.physics = new Physics() ;
	this.graphics = new Graphics() ;
	
	this.actors = new Array() ;
	
	this.layer = null ;
	
	this.start = function()
	{
		this.physics.createWorld() ;
		this.physics.createGround() ;
		this.graphics.setOnFrameHandler(this.onFrameHandler, this);
		this.layer = this.graphics.createStage("container",1200, 500 ) ;
		this.physics.drawDebug(document.getElementById("canvas").getContext("2d"));
	} ;
	
	this.onFrameHandler = function (frame)
	{
		  this.physics.step();
	       for (var i = 0 ; i < this.actors.length ; i++) this.actors[i].draw();
	  };
	
	this.addActor = function(orientation, power)
	{
		w = 0.3 * 50 ;
		h = 0.3  * 50 ;
		y = 200 ;
		x = 300 ;
		
		if(!orientation)orientation = 0 ;
		if(!power)power = 0 ;
		power = power * 0.005 ;
		hi = Math.sin(orientation * 3.14/180)  * -1 * power;
		wi = Math.cos(orientation * 3.14/180) * -1 * power ;
		
		var spec  = null ;
		if(Math.random() > 0.5  ) spec = CircleSpec ;
			else  spec = BrickSpec ;
		
		actor = new Actor(spec, this.layer, this.graphics, this.physics);
		actor.create(w, h, x, y, wi, hi) ;
		this.actors.push(actor);
	};

}

      
      
      
