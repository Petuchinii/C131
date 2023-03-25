function setup() {
canvas = createCanvas(300, 300);
canvas.center();
video = createCapture(VIDEO);
classifier = ml5.imageClassifier('MobileNet',modeloCargado);
}
function modeloCargado()  {
    console.log("se cargo el modelo");
}

function draw() {
    image(video, 0, 0, 300, 300);
    classifier.classify(video, obtenerResultado);
}
var previous_result = "";

function gotResult(error, result) {
    if(error){
        console.log(error);
    }
    else{
        if( (result[0].confidence>0.5) && (previous_result = result[0].label)) {
            console.log(result);
            var synth = window.speechSynthesis;
            speak_data = 'Object detected is - '+results[0].label; 
            var utterThis = new SpeechSynthesisUtterance(speak_data); 
            synth.speak(utterThis);
            document.getElementById("result_object_name").innerHTML=result[0].label;
            document.getElementById("result_object_accuracy").innerHTML=result[0].confidence*100;
        }
    }
}