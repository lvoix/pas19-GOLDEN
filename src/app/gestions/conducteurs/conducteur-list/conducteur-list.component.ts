import { Component, OnInit } from '@angular/core';
import { ServiceConducteurService, Conducteur } from 'src/app/shared/Sgestionnaire/service-conducteur.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-conducteur-list',
  templateUrl: './conducteur-list.component.html',
  styleUrls: ['./conducteur-list.component.css']
})
export class ConducteurListComponent implements OnInit {
  conducteurs : Conducteur[] = [];
  listconducteurs :any = [];
  selectedPage : number = 0;
  dtOptions: DataTables.Settings = {};
  config = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: this.conducteurs.length
  };
  constructor(private conducteurService: ServiceConducteurService, private router : Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.dtOptions = {
      data: this.conducteurs,
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      deferRender: true,
      lengthMenu: [[10, 25, 50, -1], [10, 25, 50, 'All']],
      retrieve: true
    }; 

    this.GetListConducteur(0, 10);
    //this.route.queryParams.subscribe(x => this.GetListConducteur(x.page || 0, 10));

  }

  GetListConducteur(page, size){
    this.conducteurService.loadPage(page, size).subscribe(x => {
      console.log('ok x resulta conducteurs'+ JSON.stringify(x));
      this.conducteurs = x.content;
     // this.listconducteurs =this.listconducteurs.concat(x);
      this.listconducteurs = x;

      console.log('couvere'+ JSON.stringify(this.listconducteurs));
     
  });
  }
  onSelect(page: number): void {
    console.log("selected page : "+page);
    this.selectedPage=page;
    this.GetListConducteur(page, 10);
  }

}
