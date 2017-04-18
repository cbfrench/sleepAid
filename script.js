//global variables
var theme = 0;
var redColor = 0;
var greenColor = 100;
var blueColor = 50;
var redAdd = 3;
var greenAdd = 2;
var blueAdd = 1;
var redSubtract = 1;
var greenSubtract = 2;
var blueSubtract = 3;
var redCountUp = false;
var greenCountUp = false;
var blueCountUp = false;
var authorization = false;
var time = 150;
var trackOne = new Audio("forest.mp3");
var trackTwo = new Audio("beach.mp3");
var trackThree = new Audio("meadow.mp3");
var trackFour = new Audio("whiteNoise.mp3");
var trackFive = new Audio("sun.mp3");
var muted = false;
var code = false;
var full = 0;


//registers the press of the top button and sets a boolean to represent it
function colorButton()
{
    musicSelector();
    if(authorization)
    {
        authorization = false;
    }
    else
    {
        authorization = true;
    }
}


//sets up the colors and text that appear during theme selection
function themeSelect()
{
    var redFixed = colorFixer(redColor.toString(16), "red");
    var greenFixed = colorFixer(greenColor.toString(16), "green");
    var blueFixed = colorFixer(blueColor.toString(16), "blue");
    var themeOne = "#" + redFixed + greenFixed + blueFixed;
    var themeTwo = "#" + greenFixed + blueFixed + redFixed;
    var themeThree = "#" + redFixed + blueFixed + greenFixed;
    var themeFour = "#" + redFixed + redFixed + redFixed;
    var themeFive = "#" + redFixed + "aa" + "00";
    if(!authorization)
    {                
        if(theme === 4)
        {
            theme = 0;
            document.body.style.backgroundColor = themeOne;
            document.getElementById("color").innerHTML = "forest";
        }
        else if(theme === 0)
        {
            theme = 1;
            document.body.style.backgroundColor = themeTwo;
            document.getElementById("color").innerHTML = "beach";
        }
        else if(theme === 1)
        {
            theme = 2;
            document.body.style.backgroundColor = themeThree;
            document.getElementById("color").innerHTML = "meadow";
        }
        else if(theme === 2)
        {
            theme = 3;
            document.body.style.backgroundColor = themeFour;
            document.getElementById("color").innerHTML = "white noise";
        }
        else
        {
            theme = 4;
            document.body.style.backgroundColor = themeFive;
            document.getElementById("color").innerHTML = "sun";
        }
    }
}


//changes the color while running
function colors()
{   
    if(!redCountUp)
    {
        redColor += redAdd;
    }
    if(!greenCountUp)
    {
        greenColor += greenAdd;
    }
    if(!blueCountUp)
    {
        blueColor += blueAdd;
    }
    if(redCountUp)
    {
        redColor -= redSubtract;
    }
    if(greenCountUp)
    {
        greenColor -= greenSubtract;
    }
    if(blueCountUp)
    {
        blueColor -= blueSubtract;
    }
    var redFixed = colorFixer(redColor.toString(16), "red");
    var greenFixed = colorFixer(greenColor.toString(16), "green");
    var blueFixed = colorFixer(blueColor.toString(16), "blue");
    if(theme === 0)
    {
        document.body.style.backgroundColor = "#" + redFixed + greenFixed + blueFixed;
        document.getElementById("color").innerHTML = "#" + redFixed + greenFixed + blueFixed;
    }
    if(theme === 1)
    {
        document.body.style.backgroundColor = "#" + greenFixed + blueFixed + redFixed;
        document.getElementById("color").innerHTML = "#" + greenFixed + blueFixed + redFixed;
    }
    if(theme === 2)
    {
        document.body.style.backgroundColor = "#" + redFixed + blueFixed + greenFixed;
        document.getElementById("color").innerHTML = "#" + redFixed + blueFixed + greenFixed;
    }
    if(theme === 3)
    {
        document.body.style.backgroundColor = "#" + redFixed + redFixed + redFixed;
        document.getElementById("color").innerHTML = "#" + redFixed + redFixed + redFixed;
    }
    if(theme === 4)
    {
        document.body.style.backgroundColor = "#" + redFixed + "aa" + "00";
        document.getElementById("color").innerHTML = "#" + redFixed + "aa" + "00";
    }
}


//main function
window.setInterval(
function start() {
    if(authorization)
    {
        colors();
        document.getElementById("begin").innerHTML = "stop";
        document.getElementById("theme").style.display = "none";
        document.getElementById("mute").style.display = "none";
        document.getElementById("version").style.display = "none";
        document.getElementById("copyright").style.display = "none";
        document.getElementById("fullScreen").style.display = "none";
        document.getElementById("begin").style.marginBottom = "30em";
    }
    if(!authorization)
    {
        document.getElementById("begin").innerHTML = "begin";
        document.getElementById("theme").style.display = "flex";
        document.getElementById("mute").style.display = "inline";
        document.getElementById("version").style.display = "flex";
        document.getElementById("copyright").style.display = "flex";
        document.getElementById("version").style.justifyContent = "center";
        document.getElementById("copyright").style.justifyContent = "center";
        document.getElementById("fullScreen").style.display = "inline";
        document.getElementById("begin").style.marginBottom = "0em";
    }
}, time);


//fixes all issues with the numbers created to allow conversion to hexadecimal and determines whether the colors should start ascending or descending 
function colorFixer(input, colorChosen)
{
    if(input === "0" && colorChosen === "red")
    {
        redCountUp = false;
        return "0" + input;
    }
    if(input === "0" && colorChosen === "green")
    {
        greenCountUp = false;
        return "0" + input;
    }
    if(input === "0" && colorChosen === "blue")
    {
        blueCountUp = false;
        return "0" + input;
    }
    if(input === "ff" && colorChosen === "red")
    {
        redCountUp = true;
        return input;
    }
    if(input === "fe" && colorChosen === "green")
    {
        greenCountUp = true;
        return input;
    }
    if(input === "ff" && colorChosen === "blue")
    {
        blueCountUp = true;
        return input;
    }
    else if(input.length < 2)
    {
        return "0" + input;
    }
    else
    {
        return input;
    }
}


//plays, loops, pauses, and determines which audio should be played 
function musicSelector()
{
    if(authorization || muted)
    {
        if(theme === 0)
        {
            trackOne.loop = false;
            trackOne.pause();
        }
        if(theme === 1)
        {
            trackTwo.loop = false;
            trackTwo.pause();
        }
        if(theme === 2)
        {
            trackThree.loop = false;
            trackThree.pause();
        }
        if(theme === 3)
        {
            trackFour.loop = false;
            trackFour.pause();
        }
        if(theme === 4)
        {
            trackFive.loop = false;
            trackFive.pause();
        }
    }
    else
    {
        if(theme === 0 && !muted)
        {
            trackOne.play();
            trackOne.loop = true;
        }
        if(theme === 1 && !muted)
        {
            trackTwo.play();
            trackTwo.loop = true;
        }
        if(theme === 2 && !muted)
        {
            trackThree.play();
            trackThree.loop = true;
        }
        if(theme === 3 && !muted)
        {
            trackFour.play();
            trackFour.loop = true;
        }
        if(theme === 4 && !muted)
        {
            trackFive.play();
            trackFive.loop = true;
        }
    }
}


//helper function that mutes the current track playing
function muter()
{
    if(muted)
    {
        document.getElementById("mute").innerHTML = "mute";
        muted = false;
    }
    else
    {
        document.getElementById("mute").innerHTML = "unmute";
        muted = true;
    }
}

function screen(){
    if(full != -1){
        fillScreen();
    }
    else{
        exitFullScreen();
    }
}

function exitFullScreen(){
    full = 0;
    document.webkitExitFullScreen();
}


//makes the page take up the entire screen
function fillScreen()
{
    full = 1;
    document.body.webkitRequestFullScreen();
}
