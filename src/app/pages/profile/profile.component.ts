import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  customerIdStorages: any;
  dataCustomer: any;
  customerUse: any;
  customerName: any;
  balance: any;
  customers: any;
  detailnya: any;
  identityNumb: any;

  alret = false;
  user: any;

  myDate = new Date();

  constructor(
    private userService: UserService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.myDate = new Date();
  }

  ngOnInit(): void {
    // this.getCustomers({});
    this.customerIdStorages = localStorage.getItem('userId');
    this.customerName = localStorage.getItem('userName');
    this.balance = localStorage.getItem('balance');
    this.identityNumb = localStorage.getItem('identityNumb');
    console.log(this.balance, 'ini balance');
  }

  getCustomers(data: any) {
    this.userService.getAllCustomers(data).subscribe((res) => {
      console.log(res, 'ini console all customers');
      this.customers = res;
    });
  }

  logout() {
    let timerInterval: any;
    Swal.fire({
      title: 'Log Out Process!',
      html: 'your account automatically logged out',
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
          title: 'Log Out Success!',
          html: 'your account is now logged out',
        });
      }
    });
    setTimeout(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('userName');
      localStorage.removeItem('balance');
      localStorage.removeItem('identityNumb');
      this.alret = true;
      this.router.navigate([``]);
    }, 4000);
  }
}
