import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LogIn, SignUp } from './types/Auth';
import { SignUpRes } from './types/Api';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(data: SignUp) {
    return this.http.post<SignUpRes>('/api/auth/signup', { asd: 'asd' });
  }

  login(data: LogIn) {
    return this.http.post<SignUpRes>('/api/auth/login', { asd: 'asd' });
  }
}
