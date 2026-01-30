import { AbstractControl, ValidationErrors } from '@angular/forms';

export function fileValidator(
  control: AbstractControl
): ValidationErrors | null {
  const file: File | null = control.value;

  if (!file) {
    return null;
  }

  const fileName = file.name.toLowerCase();
  const fileExtension = fileName.substring(fileName.lastIndexOf('.'));

  const allowedExtensions = ['.pdf', '.mp3'];

  if (!allowedExtensions.includes(fileExtension)) {
    return { invalidFileType: true };
  }

  if (
    file.type &&
    file.type !== 'application/pdf' &&
    file.type !== 'audio/mpeg'
  ) {
    return { invalidFileType: true };
  }

  return null;
}
