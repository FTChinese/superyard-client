import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/data/schema/staff';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { StaffService } from 'src/app/data/service/staff.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {

  profile: Profile = {
    id: 'stf_YlrPE6HJLkKp',
    userName: 'weiguo.ni',
    email: 'weiguo.ni@ftchinese.com',
    isActive: true,
    displayName: null,
    department: 'tech',
    groupMembers: 8,
    createdAt: '2012-02-29T07:39:12Z',
    deactiveatedAt: null,
    updatedAt: null,
    lastLoginAt: null,
    lastLoginIp: null,
  };

  constructor(
    private staffService: StaffService,
  ) { }

  ngOnInit(): void {
    this.staffService.loadProfile().subscribe({
      next: profile => {
        this.profile = profile;
      },
      error: err => {
        console.log(err);
      },
    });
  }
}
