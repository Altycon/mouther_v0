import { canopyLog, canopyNotify } from "../../canopy/canopy.js";
import { App } from "../../state.js";
import { getElement, setElementState } from "../../utilities/elements.js";
import { addUserRequest } from "../users/user_requests.js";
import { 
    addUsersOnlineItemComponentsForTesting, 
    removeUsersFromOnlineUsersList, 
    setOnlineUserState 
} from "../users/users_online.js";

function connectPrimaryUser(clickEvent){
    if(!App.username && App.username === undefined){
        canopyNotify('CREATE A USERNAME',
            'You must create a username before you connect.',
            null,
            'will do!'
        );
        return;
    }else if(!App.username && App.username === null){
        canopyNotify('RELOAD APPLICATION',
            'You must reload the application before continuing',
            null,
            'will do!'
        );
    }
    const target = clickEvent.target;
    const currentState = target.dataset.state;
    

    // real
    // const isConnected = Websocket.connect();
    // if(!isConnected){
    //     setElementState(clickEvent.target,'disconnected');
    //     return;
    // }

    // setElementState(clickEvent.target,'connected');

     // testing
    if(currentState === "" || currentState === 'disconnected'){

        setElementState(target,'connecting');
        canopyLog(`connecting with others...`);

        const i1 = setTimeout( ()=>{
            const testers = addUsersOnlineItemComponentsForTesting(); // <-- add this in a min
            setElementState(target,'connected');
            canopyLog(`Application connected`,'connected');
    
             // testing
            const i2 = setTimeout( ()=>{
                addUserRequest(testers[0].username, testers[0].connectionId);
                setOnlineUserState(testers[0].connectionId,'waiting');
                clearTimeout(i2);
            },10000);
            const i3 = setTimeout( ()=>{
                addUserRequest(testers[1].username,testers[1].connectionId);
                setOnlineUserState(testers[1].connectionId,'waiting');
                clearTimeout(i3)
            },20000);
            clearTimeout(i1);
        },3000);

        
    }else{
        setElementState(target,'connecting');
        canopyLog(`disconnecting with others...`);
        removeUsersFromOnlineUsersList();
        
        const i4 = setTimeout( ()=>{
            setElementState(target,'disconnected');
            canopyLog(`application disconnected`);
            clearTimeout(i4);
        },1000);
    }
     
};

export function listenToConnectPrimaryUserButton(){
    const [ connectPrimaryUserButtonError, connectPrimaryUserButton ] = getElement('#ConnectPrimaryUserButton');
    if(connectPrimaryUserButtonError){ console.warn( connectPrimaryUserButtonError ); return };

    connectPrimaryUserButton.addEventListener('click', connectPrimaryUser)
};