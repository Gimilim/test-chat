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
import {
   NzModalComponent,
   NzModalContentDirective,
   NzModalService,
} from 'ng-zorro-antd/modal';
import { BehaviorSubject, tap } from 'rxjs';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { ControlsOf, FormControl, FormGroup } from '@ngneat/reactive-forms';
import {
   NzFormControlComponent,
   NzFormDirective,
   NzFormItemComponent,
   NzFormLabelComponent,
} from 'ng-zorro-antd/form';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { ChannelService as ChannelSwaggerService } from '../../services/codegen/api/channel.service';

@UntilDestroy()
@Component({
   selector: 'app-t-channels',
   standalone: true,
   imports: [
      PushPipe,
      NzMenuModule,
      NzTooltipDirective,
      NzButtonComponent,
      NzModalComponent,
      NzModalContentDirective,
      NzFormDirective,
      NzFormItemComponent,
      NzFormLabelComponent,
      ReactiveFormsModule,
      NzInputDirective,
      NzFormControlComponent,
   ],
   templateUrl: './t-channels.component.html',
   styleUrl: './t-channels.component.css',
   changeDetection: ChangeDetectionStrategy.OnPush,
   providers: [ChannelProvider, ChannelService, NzModalService],
})
export class TChannelsComponent implements OnInit {
   private readonly channelRepo = inject(ChannelRepository);
   private readonly channelService = inject(ChannelService);
   private readonly channelSwaggerService = inject(ChannelSwaggerService);

   isAddChannelModalVisible$ = new BehaviorSubject<boolean>(false);
   isOkLoading = false;

   form: FormGroup<ControlsOf<NewChannelControls>>;

   // Все каналы
   readonly allChannels$ = this.channelRepo.channels$;

   ngOnInit(): void {
      // Подгружаем все каналы
      this.channelService
         .getAllChannels()
         .pipe(untilDestroyed(this))
         .subscribe();
   }

   // Форма для создания нового канала
   initForm(): void {
      this.form = new FormGroup<ControlsOf<NewChannelControls>>({
         id: new FormControl(),
         name: new FormControl(undefined as string, [Validators.required]),
      });
   }

   // Добавление нового канала
   // Полноценно не работает на фэйковом бэке, при передаче null в id поле была бы автогенерация нового айдишника
   addChannel(channelInfo: Channel): void {
      this.channelSwaggerService
         .addNewChannel(channelInfo)
         .pipe(
            tap((response) =>
               this.channelRepo.updateChannelsList(response.channel),
            ),
            untilDestroyed(this),
         )
         .subscribe();
   }

   // Подгрузка выбранного канала
   switchActiveChannel(channel: Channel) {
      console.log(channel.name);
   }

   // Методы модалки
   showAddChannelModal(): void {
      this.isAddChannelModalVisible$.next(true);

      this.initForm();
   }

   onChannelModalOk(): void {
      this.addChannel(this.form.getRawValue());

      this.isAddChannelModalVisible$.next(false);
   }

   onChannelModalCancel(): void {
      this.isAddChannelModalVisible$.next(false);
   }
}

export interface NewChannelControls extends Channel {}
