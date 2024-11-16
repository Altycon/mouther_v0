import { Canopy } from "../state.js";
import { getElement } from "../utilities/elements.js";



export function visualLogItemComponent(message,state){
    const li = document.createElement('li');
    if(state) li.setAttribute('data-state',state);
    li.textContent = message;
    return li;
}

export function initializeVisualLog(){
    const [ visualLogListError, visualLogList ] = getElement('#VisualLogList');
    if(visualLogListError){ console.error( visualLogListError ); return };

    Canopy.visualLog.list = visualLogList;
};