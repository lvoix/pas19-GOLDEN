import { Injectable } from '@angular/core';

import { FormData, Personal, Address } from './formData.model';
import { WorkflowService } from '../workflow/workflow.service';
import { STEPS } from '../workflow/workflow.model';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable()
export class FormDataService {

    private formData: FormData = new FormData();
    private isPersonalFormValid: boolean = false;
    private isWorkFormValid: boolean = false;
    private isAddressFormValid: boolean = false;

    constructor(private workflowService: WorkflowService) {
    }
    generatePdf(documentDefinition){
      //const documentDefinition = { content: 'This is an sample PDF printed with pdfMake' };
      pdfMake.createPdf(documentDefinition).open();
     }

    getPersonal(): Personal {
        // Return the Personal data
        var personal: Personal = {
            Datedepart : this.formData.Datedepart,
            Datedefin : this.formData.Datedefin,
            Ndossier : this.formData.Ndossier,
            firstName: this.formData.firstName,
            lastName: this.formData.lastName,
            email: this.formData.email,
            fileimport: this.formData.fileimport,
            typeVoyage: this.formData.typeVoyage,
            tracteurs: this.formData.tracteurs,
            remorques: this.formData.remorques,
            conducteurs1: this.formData.conducteurs1,
            conducteurs2: this.formData.conducteurs2,
            client: this.formData.client,
            RefChargement: this.formData.RefChargement
        };
        console.log('Get Personnel' + JSON.stringify(personal));
        return personal;
    }

    setPersonal(data: Personal) {
        // Update the Personal data only when the Personal Form had been validated successfully
        this.formData.Datedepart = data.Datedepart;
        this.formData.Datedefin = data.Datedefin;
        this.formData.Ndossier = data.Ndossier;
        this.isPersonalFormValid = true;
        this.formData.firstName = data.firstName;
        this.formData.lastName = data.lastName;
        this.formData.email = data.email;
        this.formData.fileimport = data.fileimport;
        this.formData.typeVoyage = data.typeVoyage;
        this.formData.tracteurs = data.tracteurs;
        this.formData.remorques = data.remorques;
        this.formData.conducteurs1 = data.conducteurs1;
        this.formData.conducteurs2 = data.conducteurs2;
        this.formData.client = data.client;
        this.formData.RefChargement = data.RefChargement;


        // Validate Personal Step in Workflow
        this.workflowService.validateStep(STEPS.personal);
      //  console.log('Set Personnel' + JSON.stringify(this.formData.fileimport));

    }

    getWork() : string {
        // Return the work type
        return this.formData.work;
    }

    setWork(data: string) {
        // Update the work type only when the Work Form had been validated successfully
        this.isWorkFormValid = true;
        this.formData.work = data;
        // Validate Work Step in Workflow
        this.workflowService.validateStep(STEPS.work);
    }

    getAddress() : Address {
        // Return the Address data
        var address: Address = {
            street: this.formData.street,
            city: this.formData.city,
            state: this.formData.state,
            zip: this.formData.zip,
            nomClient: this.formData.nomClient
        };
        return address;
    }

    setAddress(data: Address) {
        // Update the Address data only when the Address Form had been validated successfully
        this.isAddressFormValid = true;
        this.formData.street = data.street;
        this.formData.city = data.city;
        this.formData.state = data.state;
        this.formData.zip = data.zip;
        this.formData.nomClient = data.nomClient;
        // Validate Address Step in Workflow
        this.workflowService.validateStep(STEPS.address);
    }

    getFormData(): FormData {
        // Return the entire Form Data
        return this.formData;
    }

    resetFormData(): FormData {
        // Reset the workflow
        this.workflowService.resetSteps();
        // Return the form data after all this.* members had been reset
        this.formData.clear();
        this.isPersonalFormValid = this.isWorkFormValid = this.isAddressFormValid = false;
        return this.formData;
    }

    isFormValid() {
        // Return true if all forms had been validated successfully; otherwise, return false
        return this.isPersonalFormValid &&
                this.isWorkFormValid &&
                this.isAddressFormValid;
    }
}
