import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Personal, Address } from '../operation-add/data/formData.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { VehiculeServiceService } from 'src/app/shared/Sgestionnaire/vehicule-service.service';
import { BeneficiareService } from 'src/app/shared/Sgestionnaire/beneficiare.service';
import { ServiceConducteurService } from 'src/app/shared/Sgestionnaire/service-conducteur.service';
import { formatDate, DatePipe } from '@angular/common';
import { OperationserviceService } from 'src/app/shared/Sgestionnaire/operationservice.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { EntitesServiceService } from 'src/app/shared/Sgestionnaire/entites-service.service';
import { PopentiteComponent } from '../popentite/popentite.component';

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.css']
})
export class OperationComponent implements OnInit {
  editOperation : any;
  EditOperationForm : FormGroup;
  edit = 'enable';
  isDisable = false;
  title = 'Operation';
  formdata : FormData;
  personal: Personal ;
  remorque: any = [];
  tracteur: any= [];
  beneficiares : any =[];
  typesVoyage: any;
  tooo : {};
  conducteur : any =[];
  dated : any;
  datef: any;
  datecreation: any;
  stations : any ;
  submitted = false;
  editoperations : any;
  lineConducteurs : any = {};
  lineVehicules : any = {};
  mySubscription: any;
  idoperation: any;
  entites : any ;
  
  constructor(private route : ActivatedRoute,  private formBuilder: FormBuilder, private httpVehiculeService: VehiculeServiceService,
    private beneficiareService : BeneficiareService, private conducteurService: ServiceConducteurService, private sOperation : OperationserviceService,
    private datePipe: DatePipe, private operationService: OperationserviceService, private router : Router,
    public dialog: MatDialog, private entiteservice : EntitesServiceService,
    private Dialog : MatDialog) { 
      
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
          return false;
        };
        this.mySubscription = this.router.events.subscribe((event) => {
          if (event instanceof NavigationEnd) {
            // Trick the Router into believing it's last link wasn't previously loaded
            this.router.navigated = false;
          }
});
      
    }
    GetAllEntites(){
    this.entiteservice.GetAllEntites().subscribe(
      response => this.handleSuccessfulResponse(response)
     );
    }
 
      handleSuccessfulResponse( response ){
          this.entites = response;
      }

      PopUpEntite(entitess){
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus =true;
        dialogConfig.disableClose = true;
        dialogConfig.width = "50%";
        dialogConfig.data = { entitess };
       this.Dialog.open(PopentiteComponent, dialogConfig).afterClosed().subscribe(res =>{
           console.log('retour ',res);
       });
      }

    openDialog(): void {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '400px',
        //height: '350px',
        data: "Confirmez-vous la facturation de cette opération ?"
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result) {
          console.log('Yes clicked', JSON.stringify(this.entites));
          this.PopUpEntite(this.entites);
          // DO SOMETHING
        }
      });
    }

    ngOnDestroy() {
      if (this.mySubscription) {
        this.mySubscription.unsubscribe();
      }
    }
  ngOnInit() {
    this.GetListBeneficiare();
    this.GetAllEntites();
    this.GetListConducteur(0, 100);
    this.typesVoyage = [
      {
        id: 0,
        name: 'DIRECT',

      },
      {
        id: 1,
        name: 'R1',
      },
      {
        id: 2,
        name: 'INTERMEDAIRE',
      }
    ];
    this.EditOperationForm = this.formBuilder.group({
      id: ['', ],
      ndossier: '',
      refChargement: ['', [Validators.required, Validators.minLength(3)] ],
      remorques: ['', ],
      tracteurs: ['',],
      typeMarchandises:['', ],
      operationtype:['', ],
      status:['', ],
      datedepart:['',],
      dateFin:['',],
      dateCreation:[{value: '', disabled: true}],
      beneficiaire:['',],
      genret:['',],
      genrer:['',],
      motifClient:['',],
      dotationEuro:['',],
      dotationDH:['',],
      stations:['',], 
      conducteurs1:['',],   
      conducteurs2:['',],
      lineV1:['',], 
      lineV2:['',],   
      lineC1:['',],  
      lineC2:['',],  
  
    },{
    });

    this.route.paramMap.subscribe(params => {
      this.editOperation = JSON.parse(atob(params.get('edito')));
      console.log('entre router operation'+ JSON.stringify(this.editOperation));
      this.formdata = this.editOperation;
      this.datecreation =  this.editOperation.dateCreation;
      this.idoperation = this.editOperation.id;
      this.EditOperationForm.controls['beneficiaire'].setValue(this.editOperation.beneficiaire.id);

    });
    this.loadpage(0,100); 
    this.typesVoyage = [{id: 0, name: 'DIRECT'},{id: 1,name: 'R1',},{id: 2, name: 'INTERMEDAIRE',}];
 
    this.insertfrom();
    this.EditOperationForm.disable();
}

private getObjectById(objects, object){
  for (var i=0, iLen=objects.length; i<iLen; i++) {
    if (objects[i]['id'] == object.id) return objects[i];
  }
}

TransormeDate(dateIni){
  const iniYear =  Number(this.datePipe.transform(dateIni, 'yyyy'));
  const iniMonth =  Number(this.datePipe.transform(dateIni, 'MM'));
  const iniDay =  Number(this.datePipe.transform(dateIni, 'dd'));
   return {year: iniYear , month: iniMonth ,day: iniDay};
}

onSubmit() {
  this.submitted = true;
  // stop here if form is invalid
  if (this.EditOperationForm.invalid) {
      return;
  }
  // display form values on success
    
  this.editoperations = this.sOperation.MakeObjectOperation(this.EditOperationForm.value, this.stations);
  this.operationService.updateOperation(this.editoperations)
  .subscribe( data => {
    alert("operation upadte successfully." + JSON.stringify(data));
   this.router.navigate( ['/home/operation', btoa(JSON.stringify(data))]);
  });

}
resetForm(){
  this.submitted = false;

  this.datecreation =  this.editOperation.dateCreation;
  this.initADR();
  this.EditOperationForm.controls['beneficiaire'].setValue(this.editOperation.beneficiaire.id);
  this.EditOperationForm.controls["status"].setValue(this.editOperation.status);
  this.EditOperationForm.controls["motifClient"].setValue(this.editOperation.motifClient);
  this.EditOperationForm.controls["typeMarchandises"].setValue(this.editOperation.typeMarchandises);
  this.EditOperationForm.controls["operationtype"].setValue(this.editOperation.operationtype);
  this.EditOperationForm.controls["refChargement"].setValue(this.editOperation.refChargement);
  this.EditOperationForm.controls["dotationDH"].setValue(this.editOperation.dotationDH);
  this.EditOperationForm.controls["dotationEuro"].setValue(this.editOperation.dotationEuro);
  this.EditOperationForm.controls["conducteurs1"].setValue(this.editOperation.conducteurs[0].conducteurs.id);
  this.EditOperationForm.controls["conducteurs2"].setValue(this.editOperation.conducteurs[1].conducteurs.id);
  this.EditOperationForm.controls['id'].setValue(this.editOperation.id);
  this.EditOperationForm.controls["lineC1"].setValue(this.editOperation.conducteurs[0]);
  this.EditOperationForm.controls["lineC2"].setValue(this.editOperation.conducteurs[1]);
  this.EditOperationForm.controls['dateCreation'].setValue(this.datecreation);
  this.EditOperationForm.controls.datedepart.setValue(this.TransormeDate(this.editOperation.datedepart));
  this.EditOperationForm.controls.dateFin.setValue(this.TransormeDate(this.editOperation.dateFin));
  this.editOperation.vehicules.forEach(item => {
    if (item.vehicules.genre == "TRACTEUR") {  
      this.EditOperationForm.controls["tracteurs"].setValue(item.vehicules.id);
      this.EditOperationForm.controls["genret"].setValue(item.vehicules.vehiculeType);
      this.EditOperationForm.controls["lineV1"].setValue(item);

    }else{
      this.EditOperationForm.controls["remorques"].setValue(item.vehicules.id);
      this.EditOperationForm.controls["genrer"].setValue(item.vehicules.vehiculeType);
      this.EditOperationForm.controls["lineV2"].setValue(item);
    }
}); 

}
MakeObjectEdit(objectx){
  objectx.editable = false;
  return objectx;
}
MakeListObjectEdit(ListObject){
  let ObjList =[];
  ListObject.forEach(item => {
     ObjList.push(this.MakeObjectEdit(item)); 
});  
 return ObjList;
}


ActiveEdit (){
  if(this.edit == 'enable'){
     this.EditOperationForm.enable();
     this.edit  = 'disable';
     this.isDisable = true;
    }
  else{
     this.EditOperationForm.disable();
     this.edit  = 'enable';
     this.isDisable = false;
    }

}

  insertfrom(){
    
    this.EditOperationForm.controls['beneficiaire'].setValue(this.editOperation.beneficiaire.id);
    this.EditOperationForm.controls["status"].setValue(this.editOperation.status);
    this.EditOperationForm.controls["motifClient"].setValue(this.editOperation.motifClient);
    this.EditOperationForm.controls["dotationDH"].setValue(this.editOperation.dotationDH);
    this.EditOperationForm.controls["dotationEuro"].setValue(this.editOperation.dotationEuro);
    this.stations = this.SortByPropetyAdresses(this.MakeListObjectEdit(this.editOperation.stations));

    this.EditOperationForm.controls["conducteurs1"].setValue(this.editOperation.conducteurs[0].conducteurs.id);
    this.EditOperationForm.controls["conducteurs2"].setValue(this.editOperation.conducteurs[1].conducteurs.id);
    this.EditOperationForm.controls["lineC1"].setValue(this.editOperation.conducteurs[0]);
    this.EditOperationForm.controls["lineC2"].setValue(this.editOperation.conducteurs[1]);

    this.EditOperationForm.controls["id"].setValue(this.editOperation.id);
    this.EditOperationForm.controls.datedepart.setValue(this.TransormeDate(this.editOperation.datedepart));
    this.EditOperationForm.controls.dateFin.setValue(this.TransormeDate(this.editOperation.dateFin));
    this.EditOperationForm.controls['dateCreation'].setValue(this.datecreation);


    this.editOperation.vehicules.forEach(item => {
      if (item.vehicules.genre == "TRACTEUR") {  
        this.EditOperationForm.controls["tracteurs"].setValue(item.vehicules.id);
        this.EditOperationForm.controls["genret"].setValue(item.vehicules.vehiculeType);
      this.EditOperationForm.controls["lineV1"].setValue(item);

      }else{
        this.EditOperationForm.controls["remorques"].setValue(item.vehicules.id);
        this.EditOperationForm.controls["genrer"].setValue(item.vehicules.vehiculeType);
        this.EditOperationForm.controls["lineV2"].setValue(item);
      }
  }); 

    this.EditOperationForm.controls["ndossier"].setValue(this.editOperation.ndossier);
    this.EditOperationForm.controls["typeMarchandises"].setValue(this.editOperation.typeMarchandises);
    this.EditOperationForm.controls["operationtype"].setValue(this.editOperation.operationtype);
    this.EditOperationForm.controls["refChargement"].setValue(this.editOperation.refChargement);

  } 
  SortByPropetyAdresses(listAdr){
     return listAdr.sort((a, b) => (a.typeStation > b.typeStation) ? 1 : (a.typeStation === b.typeStation) ? ((a.ordere > b.ordere) ? 1 : -1) : -1 )
  }
  GetListBeneficiare(){
    this.beneficiareService.GetAllBeneficiare().subscribe(x => {
      this.beneficiares = x;   
      console.log('ok benefe icii'+ JSON.stringify(this.beneficiares));
      this.insertfrom();
  });

  }
  GetListConducteur(page, size){
    this.conducteurService.loadPage(page, size).subscribe(x => {
      this.conducteur = x.content;    
     
  });
  }
  loadpage(page, size){
    this.httpVehiculeService.loadPage(page, size).subscribe(x => {      
      if (x && x.length) {  
        x.forEach(item => {
            if (item.genre == 'TRACTEUR') {  
                this.tracteur.push(item);  
            }  
            if (item.genre == 'REMORQUE') {  
              this.remorque.push(item);  
          }  
        });  
    } 
  });
  }
//-------------------------------------------------------------------------------------------------------------------------------
    editField: string;

    awaitingStationList: Array<any> = [];

    editRowID : any;

    EditTable (val){
      this.editRowID = val;
    }

    updateList(id: number, property: string, event: any) {
      const editField = event.target.textContent;
      this.stations[id][property] = editField;
    }

    changeValue(id: number, property: string, event: any) {
      this.editField = event.target.textContent;
    }

    remove(id: any) {
      this.awaitingStationList.push(this.stations[id]);
      this.stations.splice(id, 1);
    }
    initADR() {
      if (this.awaitingStationList && this.awaitingStationList.length) {  
        this.awaitingStationList.forEach(item => {
          this.stations.push(item); 
          this.awaitingStationList.splice(item['id'], 1);
        });  
        this.awaitingStationList = [];
        this.stations = this.SortByPropetyAdresses(this.stations);
    } 
    }
    station : any;
    awaitingStationListInit: Array<any> = [
       this.station = new Address(),
    ];

    add() {
      console.log('--------------------'+ JSON.stringify(this.stations) +'----------------------------------------');

      if (this.awaitingStationListInit.length > 0) {
        // this.station = this.awaitingStationListInit[0];
        this.stations.push(new Address());
       // this.station = {};
       // this.awaitingStationList.splice(0, 1);
      }
    }
    affichetable(i){
      console.log('--------------------table content----------------------------------------');
      console.log('--------------------'+ JSON.stringify(this.stations[i]) +'----------------------------------------');

    } 
    
editDomain(domain: any){
    domain.editable = !domain.editable;
  }



}
