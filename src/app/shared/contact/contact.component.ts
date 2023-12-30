import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  contactForm!: UntypedFormGroup;
  errormessage: any = " Please enter a name*";

  constructor(private formBuilder: UntypedFormBuilder) { }

  ngOnInit() {

    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      comments: ['', [Validators.required]]
    });

  }

  ValidateFrom() {
    var name = this.contactForm.get("name")!.value;
    var email = this.contactForm.get("email")!.value;
    var subject = this.contactForm.get("subject")!.value;
    var comments = this.contactForm.get("comments")!.value;
    if (name == "" || name == null) {
      document.getElementById('error-msg')!.innerHTML = "<div class='alert alert-danger error_message'><i data-feather='home' class='icon-sm align-middle me-2'></i>*Please enter a name*</div>";
      return false;
    }
    if (email == "" || email == null) {
      document.getElementById('error-msg')!.innerHTML = "<div class='alert alert-danger error_message'><i data-feather='home' class='icon-sm align-middle me-2'></i>*Please enter a email*</div>";
      return false;
    }
    if (subject == "" || subject == null) {
      document.getElementById('error-msg')!.innerHTML = "<div class='alert alert-danger error_message'><i data-feather='home' class='icon-sm align-middle me-2'></i>*Please enter a subject*</div>";
      return false;
    }
    if (comments == "" || comments == null) {
      document.getElementById('error-msg')!.innerHTML = "<div class='alert alert-danger error_message'><i data-feather='home' class='icon-sm align-middle me-2'></i>*Please enter a comments*</div>";
      return false;
    }
    return true
  }

  sendMsg() {
    if (this.ValidateFrom()) {
      document.getElementById('error-msg')!.innerHTML =""
    }
  }
}