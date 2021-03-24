import { AbstractControl } from "@angular/forms";
import { longueurMinimum } from "./longueur-minimum.component";

describe('Zones Validator', () => {
   
    it('#7 | une chaîne avec 10 espaces est invalide', () => {
        //Préparer une variable afin de manipuler le validateur
        let validator = longueurMinimum.plage();
        let control = {value: 1};
        //Faire l'appel du validateur
        let result = validator(control as AbstractControl);
        //Comparer le résultat OBTENU avec le résultat PRÉVU
        expect(result).toBeNull();
    })
})