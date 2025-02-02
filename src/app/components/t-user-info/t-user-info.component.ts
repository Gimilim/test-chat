import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
   selector: 'app-t-user-info',
   standalone: true,
   imports: [],
   templateUrl: './t-user-info.component.html',
   styleUrl: './t-user-info.component.css',
   changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TUserInfoComponent {}
