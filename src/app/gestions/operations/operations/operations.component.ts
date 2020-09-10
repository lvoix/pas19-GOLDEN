import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { OperationserviceService } from 'src/app/shared/Sgestionnaire/operationservice.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit {
  active = 1;
  title = 'List des operations';
  page: number = 1;
  itemsPerPage = 10;
  ngbPaginationPage = 1;
  totalItems = 0;
  predicate: string = '';
  ascending!: boolean;
  listoperations : any = [];

  filterBetweenTwoDate: any ={'fromDate' : '2020-03-20' , 'toDate': '2020-03-25'};
  filterForm = new FormGroup({
    fromDate: new FormControl(),
    toDate: new FormControl(),
    });

  constructor(private  httpOperationService : OperationserviceService, private router : Router) { }

  ngOnInit() {
    this.loadPage(1);
  }

  loadPage(page?: number): void {
    const pageToLoad: number = page || this.page;

    this.httpOperationService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<any[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
        () => this.onError()
      );
  }

  onChange(value) {
    this.itemsPerPage = value;
    this.loadPage(0);
  }

  protected onSuccess(data: any[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.getAll('X-Total-Count'));
    console.log('list operations on sucess item ' + this.totalItems);
    this.page = page;
    this.listoperations = data || [];
    console.table(this.listoperations);
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    console.log("ici sort fonction" + result);
    return result;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page;
  }

  AddOrEditOperation(i, updateOperation){
    console.log('edit operation'+ i + JSON.stringify(updateOperation));
    this.router.navigate( ['/home/operation', btoa(JSON.stringify(updateOperation))]);
  }
  deleteOperation(operation) : void {
    this.httpOperationService.deleteOperation(operation)
      .subscribe( data => {
        this.listoperations = this.listoperations.filter(u => u !== operation);
      })
  };

}
