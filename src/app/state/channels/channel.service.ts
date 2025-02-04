import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Channel } from '../../services/codegen/model/GetAllChannelsQueryResult';
import { ChannelRepository } from '../../components/t-channels/t-channels.repository';
import { ChannelService as ChannelSwaggerService } from '../../services/codegen/api/channel.service';

@Injectable()
export class ChannelService {
   private readonly channelSwaggerService = inject(ChannelSwaggerService);
   private readonly channelRepo = inject(ChannelRepository);

   getAllChannels(): Observable<Channel[]> {
      return this.channelSwaggerService
         .getChannels()
         .pipe(tap((response) => this.channelRepo.setChannels(response)));
   }
}
