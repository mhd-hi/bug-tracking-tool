import { AbstractControl, ValidatorFn } from "@angular/forms";

export class ZonesValidator {
    static longueurMinimum(valeurMinimum: number): ValidatorFn {
        //Sous angular, dans les validateurs pour indiquer un succes, retourner null autrement retourner une cle valeur json
        return (valeurControle: AbstractControl): { [key: string]: boolean } | null => {
            if(valeurControle.value == null) {
                return {'nbreCaracteresInsuffisants': true};
            }
            else if (valeurControle.value.trim().length >= valeurMinimum){
                return null;
            }
            return { 'nbreCaracteresInsuffisants': true};
        };  
    }
}