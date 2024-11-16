
import { canopyLog } from "../../canopy/canopy.js";
import { getElement, transition } from "../../utilities/elements.js";
import { addUserConnectionComponent } from "../users/users_connected.js";


export function listenToUsersOnlineList(){
    const [usersOnlineListError, usersOnlineList ] = getElement('#UsersOnlineList');
    if(usersOnlineListError){ console.error( usersOnlineListError ); return };

    usersOnlineList.addEventListener('click',(clickEvent)=>{

        const target = clickEvent.target;
        if(!target) return;

        if(target.tagName === 'BUTTON'){
            target.dataset.state = 'waiting';

            const username = target.dataset.username;
            const connectionId = target.dataset.onlineId;

            if(!username || !connectionId) return;
            
            addUserConnectionComponent(username,connectionId);

            //simulating accept and denial
            setTimeout( ()=>{
                const userConnectionElement = document.querySelector(`[data-connection-id="${connectionId}"]`);
                const hasAccepted = Math.random() < 0.5 ? false:true;
                if(hasAccepted){
                    target.dataset.state = 'grouped';

                    userConnectionElement.dataset.state = 'connected';
                    canopyLog(`"${username}" accepted request`,'connected');
                }else{
                    target.dataset.state = 'available';

                    userConnectionElement.dataset.state = 'disconnected';
                    canopyLog(`"${username}" denied request`,'disconnected');
                    transition('add-remove',userConnectionElement,'removing',['open','show','removing'],300,()=>{
                        userConnectionElement.closest('li').remove();
                    })
                }
            },(Math.floor(Math.random()*30000)));
        }
        
    })
};