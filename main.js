audio =" ";
status = " ";
object = [];

function preload()
{
    audio = loadSound("warning.mp3");
}

function setup()
{
    canvas = createCanvas(400,400);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(400, 400);
    video.hide();

    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded()
{
    console.log("Model Loaded");

    status = true;
    objectDetector.detect(video, gotResults);
}

function gotResults(error, results)
{
    if(error)
    {
        console.log(error);
    }

    console.log(results);
    object = results;
}

function draw()
{
    image(video, 0, 0, 400, 400);
    
    
    if(status != " ")
    {
        for(i = 0; i < object.length; i++)
        {
            if(object[i].label == "person")
            {
            document.getElementById("status").innerHTML = "Status : Baby Detected";
            audio.stop();
            }
            else
            {
                    document.getElementById("status").innerHTML = "Status : Baby not Detected";
                    audio.play();
            }
        }
        if(object.length == 0)
            {
                
                    document.getElementById("status").innerHTML = "Status : Baby not Detected";
                    audio.stop();
                
            }
    }
   
}




