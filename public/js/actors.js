function Actor(spec, layer, g, p)
{
	this.body = null ;
	this.sprite = null ;
	
	this.graphics = g;
	this.layer = layer;
	this.physics = p;
	
	this.spec = new spec(g, p) ;
	
	this.draw = function(){
		this.sprite.setX(  this.body.GetPosition().x * this.physics.b2Ratio );
		this.sprite.setY( this.body.GetPosition().y * this.physics.b2Ratio ) ;
		this.sprite.setRotation(this.body.GetAngle());
	};
	
	this.create = function(w , h , x, y )
	{
		this.body   = this.spec.createBody(w , h , x, y );
		this.sprite = this.spec.createSprite(w, h) ;
		this.graphics.addSprite(this.sprite, this.layer);
	};
}

function BrickSpec(g, p)
{
	this.graphics = g;
	this.physics = p;
	
	this.createSprite = function(w , h , x, y )
	{
		return this.graphics.createRectSprite(w, h) ;
	};
	
	this.createBody = function(w , h , x, y )
	{
		return this.physics.createRectBody(w , h , x, y ) ;
	};
}

function CircleSpec(g, p)
{
	this.graphics = g;
	this.physics = p;
	
	this.createSprite = function(w , h , x, y )
	{
		return this.graphics.createCircleSprite(w / 2) ;
	};
	
	this.createBody = function(w , h , x, y)
	{
		return this.physics.createCircleBody(w , h , x, y ) ;
	};
}




