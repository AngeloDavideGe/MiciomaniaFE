import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { DataHttp } from '../../../../../../core/api/http.data';
import { updateUserCustom } from '../../../../../../shared/handlers/auth.handler';
import { User } from '../../../../../../shared/interfaces/users.interface';
import { AuthService } from '../../../../../../shared/services/api/auth.service';
import { ProfiloService } from '../../../../services/profilo.service';
import { uploadProfileImage } from '../../../../handlers/profilo.handler';
import { ProfiloLang } from '../languages/interfaces/profilo-lang.interface';

@Component({
  selector: 'app-change-pic',
  standalone: true,
  imports: [],
  template: `
    <div
      class="modal"
      tabindex="-1"
      role="dialog"
      style="display: block; background-color: rgba(0, 0, 0, 0.5)"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <!-- Modal Header -->
          <div
            class="modal-header d-flex align-items-center justify-content-between border-bottom-0 pb-0"
          >
            <h5 class="modal-title mb-0">
              {{ profiloLang.modificaImmagine || 'Modifica Immagine Profilo' }}
            </h5>
            <button
              type="button"
              class="btn-close"
              (click)="chiudi.emit()"
              aria-label="Close"
            ></button>
          </div>

          <!-- Modal Body -->
          <div class="modal-body pt-0 mt-2">
            <nav class="mb-4">
              <div
                class="nav nav-tabs border-bottom-0"
                id="nav-tab"
                role="tablist"
              >
                <div
                  class="container d-flex flex-column justify-content-center align-items-center"
                  style="min-height: 60vh; max-width: 400px; margin: 3rem auto; background: #f8f9fa; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); padding: 2rem;"
                >
                  <h4 class="mb-4 text-primary" style="font-weight: bold;">
                    {{
                      profiloLang.caricaImmagineProfilo ||
                        'Carica Immagine Profilo'
                    }}
                  </h4>
                  <div class="mb-4 w-100 d-flex justify-content-center">
                    @if(previewUrl){
                    <img
                      [src]="previewUrl"
                      alt="Anteprima"
                      style="width: 120px; height: 120px; object-fit: cover; border-radius: 50%; border: 2px solid #dee2e6;"
                    />
                    } @else {
                    <div
                      style="width: 120px; height: 120px; border-radius: 50%; background: #e9ecef; display: flex; align-items: center; justify-content: center; color: #adb5bd; font-size: 2.5rem; border: 2px dashed #dee2e6;"
                    >
                      <i class="bi bi-person"></i>
                    </div>
                    }
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    class="form-control mb-3"
                    style="border-radius: 30px;"
                    (change)="onFileSelected($event)"
                  />
                  <button
                    class="btn btn-primary w-100"
                    style="border-radius: 30px; font-weight: 500;"
                    [disabled]="!selectedFile"
                    (click)="onUpload()"
                  >
                    {{ profiloLang.caricaImmagine || 'Carica Immagine' }}
                  </button>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ChangePicComponent {
  public previewUrl: string | ArrayBuffer | null = null;
  public selectedFile: File | null = null;

  private authService = inject(AuthService);
  public profiloService = inject(ProfiloService);

  @Input() profiloLang!: ProfiloLang;
  @Output() chiudi = new EventEmitter();

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file: File = input.files[0];

      const allowedExtensions: string[] = [
        'jpg',
        'jpeg',
        'png',
        'gif',
        'bmp',
        'webp',
      ];
      const allowedTypes: string[] = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/bmp',
        'image/webp',
      ];
      const fileExtension: string | undefined = file.name
        .split('.')
        .pop()
        ?.toLowerCase();

      if (
        !fileExtension ||
        !allowedExtensions.includes(fileExtension) ||
        !allowedTypes.includes(file.type)
      ) {
        alert(
          this.profiloLang.formatoNonSupportato ||
            'Formato non supportato. Seleziona un file immagine valido.'
        );
        input.value = '';
        this.selectedFile = null;
        this.previewUrl = null;
        return;
      }

      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => (this.previewUrl = reader.result);
      reader.readAsDataURL(file);
    }
  }

  onUpload() {
    let user = structuredClone(DataHttp.user()) || ({} as User);
    this.profiloService.aggiornamentoPic = true;
    this.chiudi.emit();

    uploadProfileImage({
      profiloService: this.profiloService,
      selectedFile: this.selectedFile,
      user: user,
      tapCall: (url: string) => (user.credenziali.profilePic = url),
      switcMapCall: (user: User) =>
        updateUserCustom({
          authService: this.authService,
          user: user,
        }),
      nextCall: (data: User) => this.completeEdit(data),
      errorCall: (err: Error) => this.errorEdit(err),
    });
  }

  private completeEdit(user: User): void {
    if (DataHttp.profiloPersonale) {
      DataHttp.profiloPersonale.user = user;
    }
    this.profiloService.aggiornamentoPic = false;
  }

  private errorEdit(err: Error): void {
    console.error('Errore chiamata:', err);
    alert(
      this.profiloLang.erroreCaricamento ||
        'Errore durante il caricamento. Riprova più tardi.'
    );
    this.profiloService.aggiornamentoPic = false;
  }
}
