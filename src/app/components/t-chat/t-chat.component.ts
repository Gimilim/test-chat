import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
   selector: 'app-t-chat',
   standalone: true,
   imports: [],
   templateUrl: './t-chat.component.html',
   styleUrl: './t-chat.component.css',
   changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TChatComponent {}
