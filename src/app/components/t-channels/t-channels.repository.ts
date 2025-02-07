import { createState, Store, StoreDef } from '@ngneat/elf';
import {
   selectAllEntities,
   setEntities,
   upsertEntities,
   withEntities,
} from '@ngneat/elf-entities';
import { v4 } from 'uuid';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Channel } from '../../services/codegen/model/GetAllChannelsQueryResult';
import { User } from '../../services/codegen/model/GetAllUsersQueryResult';

const { state, config } = createState(withEntities<Channel>());

@Injectable()
export class ChannelRepository {
   constructor(public readonly store: Store<StoreDef<typeof state>>) {}

   /** Все каналы */
   readonly channels$: Observable<Channel[]> =
      this.store.pipe(selectAllEntities());

   /** Заполнить каналы */
   setChannels(channels: Channel[]): void {
      this.store.update(setEntities(channels));
   }

   updateChannelsList(channel: Channel) {
      this.store.update(upsertEntities(channel));
   }
}

export const ChannelProvider = {
   provide: ChannelRepository,
   useFactory(): ChannelRepository {
      return new ChannelRepository(
         new Store({
            name: `channel-repository-${v4()}`,
            state,
            config,
         }),
      );
   },
};
