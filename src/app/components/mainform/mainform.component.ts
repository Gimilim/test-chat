import { Component } from '@angular/core';
import { TChannelsComponent } from '../t-channels/t-channels.component';
import { TUsersComponent } from '../t-users/t-users.component';
import { TChatComponent } from '../t-chat/t-chat.component';
import { TUserInfoComponent } from '../t-user-info/t-user-info.component';

@Component({
   selector: 'app-mainform',
   standalone: true,
   imports: [
      TChannelsComponent,
      TUsersComponent,
      TChatComponent,
      TUserInfoComponent,
   ],
   templateUrl: './mainform.component.html',
   styleUrl: './mainform.component.css',
})
export class MainformComponent {}
