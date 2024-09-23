
/*ADD ESSENTIAL GRAPHICS SO THE USER CAN MODIFY THE AMOUNT OF TILES*/

//Input setup
var frameRate = 60.0;
var rows = 10;
var colums = 10;
var tileSize = 10; //SQUARE
var duration = 30;
var margins = 0;


//Comp size
var compHeight = tileSize * rows + margins;
var compWidth = tileSize * colums + margins;


//Main comp creation
var grid = app.project.items.addComp("Grid", compWidth, compHeight, 1, duration, frameRate);
//grid.layers.addSolid([1, 1, 1], "CTRL", compWidth, compHeight, 1);


//Setup tile
var tile = app.project.items.addComp("Tile", tileSize, tileSize, 1, duration, frameRate);
tile.layers.addSolid([1.0,0.1,0.5], "Solid", tileSize, tileSize, 1, duration);

//GET 1ST TILE POSITION
var positionX = tileSize / 2; // +  (tileSize / 2);
var positionY = compHeight - (tileSize / 2); // + (tileSize / 2);

var layer = "";
var slider = "";

//DELAY IN POSITION
/*delay = thisComp.layer("CTRL").effect("delay")("Slider");
thisComp.layer(thisLayer.index+1).transform.position.valueAtTime(time - delay) + [0, -80] + value;*/

for (v = 1 ; v <= colums ; v++){

	//Reset Colum index
	i = 1;

	//First element of the colum and define label
	var layer = grid.layers.add(tile);
	layer.position.setValue([positionX, positionY, 0.0]);
	layer.label = 10;

	//Add slider (Renombrar offset?)
	var slider = layer.property("ADBE Effect Parade").addProperty("ADBE Slider Control");
	slider.property("Slider").expression = "t = time; \n" + "start = outPoint; // Start the animation at the out-point \n" + "stepDuration = 0.12; // Duration of each step (1 second per step) \n" + "if (time > outPoint){\n"+ "// Define the total range (0 to 500) split into 3 steps\n" + "step1Start = 0;\n" + "step1End = " + tileSize + "; // First step\n" + "step2Start = " + tileSize + ";\n"+"step2End = " + (tileSize-5) + "; // Second step\n"+"step3Start = " + (tileSize-5) + ";\n"+"step3End = " + tileSize + "; // Third step\n"+"// Time ranges for each step\n"+"step1EndTime = start + stepDuration; // End time for step 1\n"+"step2EndTime = start + 2 * stepDuration; // End time for step 2\n"+"step3EndTime = start + 3 * stepDuration; // End time for step 3\n"+"// Animate in steps\n"+"if (t <= step1EndTime) {\n"+"// Step 1: Animate from 0 to 166.67\n"+"linear(t, start, step1EndTime, step1Start, step1End);\n"+"} else if (t <= step2EndTime) {\n"+"// Step 2: Animate from 166.67 to 333.33\n"+"ease(t, step1EndTime, step2EndTime, step2Start, step2End);\n"+"} else if (t <= step3EndTime) {\n"+"// Step 3: Animate from 333.33 to 500\n"+"linear(t, step2EndTime, step3EndTime, step3Start, step3End);\n"+"} else {\n"+"// After the final step, hold the last value (500)\n"+"step3End;\n"+"}\n"+"}else{\n"+"0;\n"+"}\n;";
	
	// Get the Position property of the layer
	var layerPosition = layer.property("ADBE Transform Group").property("ADBE Position");

	var positionExpression = "extra = effect('Slider Control')('Slider');\n transform.position = [" + positionX + "," + positionY + "+extra]";
	layerPosition.expression = positionExpression;

	//CHANGE LABEL COLOR STARTING COLUM
	while(i < rows){
		
		var layer = grid.layers.add(tile);
		//layer.position.setValue([positionX, positionY, 0.0]);
		//layer.position.setValue([positionX, positionY, 0.0]);
		var slider = layer.property("ADBE Effect Parade").addProperty("ADBE Slider Control");

		 // Get the Position property of the layer
		 var layerPosition = layer.property("ADBE Transform Group").property("ADBE Position");

		 // Add an expression to the Position property
		 var delayExpression = "delay = thisComp.layer('CTRL').effect('delay')('Slider');\n" + "thisComp.layer(thisLayer.index+1).transform.position.valueAtTime(time - delay) + [0, -" + tileSize + "];";
		 //var delayExpression = "thisComp.layer(index+1).transform.position";
		
		 layerPosition.expression = delayExpression;

		
		//slider.name = "setup";
		//var adjustmentLayer = grid.layers.addSolid([1, 1, 1], "CTRL", compWidth, compHeight, 1);
		//adjustmentLayer.property("ADBE Effect Parade").addProperty("ADBE Slider Control");
		
		//positionY += tileSize;
		i++;
		

	}

	positionX += tileSize;

	//var positionY = (margins / 2) + (tileSize / 2);
	//var i=1;
	
}




//ADDING CONTROL LAYER & SLIDER
var adjustmentLayer = grid.layers.addSolid([1, 1, 1], "CTRL", compWidth, compHeight, 1);
adjustmentLayer.adjustmentLayer = true;
adjustmentLayer.locked = true;
sliderControls = ["elasticity" , "bounce" , "freq" , "delay"];

for(i = 0 ; i < sliderControls.length ; i++ )
{
	slider = adjustmentLayer.property("ADBE Effect Parade").addProperty("ADBE Slider Control");
	slider.name = sliderControls[i];

}







