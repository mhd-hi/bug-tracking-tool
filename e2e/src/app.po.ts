import { browser, by, element, ElementFinder } from 'protractor';

export class AppPage {
  async navigateTo(): Promise<unknown> {
    return browser.get('/probleme');
  }

  async getParagraphText() : Promise<string> {
    return element(by.css('app-root h5')).getText();
  }

  boutonSubmit() : ElementFinder {
    return element(by.buttonText('Sauvegarder'));
  }

  async setChampsValidesScenarioNominal() : Promise<void> {
    element(by.id('prenomId')).sendKeys('tonprenom');
    element(by.id('nomId')).sendKeys('tonnom');    
    // Sélectionner le X élément dans la zone de liste déroulante
    await element(by.id('noProblemeId')).all(by.tagName('option')).get(2).click();      
    // Cliquer sur le bouton radio voulu
    element.all(by.id('notfiId')).get(0).click();  
    element(by.id('descriptionProblemeId')).sendKeys('Problème entre la chaise et le clavier...');
  }

  // Inscrire tous les renseignements obligatoires pour le scénario alternatif de notification par SMS (scénario nominal + le téléphone doit être renseigné)
  async setChampsValidesScenarioAlternatifParMessageTexte() : Promise<void> {
    await element(by.id('prenomId')).sendKeys('tonprenom');
    await element(by.id('nomId')).sendKeys('tonnom');    
    // Sélectionner le X élément dans la zone de liste déroulante
    await element(by.id('noProblemeId')).all(by.tagName('option')).get(2).click();      
    // Cliquer sur le bouton radio voulu
    await element.all(by.id('notfiId')).get(2).click();
    await element(by.id('telephoneId')).sendKeys('5141231234');  
    await element(by.id('descriptionProblemeId')).sendKeys('Problème entre la chaise et le clavier...');
  }

    // Inscrire tous les renseignements obligatoires pour le scénario alternatif de notification par courriel (scénario nominal + courriel/courrielConfirmation doivent être consignés)
    async setChampsValidesScenarioAlternatifParCourriel() : Promise<void> {
      await element(by.id('prenomId')).sendKeys('tonprenom');
      await element(by.id('nomId')).sendKeys('tonnom');   
      // Sélectionner le X élément dans la zone de liste déroulante
      await element(by.id('noProblemeId')).all(by.tagName('option')).get(2).click();      
      // Cliquer sur le bouton radio voulu
      await element.all(by.id('notfiId')).get(1).click();
      await element(by.id('courrielId')).sendKeys('aa@bbb.com');
      await element(by.id('courrielConfirmationId')).sendKeys('aa@bbb.com');    
      await element(by.id('descriptionProblemeId')).sendKeys('Problème entre la chaise et le clavier...');
    }

  // Permet de vider toutes les zones.  A appeller dans chaque test.
  async viderToutesLesZones() : Promise<void> {
    await element(by.id('prenomId')).clear();  
    await element(by.id('nomId')).clear();     
    // Sélectionner le premier élément dans la zone de liste déroulante (Sélectionner un type de problème (obligatoire))
    await element(by.id('noProblemeId')).all(by.tagName('option')).get(0).click();      
    // Cliquer sur le bouton radio par défaut (Pas de notification)
    await element.all(by.id('notfiId')).get(0).click();
    // await element(by.id('courrielId')).clear();
    // await element(by.id('courrielConfirmationId')).clear();   
    // await element(by.id('telephoneId')).clear();       
    await element(by.id('noUniteId')).clear();
    await element(by.id('descriptionProblemeId')).clear();     
  }

  async setZoneDescriptionNombreCaracteresSuffisant() : Promise<void> {
    //element(by.id('descriptionProblemeId')).clear();
    await element(by.id('descriptionProblemeId')).sendKeys('XXXXX'); //5
  }

  async setZonePrenomNombreCaracteresInsuffisant()  : Promise<void> {
    //element(by.id('prenomId')).clear();
    await element(by.id('prenomId')).sendKeys('XX');
  }

  async setZoneDescriptionNombreCaracteresInsuffisant() : Promise<void> {
    //element(by.id('descriptionProblemeId')).clear();
    await element(by.id('descriptionProblemeId')).sendKeys('XX');
  }


  async setZoneNomNombreCaracteresExcessif() : Promise<void> {
    //element(by.id('nomId')).clear();
    await element(by.id('nomId')).sendKeys('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'); // 55
  }

    // Permet d'obtenir la classe appliquee actuellement dans la zone Description (entre autres is-valid ou is-invalid)
    async obtenirClasseZoneDescriptionProbleme() { 
      return await element(by.id('descriptionProblemeId')).getAttribute("class");
    } 
  
    async obtenirClasseZonePrenom() { 
      return await element(by.id('prenomId')).getAttribute("class");
      //return element.all(by.id("prenomId")).first().getAttribute("class");      
    }  
  
    async obtenirClasseZoneNom() {
      return await element(by.id('nomId')).getAttribute("class");
    } 
    

}

