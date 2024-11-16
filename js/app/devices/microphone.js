import { canopyLog } from "../../canopy/canopy.js";
import { App, Microphone, Visualizer } from "../../state.js";
import { setElementState, setElementText } from "../../utilities/elements.js";
import { 
    drawVisualization
} from "../canvas/visualizer.js";


async function connectMicrophone(){
    
    setElementText(Microphone.statusDisplay,'connecting...');
    try{
    
        Microphone.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        if(!Microphone.stream) throw new Error('mic stream not connected')

        App.devices = await navigator.mediaDevices.enumerateDevices();
        
        Microphone.device = App.devices.find( device => (device.deviceId !== 'default' && 
            device.kind === 'audioinput'));
           
        if(!Microphone.device || !Microphone.device.label){
            throw new Error('no microphone connected.');
        }

        setElementText(Microphone.statusDisplay,'connected');
        setElementText(Microphone.labelDisplay, Microphone.device.label);
    }catch(error){
        console.error('Connect Microphone Error',error);
        setElementText(Microphone.statusDisplay,'disconnected');
    }
};

function disconnectMicrophone(){
    
    if(!Microphone.stream) return;

    const audioTracks = Microphone.stream.getAudioTracks();

    if(!audioTracks[0]) return;
    
    audioTracks.forEach( track => {
        track.stop();
    });
    setElementText(Microphone.statusDisplay,'disconnected');
};

export async function toggleMicrophoneConnection(clickEvent){
    clickEvent.preventDefault();
  
    const microphoneButton = clickEvent.target;
    const state = microphoneButton.dataset.state;
    if(state === 'connecting') return;
    
    if(state === '' || state === 'disconnected'){
        setElementState(microphoneButton,'connecting');
        
        try{
            await connectMicrophone();
 
            setElementState(microphoneButton,'connected');

            drawVisualization(Visualizer.dataArray);

            canopyLog('Microphone connected');

        }catch(error){
            console.error('Microphone Connectioin Error',error);
            setElementState(microphoneButton,'disconnected');
            canopyLog('Error connected Microphone','disconnected');
        }
    }else if(state === 'connected'){
        disconnectMicrophone();
        
        setElementState(microphoneButton,'disconnected');
        canopyLog('Microphone disconnected');
    }
};