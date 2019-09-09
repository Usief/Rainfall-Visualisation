var data;
var firstYear;
var secondYear;
var barLength;
var barChangingRate;
var freshRate;
var circles;
var diameter;
var monthHand;
var count;
var suburbs;
var startPoint;
var currentSuburb;
var showedData;
var isPaused;
var averageRainfall;

function preload() {
    data = loadJSON("assets/rainfall.json");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    textFont("garamond");

    data = Object.values(data);

    averageRainfall = 0;
    for (var i=0; i<data.length;i++){
      averageRainfall += data[i].rainfall;
    }
    averageRainfall = averageRainfall/data.length;


    isPaused = false;
    freshRate = 3;
    frameRate(freshRate);
    circles = {x: windowWidth/2, y: windowHeight/2};
    diameter = 260;
    count = 0;
    currentSuburb = "ainslie";
    showedData = 400;
    startPoint = {"ainslie": {firstYear: 0, quantity: showedData,},
                  "queanbeyan": {firstYear: 985, quantity: showedData},
                  "aranda": {firstYear: 2727, quantity: showedData},
                  "parliament-house": {firstYear: 3272, quantity: showedData},
                  "botanic-gardens": {firstYear: 3889, quantity: showedData},
                  "torrens": {firstYear: 4484, quantity: showedData-200}};

    suburbs = [{x: -600, y: 300, name: "ainslie", color: "#CB0077"},
                {x: -400, y: 300, name: "queanbeyan", color: "#A2EF00"},
                {x: -200, y: 300, name: "aranda", color: "#FFA900"},
                {x: 0, y: 300, name: "parliament-house", color: "#FF7400"},
                {x: 200, y: 300, name: "botanic-gardens", color: "#009999"},
                {x: 400, y: 300, name: "torrens", color: "#FFFF00"}];
}

function draw() {
    // your "draw loop" code goes here
    n=0;
    background(255);
    translate(windowWidth/2, windowHeight/2-50);
    drawData();
    drawClock();
    drawMonthHand(data[count].month);
    showDetails();
    drawYear(data[count].year);
    suburbs.map(drawSuburbs);
    count = count + 1;
    if (count > startPoint[currentSuburb].firstYear+startPoint[currentSuburb].quantity){
      count = startPoint[currentSuburb].firstYear;
    }
}

function drawSuburbs(suburb){
    strokeWeight(1);
    if(mouseX-windowWidth/2>=suburb.x &&
       mouseX-windowWidth/2<= suburb.x+200 &&
        mouseY-windowHeight/2>=suburb.y-50 &&
         mouseY-windowHeight/2<=suburb.y &&
          mouseIsPressed == true){

        currentSuburb = suburb.name;
        count = startPoint[currentSuburb]["firstYear"];
        fill(suburb.color);
    }else{
      noFill();
    }

    rect(suburb.x, suburb.y, 200, 50);

    fill(0);
    strokeWeight(0);
    textSize(20);
    text(suburb.name, suburb.x+100-suburb.name.length*4, suburb.y+30);
}

function drawClock(){
    //translate(windowWidth/2, windowHeight/2, -1);
    strokeWeight(0);
    fill(0);
    var radius = diameter/2-20;
    var degree=0;
    for (var i=1; i <=12; i++){
      degree = degree + PI/6;
      textSize(20);
      text(i, radius*sin(degree)-5, -radius*cos(degree)+7);
    }
}

function drawData(){
    fill("#1142AA");

    noStroke();
    rotate(PI);

    for(var i=startPoint[currentSuburb].firstYear; i<startPoint[currentSuburb].quantity+startPoint[currentSuburb].firstYear;i++){

      rect(0, 0, 2, data[i].rainfall/1.8+diameter/2);

      if(i == count){
        if (data[i].rainfall < averageRainfall){
          fill(255, 255, 0);
        }else {
          fill(0, 255, 0);
        }
        rect(0, 0, 5, data[i].rainfall/1.8+diameter/2);
        fill("#1142AA");
      }
      rotate(2*PI/startPoint[currentSuburb].quantity);
    }
    rotate(PI);
    fill(255);
    stroke(0);
    ellipse(0, 0, diameter, diameter);
}

function drawYear(year){
    strokeWeight(0);
    textSize(20);
    //stroke(1);
    fill(0);
    text(year, -20, 70);
    // textSize(15);
    // strokeWeight(1);
    // text("keyboard", -35, 90);
}

function drawMonthHand(month){
    //rotate(PI/6*month);
    month = month + 6;
    var length = diameter/3;
    fill(0);
    strokeWeight(diameter*0.01);
    //rect(0, 24, diameter*0.01, -diameter/2.3);
    line(0, 0, -length*sin(PI/6*month), length*cos(PI/6*month));
    strokeWeight(1);
    ellipse(0, 0, diameter*0.03, diameter*0.03);
    fill(255);
    ellipse(0, 0, diameter*0.02, diameter*0.02);
    //rotate(PI-PI/6*month);
}

function showDetails(){
    textSize(30);
    fill(0);
    strokeWeight(0);
    text("Loction: " + data[count].location, 400, 100);
    text("Rainfall: " + data[count].rainfall + " mm", 400, 130);
    textSize(20);
    text("Pause: backspace", 400, 400);
}

function mousePressed(){
  if(mouseX-windowWidth/2>=suburb[0].x && mouseX-windowWidth/2<= suburb[0].x+200 &&mouseY-windowHeight/2>=suburb[0].y && mouseY[0]-windowHeight/2<=suburb.y+50){
      fill(suburb[0].color);
      text("OOO", 0, 0);
  }
  if(mouseX>=suburb[0].x && mouseX<= suburb[0].x+200 &&mouseY>=suburb[0].y && mouseY[0]<=suburb.y+50){
      fill(suburb[0].color);
      text("OOO", 0, 0);
  }
}

function keyTyped(){
    if(!isPaused && keyCode == 32){
      isPaused = true;
      noLoop();
    }else if (isPaused && keyCode == 32){
      isPaused = false;
      loop();
    }

    // if(keyCode == 37){
    //   fill(200, 200, 0);
    //   count = count - 12;
    // }
    // triangle(-50, 85, -40, 75, -40, 95);
    // fill(0);
    // if(keyCode == 39){
    //   fill(200, 200, 0);
    //   count = count + 12;
    // }
    // triangle(40, 85, 30, 75, 30, 95);
}
