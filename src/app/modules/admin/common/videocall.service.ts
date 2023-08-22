import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
declare var InstaVC: any;

@Injectable({ providedIn: 'root' })
export class VideoCallService implements OnDestroy {
    private instaVC: any;

    // ------------------ When my local video is received
    public callData = new BehaviorSubject<any>(null);
    onCallStreamReceived(data) {
        this.callData.next(data);
    }
    // -----------------------------------------------------------

    // ------------------ When remote video is received
    public remoteData = new BehaviorSubject<any>(null);
    onCallRemoteStreamReceived(data) {
        this.remoteData.next(data);
    }
    // -----------------------------------------------------------

    // ------------------ When call connected with remote
    public callConnectedData = new BehaviorSubject<any>(null);
    onCallConnected(data) {
        this.callConnectedData.next(data);
    }
    // -----------------------------------------------------------

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {
        this.instaVC = InstaVC();

        //------ EVENT LISTENERS FROM VC

        // LOCAL VIDEO
        this.instaVC.on('localvideo', (event) => {
            console.log(event);
            this.onCallStreamReceived(event);
        });

        //REMOTE VIDEO
        this.instaVC.on('remotevideo', (event) => {
            console.log(event);
            this.onCallRemoteStreamReceived(event);
        });

        //CALL CONNECTED
        this.instaVC.on('call-connected', (event) => {
            console.log(event);
            this.onCallConnected(event);
        });

        //CALL INITIATED
        this.instaVC.on('call-initiated', (event) => {
            console.log(event);
        });

        //SCREEN SHARED
        this.instaVC.on('screen-shared', (event) => {
            console.log(event);
        });

        //SCREEN SHARE ENDED
        this.instaVC.on('screen-ended', (event) => {
            console.log(event);
        });

        //VIDEO MUTED
        this.instaVC.on('mute-video', (event) => {
            console.log(event);
        });

        //AUDIO MUTED
        this.instaVC.on('mute-audio', (event) => {
            console.log(event);
        });

        //MESSAGE RECEIVED
        // this.instaVC.on('command-received', (event) => {
        //     console.log(event);
        // });
    }

    ngOnDestroy(): void {
        this.remoteData.unsubscribe();
        this.callData.unsubscribe();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    joinMeeting(id) {
        const API_URL = 'wss://cdacp2papi.instavc.com/';
        let joning_info = this.instaVC
            .loginServer(id, API_URL)
            .then((res) => {
                this.instaVC
                    .setLocalstream()
                    .then((stream) => {})
                    .catch((error) => {
                        console.log('error in setLocalstream ==== ', error);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
        return joning_info;
    }

    joinCall(id) {
        let call_info = this.instaVC.call(id.toString());
        return call_info;
    }

    endCall() {
        let call_end_info = this.instaVC.endCall();
        return call_end_info;
    }

    muteVideo() {
        return this.instaVC.muteVideo();
    }

    unmuteVideo() {
        return this.instaVC.unmuteVideo();
    }

    muteAudio() {
        return this.instaVC.muteAudio();
    }

    unmuteAudio() {
        return this.instaVC.unmuteAudio();
    }

    isVideoEnabled() {
        return this.instaVC.isVideoEnabled();
    }

    isAudioEnabled() {
        return this.instaVC.isAudioEnabled();
    }

    shareScreen() {
        return this.instaVC.shareScreen();
    }

    // sendMessage(obj) {
    //     return this.instaVC.sendCommand({ ...obj });
    // }
}
