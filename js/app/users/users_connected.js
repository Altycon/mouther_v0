import { getElement, transition } from "../../utilities/elements.js";
import { generateRandomUsername, random } from "../../utilities/tools.js";


export function usersConnectedItemComponenet(username,connectionId,state){
    const li = document.createElement('li');
    li.classList.add('users-connected-item');
    const p = document.createElement('p');
    p.textContent = username;

    const button = document.createElement('button');
    button.setAttribute('type','button');
    button.setAttribute('data-username',username);
    button.setAttribute('data-state', state || 'connecting');
    button.setAttribute('data-action','disconnect');
    if(connectionId) button.setAttribute('data-connection-id',connectionId);
    button.classList.add('btn');
    button.textContent = 'C';

    const saveConnectionButton = document.createElement('button');
    saveConnectionButton.setAttribute('type', 'button');
    if(connectionId) saveConnectionButton.setAttribute('data-connection-id',connectionId);
    saveConnectionButton.setAttribute('data-action','save-connection');
    saveConnectionButton.classList.add('btn');
    saveConnectionButton.textContent = 'S';

    li.append(p,button,saveConnectionButton);
    return li;
};

export function addUserConnectionComponent(username,connectionId,state){
    const [ usersConnectedListError, usersConnectedList ] = getElement('#UsersConnectedList');
    if(usersConnectedListError){ console.error( usersConnectedListError ); return };

    const component = usersConnectedItemComponenet(username,connectionId,state);

    usersConnectedList.prepend(
        new DocumentFragment().appendChild(component)
    );

    transition('add',component,'open','show',100);
};

export function addUsersConnectedItemComponentsForTesting(){
    const [ usersConnectedListError, usersConnectedList ] = getElement('#UsersConnectedList');
    if(usersConnectedListError){ console.error( usersConnectedListError ); return };

    const df = new DocumentFragment();
    for(let i = 0; i < 4; i++){

        const randomCharLength = Math.floor(Math.random()*20);
        const username = generateRandomUsername(randomCharLength);
        const connectionId = `${random(1,1000000000)}`;
        df.appendChild(
            usersConnectedItemComponenet(username,connectionId)
        )
    }
    usersConnectedList.appendChild(df);
};

