export class FormData {
    datedepart: Date = new Date();
    dateFin: Date = new Date();
    ndossier: string ='';
    firstName: string = '';
    lastName : string = '';
    operationtype : string = '';
    tracteurs : any = {};
    remorques : any ={};
    conducteurs1 : any = {};
    conducteurs2 : any ={};
    email: string = '';
    work: string = '';
    fileimport: string = '';
    beneficiaire: any = {};
    refChargement: string = '';
    typeMarchandises: string = '';
    dotationDH: any = 0;
    dotationEuro: any = 0;
    motifClient: string = '';
    typeStation: string = '';
    street1 : string = '';
    street2 : string = '';
    country : string = '';
    zipCode : string = '';
    city : string;
    nomClient: string = '';
    adressesLoad: any = [];
    adressesLivraison: any = [];
    status : string = '';
    ordere: number = 0;
    prixDH : any = 0;
    prixEuro : any = 0;
    motifprix : string = '';
    depences : any = [];
    

    
    clear() {
        this.datedepart = null;
        this.dateFin = null;
        this.ndossier = '';
        this.firstName = '';
        this.lastName = '';
        this.operationtype = '';
        this.tracteurs  = {};
        this.remorques  = {};
        this.conducteurs1 = {};
        this.conducteurs2 = {};
        this.email = '';
        this.work = '';
        this.fileimport = '';
        this.beneficiaire = {};
        this.nomClient = '';
        this.country = '';
        this.refChargement = '';
        this.typeMarchandises = '';
        this.dotationDH = 0;
        this.dotationEuro = 0;
        this.ordere = 0;
        this.motifClient = '';
        this.typeStation = '';
        this.adressesLoad = [];
        this.adressesLivraison = [];
        this.prixDH = 0;
        this.prixEuro = 0;
        this.motifprix = '';
        this.depences = [];
      
    }
}

export class Personal {
    datedepart : Date = null;
    dateFin : Date = null;
    ndossier : string = '';
    firstName: string = '';
    lastName : string = '';
    email: string = '';
    operationtype: string ='';
    tracteurs: any= {};
    remorques: any = {};
    fileimport: string = '';
    refChargement : string = '';
    typeMarchandises : string = '';
}
export class Work {
    conducteurs1 : any ={};
    conducteurs2 : any ={};
    beneficiaire : any = {};
    dotationDH : any = 0;
    dotationEuro : any = 0;
    motifClient : string = '';
    prixDH : any = 0;
    prixEuro : any = 0;
    motifprix : string = '';
    depences : any = [];


}

export class Address {
    nomClient: string = '';
    street1: string = '';
    street2: string = '';
    city: string = '';
    country: string = '';
    zipCode: string = '';
    typeStation: string =''; 
    ordere: number = 0; 

}

export class ListAddress {
   adressesLoad: any = [];
   adressesLivraison: any = [];
}


export class FileUpload {
    id : any =0;
    result : string = '';
    entityId: any= 0;
    entityType : string = '';
    name: string = '';
    url: string ='';  
    path: string ='';  
    extention: string= '';
    size: any = 0.0;

}
