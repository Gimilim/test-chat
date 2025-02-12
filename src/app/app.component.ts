import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from './state/users/user.service';
import { UserProvider } from './components/mainform/t-users/t-users.repository';

@Component({
   selector: 'app-root',
   imports: [RouterOutlet],
   templateUrl: './app.component.html',
   standalone: true,
   styleUrl: './app.component.css',
   providers: [UserService, UserProvider],
})
export class AppComponent {}
