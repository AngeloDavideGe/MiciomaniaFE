import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
export class FormCustomComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  public form!: FormGroup<FormInterface>;
  public arrayForm: StrutturaForm[] = [];
  public keys: string[] = [];

  @Input() strutturaForm!: RecordStruttura;
  @Output() invioDati = new EventEmitter<any>();

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
  }

  public get f(): FormInterface {
    return this.form.controls;
  }

  public onSubmit(): void {
    if (this.form.valid) {
      this.invioDati.emit(this.form.value);
    }
  }

  public onReset() {
    this.form.reset();
  }

  public onCheckboxChange(check: string, index: string): void {
    const teamControl = this.form.get(index);
    teamControl?.setValue(check);
    teamControl?.updateValueAndValidity();
  }
}
