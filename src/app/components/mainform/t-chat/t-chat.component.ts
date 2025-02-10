import {
   ChangeDetectionStrategy,
   Component,
   inject,
   OnInit,
} from '@angular/core';
import { ChannelRepository } from '../t-channels/t-channels.repository';
import { PushPipe } from '@ngrx/component';
import { AsyncPipe } from '@angular/common';
import { UntilDestroy } from '@ngneat/until-destroy';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzTypographyComponent } from 'ng-zorro-antd/typography';
import { switchMap, tap } from 'rxjs';
import { HashtagPipe } from '../../../pipes/hashtag.pipe';
import { UserRepository } from '../t-users/t-users.repository';
import { ControlsOf, FormControl, FormGroup } from '@ngneat/reactive-forms';
import { NewChannelControls } from '../t-channels/t-channels.component';
import { MessageData } from '../../../services/codegen/model/GetChannelMessagesQueryResult';
import { Validators } from '@angular/forms';

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
   ],
   templateUrl: './t-chat.component.html',
   styleUrl: './t-chat.component.css',
   changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TChatComponent {
   private readonly channelRepo = inject(ChannelRepository);
   private readonly userRepo = inject(UserRepository);
   // private readonly channelService = inject(ChannelService);
   // private readonly channelSwaggerService = inject(ChannelSwaggerService);

   readonly messageData$ = this.channelRepo.messageData$;

   readonly activeChannelId$ = this.channelRepo.activeChannelId$;
   readonly activeChannelName$ = this.activeChannelId$.pipe(
      switchMap((x) => this.channelRepo.channelNameById$(x)),
   );
   readonly userNameById$ = this.userRepo.userNameById$;

   form: FormGroup<ControlsOf<MessageDataControls>>;

   initForm(): void {
      this.form = new FormGroup<ControlsOf<MessageDataControls>>({
         id: new FormControl(null as number),
         fromUser: new FormControl(),
         content: new FormControl(undefined as string, [Validators.required]),
         channelId: new FormControl(this.channelRepo.activeChannelId),
      });
   }
}

export interface MessageDataControls extends MessageData {}
