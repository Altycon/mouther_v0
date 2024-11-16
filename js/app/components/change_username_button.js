import { 
    getElement, 
    setElementState, 
    transition 
} from "../../utilities/elements.js";

function openUsernameForm(clickEvent){
    const [ appUsernameFormError, appUsernameForm ] = getElement('#AppUsernameForm');
    if(appUsernameFormError){ console.error( appUsernameFormError ); return };
    const target = clickEvent.target;
    const state = clickEvent.target.dataset.state;
    if(!state || state === 'closed'){
        setElementState(target,'opened');
        transition('add',appUsernameForm,'open','show',100);
        appUsernameForm['username'].focus();
    }else{
        setElementState(target,'closed');
        transition('remove',appUsernameForm,'show','open',500);
        appUsernameForm['username'].blur();
    }
};

export function listenToChangeUsernameButton(){
    const [ changeUsernameButtonError, changeUsernameButton ] = getElement('#ChangeUsernameButton');
    if(changeUsernameButtonError){ console.error( changeUsernameButtonError ); return };

    changeUsernameButton.addEventListener('click',openUsernameForm);
};