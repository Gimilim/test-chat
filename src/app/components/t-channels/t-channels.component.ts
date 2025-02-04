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

@UntilDestroy()
@Component({
   selector: 'app-t-channels',
   standalone: true,
   imports: [PushPipe, NzMenuModule, NzTooltipDirective, NzButtonComponent],
   templateUrl: './t-channels.component.html',
   styleUrl: './t-channels.component.css',
   changeDetection: ChangeDetectionStrategy.OnPush,
   providers: [ChannelProvider, ChannelService],
})
export class TChannelsComponent implements OnInit {
   private readonly channelRepo = inject(ChannelRepository);
   private readonly channelService = inject(ChannelService);

   // Все каналы
   readonly allChannels$ = this.channelRepo.channels$;

   ngOnInit(): void {
      // Подгружаем все каналы
      this.channelService
         .getAllChannels()
         .pipe(untilDestroyed(this))
         .subscribe();
   }

   switchActiveChannel(channel: Channel) {}
}
