function Physics() {
	
	this.b2Ratio = 30 ;
	
	this.world = null ;
		
	var   b2Vec2 = Box2D.Common.Math.b2Vec2
 	,	b2BodyDef = Box2D.Dynamics.b2BodyDef
 	,	b2Body = Box2D.Dynamics.b2Body
 	,	b2FixtureDef = Box2D.Dynamics.b2FixtureDef
// 	,	b2Fixture = Box2D.Dynamics.b2Fixture
 	,	b2World = Box2D.Dynamics.b2World
// 	,	b2MassData = Box2D.Collision.Shapes.b2MassData
 	,	b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
 	,	b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
	,	b2DebugDraw = Box2D.Dynamics.b2DebugDraw
    ;
	
	this.step = function()
	{
		this.world.Step(  1 / 40  ,  10      ,  10    );
		this.world.DrawDebugData();
		this.world.ClearForces();
		this.world.DrawDebugData();
	};
	
	this.createWorld = function() {
			this.world = new b2World(
					 new b2Vec2(0, 10)    //gravity
					 ,  true                 //allow sleep
					 );       
			return this.world ;
		} ; 
		
		this.getDefaultFixtureDef = function()
		{
			var fixDef = new b2FixtureDef;
		    fixDef.density = 1.0;
		    fixDef.friction = 0.5;
		    fixDef.restitution = 0.2;
		    return fixDef;
		};
		
		this.createBody = function(shape, w, h , x, y , wi, hi){
			
			w = w / this.b2Ratio;
			h = h/ this.b2Ratio ;
			x = x/ this.b2Ratio;
			y = y/ this.b2Ratio;
			
	    var fixDef = this.getDefaultFixtureDef();
		    
		var bodyDef = new b2BodyDef;
		bodyDef.type = b2Body.b2_dynamicBody;  
		  fixDef.shape = shape ;
		           bodyDef.position.x = x;
		       bodyDef.position.y = y;
		       var testBody = this.world.CreateBody(bodyDef);
		       testBody.CreateFixture(fixDef); 
		      // testBody.SetBullet(true);	
		       testBody.ApplyImpulse(new b2Vec2(wi, hi), new b2Vec2(testBody.GetPosition().x,testBody.GetPosition().y ));
		       
		       return testBody ;
		};
		
		this.createCircleBody = function (w, h , x, y , wi, hi)
		{
			var shape = new b2CircleShape;
	        shape.SetRadius(h / 2 / this.b2Ratio) ;
	        return this.createBody(shape, w, h, x, y, wi, hi) ;
		};
		
		this.createRectBody = function (w, h , x, y , wi, hi)
		{
			var shape = new b2PolygonShape;
	        shape.SetAsBox( w / 2 / this.b2Ratio ,  h / 2 / this.b2Ratio ); 
	        return this.createBody(shape, w, h, x, y, wi, hi) ;
		} ;
		
		this.drawDebug = function(context)
		{
			 var debugDraw = new b2DebugDraw();
				debugDraw.SetSprite(context);
				debugDraw.SetDrawScale(30.0);
				debugDraw.SetFillAlpha(0.3);
				debugDraw.SetLineThickness(1.0);
				debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
				this.world.SetDebugDraw(debugDraw);  
		} ;
		
		
		this.createGround = function(){
			var fixDef = new b2FixtureDef;
	         fixDef.density = 1.0;
	         fixDef.friction = 0.5;
	         fixDef.restitution = 0.2;
	             var bodyDef = new b2BodyDef;
	      bodyDef.type = b2Body.b2_staticBody;  
	      fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(300 / this.b2Ratio, 10/this.b2Ratio);
	      bodyDef.position.y = 300  / this.b2Ratio ;
	      bodyDef.position.x =300  / 2 / this.b2Ratio ;
	this.world.CreateBody(bodyDef).CreateFixture(fixDef); 
		} ;
		
		this.setContactListener = function()
		{
			var myListener = new Box2D.Dynamics.b2ContactListener;
			myListener.PostSolve = function(contact , impulse) {
			} ;
			this.world.SetContactListener(myListener);
		} ;
		
};





