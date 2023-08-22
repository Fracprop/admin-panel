import {
    Component,
    ElementRef,
    HostBinding,
    HostListener,
    NgZone,
    OnDestroy,
    OnInit,
    Renderer2,
    ViewChild,
    ViewEncapsulation,
    Input,
} from '@angular/core';
import { ScrollStrategy, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Chat } from 'app/layout/common/quick-chat/quick-chat.types';
import { SignalRService } from 'app/modules/admin/common/signalR.service';
import { WebSocketService } from 'app/modules/admin/common/web-socket.service';

@Component({
    selector: 'quick-chat',
    templateUrl: './quick-chat.component.html',
    styleUrls: ['./quick-chat.component.scss'],
    encapsulation: ViewEncapsulation.None,
    exportAs: 'quickChat',
})
export class QuickChatComponent implements OnInit, OnDestroy {
    @Input() receiver: any = null;
    messages: any = [];
    @ViewChild('messageInput') messageInput: ElementRef;
    chat: Chat;
    chats: Chat[];
    opened: boolean = false;
    selectedChat: Chat;
    user: any = JSON.parse(localStorage.getItem('user'))['userID'].toString();
    private _scrollStrategy: ScrollStrategy =
        this._scrollStrategyOptions.block();
    private _overlay: HTMLElement;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _elementRef: ElementRef,
        private _renderer2: Renderer2,
        private _ngZone: NgZone,
        private _scrollStrategyOptions: ScrollStrategyOptions,
        private _signalR: SignalRService,
        private _webSocket: WebSocketService
    ) {
        this._webSocket.messagesStream
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((chat) => {
                if (chat) this.messages.push(chat['eventData']);
            });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Decorated methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Host binding for component classes
     */
    @HostBinding('class') get classList(): any {
        return {
            'quick-chat-opened': this.opened,
        };
    }

    /**
     * Resize on 'input' and 'ngModelChange' events
     *
     * @private
     */
    @HostListener('input')
    @HostListener('ngModelChange')
    private _resizeMessageInput(): void {
        // This doesn't need to trigger Angular's change detection by itself
        this._ngZone.runOutsideAngular(() => {
            setTimeout(() => {
                // Set the height to 'auto' so we can correctly read the scrollHeight
                this.messageInput.nativeElement.style.height = 'auto';

                // Get the scrollHeight and subtract the vertical padding
                this.messageInput.nativeElement.style.height = `${this.messageInput.nativeElement.scrollHeight}px`;
            });
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {}

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    sendMessage() {
        let obj = {
            eventName: 'sendMessage',
            eventData: {
                receiver_id: this.receiver.toString(),
                sender_id: JSON.parse(localStorage.getItem('user'))['userID'],
                message: this.messageInput?.nativeElement?.value,
                time: new Date(),
                patient_name: null,
                meeting_id: null,
            },
        };
        this._webSocket.sendMessage({ ...obj });
        this.messages.push(obj?.eventData);
        this.messageInput.nativeElement.value = '';
    }

    /**
     * Open the panel
     */
    open(): void {
        // Return if the panel has already opened
        if (this.opened) {
            return;
        }

        // Open the panel
        this._toggleOpened(true);
    }

    /**
     * Close the panel
     */
    close(): void {
        // Return if the panel has already closed
        if (!this.opened) {
            return;
        }

        // Close the panel
        this._toggleOpened(false);
    }

    /**
     * Toggle the panel
     */
    toggle(): void {
        if (this.opened) {
            this.close();
        } else {
            this.open();
        }
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Show the backdrop
     *
     * @private
     */
    private _showOverlay(): void {
        // Try hiding the overlay in case there is one already opened
        this._hideOverlay();

        // Create the backdrop element
        this._overlay = this._renderer2.createElement('div');

        // Return if overlay couldn't be create for some reason
        if (!this._overlay) {
            return;
        }

        // Add a class to the backdrop element
        this._overlay.classList.add('quick-chat-overlay');

        // Append the backdrop to the parent of the panel
        this._renderer2.appendChild(
            this._elementRef.nativeElement.parentElement,
            this._overlay
        );

        // Enable block scroll strategy
        this._scrollStrategy.enable();

        // Add an event listener to the overlay
        this._overlay.addEventListener('click', () => {
            this.close();
        });
    }

    /**
     * Hide the backdrop
     *
     * @private
     */
    private _hideOverlay(): void {
        if (!this._overlay) {
            return;
        }

        // If the backdrop still exists...
        if (this._overlay) {
            // Remove the backdrop
            this._overlay.parentNode.removeChild(this._overlay);
            this._overlay = null;
        }

        // Disable block scroll strategy
        this._scrollStrategy.disable();
    }

    /**
     * Open/close the panel
     *
     * @param open
     * @private
     */
    private _toggleOpened(open: boolean): void {
        // Set the opened
        this.opened = open;

        // If the panel opens, show the overlay
        if (open) {
            this._showOverlay();
        }
        // Otherwise, hide the overlay
        else {
            this._hideOverlay();
        }
    }
}
