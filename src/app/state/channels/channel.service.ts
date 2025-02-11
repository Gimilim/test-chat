import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ChannelRepository } from '../../components/mainform/t-channels/t-channels.repository';
import { ChannelService as ChannelSwaggerService } from '../../services/codegen/api/channel.service';
import { Channel } from '../../services/codegen/model/GetAllChannelsQueryResult';

@Injectable()
export class ChannelService {
   private readonly channelSwaggerService = inject(ChannelSwaggerService);
   private readonly channelRepo = inject(ChannelRepository);

   getAllChannels(): Observable<Channel[]> {
      return this.channelSwaggerService
         .getChannels()
         .pipe(tap((response) => this.channelRepo.setChannels(response)));
   }

   sendMessage() {}
}
