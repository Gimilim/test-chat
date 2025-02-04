import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
   Channel,
   ChannelProvider,
   ChannelRepository,
} from './t-channels.repository';
import { PushPipe } from '@ngrx/component';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTooltipDirective } from 'ng-zorro-antd/tooltip';
import { NzButtonComponent } from 'ng-zorro-antd/button';

@Component({
   selector: 'app-t-channels',
   standalone: true,
   imports: [PushPipe, NzMenuModule, NzTooltipDirective, NzButtonComponent],
   templateUrl: './t-channels.component.html',
   styleUrl: './t-channels.component.css',
   changeDetection: ChangeDetectionStrategy.OnPush,
   providers: [ChannelProvider],
})
export class TChannelsComponent {
   private readonly channelRepo = inject(ChannelRepository);

   // Получаем все каналы
   readonly allChannels$ = this.channelRepo.channels$;

   switchActiveChannel(channel: Channel) {}
}
