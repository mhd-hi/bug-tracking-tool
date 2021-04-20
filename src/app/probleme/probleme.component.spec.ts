import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ProblemeComponent } from './probleme.component';
import { TypeproblemeService } from './typeprobleme.service';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule], //Ajouté
      declarations: [ ProblemeComponent ],
      providers:[TypeproblemeService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


   it('#1 | Zone PRÉNOM invalide avec 2 caractères', () => {
     let errors = {};
     let zone = component.problemeForm.controls['prenom'];
     zone.setValue('a'.repeat(2));
     errors = zone.errors || {};
      expect('longueurMinimum').toBeTruthy();
   });
  it('#2 | Zone PRÉNOM valide avec 3 caractères', () => {
      let zone = component.problemeForm.controls['prenom'];
      zone.setValue('a'.repeat(3));
      expect(zone.valid).toBeTruthy();
    });
  it('#3 | Zone PRÉNOM valide avec 200 caractères', () => {
      let errors = {};
      let zone = component.problemeForm.controls['prenom'];
      zone.setValue('a'.repeat(200))
      errors = zone.errors || {};
      expect('maxlength').toBeTruthy();
    });
  it('#4 | Zone PRÉNOM invalide avec aucune valeur', () => {
     let errors = {};
     let zone = component.problemeForm.controls['prenom'];
     zone.setValue('');
     errors = zone.errors.required || {};
     expect(zone.errors.required).toBeTruthy();
   });
   it('#5 | Zone PRÉNOM invalide avec 10 espaces', () => {
    let errors = {};
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue(' '.repeat(10));
    errors = zone.errors || {};
    expect(zone.valid).toBeFalsy();
  });
  it('#6 | Zone PRÉNOM invalide avec 2 espaces et 1 caractère', () => {
    let errors = {};
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue(' '.repeat(2)+'a');
    errors = zone.errors || {};
  expect(zone.valid).toBeFalsy();
  });

  it('#15 | Zone TELEPHONE est désactivée quand ne pas me notifier', () => {
      component.appliquerNotifications("nepasmenotifier");
      let zone = component.problemeForm.get('telephone');
      expect(zone.status).toEqual("DISABLED");
  });
  it('#16 | Zone TELEPHONE est vide quand ne pas me notifier', () => {
      component.appliquerNotifications("nepasmenotifier");
      let zone = component.problemeForm.get("telephone");
      expect(zone.value).toBeNull();
  });
  it('#17 | Zone ADRESSE COURRIEL est désactivée quand ne pas me notifier', () => {
    component.appliquerNotifications('nepasmenotifier');
    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).toEqual('DISABLED');
  });
  it('#18 | Zone CONFIRMER COURRIEL est désactivée quand ne pas me notifier', () => {
    component.appliquerNotifications('nepasmenotifier');
    let zone = component.problemeForm.get("courrielGroup.courriel");
    expect(zone.status).toEqual('DISABLED');
  });
  //TP12
  it('#19 | Zone TELEPHONE est désactivée quand notifier par courriel', () => {
    component.appliquerNotifications('ParCourriel');
    let zone = component.problemeForm.get('telephone');
    expect(zone.disabled).toBeTrue();
  });
  it('#20 | Zone ADRESSE COURRIEL est activée quand notifier par courriel', () => {
    component.appliquerNotifications('ParCourriel');
    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.enabled).toBeTruthy();
  });
  it('#21 | Zone CONFIRMER COURRIEL est activée quand notifier par courriel', () => {
    component.appliquerNotifications('ParCourriel');
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.enabled).toBeTruthy();
  });
  it('#22 | Zone ADRESSE COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    component.appliquerNotifications('ParCourriel');
    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).toEqual('INVALID');
  });
  it('#23 | Zone CONFIRMER COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    component.appliquerNotifications('ParCourriel');
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.status).toEqual('INVALID');
  });
  it('#24 | Zone ADRESSE COURRIEL est invalide avec un format non conforme', () => {
    component.appliquerNotifications('ParCourriel');
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zone.setValue('peeew');
    expect(zone.status).toEqual('INVALID');
  });
  it('#25 | Zone ADRESSE COURRIEL sans valeur et Zone CONFIRMER COURRIEL avec valeur valide retourne null', () => {
    component.appliquerNotifications('ParCourriel');
    let courrielConfirm = component.problemeForm.get('courrielGroup.courrielConfirmation');
    courrielConfirm.setValue('qwe@qwe.qwe');
    let groupe = component.problemeForm.get('courrielGroup')
    expect(groupe.status).toEqual('INVALID');
  });
  it('#26 | Zone ADRESSE COURRIEL avec valeur valide et Zone CONFIRMER COURRIEL sans valeur retourne null', () => {
    component.appliquerNotifications('ParCourriel');
    let courriel = component.problemeForm.get('courrielGroup.courriel');
    courriel.setValue('qwe@qwe.qwe');
    let groupe = component.problemeForm.get('courrielGroup')
    expect(groupe.status).toEqual('INVALID');
  });
  it('#27 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont invalides si les valeurs sont différentes quand notifier par courriel', () => {
    component.appliquerNotifications('ParCourriel');
    let courriel1 = component.problemeForm.get('courrielGroup.courriel');
    let courriel2 = component.problemeForm.get('courrielGroup.courrielConfirmation');
    courriel1.setValue('qwe@qwe.qwe1');
    courriel2.setValue('qwe@qwe.qwe2');
    let groupe = component.problemeForm.get('courrielGroup')
    expect(groupe.status).toEqual('INVALID');
  });
  it('#28 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL  sont valides si les valeurs sont identiques quand notifier par courriel', () => {
    component.appliquerNotifications('ParCourriel');
    let courriel1 = component.problemeForm.get('courrielGroup.courriel');
    let courriel2 = component.problemeForm.get('courrielGroup.courrielConfirmation');
    courriel1.setValue('qwe@qwe.qwe');
    courriel2.setValue('qwe@qwe.qwe');
    let groupe = component.problemeForm.get('courrielGroup')
    expect(groupe.status).toEqual('VALID');
  });

  //TP13
  it('#29 | Zone TELEPHONE est activée quand notifier par messagerie texte', () => {
    component.appliquerNotifications('ParMessage');
    let zone = component.problemeForm.get('telephone');
    expect(zone.enabled).toBeTrue();
  });
  it('#30 | Zone ADRESSE COURRIEL est désactivée quand notifier par messagerie texte', () => {
    component.appliquerNotifications('ParMessage');
    let zone = component.problemeForm.get('courrielGroup');
    expect(zone.disabled).toBeTrue();
  });
  it('#31 | Zone CONFIRMER COURRIEL est désactivée quand notifier par messagerie texte', () => {
    component.appliquerNotifications('ParMessage');
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.disabled).toBeTrue();
  });
  it('#32 | Zone TELEPHONE est invalide sans valeur quand notifier par messagerie texte', () => {
    component.appliquerNotifications('ParMessage');
    let telephone = component.problemeForm.get('telephone');
    telephone.setValue('');
    expect(telephone.status).toEqual('INVALID');
  });
  it('#33 | Zone TELEPHONE est invalide avec des caractères non-numériques quand notifier par messagerie texte', () => {
    component.appliquerNotifications('ParMessage');
    let zone = component.problemeForm.get('telephone');
    zone.setValue('pas-bon');
    expect(zone.status).toEqual('INVALID');
  });
  it('#34 | Zone TELEPHONE est invalide avec 9 chiffres consécutifs quand notifier par messagerie texte', () => {
    component.appliquerNotifications('ParMessage');
    let telephone = component.problemeForm.get('telephone');
    telephone.setValue('123456789');
    expect(telephone.status).toEqual("INVALID");
  });
  it('#35 | Zone TELEPHONE est invalide avec 11 chiffres consécutifs quand notifier par messagerie texte', () => {
    component.appliquerNotifications('ParMessage');
    let telephone = component.problemeForm.get('telephone');
    telephone.setValue('12345678912');
    expect(telephone.status).toEqual("INVALID");
  });
  it('#36 | Zone TELEPHONE est valide avec 10 chiffres consécutifs quand notifier par messagerie texte', () => {
    component.appliquerNotifications('ParMessage');
    let telephone = component.problemeForm.get('telephone');
    telephone.setValue('1234567891');
    expect(telephone.status).toEqual("VALID");
  });
});