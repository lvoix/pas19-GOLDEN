import { Injectable } from '@angular/core';

import { FormData, Personal, Address, Work, ListAddress } from './formData.model';
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
            datedepart : this.formData.datedepart,
            dateFin : this.formData.dateFin,
            ndossier : this.formData.ndossier,
            firstName: this.formData.firstName,
            lastName: this.formData.lastName,
            email: this.formData.email,
            fileimport: this.formData.fileimport,
            operationtype: this.formData.operationtype,
            tracteurs: this.formData.tracteurs,
            remorques: this.formData.remorques,
            refChargement: this.formData.refChargement,
            typeMarchandises: this.formData.typeMarchandises,
            
        };
        console.log('Get Personnel' + JSON.stringify(personal));
        return personal;
    }

    setPersonal(data: Personal) {
        // Update the Personal data only when the Personal Form had been validated successfully
        console.log('les datesssssssssss iciiiiiiiii +++++'+data.datedepart + new Date(data.datedepart));

        this.formData.datedepart = new Date(data.datedepart);
        this.formData.dateFin = new Date(data.dateFin);
        this.formData.ndossier = data.ndossier;
        this.isPersonalFormValid = true;
        this.formData.firstName = data.firstName;
        this.formData.lastName = data.lastName;
        this.formData.email = data.email;
        this.formData.fileimport = data.fileimport;
        this.formData.operationtype = data.operationtype;
        this.formData.tracteurs =data.tracteurs;
        this.formData.remorques = data.remorques;
        this.formData.refChargement = data.refChargement;
        this.formData.typeMarchandises = data.typeMarchandises;
        
        // Validate Personal Step in Workflow
        this.workflowService.validateStep(STEPS.personal);
      //  console.log('Set Personnel' + JSON.stringify(this.formData.fileimport));

    }


    getWork(): Work {
        // Return the work data
        var work : Work = { 
            conducteurs1: this.formData.conducteurs1,
            conducteurs2: this.formData.conducteurs2,
            beneficiaire: this.formData.beneficiaire,
            dotationDH : this.formData.dotationDH,
            dotationEuro : this.formData.dotationEuro,
            motifClient : this.formData.motifClient,
            prixDH : this.formData.prixDH,
            prixEuro : this.formData.prixEuro,
            motifprix : this.formData.motifprix,
            depences : this.formData.depences,

        };
        console.log('Get work' + JSON.stringify(work));
        return work;
    }

    setWork(data: Work) {
        // Update the work type only when the Work Form had been validated successfully
        this.isWorkFormValid = true;

        this.formData.conducteurs1 = data.conducteurs1;
        this.formData.conducteurs2 = data.conducteurs2;
        this.formData.beneficiaire = data.beneficiaire;
        this.formData.dotationDH = data.dotationDH;
        this.formData.dotationEuro = data.dotationEuro;
        this.formData.motifClient = data.motifClient;
        this.formData.prixDH = data.prixDH;
        this.formData.prixEuro = data.prixEuro;
        this.formData.motifprix = data.motifprix;
        this.formData.depences = data.depences;

        // Validate Work Step in Workflow
        this.workflowService.validateStep(STEPS.work);
    }

    getAddress() : Address {
        // Return the Address data
        var address: Address = {
            street1: this.formData.street1,
            street2: this.formData.street2,
            city: this.formData.city,
            country: this.formData.country,
            zipCode: this.formData.zipCode,
            nomClient: this.formData.nomClient,
            typeStation: this.formData.typeStation, 
            ordere: this.formData.ordere,
   
        };
        return address;
    }
    
    setAddress(data: Address) {
        // Update the Address data only when the Address Form had been validated successfully
        this.isAddressFormValid = true;
        this.formData.street1 = data.street1;
        this.formData.street2 = data.street2;
        this.formData.city = data.city;
        this.formData.country = data.country;
        this.formData.zipCode = data.zipCode;
        this.formData.nomClient = data.nomClient;
        this.formData.typeStation = data.typeStation; 
        this.formData.ordere = data.ordere; 


        // Validate Address Step in Workflow
        this.workflowService.validateStep(STEPS.address);
    }

    getAddressList() : ListAddress {
        // Return the Address data
        var addressList: ListAddress = {
            adressesLoad: this.formData.adressesLoad,
            adressesLivraison: this.formData.adressesLivraison,  
        };
        return addressList;
    }
    setAddressList(data: ListAddress) {
        // Update the Address data only when the Address Form had been validated successfully
        this.isAddressFormValid = true;

        this.formData.adressesLoad = data.adressesLoad;
        this.formData.adressesLivraison = data.adressesLivraison; 

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
