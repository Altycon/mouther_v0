import { getElement } from "../../utilities/elements.js";
import { toggleMicrophoneConnection } from "../devices/microphone.js";
import { Microphone } from "../../state.js";



export function listenToConnectMicrophoneButton(){
    const [microphoneButtonError, microphoneButton ] = getElement('#ConnectMicrophoneButton');
    if(microphoneButtonError){ console.error( microphoneButtonError ); return };

    const [microphoneStatusDisplayError, microphoneStatusDisplay ] = getElement('#MicrophoneStatusDisplay');
    if(microphoneStatusDisplayError){ console.warn( microphoneStatusDisplayError ); return };
    
    const [ microphoneLabelDisplayError, microphoneLabelDisplay ] = getElement('#MicrophoneLabelDisplay');
    if(microphoneLabelDisplayError){ console.warn( microphoneLabelDisplayError ); return };

    microphoneButton.addEventListener('click',toggleMicrophoneConnection);

    Microphone.connectButton = microphoneButton;
    Microphone.statusDisplay = microphoneStatusDisplay;
    Microphone.labelDisplay = microphoneLabelDisplay;
};