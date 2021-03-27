import { Component, OnInit } from '@angular/core';
import { IEmployee } from './employee';
import { EmployeeService } from './employee.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  public employeesList : IEmployee[];
  public errorMessage : string;
  public closeResult = '';
  public currentEmployee: IEmployee;
  public newEmployee : IEmployee = {id: -1, name: "" ,email :"" ,phone:"" ,imageUrl:"" ,title:""};

  constructor(private employeeService : EmployeeService , private modalService: NgbModal) { }

  ngOnInit() {
    this.getEmployees();
 
  }


  public getEmployees() : void {
    this.employeeService.getEmployee().subscribe({
      next: employees => this.employeesList = employees,
      error: err => this.errorMessage = err
    });
  }

  public saveEmployee(newEmployee: IEmployee): void{
    this.employeeService.addEmployee(newEmployee).subscribe({
      next : data => console.log("Employee added successfully with data " + data),
      error: err => this.errorMessage = err
    });
  }



  public addNewEmployeePopup(){
    this.saveEmployee(this.newEmployee);
    this.modalService.dismissAll();
  }

  public editCurrentEmployeePopup(){
    this.employeeService.updateEmployee(this.currentEmployee).subscribe({
      next : data => console.log("Employee updated successfully with data " + data),
      error: err => this.errorMessage = err
    });
    this.getEmployees();
    this.modalService.dismissAll();
  }

  public deleteCurrentEmployeePopup(){
    this.employeeService.deleteEmployee(this.currentEmployee.id).subscribe({
      next : data => console.log("Employee deleted successfully with data " + data),
      error: err => this.errorMessage = err
    });
    this.getEmployees();
    this.modalService.dismissAll();
  }

  open(content,mode,obj) {
    if(mode == 'edit' || mode == 'delete'){
      this.currentEmployee=obj;
    }
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
