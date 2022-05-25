import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { v4 as uuid } from 'uuid'

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  isDragover = false
  file: File | null = null
  nextStep = false
  showAlert = false
  alertColor = 'blue'
  alertMsg = 'Please wait! Your clip is beign uploaded.'
  inSubmission = false
  
  // FormControls:
  title = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ])

  // FromGroup:
  uploadForm = new FormGroup({
    title: this.title
  })

  constructor(private storage: AngularFireStorage) { }

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
    this.showAlert = true
    this.alertColor = 'blue'
    this.alertMsg = 'Please wait! Your clip is beign uploaded.'
    this.inSubmission = true
    
    const clipFileName = uuid()
    const clipPath = `clips/${clipFileName}.mp4`

    this.storage.upload(clipPath, this.file)
  }
}
