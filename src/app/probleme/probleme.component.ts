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
  constructor(private FormGroup: FormBuilder) { }

  ngOnInit(): void {
    this.problemeForm = this.FormGroup.group({
        prenom: ['',[Validators.minLength(3), Validators.maxLength(200), Validators.required]]
    });
  }
}
