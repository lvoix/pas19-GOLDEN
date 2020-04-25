import { Component, OnInit, Input } from '@angular/core';

import { FormData } from '../data/formData.model';
import { FormDataService } from '../data/formData.service';
import { AuthService } from 'src/app/shared/Sgestionnaire/auth.service';

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
    constructor(private formDataService: FormDataService, private AuthService: AuthService) {
    }

    ngOnInit() {
        this.initToken();
        this.formData = this.formDataService.getFormData();
        this.isFormValid = this.formDataService.isFormValid();
        console.log('Result feature loaded!');
    }

    submit() {
     this.AuthService.SaveInfos(this.formData).then(data=>{
      console.log("id ligne cree",data.id);
      //  this.TicketList = data as Item [];
            this.TicketList = data ;
          console.log(' resulta info cust data post ====>', this.TicketList);
          alert('Excellent Job!');
          this.formData = this.formDataService.resetFormData();
          this.isFormValid = false;

        }).catch(err => {
          console.log(' err info cust ====>', err);
           });


    }

    initToken(){
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
    }
}
