import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';


@Component({
  selector: 'app-drag-drop',
  template: `
  <div class="center">
    <ngx-file-drop dropZoneLabel="Drop files here" (onFileDrop)="dropped($event)" [multiple]="isMultiple">

        <ng-template ngx-file-drop-content-tmp let-openFileSelector="openFileSelector">
            <span>Drag and Drop.</span>
            <button type="button" class="btn btn-Grade" (click)="openFileSelector()">Browse Files</button>
        </ng-template>
    </ngx-file-drop>
    <div class="upload-table">
        <table class="table">
            <thead>
                <tr *ngIf="images?.length">
                    <th>Image</th>
                    <th>Name</th>
                    <th>Size</th>
                    <!-- <th>Action</th> -->
                </tr>
            </thead>
            <tbody class="upload-name-style">
                <tr *ngFor="let item of images; let i=index">
                    <td> <img src="{{item.url}}" style="width: 50px; height: 50px"></td>
                    <td><strong>{{ item.name }}</strong></td>
                    <td><strong>{{ item.size }}</strong></td>
                    <!-- <td><button type="button" (click)="remove(i)">remove </button></td> -->
                </tr>
            </tbody>
        </table>
        <!-- <button *ngIf="images.length" type="button" class="btn btn-Grade" (click)="upload()">upload</button> -->
    </div>
</div>
`,
  styleUrls: ['./drag-drop.component.css']
})


export class DragDropComponent implements OnInit {
  files: NgxFileDropEntry[] = [];
  imageUrl = ""
  imageSize: string = ''
  multiple: Boolean = false;
  @Input() isMultiple: Boolean = false;
  imageDetail: any = {
    name: '',
    size: '',
    url: ''

  }
  imagesResponse: any[] = []
  images: any[] = []
  @Output() onSelection: EventEmitter<any[]> = new EventEmitter();
  @Output() onUpload: EventEmitter<any[]> = new EventEmitter();
  constructor() { }

  imageSizeCalculater(bytes, decimals) {

    if (bytes === 0 || bytes == undefined || bytes == null) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  dropped = async (files: NgxFileDropEntry[]) => {
    this.files = files;

    files.forEach(droppedFile => {
      this.imagesResponse = []
      this.images = []
      // Is it a file?
      let imageUrl
      if (droppedFile.fileEntry.isFile) {
        var fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file(async (file: File) => {
          imageUrl = await this.handleUpload(file)
          this.imageSize = this.imageSizeCalculater(file.size, 2)
          if (imageUrl != "" && imageUrl != undefined) {
            let imageDetail = {
              name: file.name,
              size: this.imageSize,
              url: imageUrl
            }
            this.imageDetail.name = file.name
            this.imageDetail.size = this.imageSize
            this.imagesResponse.push(file)
            this.images.push(imageDetail)
            this.imageUrl = ""
          }
          if (this.files.length == this.images.length)
            this.onSelection.emit(this.imagesResponse);

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;

      }
    })
  }
  readUploadedFile = (inputFile) => {
    const temporaryFileReader = new FileReader();

    return new Promise((resolve, reject) => {
      temporaryFileReader.onerror = () => {
        temporaryFileReader.abort();
        console.log("Problem parsing input file.")
      };

      temporaryFileReader.onload = () => {
        resolve(temporaryFileReader.result);
      };
      temporaryFileReader.readAsDataURL(inputFile);
    });
  };

  handleUpload = async (file) => {
    let fileContents = await this.readUploadedFile(file)
    return fileContents
  }

  remove(index) {
    this.images.splice(index, 1);
    this.onSelection.emit(this.images);

  }
  // upload() {
  //   this.onUpload.emit(this.imagesResponse);
  // }




  ngOnInit() {
  }

}
