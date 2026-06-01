import {
  AfterViewInit,
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  RecordStruttura,
  RecordStrutturaMultiForm,
  StrutturaForm,
} from '../../interfaces/form.interface';
import { FormCustomComponent } from '../form/form.component';
import { debounceTime, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-multi-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormCustomComponent],
  templateUrl: './multi-form.component.html',
  styleUrl: './multi-form.component.scss',
})
export class MultiFormComponent implements OnInit, AfterViewInit, OnDestroy {
  private formBuilder = inject(FormBuilder);
  public form!: FormGroup;
  public keys: string[] = [];
  private destroy$ = new Subject<void>();

  @Input() strutturaForm!: RecordStrutturaMultiForm;
  @Input() visualizzaPulsanti: boolean = true;

  @Output() invioDati = new EventEmitter<any>();
  @Output() subscribeForm = new EventEmitter<any>();
  @Output() formValido = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.keys = Object.keys(this.strutturaForm);

    const groupConfig: Record<string, FormGroup> = {};

    this.keys.forEach((key: string) => {
      const sezione = this.strutturaForm[key];
      groupConfig[key] = this.createFormGroup(sezione.struttura);
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

  private createFormGroup(struttura: RecordStruttura): FormGroup {
    const controls: Record<string, any> = {};

    Object.keys(struttura).forEach((key: string) => {
      const field: StrutturaForm = struttura[key];
      controls[key] = [field.valueInit || '', field.validators || []];
    });

    return this.formBuilder.group(controls);
  }

  public getFormGroup(nomeSezione: string): FormGroup {
    return this.form.get(nomeSezione) as FormGroup;
  }

  public onSectionFormChange(section: string, value: any): void {
    this.form.get(section)?.patchValue(value);
  }

  public onSubmit(): void {
    if (this.form.valid) {
      this.invioDati.emit(this.form.value);
    }
  }
}
