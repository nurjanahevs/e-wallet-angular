import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topup',
  templateUrl: './topup.component.html',
  styleUrls: ['./topup.component.scss'],
})
export class TopupComponent implements OnInit {
  topUpAdds = new FormControl('');
  balance: any;

  topUp: any;
  balanceData: any;

  customerId: any;

  constructor(private router: Router, private http: HttpClient) {}
  

  ngOnInit(): void {
    this.customerId = localStorage.getItem('userId');
    this.balance = localStorage.getItem('balance');
  }

  onSubmit(user: any) {
    return this.http
      .put<any>(`http://localhost:8001/api/topup/${this.customerId}`, user)
      .subscribe((data: any) => {
        this.balanceData = parseInt(this.topUp) + parseInt(this.balance);
        console.log(this.topUpAdds.value, 'ini jumlah topUp');
        console.log(data);
        this.router.navigate(['/profile']);
      });
  }
}
