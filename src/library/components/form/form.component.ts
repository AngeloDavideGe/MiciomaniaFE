import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import {
  BuildInterface,
  FormInterface,
  RecordStruttura,
  StrutturaForm,
} from '../../interfaces/form.interface';
import { CheckBoxCustomComponent } from '../checkbox/checkbox.component';

@Component({
  selector: 'app-form-custom',
  standalone: true,
  imports: [ReactiveFormsModule, CheckBoxCustomComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormCustomComponent implements OnInit, OnDestroy {
  private formBuilder = inject(FormBuilder);
  public form!: FormGroup<FormInterface>;
  public arrayForm: StrutturaForm[] = [];
  public keys: string[] = [];
  private destroy$ = new Subject<void>();

  @Input() strutturaForm!: RecordStruttura;
  @Input() visualizzaPulsanti: boolean = true;

  @Output() invioDati = new EventEmitter<any>();
  @Output() subscribeForm = new EventEmitter<any>();
  @Output() formValido = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.keys = Object.keys(this.strutturaForm);
    this.arrayForm = this.keys.map((x: string) => this.strutturaForm[x]);

    this.form = this.formBuilder.group(
      this.keys.reduce((acc: BuildInterface, key: string) => {
        const field: StrutturaForm = this.strutturaForm[key];
        acc[key] = [field.valueInit || '', field.validators];

        return acc;
      }, {} as BuildInterface),
    );

    this.form.statusChanges
      .pipe(takeUntil(this.destroy$), debounceTime(10))
      .subscribe(() => {
        this.formValido.emit(this.form.valid);
        this.subscribeForm.emit(this.form.value);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public get f(): FormInterface {
    return this.form.controls;
  }

  public onSubmit(): void {
    if (this.form.valid) {
      this.invioDati.emit(this.form.value);
    }
  }

  public onReset(): void {
    this.form.reset();
  }

  public onCheckboxChange(check: string, index: string): void {
    const teamControl = this.form.get(index);
    teamControl?.setValue(check);
    teamControl?.updateValueAndValidity();
  }

  public onInputChange(event: Event, index: string): void {
    const value: string = (event.target as HTMLInputElement).value;
    this.strutturaForm[index].onChange?.(value);
  }

  public onFileSelected(event: Event, index: string): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || !input.files[0]) {
      return;
    }

    const file: File = input.files[0];
    const allowedExtensions: string[] =
      this.strutturaForm[index]!.file!.allowedExtensions;
    const allowedTypes: string[] =
      this.strutturaForm[index]!.file!.allowedExtensions;

    const fileExtension: string | undefined = file.name
      .split('.')
      .pop()
      ?.toLowerCase();

    const isValidFile =
      fileExtension &&
      (allowedExtensions.includes(fileExtension) ||
        allowedTypes.includes(file.type));

    if (!isValidFile) {
      alert('Formato non supportato. Seleziona un file immagine valido.');

      input.value = '';
      this.strutturaForm[index].file!.previewUrl = null;

      this.form.get(index)?.setValue(null);
      this.form.get(index)?.updateValueAndValidity();

      return;
    }

    this.form.get(index)?.setValue(file);
    this.form.get(index)?.markAsDirty();
    this.form.get(index)?.updateValueAndValidity();

    const reader = new FileReader();

    reader.onload = () => {
      this.strutturaForm[index].file!.previewUrl = reader.result;
    };

    reader.readAsDataURL(file);
  }
}
