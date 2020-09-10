import { Component, OnInit, Input } from '@angular/core';

import { FormData } from '../data/formData.model';
import { FormDataService } from '../data/formData.service';
import { OperationserviceService } from 'src/app/shared/Sgestionnaire/operationservice.service';
import { Router } from '@angular/router';

@Component ({
    selector:'mt-wizard-result',
    templateUrl: './result.component.html'
})

export class ResultComponent implements OnInit {
    title = 'Concentrez vous avec ce que vous saisissez comme infos!';
    @Input() formData: FormData;
    isFormValid: boolean = false;
    infouser : any;
    tokens : any;
    TicketList : any;
    constructor(private formDataService: FormDataService, private operationService: OperationserviceService, private router : Router) {
    }

    ngOnInit() {
       // this.initToken();
        this.formData = this.formDataService.getFormData();
        this.formData.status = 'CREATE';
        this.isFormValid = this.formDataService.isFormValid();
        console.log('Result feature loaded!');
    }

    goToPrevious(form: any) {
          // Navigate to the personal page
       //   this.router.navigate(['/home/operations/add/personal']);
      
  }

    submit() {
  
      alert('SUCCESS stations!! :-)\n\n' + JSON.stringify(this.formData, null, 4));
      this.operationService.createOperation(this.formData)
      .subscribe( data => {
       this.formData = this.formDataService.resetFormData();
       this.isFormValid = false;
       this.router.navigate( ['/home/operation', btoa(JSON.stringify(data))]);
      });

  
    }

/*     initToken(){
      this.AuthService.login('admin', 'admin').then(res => {
        console.log('info resulta ====>', res);
        this.tokens = res;
        console.log('token ====>',this.tokens.token.token);
        localStorage.setItem("token", this.tokens.token.token);

        this.AuthService.PostInfos().then(data => { console.log(' resulta info items data ====>', data);
      //  this.TicketList = data as Item [];
            this.TicketList = data ;
          console.log(' resulta info items itemlisttttt====>', this.TicketList);
        }).catch(err => {
          console.log(' err info items ====>', err);
           });


      }).catch(err => {
        console.log('err resulta ====>', err);
         });
    } */
}
