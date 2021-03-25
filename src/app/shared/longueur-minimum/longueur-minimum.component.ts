import { AbstractControl, ValidatorFn } from "@angular/forms";

export class longueurMinimum {
    static plage(valeurMinimum: number): ValidatorFn {
        //Sous angular, dans les validateurs pour indiquer un succes, retourner null autrement retourner une cle valeur json
        return (c: AbstractControl): { [key: string]: boolean } | null => { 
            if (c.value >= valeurMinimum ) {
                return null; 
            }
            return { 'longueurInvalide': true};
        };  
    }
}