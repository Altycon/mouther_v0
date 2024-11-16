
import { canopyLog, initializeCanopy } from "../canopy/canopy.js";
import { getElement, setElementText } from "../utilities/elements.js";
import { hasInternetConnection } from "../utilities/tools.js";
import { initializeVisualizer } from "./canvas/visualizer.js";
import { initializeApplicationComponents } from "./components/components.js";
import { initializeSettings } from "./settings/settings.js";


function connectInternet(){
    const [elementError, InternetStatusDisplay] = getElement('#InternetStatusDisplay');
    if(elementError){ console.warn(elementError); return };

    if(hasInternetConnection()){
        setElementText(InternetStatusDisplay,'connecting...');
        setTimeout( ()=>{
                setElementText(InternetStatusDisplay,'connected');
                canopyLog('internet connected');
        },3000);
    }else{
        setElementText(InternetStatusDisplay,'disconnected');
    }
};

export function initializeApplication(){
    initializeCanopy();

    canopyLog('Mouther initializing...');

    connectInternet();

    initializeSettings();

    initializeApplicationComponents();
    
    initializeVisualizer();

    canopyLog('Mouther initialized');
};
