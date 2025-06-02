import { AbstractControl, ValidationErrors } from '@angular/forms';

export function fileValidator(
  control: AbstractControl
): ValidationErrors | null {
  const file: File | null = control.value;

  if (!file) {
    return null; // Se non c'è file, la validazione required si occuperà dell'errore
  }

  // Estrai l'estensione del file
  const fileName = file.name.toLowerCase();
  const fileExtension = fileName.substring(fileName.lastIndexOf('.'));

  // Verifica l'estensione invece del type (più affidabile)
  const allowedExtensions = ['.pdf', '.mp3'];

  if (!allowedExtensions.includes(fileExtension)) {
    return { invalidFileType: true };
  }

  // Verifica aggiuntiva per il MIME type se disponibile
  if (
    file.type &&
    file.type !== 'application/pdf' &&
    file.type !== 'audio/mpeg'
  ) {
    return { invalidFileType: true };
  }

  return null;
}
