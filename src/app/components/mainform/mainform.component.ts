import { Component, inject, OnInit } from '@angular/core';
import { TChannelsComponent } from '../t-channels/t-channels.component';
import { TUsersComponent } from '../t-users/t-users.component';
import { TChatComponent } from '../t-chat/t-chat.component';
import { TUserInfoComponent } from '../t-user-info/t-user-info.component';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import { UserService } from '../../services/codegen/api/user.service';
import { untilDestroyed } from '@ngneat/until-destroy';

@Component({
   selector: 'app-mainform',
   standalone: true,
   imports: [
      TChannelsComponent,
      TUsersComponent,
      TChatComponent,
      TUserInfoComponent,
      NzRowDirective,
      NzColDirective,
      NzDividerComponent,
   ],
   templateUrl: './mainform.component.html',
   styleUrl: './mainform.component.css',
})
export class MainformComponent {}
