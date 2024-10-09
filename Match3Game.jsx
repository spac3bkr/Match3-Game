///////////////////////////////////////////////////////////////////////////////////
/*The 'Match 3 Game' emulates the mechanics of a match-3 game within After Effects.
It uses the out point of a layer as the in point to start the falling animation.*/
///////////////////////////////////////////////////////////////////////////////////


//Starting dialog boxes to take the data from the inputs
var dialog = new Window("dialog"); 
    dialog.text = "Select grid size"; 
    dialog.orientation = "row"; 
    dialog.alignChildren = ["left","top"]; 
    dialog.spacing = 10; 
    dialog.margins = 17; 

// Grid setup panel
var gridSetup = dialog.add("panel", undefined, undefined, {name: "gridSetup", borderStyle: ""}); 
	gridSetup.text = "Grid"; 
	gridSetup.orientation = "column"; 
	gridSetup.alignChildren = ["left","center"]; 
	gridSetup.spacing = 13; 
	gridSetup.margins = 10; 

// Columns group
var columnsGroup = gridSetup.add("group", undefined, {name: "columnsGroup"}); 
	columnsGroup.orientation = "row"; 
	columnsGroup.alignChildren = ["left","center"]; 
	columnsGroup.spacing = 0; 
	columnsGroup.margins = 0; 

var columnsGroupLabel = columnsGroup.add("statictext", undefined, undefined, {name: "columnsGroupLabel"}); 
	columnsGroupLabel.text = "columns"; 
	columnsGroupLabel.preferredSize.width = 60; 

var columnsGroupInput = columnsGroup.add('edittext {properties: {name: "columnsGroupInput"}}'); 
	columnsGroupInput.text = 5; 
	columnsGroupInput.preferredSize.width = 40; 

// Rows group
var rowsGroup = gridSetup.add("group", undefined, {name: "rowGroup"}); 
	rowsGroup.orientation = "row"; 
	rowsGroup.alignChildren = ["left","center"]; 
	rowsGroup.spacing = 0; 
	rowsGroup.margins = 0; 

var rowsGroupLabel = rowsGroup.add("statictext", undefined, undefined, {name: "rowsGroupLabel"}); 
    rowsGroupLabel.text = "Rows"; 
    rowsGroupLabel.preferredSize.width = 60; 

var rowsGroupInput = rowsGroup.add('edittext {properties: {name: "rowsGroupInput"}}'); 
    rowsGroupInput.text = 5; 
    rowsGroupInput.preferredSize.width = 40; 
    rowsGroupInput.alignment = ["left","center"]; 

// Size group
var sizeGroup = gridSetup.add("group", undefined, {name: "sizeGroup"}); 
	sizeGroup.orientation = "row"; 
	sizeGroup.alignChildren = ["left","center"]; 
	sizeGroup.spacing = 0; 
	sizeGroup.margins = 0; 

var sizeGroupLabel = sizeGroup.add("statictext", undefined, undefined, {name: "sizeGroupLabel"}); 
	sizeGroupLabel.text = "Tile size"; 
	sizeGroupLabel.preferredSize.width = 60; 

var sizeGroupInput = sizeGroup.add('edittext {justify: "left", properties: {name: "sizeGroupInput"}}'); 
	sizeGroupInput.text = 100; 
	sizeGroupInput.preferredSize.width = 40; 
	sizeGroupInput.alignment = ["left","center"]; 

/*Cascade selection
var checkbox1 = gridSetup.add("checkbox", undefined, undefined, {name: "checkbox1"}); 
checkbox1.text = "Cascade"; 
checkbox1.preferredSize.height = 15;*/

// Comp setup panel
// ======
var compSetup = dialog.add("panel", undefined, undefined, {name: "compSetup"}); 
    compSetup.text = "Composition"; 
    compSetup.orientation = "column"; 
    compSetup.alignChildren = ["left","top"]; 
    compSetup.spacing = 10; 
    compSetup.margins = 10; 

// Frame rate group
// ======
var frameRateGroup = compSetup.add("group", undefined, {name: "frameRateGroup"}); 
    frameRateGroup.orientation = "row"; 
    frameRateGroup.alignChildren = ["left","center"]; 
    frameRateGroup.spacing = 10; 
    frameRateGroup.margins = 0; 

var frameRateGroupLabel = frameRateGroup.add("statictext", undefined, undefined, {name: "frameRateLabel"}); 
	frameRateGroupLabel.text = "Frame rate"; 
	frameRateGroupLabel.preferredSize.width = 70; 

var frameRateGroupInput = frameRateGroup.add('edittext {properties: {name: "frameRateInput"}}'); 
	frameRateGroupInput.text = 60; 	
	frameRateGroupInput.preferredSize.width = 40; 

// Duration group
// ======
var durationGroup = compSetup.add("group", undefined, {name: "durationGroup"}); 
	durationGroup.orientation = "row"; 
	durationGroup.alignChildren = ["left","center"]; 
	durationGroup.spacing = 10; 
	durationGroup.margins = 0; 

var durationGroupLabel = durationGroup.add("statictext", undefined, undefined, {name: "durationLabel"}); 
	durationGroupLabel.text = "Duration(s)"; 
	durationGroupLabel.preferredSize.width = 70; 

var durationGroupInput = durationGroup.add('edittext {properties: {name: "durationInput"}}'); 
	durationGroupInput.text = 30; 
	durationGroupInput.preferredSize.width = 40; 

// Buttons group
// ======
var buttonsSetup = dialog.add("group", undefined, {name: "group5"}); 
	buttonsSetup.orientation = "column"; 
	buttonsSetup.alignChildren = ["fill","center"]; 
	buttonsSetup.spacing = 11; 
	buttonsSetup.margins = 0; 

var ok = buttonsSetup.add("button", undefined, undefined, {name: "ok"}); 
    ok.text = "OK"; 

var cancel = buttonsSetup.add("button", undefined, undefined, {name: "cancel"}); 
    cancel.text = "Cancel"; 

//function to check values
ok.onClick = function() {

	//Validate fields

	try {
		gridGenesis(parseInt(rowsGroupInput.text) , parseInt(columnsGroupInput.text) , parseInt(sizeGroupInput.text) , parseInt(durationGroupInput.text) , parseInt(frameRateGroupInput.text));
	  // This will raise an error
	} catch (e) {
		// Handle the error here
		alert(e.message);
	}

	dialog.close();

}

// Functionality for Cancel button (exit without doing anything)
cancel.onClick = function() {

	//Validate fields
	dialog.close();

}

dialog.show();
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

//Start grid function
function gridGenesis(rows,columns,tileSize,duration,frameRate){

	//Comp size
	var compHeight = tileSize * rows;
	var compWidth = tileSize * columns;

	//Main comp creation
	var grid = app.project.items.addComp("Grid", compWidth, compHeight, 1, duration, frameRate);

	//Setup tile
	var tile = app.project.items.addComp("Tile", tileSize, tileSize, 1, duration, frameRate);
	var shapeLayer = tile.layers.addShape();
	
	// Rename the shape layer (optional)
	shapeLayer.name = "Circle Shape";

	// Add a shape group to the shape layer
	var shapeGroup = shapeLayer.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
	shapeGroup.name = "Circle";

	// Add an Ellipse path (which is essentially a circle) to the shape group
	var ellipse = shapeGroup.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Ellipse");

	// Set the size of the circle (adjust as needed)
	ellipse.property("ADBE Vector Ellipse Size").setValue([(tileSize*0.7), (tileSize*0.7)]); // 200x200 pixel circle

	// Optionally, add a fill to the circle
	var fill = shapeGroup.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Fill");
	fill.property("ADBE Vector Fill Color").setValue([1, 0, 0]); // Set color to red (RGB: [1, 0, 0])

	//Starting position
	var positionX = tileSize / 2;
	var positionY = compHeight - (tileSize / 2);

	var bounce = 0.9;
	var stepDuration = 0.12;

	//Define main expressions
	var sliderExpression = "t = time; \n" + "start = outPoint; // Start the animation at the out-point \n" + "stepDuration = " + stepDuration + " // Duration of each step \n" + "if (time > outPoint){\n\n"+ "// Define the total range (0 to " + tileSize + ") split into 3 steps\n" + "step1Start = 0;\n" + "step1End = " + tileSize + "; // First step\n" + "step2Start = " + tileSize + ";\n"+"step2End = (" + tileSize + "*" + bounce + ")" + "; // Second step\n"+"step3Start = (" + tileSize + "*" + bounce + ");\n" + "step3End = " + tileSize + "; // Third step\n"+"// Time ranges for each step\n"+"step1EndTime = start + " + stepDuration + "; // End time for step 1\n"+"step2EndTime = start + 2 * " + stepDuration + "; // End time for step 2\n"+"step3EndTime = start + 3 * " + stepDuration + "; // End time for step 3\n"+"// Animate in steps\n"+"if (t <= step1EndTime) {\n"+"// Step 1: Animate from 0 to " + tileSize + "\n"+"easeIn(t, start, step1EndTime, step1Start, step1End);\n"+"} else if (t <= step2EndTime) {\n"+"// Step 2: Animate from " + tileSize + " to " + (tileSize * 0.9) + "\n"+"easeOut(t, step1EndTime, step2EndTime, step2Start, step2End);\n"+"} else if (t <= step3EndTime) {\n"+"// Step 3: Animate from " + (tileSize*0.9) + " to " + tileSize + "\n"+"easeIn(t, step2EndTime, step3EndTime, step3Start, step3End);\n"+"} else {\n"+"// After the final step, hold the last value " + tileSize + "\n"+"step3End;\n"+"}\n"+"}else{\n"+"0;\n"+"}\n";

	for (columIndex = 1 ; columIndex <= columns ; columIndex++){

		//Reset row index
		rowIndex = 1;

		//First element of the colum and define label color
		var layer = grid.layers.add(tile);
		layer.position.setValue([positionX, positionY, 0.0]);
		layer.label = 10;

		//Add slider (Renombrar offset?)
		var slider = layer.property("ADBE Effect Parade").addProperty("ADBE Slider Control");
		slider.property("Slider").expression = sliderExpression;

		//Position property + expression
		var layerPosition = layer.property("ADBE Transform Group").property("ADBE Position");
		layerPosition.expression = "offset = effect('Slider Control')('Slider');\ntransform.position = [" + positionX + "," + positionY + " + offset]";

		//CHANGE LABEL COLOR STARTING COLUM
		while(	rowIndex  < rows){
			
			//Next alement above the last oone
			var layer = grid.layers.add(tile);
			layer.position.setValue([positionX, positionY, 0.0]);
			layer.label = 2;
			
			//Add Slider
			var slider = layer.property("ADBE Effect Parade").addProperty("ADBE Slider Control");
			slider.property("Slider").expression = sliderExpression;

			//Position property + expression
			var layerPosition = layer.property("ADBE Transform Group").property("ADBE Position");
			layerPosition.expression = "offset = effect('Slider Control')('Slider')\n" + "if(time > outPoint){" + "delay=0" + "}else{" + "delay = thisComp.layer('CTRL').effect('Delay')('Slider')//DEFINIR AL CAPA DE CTRL\n" + "}" + "currentPosition = thisComp.layer(index+1).transform.position.valueAtTime(time - delay)\n" + "transform.position = [" + positionX + " , currentPosition[1] - (" + tileSize + " - offset)]\n";

			rowIndex++;

		}

		//XPosition for the next element
		positionX += tileSize;

	}

	//CTRL layer to control Delay and Bounce. Default values defined
	var adjustmentLayer = grid.layers.addSolid([1, 1, 1], "CTRL", compWidth, compHeight, 1);
	adjustmentLayer.adjustmentLayer = true;
	adjustmentLayer.locked = true;
	sliderControls = {"Delay" : 0.06};

	for (var key in sliderControls) {

		//Iterating all the elements within sliderControls
		slider = adjustmentLayer.property("ADBE Effect Parade").addProperty("ADBE Slider Control");
		slider.name = key;
		slider.property("Slider").setValue(sliderControls[key]); 

	}

	//Open the grid
	var viewer = grid.openInViewer();
	viewer.setActive();
}











