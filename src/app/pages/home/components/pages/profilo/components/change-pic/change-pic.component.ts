import { Component, EventEmitter, inject, Output } from '@angular/core';
import { AuthHandler } from '../../../../../../../shared/handlers/auth.handler';
import { User } from '../../../../../../../shared/interfaces/users.interface';

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
            <h5 class="modal-title mb-0">Modifica Immagine Profilo</h5>
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
                    Carica la tua immagine profilo
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
                    Carica Immagine
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
  private authHandler = inject(AuthHandler);

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
        alert('Formato o tipo immagine non supportato');
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
    let user = structuredClone(this.authHandler.user()) || ({} as User);
    this.authHandler.profiloHandler.aggiornamentoPic = true;
    this.chiudi.emit();

    this.authHandler.profiloHandler.uploadProfileImage({
      selectedFile: this.selectedFile,
      user: user,
      tapCall: (url: string) => (user.credenziali.profilePic = url),
      switcMapCall: (user: User) => this.authHandler.updateUser(user),
      nextCall: (data: User) => this.completeEdit(data),
      errorCall: (err: Error) => this.errorEdit(err),
    });
  }

  private completeEdit(user: User): void {
    if (this.authHandler.profiloHandler.profiloPersonale) {
      this.authHandler.profiloHandler.profiloPersonale.user = user;
      sessionStorage.setItem(
        'pubblicazioni',
        JSON.stringify(this.authHandler.profiloHandler.profiloPersonale)
      );
    }
    this.authHandler.profiloHandler.aggiornamentoPic = false;
  }

  private errorEdit(err: Error): void {
    console.error('Errore chiamata:', err);
    alert("Errore durante il caricamento dell'immagine");
    this.authHandler.profiloHandler.aggiornamentoPic = false;
  }
}
