export class FormData {
    Datedepart: Date = new Date();
    Datedefin: Date = new Date();
    Ndossier: string ='';
    firstName: string = '';
    lastName : string = '';
    typeVoyage : string = '';
    tracteurs : string = '';
    remorques : string = '';
    conducteurs1 : string = '';
    conducteurs2 : string= '';
    email: string = '';
    work: string = '';
    street: string = '';
    city: string = '';
    state: string = '';
    zip: string = '';
    fileimport: string = '';
    client: string = '';
    nomClient: string = '';
    RefChargement: string = '';

    clear() {
        this.Datedepart = null;
        this.Datedefin = null;
        this.Ndossier = '';
        this.firstName = '';
        this.lastName = '';
        this.typeVoyage = '';
        this.tracteurs  = '';
        this.remorques  = '';
        this.conducteurs1 = '';
        this.conducteurs2 = '';
        this.email = '';
        this.work = '';
        this.street = '';
        this.city = '';
        this.state = '';
        this.zip = '';
        this.fileimport = '';
        this.client = '';
        this.nomClient = '';
        this.RefChargement = '';
    }
}

export class Personal {
    Datedepart : Date = null;
    Datedefin : Date = null;
    Ndossier : string = '';
    firstName: string = '';
    lastName : string = '';
    email: string = '';
    typeVoyage: string ='';
    tracteurs: string = '';
    remorques: string = '';
    conducteurs1 : string= '';
    conducteurs2 : string= '';
    fileimport: string = '';
    client : string = '';
    RefChargement : string = '';
}

export class Address {
    nomClient: string = '';
    street: string = '';
    city: string = '';
    state: string = '';
    zip: string = '';
}
