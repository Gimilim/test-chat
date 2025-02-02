import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
   selector: 'app-t-users',
   standalone: true,
   imports: [],
   templateUrl: './t-users.component.html',
   styleUrl: './t-users.component.css',
   changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TUsersComponent {}
