import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EntitesServiceService } from 'src/app/shared/entites-service.service';
import { VehiculeServiceService } from 'src/app/shared/vehicule-service.service';
import { ServiceGeneralService } from 'src/app/shared/generalservice/service-general.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicule',
  templateUrl: './vehicule.component.html',
  styleUrls: ['./vehicule.component.css']
})

export class VehiculeComponent implements OnInit {
  registerVehiculeForm: FormGroup;
  submitted = false;
  societes : any;
  objetype : any;
  oDate : any;
  constructor(private formBuilder: FormBuilder, private entiteservice : EntitesServiceService,
     private vehiculeservice : VehiculeServiceService, private generalservice : ServiceGeneralService,
     private router : Router) { }

  ngOnInit() {
      this.registerVehiculeForm = this.formBuilder.group({
          matricule: ['', Validators.required],
          vehiculeType: ['', Validators.required],
          genre: ['', Validators.required],
          model: ['', Validators.required],
          libelle:['', Validators.required],
          status:['', Validators.required],
          vcolor:['', Validators.required],
          miseCirculation:['', Validators.required],
          entites:['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
         /*  password: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['', Validators.required], */
          acceptTerms: [false, Validators.requiredTrue]
      }, {
         // validator: this.MustMatch('password', 'confirmPassword')
      });
      this.entiteservice.GetAllEntites().subscribe(
        response => this.handleSuccessfulResponse(response)
       );

  }
  handleSuccessfulResponse( response ){
       this.societes = response;
   }

  // convenience getter for easy access to form fields
  get f() { return this.registerVehiculeForm.controls; }

  onSubmit() {
      this.submitted = true;
      // stop here if form is invalid
      if (this.registerVehiculeForm.invalid) {
          return;
      }

      // display form values on success
      alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerVehiculeForm.value, null, 4));
      this.objetype = this.generalservice.transformeToObjet(this.registerVehiculeForm.value.entites);
      this.registerVehiculeForm.controls['entites'].setValue(this.objetype);
      console.log('register form'+ this.registerVehiculeForm.value);
      this.oDate = new Date(this.registerVehiculeForm.value.miseCirculation.year, this.registerVehiculeForm.value.miseCirculation.month -1 ,this.registerVehiculeForm.value.miseCirculation.day);
      this.registerVehiculeForm.controls['miseCirculation'].setValue(this.oDate);

      alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerVehiculeForm.value, null, 4));

    this.vehiculeservice.createVehicule(this.registerVehiculeForm.value)
      .subscribe( data => {
       alert("Vehicule created successfully." + JSON.stringify(data));
        this.router.navigate( ['/home/vehicule', btoa(JSON.stringify(data))]);
      });

  }

  onReset() {
      this.submitted = false;
      this.registerVehiculeForm.reset();
  }

 MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}
get miseCirculation() {
  return this.registerVehiculeForm.get('miseCirculation');
}
}
