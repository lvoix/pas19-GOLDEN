import { Component, OnInit, Input } from '@angular/core';
import { FormDataService } from '../data/formData.service';

@Component({
  selector: 'app-voyage',
  templateUrl: './voyage.component.html',
  styleUrls: ['./voyage.component.css']
})
export class VoyageComponent implements OnInit {
  @Input() formData;
  varo : any;
  title = 'APP NEW STEP';
   constructor(private formDataService: FormDataService) { }
   ngOnInit() {
   this.formData = this.formDataService.getFormData();
    console.log(this.title + ' loaded!' + JSON.stringify(this.formData));
     this.varo = JSON.stringify(this.formData);

/*       this.formdata = new FormGroup({
         emailid: new FormControl("", Validators.compose([
            Validators.required,
            Validators.pattern("[^ @]*@[^ @]*")
         ])),
         passwd: new FormControl("", this.passwordvalidation)
      }); */
   }
/*    passwordvalidation(formcontrol) {
      if (formcontrol.value.length < 5) {
         return {"passwd" : true};
      }
   }
   onClickSubmit(data) {this.emailid = data.emailid;}
 */


}
