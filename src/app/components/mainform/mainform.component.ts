import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TChannelsComponent } from './t-channels/t-channels.component';
import { TUsersComponent } from './t-users/t-users.component';
import { TChatComponent } from './t-channels/t-chat/t-chat.component';
import { TUserInfoComponent } from './t-user-info/t-user-info.component';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import { ChannelProvider } from './t-channels/t-channels.repository';
import { ChannelService } from '../../state/channels/channel.service';
import { NzModalService } from 'ng-zorro-antd/modal';

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
   providers: [ChannelProvider, ChannelService, NzModalService],
   changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainformComponent {}
