import { displayApplicationUserStatusAndMemberNumber } from "../app/settings/settings.js";
import { App } from "../state.js"
import { canopyNotify } from "../canopy/page_notification.js";
import { canopyLog } from "../canopy/visual_log.js";
import { addUserRequest } from "../users/user_requests.js";
import { RealTimeConnection } from "./webrtc.js";



export const Websocket = {
    socket: undefined,
    socketId: undefined,
    send(data,callback){

        // for testing purponse, real code below
        console.log('sent')


        // if(!this.socket) return;
        // if(typeof data === 'string'){
        //     this.socket.send(data);
        // }else{
        //     this.socket.send(JSON.stringify(data));
        // }
        if(callback) callback();
    },
    async recieve(message){
        const data = JSON.parse(message.data);
        if(data.message){
           
            console.log('message', data.message);
            
        }else if(data.type){
            switch(data.type){
                case 'error':{
                    const { error } = data;
                    console.error(error);
                    canopyLog(error.message);
                }
                break;
                case 'connected':{
                    // recieving from server on connection
                    const { socketId, connectionId, userStatus, memberNumber } = data;

                    this.socketId = socketId;
                    this.connectionId = connectionId;

                    //displayApplicationUserStatusAndMemberNumber(userStatus,memberNumber)

                    // setMemberStatusDisplay

                    this.send({
                        type: 'save-username',
                        socketId: this.socketId,
                        username: '',
                    });
                }
                break;
                case 'users-online':{
                    // recieving from server all users online 
                    const { users } = data;
                }  
                break;
                case 'user-joined':{
                    // recieving from server that user has joined
                    const { username, socketId } = data;
                    // add to online users list
                }
                break;


                case 'connection-request':{
                    // recieving from user to connect
                    const { username, connectionId } = data;
                    // add a new user request
                    //addUserRequest(username,connectionId);
                }
                break;
                case 'connection-request-denied':{
                    // recieving from requested user connection
                    const { username, socketId } = data;
                    
                }
                break;
                case 'connection-request-accepted':{
                    // recieving from requested user connection
                    const { username, socketId } = data;

                }
                break;

                
                case 'group-request':{
                    // recieving from member requesting to join group
                }
                break;
                case 'group-request-denied':{
                    // recieving from group
                }
                break;
                case 'group-request-accepted':{
                    // receiving from group
                    const { groupId, users } = data;
                }
                break;

                case 'member-request':{
                    // reciveing from group requesting to join group
                }
                break;
                case 'member-request-denied':{
                    // recieving from requested member
                }
                break;
                case 'member-request-denied':{
                    // receiving from requested member
                }
                break;
                case 'set-group':{
                    const { groupId, users } = data;
                    // recieving from group
                }
                break;
            }

        }else if(data.offer){

            // console.log('offer',data.offer);
            //RealTimeConnection.answer(data.offer);

        }else if(data.answer){

            // console.log('answer',data.answer);
            // RealTimeConnection.complete(data.answer);

        }else if(data.canidate){

            // console.log('canidate',data.canidate);
            // RealTimeConnection.ice(data.canidate);
            
        }else if(typeof data === 'string'){

            console.log('string', data);

        }else{

            console.log('some sort of data', data);
        }
    },
    close(){
        // event.code === 1000
        // event.reason === "Work complete"
        // event.wasClean === true (clean close)

        // event.code === 1006
        // event.reason === ""
        // event.wasClean === false (no closing frame)
        if(closeEvent.wasClean) console.log(closeEvent.wasClean)
        console.log('websocket closed');
        this.socket.destroy();
    },
    connect(){
        try{
            this.socket = new WebSocket(App.WEBSOCKET_ORIGIN_URL);
            this.socket.onerror = (error)=> console.error('WEBSOCKET_ERROR',error);
            this.socket.onopen = ()=> console.log('MOUTHER websocket opened');
            this.socket.onclose = this.close;
            this.socket.onmessage = this.recieve;

            return true;

        }catch(error){
            console.error('WEBSOCKET_ERROR',error);
            return [error,null];
        }
    }
};

