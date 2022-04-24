import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  alret = false;
  customers: any;
  getDataId: any;
  getdata: any;
  getDataUser:any;  

  auth2: any;

  @ViewChild('loginRef', {static: true }) loginElement!: ElementRef;


  public loading = false;
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getDataId = this.route.snapshot.paramMap.get('id');
    console.log(this.getDataId);
    this.getCustomers({});
  }

  getCustomers(data: any) {
    this.userService.getAllCustomers(data).subscribe((res) => {
      console.log(res);
      this.customers = res;
      console.log(this.customers,'console customers')
    })
  }

  onSubmit() {
    console.log(this.loginForm.value);
    this.userService.login(this.loginForm.value).subscribe((result) => {
      console.log('result', result);
      console.log(result.data.name,'ini nama customer')
      let timerInterval : any;
      Swal.fire({
        title: 'Login Process!',
        html: 'your account automatically logged in',
        timer: 3000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          timerInterval = setInterval(() => {
            Swal.getTimerLeft();
          }, 5000);
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
        Swal.fire({
          title: 'Login Success!',
          html: 'your account is now logged in',
        });
        }
      });
    });
  }

  loginbyemail() {
    this.loading = true;
    setTimeout(() => {
      this.userService.login(this.loginForm.value).subscribe((data) => {
        this.loading = false;
        this.getdata = data;
        console.log(this.getdata,'ini console get data');
        localStorage.setItem('token', this.getdata.AccessToken);
        localStorage.setItem('userId', this.getdata.data._id);
        localStorage.setItem('userName', this.getdata.data.name);
        localStorage.setItem('balance', this.getdata.data.balance);
        localStorage.setItem('identityNumb', this.getdata.data.identityNumb);
        this.router.navigate([`/profile`]);
        Swal.fire({
          title: 'Login!',
          html: 'Login Success',
        });
      },
      (error) => {
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: ' email atau password belum terdaftar',
          text: 'ada yang salah!',
          footer: '<a href="">Why do I have this issue?</a>',
        });
      }
    );
  }, 500);
  }

}
