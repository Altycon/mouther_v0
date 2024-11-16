
import { canopyConfirm, canopyLog } from "../../canopy/canopy.js";
import { getElement, transition } from "../../utilities/elements.js";
import { Websocket } from "../websocket/socket.js";



export function listenToUsersConnectedList(){
    const [ usersConnectedListError, usersConnectedList ] = getElement('#UsersConnectedList');
    if(usersConnectedListError){ console.error( usersConnectedListError ); return };

    usersConnectedList.addEventListener('click', (clickEvent)=>{
        clickEvent.preventDefault();

        const target = clickEvent.target;
        const state = clickEvent.target;
        if(state === 'connecting') return;

        const action = target.dataset.action;
        if(action){
            switch(action){
                case 'disconnect':
                    const connectionId = target.dataset.connectionId;
                    const username = target.dataset.username;

                    canopyConfirm(`Disconnect?`,`Are you sure you want to disconnect "${username}"?`,()=>{
                        const usersConnectedItem = target.closest('li');
                        Websocket.send({
                            type: '',
                            connectionId: connectionId
                        });
                        canopyLog(`Disconnected from "${username}"`);
                        transition('add-remove',usersConnectedItem,'removing',['open','show','removing'],500,()=>{
                            usersConnectedItem.remove();
                        });

                    })
                break;
            }
        }
    })
};