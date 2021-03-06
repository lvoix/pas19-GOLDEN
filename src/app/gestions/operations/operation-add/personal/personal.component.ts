import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Personal } from '../data/formData.model';
import { FormDataService } from '../data/formData.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/Sgestionnaire/auth.service';
import { VehiculeServiceService } from 'src/app/shared/Sgestionnaire/vehicule-service.service';

@Component ({
    selector: 'mt-wizard-personal',
    templateUrl: './personal.component.html'
})

export class PersonalComponent implements OnInit {
    title = 'Entrer vos informations nécessaire';
    personal: Personal ;
    form: any;
    typesVoyage: any;
    remorque: any = [];
    tracteur: any= [];
    fileU: any;
    vehicules : any;
    constructor(private fb: FormBuilder, private router: Router, private formDataService: FormDataService, private http: HttpClient,
      private authser : AuthService, private httpVehiculeService: VehiculeServiceService ) {
    }


    ngOnInit() {
     
        this.personal = this.formDataService.getPersonal();
        this.loadpage(0,100); 
        //this.personal = JSON.parse(sessionStorage.getItem('personal')) || new Personal();
        console.log('Personal feature loaded!' + this.personal);

        this.typesVoyage = [
          {
            id: 0,
            name: 'DIRECT',

          },
          {
            id: 1,
            name: 'R1',
          },
          {
            id: 2,
            name: 'INTERMEDAIRE',
          }
        ];

    }
    loadpage(page, size){
      this.httpVehiculeService.loadPage(page, size).subscribe(x => {
        console.log('ok x resulta '+ JSON.stringify(x));
        
        if (x && x.length) {  
          x.forEach(item => {
              if (item.genre == 'TRACTEUR') {  
                  this.tracteur.push(item);  
              }  
              if (item.genre == 'REMORQUE') {  
                this.remorque.push(item);  
            }  
          });  
      } 
    });
    }

    generatePdf(){
      const documentDefinition = this.getDocumentDefinition();
        this.formDataService.generatePdf(documentDefinition);
     }
    save(form: any): boolean {
        if (!form.valid) {
          console.log('false 1');
            return false;
        }
        this.formDataService.setPersonal(this.personal);

        console.log('data pers in form 1:'+ JSON.stringify (this.formDataService.getPersonal()));
        return true;
    }

    goToNext(form: any) {
        if (this.save(form)) {
          console.log('personnal infos 2: '+ form);


          this.personal = this.formDataService.getPersonal();
          console.log('Personal feature loaded! 2' + this.personal);
        //  this.generatePdf();
          //-------------------------------------------------------------
         // const formDataFile = new FormData();
         // console.log('data file in form 1' + formDataFile);
         // console.log('data file in form 2' +  this.personal.fileimport);
     /*      formDataFile.append('file', this.personal.fileimport);
          this.http.post('file:///C:/Users/Rabat/Desktop/Bureau-moi', formDataFile)
            .subscribe(res => {
              console.log(res);
              alert('SUCCESS !!');
            }); */
            //--------------------------------------------------------------------
            // Navigate to the work page
           // this.router.navigate(['../work']);

       }
    }
    UploadFile(){
      const headers = this.authser.UpFile();
      var formDataOk = new FormData();
      formDataOk.append('name', this.fileU.name);
      formDataOk.append('entityId', '12' );
      formDataOk.append('entityType', 'account');
      formDataOk.append('file', this.fileU);
      formDataOk.append('result', 'example');
      this.http.post('http://localhost:6060/execl/readexecl', formDataOk, { headers: headers })
            .subscribe(res => {
              console.log(res);
              alert('SUCCESS !!');
            });
    }
  /*   fileProgress(fileInput: any) {
      this.fileData = <File>fileInput.target.files[0];
    }
    OnselectedFile(file : FileList){
          this.UploadFile = file.item(0);
          console.log('upload filee deux',this.UploadFile);
          var reader = new FileReader();
          reader.onload = (event : any) =>{
            this.imageurl= event.target.result;
          }
          console.log('url upload filee ',this.imageurl);
          reader.readAsDataURL(this.UploadFile);

      console.log('file import' + event.target.files[0]);
      if(event.target.files.length > 0){
        const fileimport = event.target.files[0];
        this.personal.fileimport = event.target.files[0];
        console.log('personnal infos file 1' +JSON.stringify(fileimport));
        console.log('personnal infos file 2' +JSON.stringify(this.personal.fileimport));
      }
    }
*/
getProfilePicObject() {
  if (this.personal.fileimport) {
    return {
      image: this.personal.fileimport ,
      width: 75,
      alignment : 'right'
    };
  }
  return null;
}

fileChanged(e) {
   this.fileU = e.target.files[0];
  this.getBase64(this.fileU);
}

getBase64(file) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    console.log(reader.result);
    this.personal.fileimport = reader.result as string;
  };
  reader.onerror = (error) => {
    console.log('Error: ', error);
  };
}
getDocumentDefinition() {
  sessionStorage.setItem('personal', JSON.stringify(this.personal));
  return {
    content: [
      {
        text: 'personal',
        bold: true,
        fontSize: 20,
        alignment: 'center',
        margin: [0, 0, 0, 20]
      },
      {
        columns: [
          [{
            text: this.personal.lastName,
            style: 'name'
          },
          {
            text: this.personal.typeMarchandises
          },
          {
            text: 'Email : ' + this.personal.email,
          },
          {
            text: 'Contant No : ' + this.personal.firstName,
          },
          {
            text: 'GitHub: ' + this.personal.firstName,
            link: this.personal.firstName,
            color: 'blue',
          }
          ],
          [
            this.getProfilePicObject()
          ]
        ]
      },
    ],
    info: {
      title: this.personal.firstName+ '_RESUME',
      author: this.personal.firstName,
      subject: 'RESUME',
      keywords: 'RESUME, ONLINE RESUME',
    },
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 20, 0, 10],
          decoration: 'underline'
        },
        name: {
          fontSize: 16,
          bold: true
        },
        jobTitle: {
          fontSize: 14,
          bold: true,
          italics: true
        },
        sign: {
          margin: [0, 50, 0, 10],
          alignment: 'right',
          italics: true
        },
        tableHeader: {
          bold: true,
        }
      }
  };
}


}
