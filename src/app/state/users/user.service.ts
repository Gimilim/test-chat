import { inject, Injectable } from '@angular/core';

@Injectable()
export class UserService {
   private readonly userSwaggerService = inject(UserService);
}
