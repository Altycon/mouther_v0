import { 
    canopyConfirm, 
    canopyLog, 
    canopyNotify 
} from "../../canopy/canopy.js";
import { LocalDB } from "../../database/storage_local.js";
import { App, Settings } from "../../state.js";
import { getElement, setElementState, setElementValue, transition } from "../../utilities/elements.js";
import { listenToChangeUsernameButton } from "../components/change_username_button.js";
import { listenToUsernameForm } from "../components/username_form.js";
import { removeUsernameFormAndChangeButton } from "../users/users.js";
import { removeUsersFromOnlineUsersList } from "../users/users_online.js";
import { 
    ColorSetting, 
    createColorSettings 
} from "./colors.js";
import { 
    clearPrimaryUsername, 
    createPrimaryUser, 
    handleUndefinedPrimaryUser, 
    setPrimaryUsername 
} from "./primary_user.js";

function setCSSPropertyValue(property,value){
    document.documentElement.style.setProperty(property,value);
};

function saveApplicationDataToLocalStorage(){
    const [ localDBError ] = LocalDB.initialize();
    if(localDBError){ 
        console.error( localDBError );
        return [ localDBError, null ];
    };
    
    const [userError, user ] = LocalDB.setItem('user', 
        createPrimaryUser()
    );
    if(userError){ 
        console.error( userError );
        return [ userError, null ];
    };
    
    
    const [ settingsError ] = LocalDB.setItem('settings',
        createColorSettings()
    );
    if(settingsError){ 
        console.error( settingsError ); 
        return [ settingsError, null ];
    };

    return [ null, user ];
}
function saveApplicationData(){
    if(!App.username){
        canopyNotify('No username created','Please enter a username',null,null,
            handleUndefinedPrimaryUser()
        );
        return;
    }

    const [ saveError, user ] = saveApplicationDataToLocalStorage();
    if(saveError){
        canopyNotify(saveError.name,
            'An error occured saving your data',
            'please try again or reload the application.'
        )
        return;
    }

    toggleAppSettingsSavingFieldset('remove');
    canopyNotify('Data saved successfully!',
        `Your username "${user.username}" and any changed settings have been saved.`,
        'Data has just been saved to your browsers database. This storage may be temporary.',
    );
    canopyLog('data saved successfully','connected');
};
function deleteApplicationDataLocally(){
    if(!App.username || !LocalDB.exists()) return;

    canopyConfirm('Are you sure?',
        'This will delete any and all data including your username, color settings, and connections. If you continue, you will have to reload the app.',
        ()=>{
            const [error] = LocalDB.deleteStore();
            if(error){
                canopyNotify('Database error occured',error.message,'please contact developer');
                return;
            }
            const [ connectPrimaryUserButtonError, connectPrimaryUserButton ] = getElement('#ConnectPrimaryUserButton');
            if(connectPrimaryUserButtonError){ console.warn( connectPrimaryUserButtonError ); return };
            if(connectPrimaryUserButton.dataset.state === 'opened'){
                connectPrimaryUserButton.click();
            }
            clearPrimaryUsername();
            
            removeUsersFromOnlineUsersList();

            toggleAppSettingsSavingFieldset('add');
            canopyLog('data deleted successfully','connected');
        }
    )
};
function resetApplicationDataLocally(){
    if(!App.username) return;

    function reset(){
        
        if(LocalDB.exists()){
            const [ error ] = LocalDB.deleteItem('settings');
            if(error){ console.warn( error ); return };
        }
        

        Settings.forEach( setting =>{
            setCSSPropertyValue(setting.cssProperty,setting.value);
            setElementValue(document.querySelector(`#${setting.id}`),setting.value);
        })

    };
    canopyConfirm('Are you sure?','This will reset all default settings',()=>{
        reset();
    })
};
function handleAppSettingsClicks(clickEvent){
    const target = clickEvent.target;
    const action = target.dataset.action;
    if(action){
        switch(action){
            case 'reset':
                resetApplicationDataLocally();
            break;
            case 'delete':{
                deleteApplicationDataLocally();
            }
            break;
            case 'save-locally':{
                saveApplicationData();
            }
            break;
        }
    }
};
function handleAppSettingsChanges(changeEvent){
    const target = changeEvent.target;
    if(target.tagName !== 'INPUT') return;
    if(!target.type) return;

    const id = target.id;
    const value = target.value;
    const name = target.name;
    if(!id || !value) return;
    
    const colorSetting = Settings.find( setting => setting.name === name);
    if(colorSetting){
        setCSSPropertyValue(colorSetting.cssProperty,value);
    }
    if(LocalDB.initialized){

        const doesExist = LocalDB.itemExists('settings');
        
        if(doesExist){
            const [error] = LocalDB.addToItem('settings',
                new ColorSetting(id,value,name,colorSetting.cssProperty)
            );
            if(error){ console.error( error ); return };
        }else{
            LocalDB.setItem('settings',
                [new ColorSetting(id,value,name,colorSetting.cssProperty)]
            )
        }
    }
    
}
function openAppSettingsMenu(clickEvent){
    const [ appSettingsMenuError, appSettingsMenu ] = getElement('#AppSettingsMenu');
    if(appSettingsMenuError){ console.error( appSettingsMenuError ); return };

    if(!appSettingsMenu.classList.contains('open')){
        setElementState(clickEvent.target,'opened');
        transition('add',appSettingsMenu,'open','show',100);
    }else{
        setElementState(clickEvent.target,'closed');
        transition('add-remove',appSettingsMenu,'closing',['open','show','closing'],500);
    }
};
export function toggleAppSettingsSavingFieldset(action){
    const [savingFieldsetError, savingFieldset ]= getElement('#AppSettingsForm .saving');
    if(savingFieldsetError){ console.error( savingFieldsetError ); return };
    if(action === 'add'){
        savingFieldset.style.display = 'block';
    }else if(action === 'remove'){
        savingFieldset.style.display = 'none';
    }
};
function connectOpenSettingsButton(){
    const [ openSettingsButtonError, openSettingsButton ] = getElement('#OpenAppSettingsButton');
    if(openSettingsButtonError){ console.warn( openSettingsButtonError ); return };

    openSettingsButton.addEventListener('click', openAppSettingsMenu);
};

export function initializeSettings(){
    if(!Settings) return;
    const [ appSettingsError, appSettings ] = getElement('#AppSettingsForm');
    if(appSettingsError){ console.error( appSettingsError ); return };

    if(LocalDB.exists()){
        
        const [ storeError, store ] = LocalDB.getStore();
        if(storeError){ console.error( storeError ); return };

        removeUsernameFormAndChangeButton();
        toggleAppSettingsSavingFieldset('remove');

        if(!store.user){
            console.error( new Error('local storage is missing "user"'));
            return;
        }
        setPrimaryUsername(store.user.username,store.user.created);
        
        // I can remove this if I set the html values correctly
        Settings.forEach( ({ id, value }) =>{
            setElementValue(document.querySelector(`#${id}`),value);
        });
        // -----------------------------

        if(store.settings){
            store.settings.forEach( setting => {
                
                if(setting.type === 'color'){
                    const element = document.querySelector(`#${setting.id}`);
                    if(element){
                        setElementValue(element,setting.value);
                        setCSSPropertyValue(setting.cssProperty,setting.value);
                    }
                    
                }
            })
        }

    }else{

        // I can remove this if I set the html values correctly
        Settings.forEach( ({ id, value }) => {
            setElementValue(document.querySelector(`#${id}`),value);
        });
        // -----------------------------

        listenToUsernameForm();
        listenToChangeUsernameButton();
        
    }

    appSettings.addEventListener('click', handleAppSettingsClicks);
    appSettings.addEventListener('change',handleAppSettingsChanges);

    connectOpenSettingsButton();
};