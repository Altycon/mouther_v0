import { initializeApplication } from "./app/app.js";
import { getElement, setElementText } from "./utilities/elements.js";
import { hasDeviceSupport } from "./utilities/tools.js";





function initializeWindow(){
    function handleConnectionEvent(connectionEvent){
        const [elementError, internetStatusDisplay] = getElement('#InternetStatusDisplay');
        if(elementError) return;

        setElementText(internetStatusDisplay,
            connectionEvent.type === 'online' ? 'connected':'disconnected'
        );
    }
    window.addEventListener('online', handleConnectionEvent);
    window.addEventListener('offline',handleConnectionEvent)
};


function initializeSite(){
    
   
    // canopyNotify(
    //     'Granted Access',
    //     `Welcome to "Mouther". It's like a Walky Talky but a website.`,
    //     'Connection is lost if you lose internet or shut off your device',
    //     'proceed -->'
    // );

    // canopyNotify(
    //     'Notes from last time',
    //     `- Work mobile layout---grid idea covers up scrolling..fuck..
    //     - Redo local storage database code. - save color on change. - add update entire settings button. 
    //     - add reset functionality to settings. - consider themes instead of colors.`,
    //     'stack header for mobile. ',
    //     'proceed -->'
    // );


    if(hasDeviceSupport() && window){
        
        initializeWindow();

        initializeApplication();

    }else{
        window.confirm('No device support','You will not be able to use this application')
    }
}
initializeSite();



// function doSomething(){
//     document.body.addEventListener('new:event', (event)=>{
//         console.log('detail', event.detail);
//     })
//     document.body.addEventListener('click', (event)=>{
//         event.target.dispatchEvent(new CustomEvent('new:event', { 
//             detail: event.target.tagName,
//             bubbles: true,
//             cancelable: true,
//             composed: false,
//          }));
//     })
// };
// doSomething();