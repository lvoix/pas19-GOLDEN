import { Component, OnInit, Directive, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { voyage } from './services/voyage.model';

export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };
export const compare = (v1, v2) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: string;
  direction: SortDirection;
}
interface voyages {
  ID : number;
  idVoyage : String;
  MatriculeT : String;
  MatriculeR : String;
  Conducteur : String;
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
  selector: 'app-voyage-list',
  templateUrl: './voyage-list.component.html',
  styleUrls: ['./voyage-list.component.css']
})
@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class VoyageListComponent implements OnInit {

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  voyages : voyage [] = [];
  idVoyage: string;
  MatriculeT: string;
  id: number;
  Conducteur: string;
  MatriculeR: string;

  public maxSize: number = 7;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = true;
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
    totalItems: this.voyages.length
  };
  constructor() {

   }

   pageChanged(event){
    console.log(event);
    this.config.currentPage = event;
  }

  ngOnInit() {
    this.voyages = [
      {
        ID : 1,
        idVoyage : '234567',
        MatriculeT : '92512A59',
        MatriculeR : '784402',
        Conducteur : 'AHEMD'
      },
      {
        ID : 2,
        idVoyage : '3456767',
        MatriculeT : '95512A59',
        MatriculeR : '784402',
        Conducteur : 'AHEMD'
      },
      {
        ID : 3,
        idVoyage : '678',
        MatriculeT : '63512A59',
        MatriculeR : '784402',
        Conducteur : 'AHEMD'
      },
      {
        ID : 4,
        idVoyage : '6784567',
        MatriculeT : '54512A59',
        MatriculeR : '784402',
        Conducteur : 'AHEMD'
      },
      {
        ID : 4,
        idVoyage : '6784567',
        MatriculeT : '54512A59',
        MatriculeR : '784402',
        Conducteur : 'AHEMD'
      },
      {
        ID : 4,
        idVoyage : '6784567',
        MatriculeT : '54512A59',
        MatriculeR : '784402',
        Conducteur : 'AHEMD'
      },
      {
        ID : 4,
        idVoyage : '6784567',
        MatriculeT : '54512A59',
        MatriculeR : '784402',
        Conducteur : 'AHEMD'
      },
      {
        ID : 3,
        idVoyage : '678',
        MatriculeT : '63512A59',
        MatriculeR : '784402',
        Conducteur : 'AHEMD'
      },
      {
        ID : 4,
        idVoyage : '6784567',
        MatriculeT : '54512A59',
        MatriculeR : '784402',
        Conducteur : 'AHEMD'
      },
      {
        ID : 3,
        idVoyage : '678',
        MatriculeT : '63512A59',
        MatriculeR : '784402',
        Conducteur : 'AHEMD'
      },
      {
        ID : 4,
        idVoyage : '6784567',
        MatriculeT : '54512A59',
        MatriculeR : '784402',
        Conducteur : 'AHEMD'
      },
      {
        ID : 3,
        idVoyage : '678',
        MatriculeT : '63512A59',
        MatriculeR : '784402',
        Conducteur : 'AHEMD'
      },
      {
        ID : 4,
        idVoyage : '6784567',
        MatriculeT : '54512A59',
        MatriculeR : '784402',
        Conducteur : 'AHEMD'
      },
      {
        ID : 3,
        idVoyage : '678',
        MatriculeT : '63512A59',
        MatriculeR : '784402',
        Conducteur : 'AHEMD'
      },
      {
        ID : 4,
        idVoyage : '6784567',
        MatriculeT : '54512A59',
        MatriculeR : '784402',
        Conducteur : 'AHEMD'
      },
      {
        ID : 3,
        idVoyage : '678',
        MatriculeT : '63512A59',
        MatriculeR : '784402',
        Conducteur : 'AHEMD'
      },
      {
        ID : 4,
        idVoyage : '6784567',
        MatriculeT : '54512A59',
        MatriculeR : '784402',
        Conducteur : 'AHEMD'
      },
      {
        ID : 3,
        idVoyage : '678',
        MatriculeT : '63512A59',
        MatriculeR : '784402',
        Conducteur : 'AHEMD'
      },
      {
        ID : 4,
        idVoyage : '6784567',
        MatriculeT : '54512A59',
        MatriculeR : '784402',
        Conducteur : 'AHEMD'
      },


    ]
  }

  Searsh(){
    if(this.idVoyage != ""){
      this.voyages = this.voyages.filter(res => {
        return res.idVoyage.toLocaleLowerCase().match(this.idVoyage.toLocaleLowerCase());
      });
    }else if(this.idVoyage == ""){
          this.ngOnInit();
    }

  }
  SearshByMatricule(){
    if(this.MatriculeT != ""){
      this.voyages = this.voyages.filter(res => {
        return res.MatriculeT.toLocaleLowerCase().match(this.MatriculeT.toLocaleLowerCase());
      });
    }else if(this.MatriculeT == ""){
          this.ngOnInit();
    }

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
      this.voyages = this.voyages;
    } else {
      this.voyages = [...this.voyages].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

}




