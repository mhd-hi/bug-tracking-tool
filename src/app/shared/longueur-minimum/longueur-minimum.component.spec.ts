import { AbstractControl } from "@angular/forms";
import { longueurMinimum } from "./longueur-minimum.component";

describe('longueur zone Validator', () => {
   
    it('#7 | une chaîne avec 10 espaces est invalide', () => {                                   //invalide entre 1 et 5
        //Préparer une variable afin de manipuler le validateur
        let validator = longueurMinimum.plage(3);
        let valeurControle = {value: '          '};
        //Faire l'appel du validateur
        let result = validator(valeurControle as AbstractControl);
        //Comparer le résultat OBTENU avec le résultat PRÉVU
        expect(result['longueurInvalide']).toBe(true);
    })
        
    it('#8 | Une phrase avec des mots est valide', () => {                                  //entre 10 et 20

        //Préparer une variable afin de manipuler le validateur
        let validator = longueurMinimum.plage(12);
        let valeurControle = {value: 'Vive angular'};
        //Faire l'appel du validateur
        let result = validator(valeurControle as AbstractControl);
        //Comparer le résultat OBTENU avec le résultat PRÉVU
        expect(result['longueurInvalide']).toBe(true);
    })
    
    it('#9 | Une phrase avec 3 espaces, des mots et ensuite 3 espaces est valide', () => {               //valeur null entre 10 et 20
        //Préparer une variable afin de manipuler le validateur
        let validator = longueurMinimum.plage(1);
        let valeurControle = {value: null};
        //Faire l'appel du validateur
        let result = validator(valeurControle as AbstractControl);
        //Comparer le résultat OBTENU avec le résultat PRÉVU
        expect(result['longueurInvalide']).toBe(true);
    })
    
    it('#10 | Une phrase avec 1 espace et 2 caractères est invalide.', () => {
        //Préparer une variable afin de manipuler le validateur

    })

    it('#11 | Une phrase avec 2 espaces et 1 caractère est invalide.', () => {
        //Préparer une variable afin de manipuler le validateur

    })

    it('#12 | Une phrase avec 3 espaces et 3 caractères est valide', () => {
        //Préparer une variable afin de manipuler le validateur

    })

    it('#13 | Une phrase avec 5 espaces, 5 caractères et 5 espaces est valide', () => {
        //Préparer une variable afin de manipuler le validateur

    })

    it('#14 | Une chaîne nulle est invalide', () => {
        //Préparer une variable afin de manipuler le validateur

    })

})