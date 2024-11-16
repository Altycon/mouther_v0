
import { getElement, getElementChild } from "../../utilities/elements.js";
import { AudioAnalyser, Visualizer } from "../../state.js";
import { DPI, TWO_PI } from "../../utilities/constants.js";
import { scale } from "../../utilities/tools.js";

export function drawVisualization(dataArray){
    if(!Visualizer.context) return;
    Visualizer.context.clearRect(0,0,Visualizer.width,Visualizer.height);

    // create an object array and an update fuction and use 
    // the dataArray to update the objects in the object array and 
    // then draw the values of the object array

    let x1 = Visualizer.center;
    let x2 = Visualizer.center;
    for(let i = 0; i < Visualizer.frequencyDotTotal; i++){

        const y = scale(dataArray[i],0,255,Visualizer.height,0);
        const radius = scale(y,Visualizer.height,0,1,5);
        Visualizer.context.fillStyle = dataArray[i] > 0 ? 'limegreen':'white';
        Visualizer.context.beginPath();
        Visualizer.context.arc( x1,y,radius,0,TWO_PI );
        Visualizer.context.fill();

        //Visualizer.context.fillStyle = `rgb(255 255 ${scale(y,Visualizer.height,0,0,255)})`;

        Visualizer.context.beginPath();
        Visualizer.context.arc( x2,y,radius,0,TWO_PI );
        Visualizer.context.fill();

        x1 -= Visualizer.frequencyDotSpacing;
        x2 += Visualizer.frequencyDotSpacing;
    }
};

export function animateVisualization(){
    let lastTime = performance.now();
    function animationLoop(timestamp){
        const delta = (timestamp - lastTime)/1000;
        if(delta && lastTime !== timestamp){
            drawVisualization(AudioAnalyser.dataArray);
            AudioAnalyser.analyser.getByteFrequencyData(AudioAnalyser.dataArray);
        }
        lastTime = timestamp;
        Visualizer.animationId = requestAnimationFrame(animationLoop);
    };
    Visualizer.animationId = requestAnimationFrame(animationLoop)
};

export function stopVisualizationAnimation(){
    if(!Visualizer.animationId) return;

    setTimeout( ()=> {
        cancelAnimationFrame(Visualizer.animationId);
        Visualizer.animationId = null;
    },1000)
};


export function initializeVisualizer(){
    const [visualizerCanvasWrapperError, visualizerCanvasWrapper ] = getElement('#VisualizerCanvasWrapper');
    if(visualizerCanvasWrapperError){ console.error( visualizerCanvasWrapper ); return };

    const [ visualizerCanvasError, visualizerCanvas ] = getElementChild(visualizerCanvasWrapper,'#VisualizerCanvas');
    if(visualizerCanvasError){ console.error( visualizerCanvasError ); return };

    const styleWidth = parseFloat(getComputedStyle(visualizerCanvasWrapper).getPropertyValue('width').slice(0,-2));
    const styleHeight = parseFloat(getComputedStyle(visualizerCanvasWrapper).getPropertyValue('height').slice(0,-2));
    visualizerCanvas.setAttribute('width', styleWidth * DPI);
    visualizerCanvas.setAttribute('height',styleHeight * DPI);

    Visualizer.canvas = visualizerCanvas;
    Visualizer.width = visualizerCanvas.width;
    Visualizer.height = visualizerCanvas.height;
    Visualizer.context = visualizerCanvas.getContext('2d');
    Visualizer.context.scale(DPI,DPI);
    Visualizer.center = Visualizer.width * 0.5;
    Visualizer.frequencyDotTotal = 32;
    Visualizer.frequencyDotSpacing = (Visualizer.width * 0.5)/Visualizer.frequencyDotTotal;
    Visualizer.dataArray = new Uint8Array(Visualizer.frequencyDotTotal);
    Visualizer.context.fillStyle = 'white';
};