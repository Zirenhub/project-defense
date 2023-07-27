import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignUp } from './types/Auth';
import { User } from './types/User';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(data: SignUp) {
    return this.http.post<User>('/api/auth/signup', data);
  }
}
