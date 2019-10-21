import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';

import { CustomErrorStateMatcher } from './custom-error-state-matcher';
import { PersonService } from './person.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive-form.component.html'
})
export class ReactiveFormComponent implements OnInit {
  constructor(private ngZone: NgZone,
        private formBuilder: FormBuilder,
        private personService: PersonService) {} 
  ngOnInit() {
  } 
  esMatcher = new CustomErrorStateMatcher();  
  //Input text validation
  amount = new FormControl('', [
    Validators.required,
    Validators.min(100),
    Validators.max(200)
  ]);
  onAmountChange() {
    console.log(this.amount.value);
    console.log(this.amount.valid);
  }
  //Textarea validation
  commentFC = new FormControl('', [
    Validators.required, 
    Validators.maxLength(30)
  ]);
  onCommentChange() {
    console.log(this.commentFC.value);
    console.log(this.commentFC.valid);
  }

  //Textarea autosize
  descFC = new FormControl('', [
    Validators.required
  ]);
  @ViewChild('autosize') 
  txtAreaAutosize: CdkTextareaAutosize;
  
  onDescChange() {
    console.log("enabled: "+ this.txtAreaAutosize.enabled);
    console.log("minRows: "+ this.txtAreaAutosize.minRows);
    console.log("maxRows: "+ this.txtAreaAutosize.maxRows);
    console.log("Description: "+ this.descFC.value);
  }

  //resizeToFitContent() and Reset() test
  contentFC = new FormControl();
  @ViewChild('cfcAutosize') 
  contentFCAutosize: CdkTextareaAutosize;

  resizeTextArea() {
    this.ngZone.onStable.pipe(take(1))
        .subscribe(() => this.contentFCAutosize.resizeToFitContent(true));
  }
  resetTextAreaSize() {
    this.contentFCAutosize.reset();
  }

  //Create a form
  personForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    address: ['', [Validators.required, Validators.maxLength(100)]],
    favColor: '#e66465',
    dob: '',
    tob: '',
    age: ''
  });
  onFormSubmit() {
    this.personService.savePerson(this.personForm.value);
  }
  get username() {
    return this.personForm.get('username');
  }  
  get password() {
    return this.personForm.get('password');
  }  

  get address() {
    return this.personForm.get('address');
  }    
}