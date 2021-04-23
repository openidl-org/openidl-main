// SPDX-License-Identifier: Apache-2.0
import { Component, OnInit, Input, HostListener, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { AuthService } from '../../services/auth.service';
import { MESSAGE } from './../../../../src/assets/messageBundle';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() title;
  @Input() message;
  @Input() type;
  @Input() data;
  @Input() isData;
  @Input() isSessionExpired;
  // @Input() isopen;
  @Output() modalClose = new EventEmitter();
  @Output() forumData: any = new EventEmitter();
  @Output() redirectLogin = new EventEmitter();
  @Output() deliveryDate = new EventEmitter();
  @Output() deleteData = new EventEmitter();
  @Output() confirmation = new EventEmitter();
  @ViewChild('template') template: ElementRef;
  @ViewChild('forumtemplate') forumtemplate: ElementRef;
  @ViewChild('datetemplate') datetemplate: ElementRef;
  @ViewChild('deleteDataTemplate') deleteDataTemplate: ElementRef;
  @ViewChild('confirmationTemplate') confirmationTemplate: ElementRef;
  @ViewChild('patternTemplate') patternTemplate: ElementRef;
  @ViewChild('showPatternDetailsTemplate') showPatternDetailsTemplate: ElementRef;

  patternMessage = MESSAGE.EXTRACTION_PATTERN_MESSAGE.message;

  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };
  pattern: any;
  selectedAll: any;
  patternDetails: any;
  isDownloadBtnDisabled: boolean = true;

  constructor(private modalService: BsModalService,
    private authService: AuthService) {
  }

  ngOnInit() {

  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    const isModalOpen = sessionStorage.getItem('isModalOpen');
    if (isModalOpen) {
      console.log('modal closed by esc key');
      this.modalClose.emit();
    }
  }

  openModal(title, message, type) {
    // TODO: Check if any modal is already opened
    const isModalOpen = sessionStorage.getItem('isModalOpen');
    this.title = title;
    this.message = message;
    this.type = type;
    // TODO: If one modal is open then do not show another modal
    if (isModalOpen !== 'true') {
      this.modalRef = this.modalService.show(this.template, this.config);
      sessionStorage.setItem('isModalOpen', 'true');
    } else {
    }
  }

  openPattern(pattern, type) {
    // TODO: Check if any modal is already opened
    const isModalOpen = sessionStorage.getItem('isModalOpen');
    // TODO: If one modal is open then do not show another modal
    if (isModalOpen !== 'true') {
      console.log('pattern is');
      console.log(pattern);
      this.type = type;
      this.pattern = [];
      this.pattern = pattern;
      this.modalRef = this.modalService.show(this.patternTemplate, this.config);
      sessionStorage.setItem('isModalOpen', 'true');
    } else {
    }
  }

  openPatternDetails(data, type) {
    // TODO: Check if any modal is already opened
    const isModalOpen = sessionStorage.getItem('isModalOpen');
    // TODO: If one modal is open then do not show another modal
    if (isModalOpen !== 'true') {
      // console.log('openPatternDetails response ', data);
      this.type = type;
      data[0].selected = true;
      this.patternDetails = data;
      // console.log("this.patternDetails :- ", this.patternDetails);
      this.modalRef = this.modalService.show(this.showPatternDetailsTemplate, this.config);
      sessionStorage.setItem('isModalOpen', 'true');
    } else {
    }
  }

  openInfoModal(title, message, type, data, isData) {
    this.data = data;
    this.isData = isData;
    console.log(data);
    this.openModal(title, message, type);
  }

  openForumModal(title, message, type, data, isData) {
    this.title = title;
    this.message = message;
    this.type = type;
    this.data = data;
    this.modalRef = this.modalService.show(this.forumtemplate, this.config);
  }

  openDeleteDataModal(title, message, type) {
    this.title = title;
    this.message = message;
    this.type = type;
    this.modalRef = this.modalService.show(this.deleteDataTemplate, this.config);
  }

  openConfirmationModal(title, message, type) {
    this.title = title;
    this.message = message;
    this.type = type;
    this.modalRef = this.modalService.show(this.confirmationTemplate, this.config);
  }

  openDeliveryModal(title, message, type, data) {
    this.title = title;
    this.message = message;
    this.type = type;
    this.data = data;
    this.modalRef = this.modalService.show(this.datetemplate, this.config);
  }

  updateDelivery() {
    this.modalRef.hide();
    this.deliveryDate.emit(this.data);
  }

  updateForum() {
    this.modalRef.hide();
    this.forumData.emit(this.data);
  }

  confirmDelete() {
    this.modalRef.hide();
    this.deleteData.emit();
  }

  confirm() {
    this.modalRef.hide();
    this.confirmation.emit();
  }

  openSessionModal(title, message, type, isSessionExpired) {
    this.isSessionExpired = isSessionExpired;
    this.openModal(title, message, type);
  }

  close() {
    // TODO: Remove opened modal from session storage
    sessionStorage.removeItem('isModalOpen');
    if (this.isData) {
      this.isData = false;
    }
    this.modalRef.hide();
    this.modalClose.emit();
  }

  redirectToLogin() {
    this.modalRef.hide();
    this.authService.logout('login')
      .subscribe(resp => {
        console.log(resp);
      }, err => {
        console.log(err);
      });
    // this.redirectLogin.emit();
  }
  // common code to handle error notification
  handleNotification(error, messageBundle, locale) {
    console.log('in handleNotification >> ' + messageBundle.message);

    if (error === 'Unauthorized') {
      this.type = MESSAGE.ACTIVITY_FAIL.Unauthorized.type;
      this.message = MESSAGE.ACTIVITY_FAIL.Unauthorized.message;
      this.title = MESSAGE.ACTIVITY_FAIL.Unauthorized.title;
      setTimeout(() => {
        this.openSessionModal(this.title, this.message, this.type, true);
      }, 100);
    } else {
      this.type = messageBundle.type;
      this.message = messageBundle.message;
      this.title = messageBundle.title;
      setTimeout(() => {
        this.openModal(this.title, this.message, this.type);
      }, 100);
    }
  }

  selectAll() {
    this.selectedAll = !this.selectedAll;
    this.isDownloadBtnDisabled = !this.selectedAll;
    for (var i = 0; i < this.pattern.length; i++) {
      this.pattern[i].selected = this.selectedAll;
    }

    console.log("selectAll() ", this.pattern, this.isDownloadBtnDisabled);
  }

  checkIfAllSelected(index) {
    this.pattern[index].selected = !this.pattern[index].selected;
    var totalSelected = 0;

    for (var i = 0; i < this.pattern.length; i++) {
      if (this.pattern[i].selected) {
        totalSelected++;
        this.isDownloadBtnDisabled = false;
      }
    }

    if (totalSelected === this.pattern.length) {
      this.selectedAll = true;
      this.isDownloadBtnDisabled = false;
    }
    else this.selectedAll = false;

    console.log(this.pattern, totalSelected)
    if (totalSelected == 0) this.isDownloadBtnDisabled = true;

    return true;
  }
}
