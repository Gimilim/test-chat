import { createState, Store, StoreDef } from '@ngneat/elf';
import {
   selectAllEntities,
   setEntities,
   withEntities,
} from '@ngneat/elf-entities';
import { v4 } from 'uuid';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Сидим первоначальные значения, в настоящем проекте эти данные получали бы с бэка
const { state, config } = createState(
   withEntities<Channel>({
      initialValue: [
         { id: 1, name: 'channel1' },
         { id: 2, name: 'channel2' },
         { id: 3, name: 'channel3' },
         { id: 4, name: 'channel4' },
         { id: 5, name: 'channel5' },
      ],
   }),
);

@Injectable()
export class ChannelRepository {
   constructor(public readonly store: Store<StoreDef<typeof state>>) {}

   /** Все каналы */
   readonly channels$: Observable<Channel[]> =
      this.store.pipe(selectAllEntities());

   // Метод, который вызывался бы из файла сервиса, чтобы заполнить стор значениями с бэка
   // Не используется в рамках тестового задания, данные засижены "искуственно"
   setChannels(channels: Channel[]): void {
      this.store.update(setEntities(channels));
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

export interface Channel {
   id: number;
   name: string;
}
