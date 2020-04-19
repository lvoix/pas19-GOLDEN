import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormDataService } from '../data/formData.service';
import { Personal } from '../data/formData.model';

@Component ({
    selector: 'mt-wizard-work'
    ,templateUrl: './work.component.html'
})

export class WorkComponent implements OnInit {
    title = 'Conducteurs, Client, Dotation ?';
    personal: Personal = new Personal();
    workType: string;
    form: any;
    conducteur: any;
    clients: any;

    constructor(private router: Router, private formDataService: FormDataService) {
    }

    ngOnInit() {
        this.personal = this.formDataService.getPersonal();
        this.workType = this.formDataService.getWork();
        console.log('Work feature loaded!' + this.workType);
        this.conducteur = [
            {
              id: 1,
              firstname: 'Youssef',
              lastname: 'BARGUACH',
              cni: 'G637033'
  
            },
            {
                id: 2,
                firstname: 'Yassine',
                lastname: 'BARGUACH',
                cni: 'G637033'
    
              },
              {
                id: 3,
                firstname: 'Oussama',
                lastname: 'BARGUACH',
                cni: 'G637033'
    
              }
        ];
        this.clients = [
            {
              id: 1,
              name: 'Dachser',
  
            },
            {
                id: 2,
                name: 'Timmar',
    
              },
              {
                id: 3,
                name: 'Ziegler',
    
              },
        ];
    }

    save(form: any): boolean {
        if (!form.valid) {
            return false;
        }

        this.formDataService.setWork(this.workType);
        console.log('data in form 2:'+ JSON.stringify (this.formDataService));

        return true;
    }

    goToPrevious(form: any) {
        if (this.save(form)) {
            // Navigate to the personal page
            this.router.navigate(['/personal']);
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
