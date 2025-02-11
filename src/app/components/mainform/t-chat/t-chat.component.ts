import {
   ChangeDetectionStrategy,
   Component,
   inject,
   OnInit,
} from '@angular/core';
import { ChannelRepository } from '../t-channels/t-channels.repository';
import { PushPipe } from '@ngrx/component';
import { AsyncPipe } from '@angular/common';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzTypographyComponent } from 'ng-zorro-antd/typography';
import { switchMap, tap } from 'rxjs';
import { HashtagPipe } from '../../../pipes/hashtag.pipe';
import { UserRepository } from '../t-users/t-users.repository';
import { ControlsOf, FormControl, FormGroup } from '@ngneat/reactive-forms';
import { MessageData } from '../../../services/codegen/model/GetChannelMessagesQueryResult';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
   NzFormControlComponent,
   NzFormDirective,
   NzFormItemComponent,
} from 'ng-zorro-antd/form';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import { ChannelService } from '../../../state/channels/channel.service';
import { ChannelService as ChannelSwaggerService } from '../../../services/codegen/api/channel.service';

@UntilDestroy()
@Component({
   selector: 'app-t-chat',
   standalone: true,
   imports: [
      PushPipe,
      AsyncPipe,
      NzCardComponent,
      NzTypographyComponent,
      HashtagPipe,
      FormsModule,
      NzFormDirective,
      ReactiveFormsModule,
      NzFormItemComponent,
      NzFormControlComponent,
      NzInputDirective,
      NzButtonComponent,
      NzRowDirective,
      NzColDirective,
   ],
   templateUrl: './t-chat.component.html',
   styleUrl: './t-chat.component.css',
   changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TChatComponent implements OnInit {
   private readonly channelRepo = inject(ChannelRepository);
   private readonly userRepo = inject(UserRepository);
   private readonly channelService = inject(ChannelService);
   private readonly channelSwaggerService = inject(ChannelSwaggerService);

   readonly messageData$ = this.channelRepo.messageData$;

   readonly activeChannelId$ = this.channelRepo.activeChannelId$;
   readonly activeChannelName$ = this.activeChannelId$.pipe(
      switchMap((x) => this.channelRepo.channelNameById$(x)),
   );
   readonly userNameById$ = this.userRepo.userNameById$;

   form: FormGroup<ControlsOf<MessageDataControls>>;

   ngOnInit(): void {
      this.initForm();
   }

   initForm(): void {
      this.form = new FormGroup<ControlsOf<MessageDataControls>>({
         id: new FormControl(null as number),
         fromUser: new FormControl(),
         content: new FormControl(undefined as string, [Validators.required]),
         channelId: new FormControl(),
      });
   }

   onSend() {
      const newMessage = this.form.getRawValue();

      newMessage.fromUser = this.userRepo.currentUserId;
      newMessage.channelId = this.channelRepo.activeChannelId;

      // Локально добавляем в стор сообщение
      this.channelRepo.preAddMessage(newMessage);

      // Отправляем сообщение на бэк, меняем статус у сообщения на "доставлено"
      this.channelSwaggerService
         .sendMessage(newMessage)
         .pipe(
            tap((response) => {
               this.channelRepo.updateDeliveryStatus(response.message.id);
            }),
            untilDestroyed(this),
         )
         .subscribe();
   }
}

export interface MessageDataControls extends MessageData {}
