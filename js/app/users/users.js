
import { canopyNotify } from "../../canopy/canopy.js";
import { getElement } from "../../utilities/elements.js";
import { setPrimaryUsername } from "../settings/primary_user.js";



function validateUsernameInputValue(username){
    if(typeof username !== 'string'){
        return [new Error(`Invalid username`),null];
    }
    username = username.trim();

    const charLengthLimit = 20;
    if(!username || username === ""){
        return [new Error('no username'),null];
    }
    if(charLengthLimit < username.length){
        return [new Error('username must be less than 20 characters'),null];
    }
    return [null,username];
};
function handleSaveApplicationUsername(username){
    const [ validationError, validated ] = validateUsernameInputValue(username);
    if(validationError){
        canopyNotify(validationError.message,
            'Please enter a valid name.',
            'Please enter a name with only letters and numbers.',
            'fine...'
        );
        return;
    }
    setPrimaryUsername(validated);
    removeUsernameFormAndChangeButton();
};
export function removeUsernameFormAndChangeButton(){
    const [ changeUsernameButtonError, changeUsernameButton ] = getElement('#ChangeUsernameButton');
    if(changeUsernameButtonError){ console.error( changeUsernameButtonError ); return };
    
    const [ usernameFormError, usernameForm ] = getElement('#AppUsernameForm');
    if(usernameFormError){ console.error( usernameFormError ); return };

    changeUsernameButton.remove();
    usernameForm.remove();

};
export function saveApplicationUsernameOnKeydown(keydownEvent){
    if(keydownEvent.key === 'Enter'){
        keydownEvent.preventDefault();
        const username = keydownEvent.target.value;
        
        handleSaveApplicationUsername(username);
        keydownEvent.target.removeEventListener('keydown',
            saveApplicationUsernameOnKeydown
        );
    }
}
export function saveApplicationUserOnSubmit(submitEvent){
    submitEvent.preventDefault();
    const formData = new FormData(submitEvent.target);
    const username = formData.get('username')
    
    handleSaveApplicationUsername(username);
};




