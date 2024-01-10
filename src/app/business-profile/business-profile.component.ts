import { Component, Renderer2 } from '@angular/core';
import { Business } from '../@core/entity/business';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BusinessService } from '../@core/services/business.service';
import { LoginService } from '../@core/services/login.service';

@Component({
  selector: 'app-business-profile',
  templateUrl: './business-profile.component.html',
  styleUrl: './business-profile.component.scss'
})
export class BusinessProfileComponent {
  presentAuthRole = window.localStorage.getItem("user-role");
  presetUserId = window.localStorage.getItem("user-id");
  year = (new Date().getFullYear());
  business: Business = {
    name: '',
    email: '',
    phoneNumber: 0,
    address: '',
    description: '',
    type: ''
  };
  profileForm: FormGroup;


  constructor(private renderer: Renderer2, 
    private formBuilder: FormBuilder, 
    private loginService: LoginService,
    private businessService: BusinessService) { }

  ngOnInit(): void {

    const preloaderElement = document.getElementById('preloader');

    if (preloaderElement) {
      this.renderer.removeClass(preloaderElement, 'd-none')
    }
    setTimeout(() => {
      this.renderer.addClass(preloaderElement, 'd-none');
    }, 1000);

    this.profileForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(8)]],
      type: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(12)]]
    });

    // get business data from API and store in browser some values
    this.businessService.findById(Number(this.presetUserId)).subscribe(data => {
      console.log(data);
      this.business.email = data.business.email;
      this.business.name = data.business.name;
      this.business.phoneNumber = data.business.phoneNumber;
      this.business.address = data.business.address; 
      this.business.description = data.business.description;
      this.business.type = data.business.type;
    });

  }

  //togglemenu
  toggleMenu() {
    document.getElementById('navbarSupportedContent')!.classList.toggle('show')
  }

  topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  handleLogout() {
    this.loginService.logout();
  }

  onSubmit() {
    if (this.profileForm.valid) {
      // Process form data (e.g., send to backend)
      console.log(this.profileForm.value);
      this.business.name = this.profileForm.controls['name'].value;
      this.business.address = this.profileForm.controls['address'].value;
      this.business.phoneNumber = this.profileForm.controls['phoneNumber'].value;
      this.business.type = this.profileForm.controls['type'].value;
      this.business.description = this.profileForm.controls['description'].value;
      this.businessService.update(Number(this.presetUserId), this.business).subscribe();

    } else {
      // Handle form validation errors
      console.log('Form is invalid');
    }
  }

}
