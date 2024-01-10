import { Component, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../@core/services/login.service';
import { User } from '../@core/entity/user';
import { UserService } from '../@core/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  presetUserId = window.localStorage.getItem("user-id");
  year = (new Date().getFullYear());
  user: User = {
    fullName: '',
    email: '',
    dob: undefined,
    mobileNumber: 0,
    address: '',
    active: false
  };
  profileForm: FormGroup;
  userDOB: string;


  constructor(private renderer: Renderer2, 
    private formBuilder: FormBuilder, 
    private userService: UserService,
    private loginService: LoginService) { }

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
      mobileNumber: ['', [Validators.required, Validators.minLength(8)]]
    });

    // get user data from API and store in browser some values
    this.userService.findById(Number(this.presetUserId)).subscribe(data => {
      console.log(data);
      this.user.email = data.finalUser.email;
      this.user.fullName = data.finalUser.fullName;
      this.user.mobileNumber = data.finalUser.mobileNumber;
      this.user.address = data.finalUser.address; 
      this.user.dob = data.finalUser.dob;
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
      this.user.fullName = this.profileForm.controls['name'].value;
      this.user.address = this.profileForm.controls['address'].value;
      this.user.mobileNumber = this.profileForm.controls['mobileNumber'].value;
      this.userService.update(Number(this.presetUserId), this.user).subscribe();

    } else {
      // Handle form validation errors
      console.log('Form is invalid');
    }
  }

}
