import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import * as signalR from '@microsoft/signalr';
import { environment } from '../../../../environments/environment';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class SignalRService implements OnDestroy {
    configForm: FormGroup;
    incomingcallForm: FormGroup;
    private connection: any = new Observable();
    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _formBuilder: FormBuilder,
        private _fuseConfirmationService: FuseConfirmationService
    ) {
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

    ngOnDestroy(): void {}

    public async connect() {
        this.connection = await new signalR.HubConnectionBuilder()
            .configureLogging(signalR.LogLevel.Information)
            .withUrl(environment.signalREndPoint + 'notify', {
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets,
            })
            .build();
        this.startConnection();

        // this.incomingCall();

        this.connection.on('vcCall', (data) => {
            console.log('call received-----', data);
        });

        this.connection.on('chatmessageReceived', (data) => {
            console.log('message received ----->', data);
        });

        this.connection.on('sendMessage', (data) => {
            console.log('message sent ----->', data);
        });

        this.connection.on('getdetails', (data) => {
            console.log('getting details ----->', data);
        });
    }

    public startConnection() {
        this.connection
            .start()
            .then(() => {
                console.log('SignalR Connected!');
            })
            .catch((err) => {
                return console.error(err.toString());
            });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    sendMessage(obj) {
        console.log('send message', obj);
        this.connection.send('sendMessage', obj, (ack) => {
            console.log(ack);
        });

        this.connection.send('getdetails', 'Hello world!', (ack) => {
            console.log(ack);
        });
    }

    /**
     * Incoming call
     */
    incomingCall(): void {
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
                music.pause();
                //on call accepted
            } else {
                music.pause();
                // on call rejected
            }
        });
    }
}
