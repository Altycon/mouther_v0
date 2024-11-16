import { Canopy } from "../state.js";
import { setElementText, transition } from "../utilities/elements.js";
import { initializePageConfirmation } from "./confirmation.js";
import { initializePageNotification } from "./notification.js";
import { initializeVisualLog, visualLogItemComponent } from "./visual_log.js";


export function canopyConfirm(title,message,confirmCallback,cancelCallback){
    setElementText( Canopy.confirmation.title, title );
    setElementText( Canopy.confirmation.message, message );
    function confirm(clickEvent){
        confirmCallback();
        if(cancelCallback) Canopy.confirmation.cancelButton.removeEventListener('click',cancel);
        clickEvent.target.removeEventListener('click',confirm);
    };
    function cancel(clickEvent){
        if(cancelCallback) cancelCallback();
        if(confirmCallback) Canopy.confirmation.confirmButton.removeEventListener('click',confirm);
        clickEvent.target.removeEventListener('click',cancel);
    };
    Canopy.confirmation.cancelButton.addEventListener('click',cancel);
    Canopy.confirmation.confirmButton.addEventListener('click',confirm);
    transition('add',Canopy.confirmation.element, 'open','show',100);
};

export function canopyNotify(title,message,instructions,closeButtonText,callback){
    setElementText(Canopy.notification.title,title);
    setElementText(Canopy.notification.message,message);
    if(instructions) setElementText(Canopy.notification.instructions,instructions);
    if(closeButtonText) setElementText(Canopy.notification.closeButton,closeButtonText);
    if(callback){
        Canopy.notification.closeButton.addEventListener('click',function fn(e){
            callback();
            e.target.removeEventListener('click',fn);
        })
    }
    transition('add',Canopy.notification.element,'open','show',100);
};

export function canopyLog(message,state){
    const component = visualLogItemComponent(message,state);
    Canopy.visualLog.list.prepend(
        new DocumentFragment().appendChild(component)
    );
};

export function initializeCanopy(){

    initializePageConfirmation();
    initializePageNotification();
    initializeVisualLog();
};