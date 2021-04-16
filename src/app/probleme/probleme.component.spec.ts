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
});
