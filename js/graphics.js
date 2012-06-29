function Graphics( )
{
	this.stage = null ;
	this.layers = new Array();
	
	this.onFrameHandler = function(frame){} ;
	this.delegateOnFrameHandler = null ;
	
	this._onFrameHandler = function(frame)
	{
		for ( var i in this.layers ) this.layers[i].draw() ;
	} ;
	
	this.setOnFrameHandler = function(handler, delegate)
	{
		this.onFrameHandler = handler ;
		this.delegateOnFrameHandler = delegate;
	};
	
	this.createStage = function (  container, width, height )
	{
		this.stage = new Kinetic.Stage({
			container: container ,
			width:width ,
			height: height
		});
		var layer = this.createLayer();
		this.stage.onFrame((function(delegate){
			return function(frame){
				delegate.delegateOnFrameHandler.onFrameHandler(frame);
				delegate._onFrameHandler(frame);
			};
		})(this)) ;
		this.stage.start();
		return layer ;
	} ;
	
	this.createLayer = function()
	{
		var newLayer  = new Kinetic.Layer();
		this.layers.push(newLayer);
		this.stage.add(newLayer);
		return newLayer ;
	} ;
	
	this.createRectSprite = function (w, h)
	{
		return new Kinetic.Rect({
	        x: 0,
	        y: 0,
	        width: w ,
	        height: h ,
	        fill: "#00D2FF",
	        stroke: "black",
	        strokeWidth: 2,
	        offset: [ w/ 2 , h   / 2]
	      });
	} ;
	
	this.createCircleSprite = function (radius)
	{
		return new Kinetic.Circle({
	          radius: radius,
	          fill: "red",
	          stroke: "black",
	          strokeWidth: 2
	        });
	} ;
	
	this.addSprite = function(sprite, layer)
	{
		 layer.add(sprite);
	} ;
}

