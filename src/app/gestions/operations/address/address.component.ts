import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Address } from '../data/formData.model';
import { FormDataService } from '../data/formData.service';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import {} from 'googlemaps';
@Component ({
    selector: 'mt-wizard-address',
    templateUrl: './address.component.html',
    styleUrls: ['./address.component.css']
})

export class AddressComponent implements OnInit {
    title = 'Where do you load?';
    @ViewChild('search',  {static: false})

    public searchElementRef : ElementRef;
    addressLoad = new Address();
    addressLivr = new Address();
    form: any;
    dataArrayLoad = [];
    dataArrayLivr = [];

    public longtitude : number;
    public lattitude : number;
    public zoom : number;
    public latlongs : any = [];
    public latlong : any = {};
    public searchControl : FormControl;


    // tslint:disable-next-line: max-line-length
    constructor(private router: Router, private formDataService: FormDataService, private mapsAPILoader : MapsAPILoader, private ngzone : NgZone ) {
    }

    ngOnInit() {
        this.addressLoad = this.formDataService.getAddress();
        this.addressLivr = this.formDataService.getAddress();
        this.dataArrayLoad.push(this.addressLoad);
        this.dataArrayLivr.push(this.addressLivr);

        console.log('Address feature loaded!');
        this.InitGeoPosition();
    }
    InitGeoPosition() {
        this.zoom = 8;
        this.lattitude = 39.9828;
        this.longtitude = -98.5789;
        this.searchControl = new FormControl();
        this.mapsAPILoader.load().then(() => {
             const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
                 types : [],
                 componentRestrictions : {'country' : 'IN' }
             });
             autocomplete.addListener( 'place_changed', () => {
                  this.ngzone.run(() => {
                      const place : google.maps.places.PlaceResult = autocomplete.getPlace();
                      if(place.geometry === undefined  || place.geometry === null){
                          return ;
                      }
                      const latlong = {
                          lattitude : place.geometry.location.lat(),
                          longtitude : place.geometry.location.lng()
                      };
                      this.latlongs.push(latlong);
                      this.searchControl.reset();
                  });
             });
        });
    }
    private setCurrentPosition() {
        if('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
               this.longtitude = position.coords.longitude;
               this.lattitude = position.coords.latitude;
               this.zoom = 8;
            });
        }
    } 

    AddadressLoad() {
        this.addressLoad = new Address();
        console.log('okkkkkkkkkkkkkkkkkkkkk'+ this.addressLoad );
        this.dataArrayLoad.push(this.addressLoad);
        console.log('tabee json '+ JSON.stringify(this.dataArrayLoad ));

    }
    AddadressLivr (){
        this.addressLivr = new Address();
        console.log('okkkkkkkkkkkkkkkkkkkkk'+ this.addressLivr );
        this.dataArrayLivr.push(this.addressLivr);
        console.log('tabee'+ this.dataArrayLivr );
    }
    save(form: any): boolean {
        if (!form.valid) {
            return false;
        }

        this.formDataService.setAddress(this.addressLoad);
        return true;
    }

    goToPrevious(form: any) {
        if (this.save(form)) {
            // Navigate to the work page
           // this.router.navigate(['/work']);
           console.log('Addres infos previous: '+ form);

        }
    }

    goToNext(form: any) {
        if (this.save(form)) {
            // Navigate to the result page
           // this.router.navigate(['/result']);
           console.log('Addres infos next: '+ form);

        }
    }
}
