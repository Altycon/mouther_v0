
import { canopyLog } from "../../canopy/canopy.js";
import { getElement } from "../../utilities/elements.js";
import { removeUserRequest } from "../users/user_requests.js";
import { addUserConnectionComponent } from "../users/users_connected.js";
import { setOnlineUserState } from "../users/users_online.js";
import { Websocket } from "../websocket/socket.js";

function handleUserRequest(clickEvent){
    clickEvent.preventDefault();
    const target = clickEvent.target;
    const action = target.dataset.action;
    
    if(action){
        const requestElement = target.closest('li');
        const connectionId = requestElement.dataset.requestId;
        if(!connectionId) return;
        const username = requestElement.dataset.username;
        if(!username) return;
        
        switch(action){
            case 'deny':
                Websocket.send({
                    type: 'connection-request-denied',
                    connectionId: connectionId
                })
                removeUserRequest(requestElement);
                setOnlineUserState(connectionId,'available');
                canopyLog(`Denied request from "${username}"`,'disconnected');
            break;
            case 'accept':
                Websocket.send({
                    type: 'connection-request-accepted',
                    connectionId: connectionId
                })
                addUserConnectionComponent(username,connectionId,'connected');
                removeUserRequest(requestElement);
                setOnlineUserState(connectionId,'grouped');
                canopyLog(`Accpeted request from "${username}"`,'connected');
            break;
            case 'block':

            break;
        }
        
    }
};

export function listenToUserRequestsList(){
    const [ userRequestListElementError, userRequestListElement ] = getElement('#UserRequestsList');
    if(userRequestListElementError){ console.error( userRequestListElementError ); return };

    userRequestListElement.addEventListener('click', handleUserRequest);
};
