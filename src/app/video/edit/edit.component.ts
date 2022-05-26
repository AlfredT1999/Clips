import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import IClip from 'src/app/models/clip.model';
import { ClipService } from 'src/app/services/clip.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {
  @Input() activeClip: IClip | null = null
  @Output() update = new EventEmitter()
  showAlert = false
  alertColor = 'blue'
  alertMsg = 'Please wait! Updating clip.'
  inSubmission = false

   // FormControls:
   clipID = new FormControl('')
   title = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ])

  // FromGroup:
  editForm = new FormGroup({
    id: this.clipID,
    title: this.title
  })

  constructor(private modal: ModalService, private clipService: ClipService) { }

  ngOnInit(): void {
    this.modal.register('editClip')
  }

  ngOnDestroy(): void {
    this.modal.unregister('editClip')
  }

  ngOnChanges(): void {
    if(!this.activeClip) return

    this.clipID.setValue(this.activeClip.docID)
    this.title.setValue(this.activeClip.title)
    this.showAlert = false
    this.inSubmission = false
  }

  async submit() {
    if(!this.activeClip) return

    this.showAlert = true
    this.alertColor = 'blue'
    this.alertMsg = 'Please wait! Updating clip.'
    this.inSubmission = true

    try {
      await this.clipService.updateClip(this.clipID.value, this.title.value)  
    } 
    catch (error) {
      console.error(error)

      this.inSubmission = false
      this.alertColor = 'red'
      this.alertMsg = 'Something went wrong!'

      return
    }

    this.activeClip.title = this.title.value
    this.update.emit(this.activeClip)

    this.alertColor = 'green'
    this.alertMsg = 'Success!'
    this.inSubmission = false
  }
}
