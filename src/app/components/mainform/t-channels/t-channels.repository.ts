import {
   createState,
   select,
   setProp,
   Store,
   StoreDef,
   withProps,
} from '@ngneat/elf';
import {
   entitiesPropsFactory,
   selectAllEntities,
   selectEntities,
   selectEntity,
   setEntities,
   UIEntitiesRef,
   unionEntities,
   updateEntities,
   upsertEntities,
   withUIEntities,
} from '@ngneat/elf-entities';
import { v4 } from 'uuid';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Channel } from '../../../services/codegen/model/GetAllChannelsQueryResult';
import { MessageData } from '../../../services/codegen/model/GetChannelMessagesQueryResult';

export interface ChannelProps {
   /** Активный канал */
   activeChannelId?: number;
}

const { channelEntitiesRef, withChannelEntities } =
   entitiesPropsFactory('channel');
const { messageDataEntitiesRef, withMessageDataEntities } =
   entitiesPropsFactory('messageData');

const { state, config } = createState(
   withChannelEntities<Channel>(),
   withMessageDataEntities<MessageData>(),
   withUIEntities<MessageDataUI>(),
   withProps<ChannelProps>({ activeChannelId: null } as ChannelProps),
);

@Injectable()
export class ChannelRepository {
   constructor(public readonly store: Store<StoreDef<typeof state>>) {}

   /** Все каналы */
   readonly channels$: Observable<Channel[]> = this.store.pipe(
      selectAllEntities({ ref: channelEntitiesRef }),
   );

   /** Все данные сообщений */
   readonly messageData$ = this.store
      .combine({
         entities: this.store.pipe(
            selectAllEntities({ ref: messageDataEntitiesRef }),
         ),
         UIEntities: this.store.pipe(
            selectEntities({
               ref: UIEntitiesRef,
            }),
         ),
      })
      .pipe(unionEntities());

   /** ИД активного канала */
   readonly activeChannelId$ = this.store.pipe(
      select((st) => st.activeChannelId),
   );

   /** Канал по ИД */
   readonly channelById$ = (id: Channel['id']) =>
      this.store.pipe(selectEntity(id, { ref: channelEntitiesRef }));

   /** Название канала по ИД */
   readonly channelNameById$ = (id: Channel['id']) =>
      this.channelById$(id).pipe(map((x) => x?.name));

   /** Записать ИД активного канала */
   setActiveChannel(id: Channel['id']): void {
      this.store.update(setProp('activeChannelId', id));
   }

   /** Заполнить стор каналами */
   setChannels(channels: Channel[]): void {
      this.store.update(setEntities(channels, { ref: channelEntitiesRef }));
   }

   /** Заполнить стор данными сообщений канала */
   setMessageData(messages: MessageData[]): void {
      this.store.update(
         setEntities(messages, { ref: messageDataEntitiesRef }),
         setEntities(
            (messages ?? []).map((x) => ({ id: x.id, deliveryStatus: true })),
            { ref: UIEntitiesRef },
         ),
      );
   }

   /** Локально добавляем новое сообщение в чат*/
   preAddMessage(newMessage: MessageData) {
      this.store.update(
         upsertEntities(newMessage, { ref: messageDataEntitiesRef }),
      );
   }

   /** Обновить каналы новыми данными */
   updateChannelsList(channel: Channel) {
      this.store.update(upsertEntities(channel, { ref: channelEntitiesRef }));
   }

   get activeChannelId(): number {
      return this.store.query((state) => state.activeChannelId);
   }

   /** Обновить статус отправки сообщения */
   updateDeliveryStatus(id: MessageData['id']) {
      this.store.update(
         updateEntities(id, (e) => ({ ...e, deliveryStatus: true }), {
            ref: UIEntitiesRef,
         }),
      );
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

export interface MessageDataUI {
   id: MessageData['id'];
   deliveryStatus?: boolean;
}
