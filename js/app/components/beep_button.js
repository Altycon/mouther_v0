import { getElement } from "../../utilities/elements.js";
import { Microphone } from "../../state.js";

function stopBeeping(pointerUpEvent){
    pointerUpEvent.preventDefault();
    console.log('beeping stopped');
};
function startBeeping(pointerDownEvent){
    pointerDownEvent.preventDefault();
    console.log('beeping started');
};


export function initializeBeepButton(){
    const [ beepButtonError, beepButton ] = getElement('#BeepButton');
    if(beepButtonError){ console.error( beepButton ); return };

    beepButton.addEventListener('pointerdown', startBeeping);
    beepButton.addEventListener('pointerup', stopBeeping);

    Microphone.beepButton = beepButton;
};