import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ZonesValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { ITypeProbleme } from './typeprobleme';
import { TypeproblemeService } from './typeprobleme.service';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { emailMatcherValidator } from '../shared/email.matcher/email-matcher.component';


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
        descriptionProbleme: ['', [Validators.required, Validators.minLength(5)]],
        noUnite: '',
        dateProbleme: {value: Date(), disabled: true}
    });

    this.problemes.obtenirProblemes()
    .subscribe(cat => this.typesProbleme = cat,
       error => this.errorMessage = <any>error);

       this.problemeForm.get("notifications").valueChanges
       .subscribe(value => this.appliquerNotifications(value));
       //ngOnINIT
  }

  //Ajout de la methode save()
  save(): void {}

  appliquerNotifications(typeNotification: string): void {
    const courrielControl = this.problemeForm.get('courrielGroup.courriel');
    const courrielConfirmationControl = this.problemeForm.get('courrielGroup.courrielConfirmation');
    const telephoneControl = this.problemeForm.get('telephone');
    const courrielGroupControl = this.problemeForm.get("courrielGroup");

    courrielControl.clearValidators();
    courrielControl.reset();
    courrielControl.disable();

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
      courrielGroupControl.setValidators([Validators.required, Validators.compose([emailMatcherValidator.courrielDifferents()])]);
      telephoneControl.disable();
    }  else if (typeNotification === 'ParMessage'){
      telephoneControl.enable(); 
      telephoneControl.setValidators([Validators.pattern('[0-9]+'), Validators.minLength(10), Validators.maxLength(10), Validators.required]);
    }
    courrielControl.updateValueAndValidity();
    telephoneControl.updateValueAndValidity();
    courrielConfirmationControl.updateValueAndValidity();
  }
}