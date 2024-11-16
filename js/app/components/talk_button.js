import { Microphone } from "../../state.js";
import { getElement } from "../../utilities/elements.js";
import { 
    analyzeAudioStream, 
    stopAnalyzingAudioStream 
} from "../audio/analyser.js";
import {
    animateVisualization, 
    stopVisualizationAnimation 
} from "../canvas/visualizer.js";


function stopTalking(pointerUpEvent){
    pointerUpEvent.preventDefault();
    console.log('talking stopped');

    stopAnalyzingAudioStream();
    stopVisualizationAnimation();
};
function startTalking(pointerDownEvent){
    pointerDownEvent.preventDefault();
    if(!Microphone.stream) return;

    console.log('talking started');

    analyzeAudioStream(Microphone.stream, {
        fftSize: 64,
        smoothingTimeConstant: 0.8,
        minDecibels: -90,
        maxDecibels: -10
    });
    animateVisualization();
};

export function listenToTalkButton(){
    const [ talkButtonError, talkButton ] = getElement('#TalkButton');
    if(talkButtonError){ console.error( talkButtonError ); return };

    talkButton.addEventListener('pointerdown', startTalking);
    talkButton.addEventListener('pointerup', stopTalking);

    Microphone.talkButton = talkButton;
};