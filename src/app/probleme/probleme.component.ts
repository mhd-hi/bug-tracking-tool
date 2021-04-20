import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ZonesValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { ITypeProbleme } from './typeprobleme';
import { TypeproblemeService } from './typeprobleme.service';
import { AbstractControl, ValidatorFn } from '@angular/forms';

export class emailMatcherValidator {
  static courrielDifferents(): ValidatorFn {
      return (c: AbstractControl): { [key: string]: boolean } | null => {
          if (!c['controls'].courriel.value || !c['controls'].courrielConfirmation.value) {
            return null;
          }
          return c['controls'].courriel.value === c['controls'].courrielConfirmation.value ? null : { match: true };
      };
  }   
}

@Component({
  selector: 'Inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {
  problemeForm: FormGroup;
  typesProbleme: ITypeProbleme[];
  errorMessage: string;

  constructor(private fb: FormBuilder, private problemes: TypeproblemeService) { }

  ngOnInit(): void {
    this.problemeForm = this.fb.group({
        prenom: ['',[ZonesValidator.longueurMinimum(3), Validators.required]],
        nomProbleme: ['', [Validators.maxLength(50), Validators.required]],
        noProbleme: ['', [Validators.required]],
        noTypeProbleme: ['', Validators.required],
        notifications: ["nepasmenotifier"], 
        courrielGroup: this.fb.group({
          courriel: [{value: '', disabled: true}],
          courrielConfirmation: [{value: '', disabled: true}],
        }),
        telephone: [{value: '', disabled: true}],
        message: [{value: '',  disabled: true}]
    });

    this.problemes.obtenirProblemes()
    .subscribe(cat => this.typesProbleme = cat,
       error => this.errorMessage = <any>error);
  }

  //Ajout de la methode save()
  save(): void {}

  appliquerNotifications(typeNotification: string): void {
    const courrielControl = this.problemeForm.get('courrielGroup.courriel');
    const courrielConfirmationControl = this.problemeForm.get('courrielGroup.courrielConfirmation');
    const telephoneControl = this.problemeForm.get('telephone');
    const courrielGroupControl = this.problemeForm.get("courrielGroup");
    const messageControl = this.problemeForm.get('message');

    courrielControl.clearValidators();
    courrielControl.reset();
    courrielControl.disable();

    messageControl.clearValidators();
    messageControl.reset();
    messageControl.disable();

    courrielConfirmationControl.clearValidators();
    courrielConfirmationControl.reset();
    courrielConfirmationControl.disable();
    
    telephoneControl.clearValidators();
    telephoneControl.reset();
    telephoneControl.disable();

    if(typeNotification === "ParCourriel") {
      courrielControl.enable();
      courrielControl.setValidators([Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+'), Validators.required]);  
      courrielConfirmationControl.enable(); 
      courrielConfirmationControl.setValidators([Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+'), Validators.required]);
      courrielGroupControl.setValidators([Validators.compose([emailMatcherValidator.courrielDifferents()])]);
      telephoneControl.setValidators([Validators.required])
      telephoneControl.disable();
    } else if (typeNotification === 'ParTelephone'){
      telephoneControl.enable(); 
      telephoneControl.setValidators([Validators.required]);
    } else if (typeNotification === 'ParMessage'){
      telephoneControl.enable(); 
      telephoneControl.setValidators([ Validators.minLength(10), Validators.maxLength(10), Validators.required]);
      messageControl.enable();
      messageControl.setValidators([Validators.required]);
      messageControl.setValidators([Validators.pattern('[0-9]+'), Validators.required]);  
    }
    else
    {
      courrielControl.disable();
      courrielControl.reset();  
      courrielConfirmationControl.disable();
      courrielConfirmationControl.reset();  
      telephoneControl.disable();
      telephoneControl.reset();       
      courrielGroupControl.disable();
      courrielGroupControl.reset();
      messageControl.disable();
      messageControl.reset();
    }
    courrielControl.updateValueAndValidity();
    telephoneControl.updateValueAndValidity();
    courrielConfirmationControl.updateValueAndValidity();
    messageControl.updateValueAndValidity();
  }
}