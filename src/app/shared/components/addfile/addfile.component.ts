import { Component, OnInit, Input } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UploadfileService } from '../../Sgestionnaire/uploadfile.service';
import { FileUpload } from 'src/app/gestions/operations/operation-add/data/formData.model';

@Component({
  selector: 'app-addfile',
  templateUrl: './addfile.component.html',
  styleUrls: ['./addfile.component.css']
})
export class AddfileComponent implements OnInit {
  @Input() operation: any;

  fileInfoDTO : any = new FileUpload();
  selectedFiles: FileList;
  progressInfos = [];
  message = '';
  previewUrl:any = null;

  fileInfos: Observable<any>;
  constructor(private uploadService: UploadfileService) { }

  ngOnInit() {
    this.fileInfos = this.uploadService.getFilesBYID(this.operation);
    console.log('123 ----get files all pour operation',this.fileInfos);

  }
  preview(file) {
    // Show preview 
    console.log('selected les files in upload==+++++++',file);
    var mimeType = file.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
 
    var reader = new FileReader();      
    reader.readAsDataURL(file); 
    reader.onload = (_event) => { 
      this.previewUrl = reader.result; 
    }
}
  selectFiles(event) {
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
    console.log('selected file in upload====', this.selectedFiles);
  }

  upload(idx, file) {
    this.fileInfoDTO.entityId = this.operation;
    this.fileInfoDTO.name = file.name;
    this.fileInfoDTO.size = file.size;
    this.fileInfoDTO.extention = file.type;

    this.progressInfos[idx] = { value: 0, fileName: file.name };

    console.log('file ++++--------------------- ++++++++++++++', file+ file.size+ file.type);
    this.uploadService.upload(this.fileInfoDTO, file).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.fileInfos = this.uploadService.getFilesBYID(this.fileInfoDTO.entityId);
          console.log('1 ----get files all operation',this.fileInfos);
        }
      },
      err => {
        this.progressInfos[idx].value = 0;
        this.message = 'Could not upload the file:' + file.name;
      });
  }

  uploadFiles() {
    this.message = '';

    for (let i = 0; i < this.selectedFiles.length; i++) {
      console.log('iteration d upload'+ i + this.selectedFiles[i]);
      this.upload(i, this.selectedFiles[i]);
      //this.preview(this.selectedFiles[i]);
    }
  }
}
