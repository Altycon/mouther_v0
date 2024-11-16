
import { Canopy } from "../state.js";
import { 
    getElement, 
    getElementChild, 
    setElementText, 
    transition 
} from "../utilities/elements.js";



function closeCanopyConfirmation(){
    if(!Canopy.confirmation.element.classList.contains('open')) return;

    transition('remove',Canopy.confirmation.element,'show','open',500,()=>{
    setElementText(Canopy.confirmation.title,'');
        setElementText(Canopy.confirmation.message,'');
    });
};

export function initializePageConfirmation(){
    const [ pageConfirmationElementError, pageConfirmationElement ] = getElement('#PageConfirmation');
    if(pageConfirmationElementError){ console.warn( pageConfirmationElementError ); return; };
    
    const [ titleElementError, titleElement ]= getElementChild(pageConfirmationElement,'.title');
    if(titleElementError){ console.warn( titleElementError ); return; };

    const [messageElementError, messageElement ] = getElementChild(pageConfirmationElement,'.message');
    if(messageElementError){ console.warn( messageElementError ); return; }
    
    const [ cancelButtonError, cancelButton ] = getElementChild(pageConfirmationElement,'#CancelPageConfirmationButton');
    if(cancelButtonError){ console.warn( cancelButtonError ); return; };
    
    const [ confirmButtonError, confirmButton ] = getElementChild(pageConfirmationElement,'#ConfirmPageConfirmationButton');
    if(confirmButtonError){ console.warn( confirmButtonError ); return; };

    cancelButton.addEventListener('click',closeCanopyConfirmation);
    confirmButton.addEventListener('click',closeCanopyConfirmation);
    
    Canopy.confirmation.element = pageConfirmationElement;
    Canopy.confirmation.title = titleElement;
    Canopy.confirmation.message = messageElement;
    Canopy.confirmation.cancelButton = cancelButton;
    Canopy.confirmation.confirmButton = confirmButton;
};