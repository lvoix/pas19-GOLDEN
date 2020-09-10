import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormDataService } from '../data/formData.service';
import {  Work } from '../data/formData.model';
import { ServiceConducteurService, Conducteur } from 'src/app/shared/Sgestionnaire/service-conducteur.service';
import { BeneficiareService } from 'src/app/shared/Sgestionnaire/beneficiare.service';
import { DepenceService } from 'src/app/shared/depences/depence.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { DepenceComponent } from '../depence/depence.component';


@Component ({
    selector: 'mt-wizard-work'
    ,templateUrl: './work.component.html'
})

export class WorkComponent implements OnInit {
    title = 'Conducteurs, Client, Dotation ?';
    work: Work;
    workType: string;
    form: any;
    conducteur: any = [];
    beneficiares : any =[];

    constructor(private router: Router, private formDataService: FormDataService, private conducteurService: ServiceConducteurService,
        private beneficiareService : BeneficiareService, private Service : DepenceService,
        private Dialog : MatDialog) {
    }

    ngOnInit() {
        this.work = this.formDataService.getWork();
        console.log('Work feature loaded!' + this.work);
        this.GetListConducteur(0, 10);
        this.GetListBeneficiare();   
        this.resetinit();
    }

    OndeleteDepence(ItemID : number, i : number){
        this.Service.DepencesAll.splice(i,1);
      }

    resetinit(){
        this.Service.formData =  {
            DepenceId: null,
            Prix:0,
            Type: '',
            Lieu : '',
            Motif : '',
            Date : null,
            Devise : ''      
        };
        this.Service.DepencesAll = [];     
    }

    AddOrEditDepnce(DepenceIndex, DepenceId) {
        console.log("toto", DepenceId + DepenceIndex);
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus =true;
        dialogConfig.disableClose = true;
        dialogConfig.width = "50%";
        dialogConfig.data = { DepenceIndex, DepenceId };
        console.log('config Dialog', dialogConfig);
       this.Dialog.open(DepenceComponent, dialogConfig).afterClosed().subscribe(res =>{
            console.log('recu resulta', res);
       });
      }

    GetListConducteur(page, size){
        this.conducteurService.loadPage(page, size).subscribe(x => {
          this.conducteur = x.content;    
          console.log('couvere'+ JSON.stringify(this.conducteur));
         
      });
      }
      GetListBeneficiare(){
        this.beneficiareService.GetAllBeneficiare().subscribe(x => {
          this.beneficiares = x;    
          console.log('beneficiares'+ JSON.stringify(this.beneficiares));
         
      });
      }
    save(form: any): boolean {
        this.work.depences = this.Service.DepencesAll;     
        if (!form.valid) {
            return false;
        }
        this.formDataService.setWork(this.work);
        console.log('data in form 2:'+ JSON.stringify (this.formDataService));
        return true;
    }

    goToPrevious(form: any) {

        if (this.save(form)) {
            // Navigate to the personal page
            this.router.navigate(['/home/operations/add/personal']);
        }
    }

    goToNext(form: any) {
        if (this.save(form)) {
            // Navigate to the address page
            //this.router.navigate(['/address']);
            console.log('work infos : '+ form);

        }
    }
}
