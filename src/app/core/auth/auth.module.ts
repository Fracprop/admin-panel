import { NgModule } from '@angular/core';
import { AuthService } from 'app/core/auth/auth.service';

@NgModule({
    providers: [AuthService],
})
export class AuthModule {}
