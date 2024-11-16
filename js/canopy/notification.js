import { Canopy } from "../state.js";
import { 
    getElement, 
    getElementChild, 
    setElementText, 
    transition 
} from "../utilities/elements.js";


function closePageNotification(){
    if(!Canopy.notification.element.classList.contains('open')) return;

    transition('remove',Canopy.notification.element,'show','open',500, ()=>{
        setElementText(Canopy.notification.title,'');
        setElementText(Canopy.notification.message,'');
        setElementText(Canopy.notification.closeButton,'close x');
    });
};

export function initializePageNotification(){
    const [ notificationElementError, notificationElement ] = getElement('#PageNotification');
    if(notificationElementError){ console.warn( notificationElementError ); return; };

    const [notificationTitleElementError, notificationTitleElement ] = getElementChild(notificationElement,'.title');
    if(notificationTitleElementError){ console.warn( notificationTitleElementError); return };

    const [notificationMessageElementError, notificationMessageElement ] = getElementChild(notificationElement,'.message');
    if(notificationMessageElementError){ console.warn( notificationMessageElementError ); return };

    const [notificationInstructionsElementError, notificationInstructionsElement ] = getElementChild(notificationElement, '.instructions');
    if(notificationInstructionsElementError){ console.warn( notificationInstructionsElementError ); return };

    const [ notificationCloseButtonError, notificationCloseButton ] = getElementChild(notificationElement,'#ClosePageNotificationButton');
    if(notificationCloseButtonError){ console.warn( notificationCloseButtonError ); return };

    notificationCloseButton.addEventListener('click', closePageNotification);

    Canopy.notification.element = notificationElement;
    Canopy.notification.title = notificationTitleElement;
    Canopy.notification.message = notificationMessageElement;
    Canopy.notification.instructions = notificationInstructionsElement;
    Canopy.notification.closeButton = notificationCloseButton;
};