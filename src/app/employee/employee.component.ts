import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Employee } from './employee';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})

export class EmployeeComponent implements OnInit {
  employee$!: Observable<Employee | null>;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const empId = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchEmployee(empId);
  }

  fetchEmployee(empId: number): void {
    this.employee$ = this.http.get<Employee>(`https://api.sampleapis.com/futurama/characters/${empId}`).pipe(
      catchError(error => {
        console.error('Error fetching employee:', error);
        return of(null);
      })
    );

    this.employee$.subscribe(employee => {
      if (employee) {
        this.updateSayingValues(employee.sayings, 3);
      }
    });
  }

  sayingValues: string[] = [];
  updateSayingValues(sayingsObj: { [key: number]: string }, numOfSayings: number): void {
    this.sayingValues = this.getSayingValues(sayingsObj, numOfSayings);
    this.cdr.detectChanges();
  }

  getSayingValues(sayingsObj: { [key: number]: string }, numOfSayings: number): string[] {
    const sayingsArr: string[] = [];
    const objLen: number = Object.keys(sayingsObj).length;
    const randomNumbers = this.generateRandomNumbers(numOfSayings, objLen);
    randomNumbers.forEach(n => {
      sayingsArr.push(sayingsObj[n]);
    });
    return sayingsArr;
  }

  generateRandomNumbers(num: number, arrlen: number): number[] {
    const min = 0;
    const max = arrlen - 1;
    const numberOfNumbersToGenerate = num;
    const randomNumbers: number[] = [];
    while (randomNumbers.length < numberOfNumbersToGenerate) {
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      if (!randomNumbers.includes(randomNumber)) randomNumbers.push(randomNumber);
    }
    return randomNumbers;
  }
}
