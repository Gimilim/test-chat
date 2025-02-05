import {
   ChangeDetectionStrategy,
   Component,
   inject,
   OnInit,
} from '@angular/core';
import { ChannelProvider, ChannelRepository } from './t-channels.repository';
import { PushPipe } from '@ngrx/component';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTooltipDirective } from 'ng-zorro-antd/tooltip';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { ChannelService } from '../../state/channels/channel.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Channel } from '../../services/codegen/model/GetAllChannelsQueryResult';
import {
   NzModalComponent,
   NzModalContentDirective,
   NzModalService,
} from 'ng-zorro-antd/modal';
import { BehaviorSubject } from 'rxjs';

@UntilDestroy()
@Component({
   selector: 'app-t-channels',
   standalone: true,
   imports: [
      PushPipe,
      NzMenuModule,
      NzTooltipDirective,
      NzButtonComponent,
      NzModalComponent,
      NzModalContentDirective,
   ],
   templateUrl: './t-channels.component.html',
   styleUrl: './t-channels.component.css',
   changeDetection: ChangeDetectionStrategy.OnPush,
   providers: [ChannelProvider, ChannelService, NzModalService],
})
export class TChannelsComponent implements OnInit {
   private readonly channelRepo = inject(ChannelRepository);
   private readonly channelService = inject(ChannelService);

   isAddChannelModalVisible$ = new BehaviorSubject<boolean>(false);
   isOkLoading = false;

   // Все каналы
   readonly allChannels$ = this.channelRepo.channels$;

   ngOnInit(): void {
      // Подгружаем все каналы
      this.channelService
         .getAllChannels()
         .pipe(untilDestroyed(this))
         .subscribe();
   }

   switchActiveChannel(channel: Channel) {
      console.log(channel.name);
   }

   showAddChannelModal() {
      this.isAddChannelModalVisible$.next(true);
   }

   onChannelModalOk() {
      this.isAddChannelModalVisible$.next(false);
   }

   onChannelModalCancel() {
      this.isAddChannelModalVisible$.next(false);
   }
}
