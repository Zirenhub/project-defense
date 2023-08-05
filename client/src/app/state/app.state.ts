import { AuthState } from './auth/auth.reducer';
import { ModalState } from './modal/modal.reducer';
import { ProfileState } from './profile/profile.reducer';
import { ReplyState } from './reply/reply.reducer';
import { SingleState } from './single/single.reducer';
import { TimelineState } from './timeline/timeline.reducer';

export interface AppState {
  auth: AuthState;
  modal: ModalState;
  profile: ProfileState;
  reply: ReplyState;
  single: SingleState;
  timeline: TimelineState;
}
