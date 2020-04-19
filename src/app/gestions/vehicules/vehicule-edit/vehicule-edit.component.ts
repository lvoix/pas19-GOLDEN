import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VehiculeServiceService } from 'src/app/shared/vehicule-service.service';
import { EntitesServiceService } from 'src/app/shared/entites-service.service';
import { ServiceGeneralService } from 'src/app/shared/generalservice/service-general.service';


@Component({
  selector: 'app-vehicule-edit',
  templateUrl: './vehicule-edit.component.html',
  styleUrls: ['./vehicule-edit.component.css']
})
export class VehiculeEditComponent implements OnInit {
  editvehicule : any;
  societes : any;
  EditVehiculeForm: FormGroup;
  edit = 'enable';
  di = true;
  submitted = false;
  objetype : any;
  datemise : any;
  datecreation : any;
  oDate : any;
  constructor(private route : ActivatedRoute, private formBuilder: FormBuilder,
    private vehiculeservice : VehiculeServiceService , private entiteservice : EntitesServiceService
    , private generalservice : ServiceGeneralService,
     private router : Router) { }

  ngOnInit() {
    this.EditVehiculeForm = this.formBuilder.group({
          id: ['', Validators.required],
          matricule: ['', Validators.required],
          vehiculeType: ['', Validators.required],
          genre: ['', Validators.required],
          model: ['', Validators.required],
          libelle:['', Validators.required],
          status:['', Validators.required],
          vcolor:['', Validators.required],
          miseCirculation:['', Validators.required],
          dateCreation:[{value: '', disabled: true}],
          entites:['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
         
  },{
  });
    this.entiteservice.GetAllEntites().subscribe(
      response => this.handleSuccessfulResponse(response)
     );
    this.route.paramMap.subscribe(params => {
      this.editvehicule = JSON.parse(atob(params.get('editv')));
      console.log('entre router'+this.route);
      this.editvehicule = this.vehiculeservice.ConvertENUMStringToInt1(this.editvehicule);
      this.editvehicule = this.vehiculeservice.ConvertENUMStringToInt2(this.editvehicule);
      this.EditVehiculeForm.controls["entites"].setValue(this.editvehicule.entites.id);

      this.datemise =  this.editvehicule.miseCirculation;
      this.datecreation=  this.editvehicule.dateCreation;
      console.log(' data ici edit', this.editvehicule.dateCreation);

      this.EditVehiculeForm.disable();
      this.di = true;
      console.log(' data ici edit', this.editvehicule);
     // console.log(' data ici edit date time ', this.EditVehiculeForm.value.updateDateTime);

    });
    
  this.EditVehiculeForm.controls["id"].setValue(this.editvehicule.id);
  this.EditVehiculeForm.controls["matricule"].setValue(this.editvehicule.matricule);
  this.EditVehiculeForm.controls["vehiculeType"].setValue(this.editvehicule.vehiculeType);
  this.EditVehiculeForm.controls["genre"].setValue(this.editvehicule.genre);
  this.EditVehiculeForm.controls["model"].setValue(this.editvehicule.model);
  this.EditVehiculeForm.controls["libelle"].setValue(this.editvehicule.libelle);
  this.EditVehiculeForm.controls["status"].setValue(this.editvehicule.status);
  this.EditVehiculeForm.controls["email"].setValue(this.editvehicule.email);
  this.EditVehiculeForm.controls["entites"].setValue(this.editvehicule.entites.id);
  this.EditVehiculeForm.controls["miseCirculation"].setValue(this.editvehicule.miseCirculation);
  this.EditVehiculeForm.controls["dateCreation"].setValue(this.editvehicule.dateCreation);
  this.EditVehiculeForm.controls["vcolor"].setValue(this.editvehicule.vcolor);
  this.datemise =  this.editvehicule.miseCirculation;
  
  this.EditVehiculeForm.disable();
  this.di = true;
  console.log('edit form', this.EditVehiculeForm);

  }

  handleSuccessfulResponse( response ){
       this.societes = response;
   }
   onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.EditVehiculeForm.invalid) {
        return;
    }
    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.EditVehiculeForm.value, null, 4));
    this.objetype = this.generalservice.transformeToObjet(this.EditVehiculeForm.value.entites);
    this.EditVehiculeForm.controls['entites'].setValue(this.objetype);
    console.log('register form'+ this.EditVehiculeForm.value);

    this.oDate = new Date(this.EditVehiculeForm.value.miseCirculation.year, this.EditVehiculeForm.value.miseCirculation.month -1 ,this.EditVehiculeForm.value.miseCirculation.day);
    console.log('date cire'+this.oDate);
    
    this.EditVehiculeForm.controls["dateCreation"].setValue(this.oDate);

    this.EditVehiculeForm.controls['miseCirculation'].setValue(this.oDate);

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.EditVehiculeForm.value, null, 4));

   this.vehiculeservice.updateVehicule(this.EditVehiculeForm.value)
    .subscribe( data => {
      alert("Vehicule upadte successfully." + JSON.stringify(data));
      this.router.navigate( ['/home/vehicule', btoa(JSON.stringify(data))]);
    });

}
  resetForm(){
    this.submitted = false;
  this.EditVehiculeForm.controls["matricule"].setValue(this.editvehicule.matricule);
  this.EditVehiculeForm.controls["vehiculeType"].setValue(this.editvehicule.vehiculeType);
  this.EditVehiculeForm.controls["genre"].setValue(this.editvehicule.genre);
  this.EditVehiculeForm.controls["model"].setValue(this.editvehicule.model);
  this.EditVehiculeForm.controls["libelle"].setValue(this.editvehicule.libelle);
  this.EditVehiculeForm.controls["status"].setValue(this.editvehicule.status);
  this.EditVehiculeForm.controls["email"].setValue(this.editvehicule.email);
  this.EditVehiculeForm.controls["entites"].setValue(this.editvehicule.entites.id);
  this.EditVehiculeForm.controls["miseCirculation"].setValue(this.editvehicule.miseCirculation);
  console.log('mise ciru'+this.editvehicule.miseCirculation);
  this.datemise =  this.editvehicule.miseCirculation;
  console.log('mise ciru'+this.datemise);

  this.EditVehiculeForm.controls["vcolor"].setValue(this.editvehicule.vcolor);
  }
  ActiveEdit (){
    if(this.edit == 'enable'){
       this.EditVehiculeForm.enable();
       this.edit  = 'disable';
       this.di = false;
      }
    else{
       this.EditVehiculeForm.disable();
       this.edit  = 'enable';
       this.di = true;
      }

  }

}
