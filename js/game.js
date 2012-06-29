
var physics = new Physics() ;
var graphics = new Graphics() ;

world =physics.createWorld() ;
physics.createGround() ;

var actors = new Array() ;

function Actor()
{
	this.body;
	this.sprite;
	
	this.draw = function(){
		this.sprite.setX(  this.body.GetPosition().x * physics.b2Ratio );
		this.sprite.setY( this.body.GetPosition().y * physics.b2Ratio ) ;
		this.sprite.setRotation(this.body.GetAngle());
	};
}

var layer ;

function addRectActor(layer, orientation, power)
{
	w = Math.random() * 50 ;
	h = Math.random() * 50 ;
	w = 0.3 * 50 ;
	h = 0.3  * 50 ;
	y = Math.random() *10 ;
	x = Math.random() *300 ;
	y = 200 ;
	x = 300 ;
	if(!orientation)orientation = 0 ;
	if(!power)power = 0 ;
	power = power * 0.005 ;
	hi = Math.sin(orientation * 3.14/180)  * -1 * power;
	wi = Math.cos(orientation * 3.14/180) * -1 * power ;
	
	hexagon = graphics.createRectSprite(w, h) ;
	body = physics.createRectBody(w , h , x, y , wi, hi);
	
	actor = new Actor();
	actor.body = body ;
	actor.sprite = hexagon ;
	
	actors.push(actor);
	 graphics.addSprite(hexagon, layer);
}


      window.onload = function() {
    	  
    	  var onFrameHandler = function (frame)
    	  {
		       world.Step(  1 / 40   //frame-rate
		            ,  10       //velocity iterations
		            ,  10       //position iterations
		         );
		         world.DrawDebugData();
		         world.ClearForces();
		         world.DrawDebugData();
		         for (var i = 0 ; i < actors.length ; i++)actors[i].draw();
    	  };
      
    	  layer = graphics.createStage("container",300, 300 ) ;
    	  
    	  graphics.setOnFrameHandler(onFrameHandler);
    	  
    	  physics.drawDebug(document.getElementById("canvas").getContext("2d"));
        
      } ;
        
      
      var socket = io.connect('http://192.168.0.122:8080/game');
      socket.on('fire', function (data) {
      	addRectActor(layer, data.orientation, data.power) ;
        });
      
