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
         { id: 1, title: 'channel1' },
         { id: 2, title: 'channel2' },
         { id: 3, title: 'channel3' },
         { id: 4, title: 'channel4' },
         { id: 5, title: 'channel5' },
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
   setChannels(articles: Channel[]): void {
      this.store.update(setEntities(articles));
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
   title: string;
}
