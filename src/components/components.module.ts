import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { EditProfileFormComponent } from './edit-profile-form/edit-profile-form.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { ProfileSearchComponent } from './profile-search/profile-search.component';
import { SendMessageBoxComponent } from './send-message-box/send-message-box.component';
import { OnlineUsersComponent } from './online-users/online-users.component';
import { LastMessageListComponent } from './last-message-list/last-message-list.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        LoginFormComponent,
        RegisterFormComponent,
        EditProfileFormComponent,
        ProfileViewComponent,
        ProfileSearchComponent,
        SendMessageBoxComponent,
        OnlineUsersComponent,
        LastMessageListComponent
    ],
    imports: [
        IonicModule,
        CommonModule
    ],
    exports: [
        LoginFormComponent,
        RegisterFormComponent,
        EditProfileFormComponent,
        ProfileViewComponent,
        ProfileSearchComponent,
        SendMessageBoxComponent,
        OnlineUsersComponent,
        LastMessageListComponent
    ]
})

export class ComponentsModule {}