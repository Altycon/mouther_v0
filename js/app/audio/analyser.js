import { AudioAnalyser } from "../../state.js";

export function stopAnalyzingAudioStream(){
    if(!AudioAnalyser.source) return;
    AudioAnalyser.context = null;
    AudioAnalyser.source.disconnect();
};
export function analyzeAudioStream(stream,options){
    
    AudioAnalyser.context = new (window.AudioContext || window.webkitAudioContext)();
    AudioAnalyser.source = AudioAnalyser.context.createMediaStreamSource(stream);
    AudioAnalyser.analyser = AudioAnalyser.context.createAnalyser();
    AudioAnalyser.source.connect(AudioAnalyser.analyser);
    AudioAnalyser.analyser.connect(AudioAnalyser.context.destination);

    if(options){
        AudioAnalyser.analyser.fftSize = options.fftSize;
        AudioAnalyser.analyser.smoothingTimeConstant = options.smoothingTimeConstant;
        AudioAnalyser.analyser.minDecibels = options.minDecibels;
        AudioAnalyser.analyser.maxDecibels = options.maxDecibels;
    }
    AudioAnalyser.bufferLength = AudioAnalyser.analyser.frequencyBinCount;
    AudioAnalyser.dataArray = new Uint8Array(AudioAnalyser.bufferLength);
    // AudioAnalyser.barWidth = (AudioAnalyser.width * 0.5)/AudioAnalyser.bufferLength;
};