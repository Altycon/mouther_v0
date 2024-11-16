import { 
    getElement, 
    getElementChild 
} from "../../utilities/elements.js";
import { 
    saveApplicationUsernameOnKeydown, 
    saveApplicationUserOnSubmit 
} from "../users/users.js";


export function listenToUsernameForm(){
    
    const [ usernameFormError, usernameForm ] = getElement('#AppUsernameForm');
    if(usernameFormError){ console.error( usernameFormError ); return };

    const [appUsernameInputError, appUsernameInput ] = getElementChild(usernameForm,'[name="username"]');
    if(appUsernameInputError){ console.error( appUsernameInputError ); return };

    appUsernameInput.addEventListener('keydown', saveApplicationUsernameOnKeydown)

    usernameForm.addEventListener('submit', saveApplicationUserOnSubmit);
};