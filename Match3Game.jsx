///////////////////////////////////////////////////////////////////////////////////
/*The 'Match 3 Game' emulates the mechanics of a match-3 game within After Effects.
It uses the out point of a layer as the in point to start the falling animation.*/
///////////////////////////////////////////////////////////////////////////////////


// DIALOG
// ======
var dialog = new Window("dialog"); 
    dialog.text = "The Grid"; 
    dialog.preferredSize.width = 169; 
    dialog.preferredSize.height = 265; 
    dialog.orientation = "column"; 
    dialog.alignChildren = ["center","top"]; 
    dialog.spacing = 10; 
    dialog.margins = 20; 

// COMPNAMEGROUP
// =============
var compNameGroup = dialog.add("group", undefined, {name: "compNameGroup"}); 
    compNameGroup.preferredSize.width = 251; 
    compNameGroup.orientation = "row"; 
    compNameGroup.alignChildren = ["center","fill"]; 
    compNameGroup.spacing = 13; 
    compNameGroup.margins = 0; 

var nameLabel = compNameGroup.add("statictext", undefined, undefined, {name: "nameLabel"}); 
    nameLabel.text = "Comp Name"; 
    nameLabel.preferredSize.width = 76; 
    nameLabel.justify = "right"; 

var nameInput = compNameGroup.add('edittext {properties: {name: "nameInput"}}'); 
    nameInput.preferredSize.width = 160; 
    nameInput.alignment = ["center","fill"]; 

// GRIDSETUP
// =========
var gridSetup = dialog.add("panel", undefined, undefined, {name: "gridSetup", borderStyle: "white"}); 
    gridSetup.preferredSize.width = 250; 
    gridSetup.orientation = "row"; 
    gridSetup.alignChildren = ["left","fill"]; 
    gridSetup.spacing = 10; 
    gridSetup.margins = 10; 
    gridSetup.alignment = ["center","top"]; 

// GRIDSETUPGROUP
// ==============
var gridSetupGroup = gridSetup.add("group", undefined, {name: "gridSetupGroup"}); 
    gridSetupGroup.preferredSize.width = 144; 
    gridSetupGroup.orientation = "column"; 
    gridSetupGroup.alignChildren = ["left","center"]; 
    gridSetupGroup.spacing = 10; 
    gridSetupGroup.margins = 0; 
    gridSetupGroup.alignment = ["left","top"]; 

// COLUMNSGROUP
// ============
var columnsGroup = gridSetupGroup.add("group", undefined, {name: "columnsGroup"}); 
    columnsGroup.orientation = "row"; 
    columnsGroup.alignChildren = ["left","fill"]; 
    columnsGroup.spacing = 10; 
    columnsGroup.margins = 0; 
    columnsGroup.alignment = ["fill","center"]; 

var columnsLabel = columnsGroup.add("statictext", undefined, undefined, {name: "columnsLabel"}); 
    columnsLabel.text = "Colums"; 
    columnsLabel.preferredSize.width = 75; 
    columnsLabel.justify = "right"; 

var columnsInput = columnsGroup.add('edittext {properties: {name: "columnsInput" , enterKeySignalsOnChange: true}}'); 
    columnsInput.text = "5";
    columnsInput.onChanging = function(){newResolution(columnsInput.text , rowsInput.text , sizeInput.text)};
    columnsInput.preferredSize.width = 50; 
    

// ROWSGROUP
// =========
var rowsGroup = gridSetupGroup.add("group", undefined, {name: "rowsGroup"}); 
    rowsGroup.orientation = "row"; 
    rowsGroup.alignChildren = ["left","center"]; 
    rowsGroup.spacing = 10; 
    rowsGroup.margins = 0; 
    rowsGroup.alignment = ["left","center"]; 

var rowsLabel = rowsGroup.add("statictext", undefined, undefined, {name: "rowsLabel"}); 
    rowsLabel.text = "Rows"; 
    rowsLabel.preferredSize.width = 75; 
    rowsLabel.justify = "right"; 

var rowsInput = rowsGroup.add('edittext {properties: {name: "rowsInput" , enterKeySignalsOnChange: true}}'); 
    rowsInput.text = "5"; 
    rowsInput.onChanging = function(){newResolution(columnsInput.text , rowsInput.text , sizeInput.text)};
    rowsInput.preferredSize.width = 50; 

// SIZEGROUP
// =========
var sizeGroup = gridSetupGroup.add("group", undefined, {name: "sizeGroup"}); 
    sizeGroup.orientation = "row"; 
    sizeGroup.alignChildren = ["left","center"]; 
    sizeGroup.spacing = 10; 
    sizeGroup.margins = 0; 
    sizeGroup.alignment = ["left","center"]; 

var sizeLabel = sizeGroup.add("statictext", undefined, undefined, {name: "sizeLabel"}); 
    sizeLabel.text = "Tile Size"; 
    sizeLabel.preferredSize.width = 75; 
    sizeLabel.justify = "right"; 

var sizeInput = sizeGroup.add('edittext {properties: {name: "sizeInput"}}'); 
    sizeInput.text = "50"; 
    sizeInput.onChanging = function(){newResolution(columnsInput.text , rowsInput.text , sizeInput.text)};
    sizeInput.preferredSize.width = 50;

// RESOLUTIONGROUP
// ===============
var resolutionGroup = gridSetup.add("group", undefined, {name: "resolutionGroup"}); 
    resolutionGroup.enabled = false; 
    resolutionGroup.orientation = "row"; 
    resolutionGroup.alignChildren = ["left","center"]; 
    resolutionGroup.spacing = 0; 
    resolutionGroup.margins = 0; 

var resolutionLabel = resolutionGroup.add("statictext", undefined, undefined, {name: "resolutionLabel"}); 
    resolutionLabel.preferredSize.width = 58; 
   
    //Calculates the final resolution;
    function newResolution(columns , rows , size){
        resolutionLabel.text = (columns * size) + "x" + (rows * size); 
    }
   
    newResolution(columnsInput.text , rowsInput.text , sizeInput.text);
    

// COMPSETUPPANEL
// ==============
var compSetupPanel = dialog.add("panel", undefined, undefined, {name: "compSetupPanel"}); 
    compSetupPanel.preferredSize.width = 250; 
    compSetupPanel.orientation = "column"; 
    compSetupPanel.alignChildren = ["left","top"]; 
    compSetupPanel.spacing = 9; 
    compSetupPanel.margins = 10; 

// DURATIONGROUP
// =============
var durationGroup = compSetupPanel.add("group", undefined, {name: "durationGroup"}); 
    durationGroup.orientation = "row"; 
    durationGroup.alignChildren = ["right","fill"]; 
    durationGroup.spacing = 10; 
    durationGroup.margins = 0; 

var durationLabel = durationGroup.add("statictext", undefined, undefined, {name: "durationLabel"}); 
    durationLabel.text = "Duration"; 
    durationLabel.preferredSize.width = 75; 
    durationLabel.justify = "right"; 

var durationInput = durationGroup.add('edittext {properties: {name: "durationInput"}}'); 
    durationInput.text = "30"; 
    durationInput.preferredSize.width = 50; 
    durationInput.alignment = ["right","center"]; 

// FRAMERATEGROUP
// ==============
var frameRateGroup = compSetupPanel.add("group", undefined, {name: "frameRateGroup"}); 
    frameRateGroup.orientation = "row"; 
    frameRateGroup.alignChildren = ["left","fill"]; 
    frameRateGroup.spacing = 10; 
    frameRateGroup.margins = 0; 

var frameRateLabel = frameRateGroup.add("statictext", undefined, undefined, {name: "frameRateLabel"}); 
    frameRateLabel.text = "Frame Rate"; 
    frameRateLabel.preferredSize.width = 75; 
    frameRateLabel.justify = "right"; 

var frameRateInput = frameRateGroup.add('edittext {properties: {name: "frameRateInput"}}'); 
    frameRateInput.text = "30"; 
    frameRateInput.preferredSize.width = 50; 

// BUTTONS
// =======
var buttons = dialog.add("group", undefined, {name: "buttons"}); 
    buttons.preferredSize.width = 100; 
    buttons.orientation = "row"; 
    buttons.alignChildren = ["center","center"]; 
    buttons.spacing = 16; 
    buttons.margins = [0,10,0,0]; 
    buttons.alignment = ["right","top"]; 

var ok = buttons.add("button", undefined, undefined, {name: "ok"}); 
    ok.text = "Accept"; 
    ok.justify = "right"; 

var cancel = buttons.add("button", undefined, undefined, {name: "cancel"}); 
    cancel.text = "Cancel"; 
    cancel.justify = "right"; 


//function to check values
ok.onClick = function() {

	//Validate fields and execute the Genesis Function
	try {

		gridGenesis(nameInput.text , parseInt(columnsInput.text) , parseInt(rowsInput.text) ,  parseInt(sizeInput.text) , parseInt(durationInput.text) , parseInt(frameRateInput.text));

	} catch (e) {
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
function gridGenesis(compName , rows , columns , tileSize , duration ,frameRate){

	//Comp size
	var compHeight = tileSize * rows;
	var compWidth = tileSize * columns;

	//Main comp creation
    if ( compName == "" ){ compName = "Your Grid"; }
	var grid = app.project.items.addComp(compName, compWidth, compHeight, 1, duration, frameRate);

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











