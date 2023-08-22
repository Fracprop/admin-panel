import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { FormBuilder, FormGroup } from '@angular/forms';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class WebSocketService implements OnDestroy {
    configForm: FormGroup;
    incomingcallForm: FormGroup;
    private connection$: any;
    public messages$: BehaviorSubject<[]> = new BehaviorSubject<[]>(null);
    /**
     * Constructor
     */
    constructor(
        private _formBuilder: FormBuilder,
        private _fuseConfirmationService: FuseConfirmationService,
        private _router: Router
    ) {
        this.configureCallForm();
    }

    ngOnDestroy(): void {}

    /**
     * Getter for chat
     */
    get messagesStream(): Observable<[]> {
        return this.messages$.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    connectSockets(receiverId) {
        /**
         * WEB SOCKETS IMPLEMENTATION
         */
        this.connection$ = webSocket(
            environment?.webSocketEndpoint +
                '?UserID=' +
                JSON.parse(localStorage.getItem('user'))['userID'] +
                '&Receiver_ID=0' +
                receiverId
        );

        /**
         * Sending intial message
         */
        this.sendMessage({
            eventName: 'sendMessage',
            eventData: {
                receiver_id: receiverId.toString(),
                sender_id: JSON.parse(localStorage.getItem('user'))['userID'],
                message: 'Handshake',
                time: new Date(),
                patient_name: null,
                meeting_id: null,
            },
        });

        /**
         *
         */

        this.connection$.subscribe(
            (msg: object) => {
                if (
                    msg?.['eventData']?.sender_id !==
                    JSON.parse(localStorage.getItem('user'))['userID']
                )
                    this.handleEvents({ ...msg });
            }, // Called whenever there is a message from the server.
            (err) => console.log(err), // Called if at any point WebSocket API signals some kind of error.
            () => console.log('complete') // Called when connection is closed (for whatever reason).
        );
    }

    /**
     *
     * Handling socket events
     */
    handleEvents(obj: any) {
        switch (obj?.eventName) {
            case 'callRequest':
                this.incomingCall(obj);
                break;
            case 'sendMessage':
                this.messages$.next({ ...obj });
                console.log(this.messages$, '-----------MESSAGE -----------');
                break;
        }
    }

    /**
     * End Call
     */
    endCall(obj: any) {
        this.connection$.next(obj);
    }

    /**
     * Send Message | Event
     */
    sendMessage(obj: any) {
        this.connection$.next(obj);
    }

    configureCallForm() {
        /**
         * CALL CONFIG FORM
         */
        this.incomingcallForm = this._formBuilder.group({
            title: 'Upcoming Consultation Request!',
            message: 'Imcoming call from RAVI KUMAR',
            icon: this._formBuilder.group({
                show: true,
                name: 'mat_outline:call',
                color: 'success',
            }),
            actions: this._formBuilder.group({
                confirm: this._formBuilder.group({
                    show: true,
                    label: 'ACCEPT',
                }),
                cancel: this._formBuilder.group({
                    show: true,
                    label: 'DENY',
                    color: 'warn',
                }),
            }),
            dismissible: false,
        });
    }

    /**
     * Incoming call
     */
    incomingCall(obj: any): void {
        this.incomingcallForm.controls['message']?.setValue(
            'Incoming call from' + obj?.eventData?.patient_name
        );
        /**
         * Playing ringtone while call is being received
         */
        const music = new Audio('assets/audio/call.wav');
        setTimeout(() => {
            music.loop = true;
            music.muted = false;
            music.autoplay = true;
            music.play();
        }, 1000);

        // Opening popup
        const dialogRef = this._fuseConfirmationService.open(
            this.incomingcallForm.value
        );

        // Subscribe to afterClosed from the dialog reference
        dialogRef.afterClosed().subscribe((result) => {
            if (result === 'confirmed') {
                //on call accepted
                music.pause();
                this.connection$.next({
                    eventName: 'callAccepted',
                    eventData: {
                        receiver_id: obj?.eventData?.sender_id,
                        sender_id: obj?.eventData?.receiver_id,
                        message: 'Call accepted',
                        time: new Date(),
                        patient_name: obj?.eventData?.patient_name,
                        meeting_id: obj?.eventData?.meeting_id,
                    },
                });
                if (obj?.eventData?.meeting_id) {
                    const url = this._router
                        .navigate(['/teleconsultation/meetings'])
                        .then((result) => {
                            window.open(
                                '/#/meeting-room?id=' +
                                    obj?.eventData?.meeting_id,
                                '_blank'
                            );
                        });
                }
            } else {
                // on call rejected
                music.pause();
                this.connection$.next({
                    eventName: 'callDenied',
                    eventData: {
                        receiver_id: obj?.eventData?.sender_id,
                        sender_id: obj?.eventData?.receiver_id,
                        message: 'Call denied',
                        time: new Date(),
                        patient_name: obj?.eventData?.patient_name,
                        meeting_id: obj?.eventData?.meeting_id,
                    },
                });
            }
        });
    }
}
