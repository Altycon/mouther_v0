



export const RealTimeConnection = {
    configuration: {
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    },
    peerConnection: undefined,

    async answer(offer){

        this.peerConnection = new RTCPeerConnection(this.configuration);
        this.peerConnection.setRemoteDescription(
            new RTCSessionDescription(offer)
        );

        try{

            const answer = await this.peerConnection.createAnswer();
            await this.peerConnection.setLocalDescription(answer);
            
            Websocket.send({ answer });

        }catch(error){
            // inform user
            console.error('WEBRTC_ANSWER_ERROR: ',error);
        }
    },
    async offer(){
        try{
            this.peerConnection = new RTCPeerConnection(this.configuration);

            this.peerConnection.onicecandidate = (iceEvent)=>{
                if(iceEvent.candidate){
                    Websocket.send({ candidate: iceEvent.candidate });
                }
            };

            const offer = await this.peerConnection.createOffer();
            await this.peerConnection.setLocalDescription(offer);

            Websocket.send({ offer });

        }catch(error){
            // inform user
            console.error('WEBRTC_OFFER_ERROR: ',error);
        }
        
        
    },
    async ice(candidate){
        try{

            await this.peerConnection.addIceCandidate(
                new RTCIceCandidate(candidate)
            );

        }catch(error){
            // inform user
            console.error('WEBRTC_CANIDATE_ERROR: ',error);
        }
        
    },
    async complete(answer){
        try{

            await this.peerConnection.setRemoteDescription(
                new RTCSessionDescription(answer)
            );

        }catch(error){
            // inform user
            console.error('WEBRTC_COMPLETE_ERROR: ',error);
        }
        
    }
};