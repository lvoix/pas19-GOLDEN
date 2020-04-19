import { Component, OnInit,ViewChildren, QueryList, Directive, Input, EventEmitter, Output} from '@angular/core';
//, 
import { VehiculeServiceService, Vehicule } from 'src/app/shared/vehicule-service.service';
import { Router, ActivatedRoute } from '@angular/router';

export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };
export const compare = (v1, v2) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: string;
  direction: SortDirection;
}

export class NgbdSortableHeader {

  @Input() sortable: string;
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
} 
@Component({
  selector: 'app-vehicule-list',
  templateUrl: './vehicule-list.component.html',
  styleUrls: ['./vehicule-list.component.css']
})
@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
}) 

export class VehiculeListComponent implements OnInit {
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  vehicules: Vehicule[] = [];
  vehicule : Vehicule;
  genre : any;
  societe : any;
  type : any;
  listvehicules  : Array<any>;
  matriculeSearch: string;
  typeSearch: string;
  genreSearch: string;
  dtOptions: DataTables.Settings = {};

  public maxSize: number = 20;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = true;
  pager = {};
  public labels: any = {
      previousLabel: '<--',
      nextLabel: '-->',
      screenReaderPaginationLabel: 'Pagination',
      screenReaderPageLabel: 'page',
      screenReaderCurrentLabel: `You're on page`
  };
  config = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: this.vehicules.length
  };
  constructor(private httpVehiculeService: VehiculeServiceService, private router : Router,
    private route: ActivatedRoute) { }
  pageChanged(event){
    console.log(event);
    this.config.currentPage = event;
  }
  ngOnInit() {
    this.dtOptions = {
      data: this.vehicules,
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    }; 

    this.route.queryParams.subscribe(x => this.loadpage(x.page || 0, 100));

   /*  this.httpVehiculeService.GetAllVehicules().subscribe(
     response => this.handleSuccessfulResponse(response),
    ); */
  }
  SearshByGenre(){
    if(this.genre != ""){
      this.vehicules = this.vehicules.filter(res => {
        return res.genre.toLocaleLowerCase().match(this.genre.toLocaleLowerCase());
      });
    }else if(this.genre == ""){
          this.ngOnInit();
    }
  }
  SearshByType(){
    if(this.type != ""){
      this.vehicules = this.vehicules.filter(res => {
        return res.vehiculeType.toLocaleLowerCase().match(this.type.toLocaleLowerCase());
      });
    }else if(this.type == ""){
          this.ngOnInit();
    }
  }
  SearshByEntite(){
    if(this.societe != ""){
      this.vehicules = this.vehicules.filter(res => {
        return res.entites.name.toLocaleLowerCase().match(this.societe.toLocaleLowerCase());
      });
    }else if(this.societe == ""){
          this.ngOnInit();
    }
  }
  onChangePage(listvehicule: Array<any>) {
    // update current page of items
    console.log('eventlist'+ JSON.stringify(listvehicule));
    this.listvehicules = listvehicule;
}
  loadpage(page, size){
    this.httpVehiculeService.loadPage(page, size).subscribe(x => {
      console.log('ok x resulta '+ JSON.stringify(x));
      this.pager = x.pager;
      console.log('ok pages'+ this.pager);
      this.vehicules = x;
  });
  }
  handleSuccessfulResponse( response ){
    this.vehicules = response;
    console.log('ok list vehicule'+ this.vehicules.length);
   }
   deletVehicule(vehicule : Vehicule) : void {
      this.httpVehiculeService.deleteVehicule(vehicule)
        .subscribe( data => {
          this.vehicules = this.vehicules.filter(u => u !== vehicule);
        })
    };

    AddOrEditVehicule(i, updateVehicule){
      console.log('edit vehicule'+ i + JSON.stringify(updateVehicule));
      this.router.navigate( ['/home/vehicule', btoa(JSON.stringify(updateVehicule))]);
    }

    onSort({column, direction}: SortEvent) {
      console.log('goood');
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting countries
    if (direction === '') {
      this.vehicules = this.vehicules;
    } else {
      this.vehicules = [...this.vehicules].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  } 
   

}
