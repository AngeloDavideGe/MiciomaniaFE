import {
  AfterViewInit,
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import {
  RecordStruttura,
  RecordStrutturaMultiForm,
  StrutturaMultiForm,
} from '../../interfaces/form.interface';
import { FormCustomComponent } from '../form/form.component';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-multi-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormCustomComponent, NgStyle],
  templateUrl: './multi-form.component.html',
  styleUrl: './multi-form.component.scss',
})
export class MultiFormComponent implements OnInit, AfterViewInit, OnDestroy {
  private formBuilder = inject(FormBuilder);

  public form!: FormGroup;
  public keys: string[] = [];
  public selectedForm = signal<string>('');
  private destroy$ = new Subject<void>();

  @Input() strutturaForm!: RecordStrutturaMultiForm;
  @Input() visualizzaPulsanti: boolean = true;

  @Output() invioDati = new EventEmitter<any>();
  @Output() subscribeForm = new EventEmitter<any>();
  @Output() formValido = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.keys = Object.keys(this.strutturaForm);
    const groupConfig: Record<string, FormGroup | FormArray> = {};

    this.keys.forEach((key: string) => {
      const sezione: StrutturaMultiForm = this.strutturaForm[key];

      if (sezione.tipo === 'array') {
        const array = new FormArray<FormGroup>([]);

        if (sezione.initialArray && sezione.initialArray.length > 0) {
          sezione.initialArray.forEach((item) => {
            array.push(this.createFormGroup(sezione.struttura, item));
          });
        } else {
          array.push(this.createFormGroup(sezione.struttura));
        }

        groupConfig[key] = array;
      } else {
        groupConfig[key] = this.createFormGroup(sezione.struttura);
      }
    });

    this.form = this.formBuilder.group(groupConfig);

    this.form.statusChanges
      .pipe(takeUntil(this.destroy$), debounceTime(10))
      .subscribe(() => {
        this.formValido.emit(this.form.valid);
        this.subscribeForm.emit(this.form.value);
      });
  }

  ngAfterViewInit(): void {
    this.formValido.emit(this.form.valid);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private createFormGroup(
    struttura: RecordStruttura,
    values?: Record<string, any>,
  ): FormGroup {
    const controls: Record<string, any> = {};

    Object.entries(struttura).forEach(([key, field]) => {
      controls[key] = [
        values?.[key] ?? field.valueInit ?? '',
        field.validators ?? [],
      ];
    });

    return this.formBuilder.group(controls);
  }

  public getFormGroup(nomeSezione: string): FormGroup {
    return this.form.get(nomeSezione) as FormGroup;
  }

  public getFormArray(nomeSezione: string): FormArray {
    return this.form.get(nomeSezione) as FormArray;
  }

  public getArrayFormGroup(nomeSezione: string, index: number): FormGroup {
    return this.getFormArray(nomeSezione).at(index) as FormGroup;
  }

  public isArraySection(nomeSezione: string): boolean {
    return this.strutturaForm[nomeSezione].tipo === 'array';
  }

  public addArrayItem(nomeSezione: string, values?: Record<string, any>): void {
    const struttura = this.strutturaForm[nomeSezione].struttura;

    this.getFormArray(nomeSezione).push(
      this.createFormGroup(struttura, values),
    );
  }

  public removeArrayItem(nomeSezione: string, index: number): void {
    this.getFormArray(nomeSezione).removeAt(index);
  }

  public onSectionFormChange(section: string, value: any): void {
    const control = this.form.get(section);

    if (control instanceof FormGroup) {
      control.patchValue(value);
    }
  }

  public onSubmit(): void {
    if (this.form.valid) {
      this.invioDati.emit(this.form.value);
    }
  }

  public changeOpenForm(form: string): void {
    this.selectedForm.update((x: string) => (x == form ? '' : form));
  }
}
