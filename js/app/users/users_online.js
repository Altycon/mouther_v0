import { getElement, transition } from "../../utilities/elements.js";
import { generateRandomUsername, random } from "../../utilities/tools.js";



export function setOnlineUserState(connectionId,state){
    const [ userOnlineButtonError, userOnlineButton ] = getElement(`[data-online-id="${connectionId}"]`);
    if(userOnlineButtonError){
        console.warn( userOnlineButtonError.message );
        return;
    };

    userOnlineButton.dataset.state = state;
}

export function usersOnlineItemComponent(username,connectionId,status){
    status = status || 'unavailable';

    const li = document.createElement('li');
    li.classList.add('users-online-item');
    
    const button = document.createElement('button');
    button.setAttribute('type','button');
    button.classList.add('btn');
    button.setAttribute('data-state', status);
    button.setAttribute('data-username',username);
    button.textContent = username;
    if(status !== 'unavailable'){
        button.setAttribute('data-online-id',connectionId);
    }
    li.appendChild(button);
    return li;
};

export function addOnlineUsersItemComponent(username,connectionId,status){
    const [ usersOnlineListError, usersOnlineList ] = getElement('#UsersOnlineList');
    if(usersOnlineListError){ console.error( usersOnlineListError ); return };

    const component = usersOnlineItemComponent(username,connectionId,status);

    usersOnlineList.appendChild(
        new DocumentFragment().appendChild(component)
    );

    transition('add',component,'open','show',100);
};

export function addUsersOnlineItemComponentsForTesting(numberOfUsers = 10){
    const [ usersOnlineListError, usersOnlineList ] = getElement('#UsersOnlineList');
    if(usersOnlineListError){ console.error( usersOnlineListError ); return };
    const statusTypes = ['available','unavailable','grouped'];
    const testers = [];
    const df = new DocumentFragment();
    for(let i = 0; i < numberOfUsers; i++){
        
        const username = generateRandomUsername(random(5,20));
        const connectionId = `${random(1,10000000)}`;
        const status = statusTypes[random(0,statusTypes.length,true)];
    
        df.appendChild(
            usersOnlineItemComponent(username,connectionId,status)
        );
        if(testers.length < 2 && status !== 'unavailable'){
            testers.push({ username, connectionId });
        }
    }
    usersOnlineList.appendChild(df);
    return testers;
};



export function removeUsersFromOnlineUsersList(){
    const [usersOnlineListError, usersOnlineList ] = getElement('#UsersOnlineList');
    if(usersOnlineListError){ console.error( usersOnlineListError ); return };

    while(usersOnlineList.lastChild){
        usersOnlineList.removeChild(usersOnlineList.lastChild);
    }
};