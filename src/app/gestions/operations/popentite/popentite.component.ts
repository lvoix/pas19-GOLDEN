import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-popentite',
  templateUrl: './popentite.component.html',
  styleUrls: ['./popentite.component.css']
})
export class PopentiteComponent implements OnInit {

  entites : any;
  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogref:MatDialogRef<PopentiteComponent>,) { }

  ngOnInit() {
    console.log('recu entites',  this.data.entitess);
    this.entites = this.data.entitess;
  }
  UploadEntiteID(ok){

  }
  onSubmit(form : NgForm){


  }

}
