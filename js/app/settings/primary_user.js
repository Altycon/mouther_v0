
import { canopyLog } from "../../canopy/canopy.js";
import { App } from "../../state.js";
import { getElement } from "../../utilities/elements.js";
import { random } from "../../utilities/tools.js";


function displayPrimaryUsername(username){
    const [ appUsernameError, appUsername ] = getElement('#AppUsername');
    if(appUsernameError){ console.error( appUsernameError ); return };

    appUsername.textContent = username;
};
export function displayPrimaryUserStatusAndMemberNumber(userStatus,memberNumber){
    const [ userStatusDisplayerror, userStatusDisplay ] = getElement('#UserStatusDisplay');
    if(userStatusDisplayerror){ console.error( userStatusDisplayerror ); return };

    userStatusDisplay.textContent = userStatus;

    const [ memberNumberDisplayError, memberNumberDisplay ] = getElement('#MemberNumberDisplay');
    if(memberNumberDisplayError){ console.error( memberNumberDisplayError ); return };

    memberNumberDisplay.textContent = `${memberNumber}`;

};
function displayPrimaryUsernameInSettings(username,created){
    const [ appSettinsUsernameError, appSettinsUsername ] = getElement('#AppSettingsUsername');
    if(appSettinsUsernameError){ console.error( appSettinsUsernameError ); return };
    appSettinsUsername.textContent = username;

    if(created){
        const [ appSettingsUserCreatedError, appSettingsUserCreated ] = getElement('#AppSettingsUserCreated');
        if(appSettingsUserCreatedError){ console.error( appSettingsUserCreatedError ); return };

        appSettingsUserCreated.textContent = created;
    }
};


export function setPrimaryUsername(username,created){
    created = created || new Date().toLocaleDateString();

    App.username = username;
    App.created = created;
    
    displayPrimaryUsername(username);
    displayPrimaryUsernameInSettings(username,created);
    
    canopyLog(`Welcome "${username}"`);
    
};
export function clearPrimaryUsername(){
    const [ appUsernameError, appUsername ] = getElement('#AppUsername');
    if(appUsernameError){ console.error( appUsernameError ); return };

    const [ appSettinsUsernameError, appSettinsUsername ] = getElement('#AppSettingsUsername');
    if(appSettinsUsernameError){ console.error( appSettinsUsernameError ); return };

    const [ appSettingsUserCreatedError, appSettingsUserCreated ] = getElement('#AppSettingsUserCreated');
    if(appSettingsUserCreatedError){ console.error( appSettingsUserCreatedError ); return };

    appUsername.textContent = 'USERNAME';
    appSettinsUsername.textContent = 'none';
    appSettingsUserCreated.textContent = 'existence is futile';

    App.username = null;
    App.created = null;
};
export function handleUndefinedPrimaryUser(){
    const [ changeUsernameButtonError, changeUsernameButton ] = getElement('#ChangeUsernameButton');
    if(changeUsernameButtonError){ 
        
        const [ appUsernameError, appUsername ] = getElement('#AppUsername');
        if(appUsernameError) return;

        appUsername.textContent = 'reload application'
        appUsername.classList.add('reload');
    }else{
        changeUsernameButton.click();
    }
};
export function createPrimaryUser(){
    const uniqueUserId = 'k45748hwkjlnhh73465uhguif'
    const connectionId = random(1,1000000);
    return { 
        username: App.username,
        created: App.created,
        id: uniqueUserId,
        connectionId: connectionId
    }
};