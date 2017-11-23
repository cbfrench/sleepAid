var theme = 0;
var themes = ["forest", "beach", "meadow", "white noise", "sun"];
var running = 0;
var forestAudio = new Audio("forest.mp3");
var beachAudio = new Audio("beach.mp3");
var meadowAudio = new Audio("meadow.mp3");
var noiseAudio = new Audio("whiteNoise.mp3");
var sunAudio = new Audio("sun.mp3");
var audioTrack = forestAudio;
var tracks = [forestAudio, beachAudio, meadowAudio, noiseAudio, sunAudio];
var muted = 0;
var colors = ["#036633", "#643200", "#003264", "#000000", "#00aa00"];
var forestInc = [0, 1, 0];
var beachInc = [2, 3, 1];
var meadowInc = [0, 2, 1];
var noiseInc = [1, 1, 1];
var sunInc = [5, 1, 0];
var incs = [forestInc, beachInc, meadowInc, noiseInc, sunInc];
var curInc = forestInc;
var speeds = [50, 50, 50, 25, 25];
var curSpeed = speeds[0];

function toggleBegin(){
    var begin = document.getElementById("begin");
    if(begin.innerHTML === "begin"){
        return "stop";
    }
    return "begin";
}

function toggleMute(){
    var mute = document.getElementById("mute");
    if(mute.innerHTML === "mute"){
        muted = 1;
        return "unmute";
    }
    muted = 0;
    return "mute";
}

function audio(){
    if(!running){
        if(!muted){
            audioTrack.play();
            audioTrack.loop = true;
        }
        running = 1;    
    }
    else{
        audioTrack.loop = false;
        audioTrack.pause();
        running = 0;
    }
}

function checkColoring(red, green, blue){
    var r = parseInt(red, 16);
    var g = parseInt(green, 16);
    var b = parseInt(blue, 16);
    if(r < 1 || r > 254){
        curInc[0] *= -1;
    }
    if(g < 1 || g > 254){
        curInc[1] *= -1;
    }
    if(b < 1 || b > 254){
        curInc[2] *= -1;
    }
}

function fixString(color){
    if(color.length === 1){
        return "0" + color;
    }
    return color;
}

$(function(){
    $("#begin").click(function(){
        var text = toggleBegin();
        $("#begin").text(text);
        $("#theme").toggle();
        $("#mute").toggle();
        $("#fullscreen").toggle();
        $("#footer").toggle();
        audio();
        var color = window.getComputedStyle(document.body, null).getPropertyValue('background-color');
        var id = window.setInterval(function(){
            if(running){
                color = color.split("(")[1].split(")")[0];
                color = color.split(",");
                var red = parseInt(color[0]);
                var green = parseInt(color[1]);
                var blue = parseInt(color[2]);
                red += curInc[0];
                green += curInc[1];
                blue += curInc[2];
                red = red.toString(16);
                green = green.toString(16);
                blue = blue.toString(16);
                red = fixString(red);
                green = fixString(green);
                blue = fixString(blue);
                document.body.style.backgroundColor = "#" + red + green + blue;
                color = document.body.style.backgroundColor;
                document.getElementById("color").innerHTML = "#" + red + green + blue;
                checkColoring(red, green, blue);
            }
            else{
                window.clearInterval(id);
            }
        }, curSpeed);
    });
    $("#theme").click(function(){
        theme = (theme+1)%5;
        audioTrack = tracks[theme];
        curInc = incs[theme];
        curSpeed = speeds[theme];
        document.body.style.backgroundColor = colors[theme];
        $("#color").text(themes[theme]);
    });
    $("#mute").click(function(){
        var text = toggleMute();
        $("#mute").text(text);
    });
    $("#fullscreen").click(function(){
        if(window.innerHeight == screen.height){
            document.webkitExitFullscreen();
        }
        else{
            document.body.webkitRequestFullScreen();
        }
    });
});
