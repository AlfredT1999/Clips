import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class RegisterValidators {
    
    // A static function is a utility function:
    static match(controlName: string, matchingControlName: string): ValidatorFn {
        // Factory function:
        return (group: AbstractControl): ValidationErrors | null => {
            const control = group.get('password')
            const matchingControl = group.get('confirm_password')
    
            if(!control || ! matchingControl) return { controlNotFound: false }
    
            const error = control.value === matchingControl.value ? null : { noMatch: true }
    
            return error
        }
    }
}
