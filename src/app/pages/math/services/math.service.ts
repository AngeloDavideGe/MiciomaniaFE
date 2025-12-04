import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { DataOperations, SimboliBase } from '../interfaces/math.interface';

@Injectable({
  providedIn: 'root',
})
export class MathService {
  private apiUrl = 'http://localhost:5000/api/math/';
  public supportedOperations: string[] = [];
  public simboliBase: SimboliBase | null = null;
  public simboliSpeciali: Record<string, string[]> = {};

  constructor(private http: HttpClient) {
    this.http
      .get<DataOperations>(this.apiUrl + 'supported-operations')
      .pipe(take(1))
      .subscribe({
        next: (val: DataOperations) => {
          console.log(val);
          this.supportedOperations = val.operazioni;
          this.simboliBase = val.simboliBase;
          this.simboliSpeciali = val.simboliSpeciali;
        },
      });
  }

  getSupportedOperations() {
    return this.http.get(this.apiUrl + 'supported-operations');
  }

  solveMath(expression: string) {
    const requestBody = {
      expression: expression,
    };

    return this.http.post(this.apiUrl, requestBody);
  }
}
