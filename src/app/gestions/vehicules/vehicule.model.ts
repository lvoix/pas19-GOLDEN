export interface IVehicule {
    id?: number;
    chauffeurs?: any;
    vehiculesId?: number;
  }
  
  export class Vehicule implements IVehicule {
    constructor(public id?: number, public chauffeurs?: any, public vehiculesId?: number) {}
  }