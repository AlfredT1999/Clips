import { AbstractControl, ValidationErrors } from "@angular/forms";

export class RegisterValidators {
    // A static function is a utility function:
    static match(group: AbstractControl): ValidationErrors | null {
        const control = group.get('password')
        const matchingControl = group.get('confirm_password')

        if(!control || ! matchingControl) return { controlNotFound: false }

        const error = control.value === matchingControl ? null : { noMatch: true }

        return error
    }
}
