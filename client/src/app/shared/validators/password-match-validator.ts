import { FormGroup, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(
  passOne: string,
  passTwo: string
): ValidatorFn {
  return (control) => {
    const group = control as FormGroup;
    const passOneVal = group.get(passOne);
    const passTwoVal = group.get(passTwo);

    if (passOneVal?.value !== passTwoVal?.value) {
      control.get(passTwo)?.setErrors({ passwordMatch: true });
    } else {
      control.get(passTwo)?.setErrors(null);
    }
    return null;
  };
}
