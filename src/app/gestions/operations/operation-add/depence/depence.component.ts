import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DepenceService } from 'src/app/shared/depences/depence.service';
import { Depence } from 'src/app/shared/depences/depence.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-depence',
  templateUrl: './depence.component.html',
  styleUrls: ['./depence.component.css']
})
export class DepenceComponent implements OnInit {

  formData : Depence;
  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogrefe:MatDialogRef<DepenceComponent>,  private DepenceService : DepenceService) { }

  ngOnInit() {
    if(this.data.DepenceIndex == null)
    this.formData =  {
      DepenceId: this.data.DepenceId,
      Prix:0,
      Type: '',
      Lieu : '',
      Motif : '',
      Date : null,
      Devise : ''
      };
  else
     this.formData = Object.assign({ } ,this.DepenceService.DepencesAll[this.data.DepenceIndex]);
  }

  onSubmit(form : NgForm){
  //  if( this.validateForm(form.value)){
      console.log("form dataa", form.value);
      if(this.data.DepenceIndex == null){
      console.log("form dataa index", this.data.DepenceIndex);
      this.DepenceService.DepencesAll.push(form.value);
      }
      else{
      console.log("form dataa index", this.data.DepenceIndex);
     this.DepenceService.DepencesAll[this.data.DepenceIndex] = form.value;
        }
        this.dialogrefe.close();
    
  }
  validateForm(){
   // formData : Dgazoil
/*     this.isValid = true;
    if(formData.GazoilID == 0)
    this.isValid = false;
    else  if(this.formData.GLitre == 0)
    this.isValid = false;
 
    return this.isValid; */

   }
  

}
