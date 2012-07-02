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
		this.createBuilding(30) ;
		this.createBuilding(1000) ;
	} ;
	
	this.createBuilding = function(xstart)
	{
		var nbEtage = 9 ;
		var parEtage = 8;
		var w = 20 ;
		
		var startX= xstart;
		var startY= 430;
		
		var i = 0 ;
		var e = 0 ;
		
		for ( e = 0 ; e < nbEtage ; e++ )
		{
			for ( i = 0 ; i < parEtage - e  ; i++ )
			{
				x = startX +  (  i * w * 1.3  ) + (e * 2 * w / 3 );
				y= startY - (w * e ); 
				actor = new Actor(BrickSpec, this.layer, this.graphics, this.physics);
				actor.create(w, w, x, y) ;
				this.actors.push(actor);
			}
		}

	};
	
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
	
	this.fireBullet = function(player, orientation, power)
	{
		w = 0.4 * 50 ;
		h = 0.4* 50 ;
		y = 200 ;
		x =1100 ;
		
		
		if(!orientation)orientation = 0 ;
		if(!power)power = 0 ;
		power = Math.min ( power+300 , 2500 )* 0.01 ;
		
		if(player == 1)
		{
			x = 100 ;
			orientation = orientation * -1 +180 ;
		}
		
		actor = new Actor(CircleSpec, this.layer, this.graphics, this.physics);
		actor.create(w, h, x, y ) ;
		this.physics.setBullet(actor.body);
		this.physics.impulse(actor.body, orientation  , power) ;
		
		this.actors.push(actor);
	};

}

      
      
      
