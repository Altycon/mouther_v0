import { 
    getElement, 
    setElementState, 
    transition 
} from "../../utilities/elements.js";


export function listenToUsersOnlineMenuButton(){
    const [ elementError, openOnlineUsersButton ] = getElement('#OpenUsersOnlineMenuButton');
    if(elementError){
        console.error('Element Initialization Error',elementError);
    }else{
        openOnlineUsersButton.addEventListener('click',(clickEvent)=>{
            const [usersOnlineElementError, usersOnlineElement ] = getElement('#UsersOnlineMenu');
            if(usersOnlineElementError){ console.error( usersOnlineElementError ); return };
            
            if(!usersOnlineElement.classList.contains('open')){
                setElementState(clickEvent.target,'opened');
                transition('add',usersOnlineElement,'open','show',100);
                
            }else{
                setElementState(clickEvent.target,'closed');
                transition('add-remove',usersOnlineElement,'removing',['open','show','removing'],500);
            }
        })
    }
};