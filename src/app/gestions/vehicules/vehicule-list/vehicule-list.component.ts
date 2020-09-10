import { Component, OnInit,ViewChildren, QueryList, Directive, Input, EventEmitter, Output} from '@angular/core';
//, 
import { VehiculeServiceService, Vehicule } from 'src/app/shared/Sgestionnaire/vehicule-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MyFilterPipe } from 'src/app/shared/pipes/MyFilterPipe';
import { FormControl, FormGroup } from '@angular/forms';
import { ServiceGeneralService } from 'src/app/shared/generalservice/service-general.service';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Observable, Observer } from 'rxjs';
import { IVehicule } from '../vehicule.model';
import { NotificationService } from 'src/app/shared/generalservice/notification.service';


//const ITEMS_PER_PAGE = 10;

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
  title = 'List des vehicules';
  head = ['ID', 'MATRICULE', 'GENRE', 'Date creation', 'Type'];
  base64Image: any;
  totalItems = 0;
  itemsPerPage = 10;
  page: number = 1;
  predicate: string = '';
  ascending!: boolean;
  ngbPaginationPage = 1;

  //@ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
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
  filterBetweenTwoDate:any ={'fromDate' : '2020-03-20' , 'toDate': '2020-03-25'};
  filterForm = new FormGroup({
    fromDate: new FormControl(),
    toDate: new FormControl(),
    });

   get fromDate() { return this.filterForm.get('fromDate').value; }
   get toDate() { return this.filterForm.get('toDate').value; }

  constructor(private httpVehiculeService: VehiculeServiceService, private router : Router,
    private route: ActivatedRoute, private FilterDate: MyFilterPipe, private generalservice : ServiceGeneralService,
    private notif : NotificationService) { 
    }
  pageChanged(event){
    console.log(event);
    this.config.currentPage = event;
  }
  loadPage(page?: number): void {
    const pageToLoad: number = page || this.page;

    this.httpVehiculeService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<IVehicule[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
        () => this.onError()
      );
  }
  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    console.log("ici sort fonction"+ result);
    return result;
  }
  onChange(value) {
    this.itemsPerPage = value;
    this.loadPage(0);
  }
  ngOnInit() {
    this.dtOptions = {
      data: this.vehicules,
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    }; 

   // this.route.queryParams.subscribe(x => this.loadpage(x.page || 0, 100));
    this.loadPage();
  
  }
  error = { error : {isError : false, errorMessage:'La date de fin doit être supérieure à la date de début.'}, 
                 isValidDate : true };

  getFilteredDate() {
 

    if(this.fromDate == null || this.toDate == null){
      this.notif.success('Date empty, il faut le rensigner');
    }else{
      let startDateArgs = this.generalservice.convertTodate (this.fromDate);
      let endDateArgs = this.generalservice.convertTodate (this.toDate);
      console.log("date in ok"+ startDateArgs + endDateArgs);
      var controle = this.generalservice.validateDates( startDateArgs , endDateArgs);
    }
     
    if(controle.isValidDate){
    var filterBetweenTwoDate ={'fromDate' : this.fromDate , 'toDate': this.toDate};
    console.log("date in ok"+ JSON.stringify(filterBetweenTwoDate));
    this.listvehicules = this.FilterDate.transform(this.vehicules, filterBetweenTwoDate);  
    this.vehicules = this.listvehicules;  
    }else{
      this.error.error.isError = controle.error.isError;
      this.error.error.errorMessage =controle.error.errorMessage;
      this.notif.success(controle.error.errorMessage);
    }      
 } 
  SearshByGenre(){
    if(this.genre != ""){
      this.listvehicules = this.listvehicules.filter(res => {
        return res.genre.toLocaleLowerCase().match(this.genre.toLocaleLowerCase());
      });
    }else if(this.genre == ""){
          this.ngOnInit();
    }
  }
  SearshByType(){
    if(this.type != ""){
      this.listvehicules = this.listvehicules.filter(res => {
        return res.vehiculeType.toLocaleLowerCase().match(this.type.toLocaleLowerCase());
      });
    }else if(this.type == ""){
          this.ngOnInit();
    }
  }
  SearshByEntite(){
    if(this.societe != ""){
      this.listvehicules = this.listvehicules.filter(res => {
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

  handleSuccessfulResponse( response ){
    this.vehicules = response;
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

/*     onSort({column, direction}: SortEvent) {
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
  } */
  generatePdf(){
    var data =document.getElementById('tablevehicules');

      html2canvas(data, { allowTaint: true }).then(canvas => {
       let HTML_Width = canvas.width;
       let HTML_Height = canvas.height;
       let top_left_margin = 15;
       let PDF_Width = HTML_Width + (top_left_margin * 2);
       let PDF_Height = (PDF_Width * 1.5) + (top_left_margin * 2);
       let canvas_image_width = HTML_Width;
       let canvas_image_height = HTML_Height;
       let totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;
       canvas.getContext('2d');
       let imgData = canvas.toDataURL("image/jpeg", 1.0);
       let pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
       pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);
       for (let i = 1; i <= totalPDFPages; i++) {
         pdf.addPage([PDF_Width, PDF_Height], 'p');
         pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height * i) + (top_left_margin * 4), canvas_image_width, canvas_image_height);
       }
        pdf.save("HTML-Document.pdf");
     });
   
/*     html2canvas(data).then(canvas =>{
      var imgwid = 208;
      var pageheight = 295;
      var imgHeight = canvas.height * imgwid / canvas.width ;
      var heightleft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = jsPDF('p','mm','a4');
      var position = 0 ;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgwid, imgHeight);
      pdf.save('DataVehicules.pdf');

    }); */
  }
  protected onSuccess(data: IVehicule[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.getAll('X-Total-Count'));
    console.log('list vehicules on sucess item1 '+ this.totalItems);
    this.page = page;
    this.listvehicules = data || [];
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page;
  }

   addHeaderFooters (doc ) {
    const pageCount = doc.internal.getNumberOfPages()
    var imgdata = 'data:image/png;base64,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';           

    doc.setFont('helvetica', 'italic');
    for (var i = 1; i <= pageCount; i++) {

      // header
      doc.setFontSize(20);
      doc.line(0, 27, 800, 20);
      doc.setFont('helvetica');
      doc.setFontType('bold');
      doc.text(65, 15, 'List des vehicules');      
      doc.addImage(imgdata, 'PNG', 170, 0, 40, 30);   

      // footer
      doc.setPage(i);
      doc.line(0, 810, 810, 810);
      doc.setFontSize(8);
      doc.text('Page ' + String(i) + ' of ' + String(pageCount) + ". Generated on " + Date(), doc.internal.pageSize.width /2, doc.internal.pageSize.height - 3, {
        align: 'center'
      })
    }
  }
  

  GenerateTabletoPDF(){
             var doc = new jsPDF();      
     var tbl = $('#tablevehicules').clone();
    tbl.find('tr:nth-child(1)').remove();
    var res = doc.autoTableHtmlToJson(tbl.get(0)); 

    //console.log('okokdd'+res);
    console.log('okokdd'+ JSON.stringify(res));
    console.log('okokdd data'+JSON.stringify(res.data));

       //  var res = doc.autoTableHtmlToJson(document.getElementById('tablevehicules')); 
      var totalPagesExp = "{total_pages_count_string}";
           /*  var leftMargin = 40;
         doc.setFontSize(10); 
        // doc.setFontSize(30);
         //doc.text("List des vehicules", 35, 25);*/
     

       // let col = [{'id': 1, 'matricule' : "GOOOD", 'genre': "DAF", 'dateCreation': '2020-04-23', 'vehiculeType':"2039"}];
         doc.autoTable(this.head, res.data, 
             {
             theme: "striped",
             margin: {horizontal: 7, top : 75, bottom : 30,},
             bodyStyles: {valign: 'top'},
             styles: {overflow: 'linebreak', columnWidth: 'wrap'},
             startY : 40,
             showHead: 'everyPage',  
             addPageContent: function(data) {
              //   doc.text('Liste des vehicules', doc.internal.pageSize.width /2, 20, {align : 'center'});
                 var str = "Page " + data.pageCount;
                 // Total page number plugin only available in jspdf v1.0+
                 if (typeof doc.putTotalPages === 'function') {
                     str = str + " of " + totalPagesExp;
                 }
                 str = str + ". Generated on " + Date();
                // doc.text(str, leftMargin, doc.internal.pageSize.height - 10);
             }
         }); 
 
         // Total page number plugin only available in jspdf v1.0+
   /*       if (typeof doc.putTotalPages === 'function') {
             doc.putTotalPages(totalPagesExp);
         } */
         doc.addPage();

     this.addHeaderFooters(doc);
     doc.save('table_Vehicule_Data.pdf');
  
  }

  CapturePdf(){

    html2canvas(document.body).then(canvas =>{
      var imgwid = 208;
      var pageheight = 295;
      var imgHeight = canvas.height * imgwid / canvas.width ;
      var heightleft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = jsPDF ('p','mm','a4');
      var position = 0 ;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgwid, imgHeight);
      pdf.save('TestVehicule.pdf');

    });

  }
   

}
