import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'Inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {
  problemeForm: FormGroup;
  
//FormBuiolder --> problemeForm
//FormGroup ---> problemeForm
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.problemeForm = this.fb.group({
        prenom: ['',[Validators.minLength(3), Validators.required]]
        //longueur: ['', [Validators.range]]
       
    });
  }

  //Ajout de la methode save()
  save(): void{

  }
}


