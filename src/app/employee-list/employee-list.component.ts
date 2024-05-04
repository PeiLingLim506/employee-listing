import { Component, OnInit, Input } from '@angular/core';
import { Employee } from '../employee/employee';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})

export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  @Input() selectedGender: string = 'All';
  selectedSpecies: { [key: string]: boolean } = {};
  searchText: string = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees(): void {
    this.http.get<Employee[]>('https://api.sampleapis.com/futurama/characters').subscribe(
      (data) => {
        this.employees = data;
      },
      (error) => {
        console.error('Error fetching employees data:', error);
      }
    );
  }

  navigateToEmployeeDetails(empId: number): void {
    this.router.navigate(['/employee', empId]);
  }

  get filteredEmployees(): Employee[] {
    let filteredList = this.selectedGender === 'All' ? this.employees : this.employees.filter(employee => employee.gender === this.selectedGender);

    if (this.searchText.trim() !== '') {
      filteredList = filteredList.filter(employee => (employee.name.first + ' ' + employee.name.last).toLowerCase().includes(this.searchText.toLowerCase()));
    }

    return filteredList;
  }

  onSpeciesSelectionChange(selectedSpecies: { [key: string]: boolean }): void {
    this.selectedSpecies = selectedSpecies;
  }
}