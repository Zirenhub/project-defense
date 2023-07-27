import { FormGroup, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(
  passOne: string,
  passTwo: string
): ValidatorFn {
  return (control) => {
    const group = control as FormGroup;
    const passOneVal = group.get(passOne);
    const passTwoVal = group.get(passTwo);

    return passOneVal?.value === passTwoVal?.value
      ? null
      : { passwordMatch: true };
  };
}
