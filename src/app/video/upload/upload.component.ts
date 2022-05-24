import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  isDragover = false
  file: File | null = null
  nextStep = false
  
  // FormControls:
  title = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ])

  // FromGroup:
  uploadForm = new FormGroup({
    title: this.title
  })

  constructor() { }

  ngOnInit(): void {
  }

  storeFile($event: Event) {
    this.isDragover = false
    this.file = ($event as DragEvent).dataTransfer?.files.item(0) ?? null // If it gets undefined then the ?? operator return null

    if(!this.file || this.file.type !== 'video/mp4') return

    console.log(this.file)
    this.title.setValue(
      this.file.name.replace(/\.[^/.]+$/, '')
    )
    this.nextStep = true
  }

  uploadFile() {
    console.log('file upload')
  }
}
