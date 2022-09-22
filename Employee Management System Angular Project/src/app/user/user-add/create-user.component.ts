import { UserService } from '../services/user.service';
import { StateService } from '../../state/services/state.service';
import { DepartmentService } from '../../department/services/department.service';

import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../services/user';
import { Department } from '../../department/services/department';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  user: User = new User();
  department: Department = new Department();

  submitted = false;
  isUpdate = false;

  constructor(
    private stateService: StateService,
  
    private departmentService: DepartmentService,

    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.isUpdate = true;
      this.getUser(id);
    } else {
      this.user.user_department = "0";
      this.user.user_sal = "0";
      this.user.user_state = "0";
      this.user.user_country = "0";
    }
   
    this.getDepartmentOption();
  }

  getUser(id): void {
    this.userService.getUser(id).subscribe(
      data => {
        console.log(data);
        this.user = data;
      },
      err => {
        console.log(err);
      }
    );

  }
 
  getDepartmentOption(): void {
    this.departmentService.getDepartmentsList().subscribe(
      data => {
        console.log(data);
        this.department = data;
      },
      err => {
        console.log(err);
      }
    );
  }
  
  newUser(): void {
    this.submitted = false;
    this.user = new User();
  }

  save() {
    console.log(this.user);
    this.userService.createUser(this.user).subscribe(
      data => {
        console.log(data);
        // this.isSuccessful = true;
        // this.isSignUpFailed = false;
        this.router.navigate(['/users']);
      },
      err => {
        // this.errorMessage = err.error.message;
        // this.isSignUpFailed = true;
      }
    );
  }

  onSubmit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.updateUser();
    } else {
      this.submitted = true;
      this.save();
    }
    
  }

  updateUser(): void {
    console.log(this.user);
    this.userService.updateUser(this.user.user_id, this.user).subscribe(
      data => {
        console.log(data);
        // this.isSuccessful = true;
        // this.isSignUpFailed = false;
        this.router.navigate(['/users']);
      },
      err => {
        // this.errorMessage = err.error.message;
        // this.isSignUpFailed = true;
      }
    );
  }
}
