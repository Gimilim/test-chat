import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from './state/users/user.service';

@Component({
   selector: 'app-root',
   imports: [RouterOutlet],
   templateUrl: './app.component.html',
   standalone: true,
   styleUrl: './app.component.css',
   providers: [UserService],
})
export class AppComponent {}
