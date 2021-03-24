import { AbstractControl, ValidatorFn } from "@angular/forms";

export class longueurMinimum {
    static plage(): ValidatorFn {
        //Sous angular, dans les validateurs pour indiquer un succes, retourner null autrement retourner une cle valeur json
        return (c: AbstractControl): { [key: string]: boolean } | null => { 
            if (c.value >= 1 && c.value <= 5){
                return null;
            }
            return { 'plageInvalide': true};
        };  
    }
}