function Game(w, h)
{
	this.stageWidth = w;
	this.stageHeight = h;
	
	this.physics = new Physics() ;
	this.graphics = new Graphics() ;
	
	this.actors = new Array() ;
	
	this.layer = null ;
	
	this.start = function()
	{
		this.physics.createWorld() ;
		this.graphics.setOnFrameHandler(this.onFrameHandler, this);
		this.layer = this.graphics.createStage("container",this.stageWidth, this.stageHeight) ;
		this.physics.drawDebug(document.getElementById("canvas").getContext("2d"));
		this.createGround() ;
	} ;
	
	this.createGround = function()
	{
		var x = this.stageWidth / 2  ;
		var y = this.stageHeight - 25 ;
		var w = this.stageWidth + 100 ;
		var h = 50 ;
		
		this.physics.createRectBody(w, h, x, y, true);
		var sprite = this.graphics.createRectSprite(w, h);
		sprite.setX( x ); sprite.setY( y ) ;
		this.graphics.addSprite(sprite, this.layer) ;
	};
	
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
		power = Math.min ( power, 2000 )* 0.01 ;
		
		var spec  = null ;
		if(Math.random() > 0.5  ) spec = CircleSpec ;
			else  spec = BrickSpec ;
		
		actor = new Actor(spec, this.layer, this.graphics, this.physics);
		actor.create(w, h, x, y ) ;
		this.physics.impulse(actor.body, orientation  , power) ;
		this.actors.push(actor);
	};

}

      
      
      
