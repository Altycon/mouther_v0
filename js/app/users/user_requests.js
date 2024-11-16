import { canopyLog } from "../../canopy/canopy.js";
import { getElement, transition } from "../../utilities/elements.js";
import { Websocket } from "../websocket/socket.js";


export function userRequestComponent(username,connectionId){
    const li = document.createElement('li');
    li.setAttribute('data-request-id',connectionId);
    li.setAttribute('data-username',username);
    li.classList.add('user-requests-item');
    const h3 = document.createElement('h3');
    h3.textContent = 'crew request';
    const p = document.createElement('p');
    p.textContent = username;

    const div = document.createElement('div');

    const denyButton = document.createElement('button');
    denyButton.setAttribute('type','button');
    denyButton.classList.add('btn');
    denyButton.setAttribute('data-action','deny');
    denyButton.textContent = 'deny';

    const blockButton = document.createElement('button');
    blockButton.setAttribute('type','button');
    blockButton.classList.add('btn');
    blockButton.setAttribute('data-action','block');
    blockButton.textContent = 'block';

    const acceptButton = document.createElement('button');
    acceptButton.setAttribute('type','button');
    acceptButton.classList.add('btn');
    acceptButton.setAttribute('data-action','accept');
    acceptButton.textContent = 'accept';

    const progress = document.createElement('progress');
    progress.setAttribute('id','file');
    progress.setAttribute('max','30');
    progress.setAttribute('value','30');
    progress.setAttribute('style', '--i:1;');
    progress.textContent = '30s';

    progress.addEventListener('animationend',(animationEndEvent)=>{
        const target = animationEndEvent.target;
        const requestElement = target.closest('li');
        const connectionId = requestElement.dataset.requestId;
        const username = requestElement.dataset.username;
        Websocket.send({
            type: 'peer-request-denied',
            connectionId: connectionId
        })
        removeUserRequest(requestElement);
        canopyLog(`Automaticaly denied request from "${username}"`);
    })
    div.append(blockButton,denyButton,acceptButton,progress);

    li.append(h3,p,div);
    return li;
};

export function removeUserRequest(requestElement){
    transition('add-remove',requestElement,'removing',['open','show','removing'],500,()=>{
        requestElement.remove();
    });
};

export function addUserRequest(username,connectionId){
    const [ userRequestListElementError, userRequestListElement ] = getElement('#UserRequestsList');
    if(userRequestListElementError){ console.error( userRequestListElementError ); return };

    const userRequest = userRequestComponent(username,connectionId);

    userRequestListElement.appendChild(userRequest);

    transition('add',userRequest,'open','show',100);
};

