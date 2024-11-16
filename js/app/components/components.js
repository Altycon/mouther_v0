import { listenToConnectMicrophoneButton } from "./connect_microphone_button.js";
import { listenToConnectPrimaryUserButton } from "./connect_primary_user_button.js";
import { listenToUsersOnlineMenuButton } from "./open_users_online_menu_button.js";
import { listenToTalkButton } from "./talk_button.js";
import { listenToUsersConnectedList } from "./users_connected_list.js";
import { listenToUsersOnlineList } from "./users_online_list.js";
import { listenToUserRequestsList } from "./users_requests_list.js";


export function initializeApplicationComponents(){
    listenToConnectPrimaryUserButton();
    listenToUsersOnlineMenuButton();
    listenToConnectMicrophoneButton();
    listenToTalkButton();

    listenToUserRequestsList();
    listenToUsersOnlineList();
    listenToUsersConnectedList();

};