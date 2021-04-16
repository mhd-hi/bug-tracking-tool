import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ZonesValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { ITypeProbleme } from './typeprobleme';
import { TypeproblemeService } from './typeprobleme.service';

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
        telephone: [{value: '', disabled: true}]
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
    courrielControl.clearValidators();
    courrielControl.reset();
    courrielControl.disable();

    courrielConfirmationControl.clearValidators();
    courrielConfirmationControl.reset();
    courrielConfirmationControl.disable();
    
    telephoneControl.clearValidators();
    telephoneControl.reset();
    telephoneControl.disable();
    if(typeNotification === "menotifier") {
      courrielControl.setValidators([Validators.required])
      courrielControl.enable();
      courrielConfirmationControl.setValidators([Validators.required])
      courrielConfirmationControl.enable();
      telephoneControl.setValidators([Validators.required])
      telephoneControl.enable();
    }
    courrielControl.updateValueAndValidity();
    telephoneControl.updateValueAndValidity();
    courrielConfirmationControl.updateValueAndValidity();
  }
}








//ligne 56
    // if(typeNotification === "nepasmenotifier") {
    //   courrielControl.setValidators([Validators.required])
    //   courrielControl.enable();
    //   courrielConfirmationControl.setValidators([Validators.required])
    //   courrielConfirmationControl.enable();
    //   telephoneControl.setValidators([Validators.required])
    //   telephoneControl.enable();
    // }