import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  inject,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { userFeature } from '../../../../../../stores/user/user.reducer';
import ImgAvatarComponent from '../../../../../../shared/components/img-avatar/img-avatar.component';
import { ImageCroppedEvent, ImageCropperModule } from 'ngx-image-cropper';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { generateAlertID } from '../../../../../../shared/utils/variables';
import { alertActions } from '../../../../../../stores/alert/alert.action';
import ButtonComponent from '../../../../../../shared/components/button/button.component';
import { userActions } from '../../../../../../stores/user/user.action';

@Component({
  selector: 'app-profile-picture',
  standalone: true,
  imports: [ImageCropperModule, ImgAvatarComponent, ButtonComponent],
  templateUrl: './profile-picture.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ProfilePictureComponent {
  private readonly store = inject(Store);
  readonly userProfile = this.store.selectSignal(userFeature.userProfile);
  @ViewChild('cropper', { read: ElementRef })
  cropper!: ElementRef<HTMLDialogElement>;
  @ViewChild('fileInput', { read: ElementRef })
  fileInput!: ElementRef<HTMLInputElement>;
  imageChangedEvent: Event | undefined;
  croppedImage: SafeUrl | undefined;
  croppedImageBlob: Blob | null | undefined;
  private readonly sanitizer = inject(DomSanitizer);

  profileClick() {
    this.fileInput.nativeElement.click();
  }

  imageLoaded() {
    this.cropper.nativeElement.showModal();
  }

  closeDialog() {
    if (!this.cropper) return;
    this.cropper.nativeElement.close();
    this.resetCropper();
  }

  fileChangeEvent(event: Event): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(
      event.objectUrl as string
    );
    this.croppedImageBlob = event.blob;
  }

  loadImageFailed() {
    this.store.dispatch(
      alertActions.addAlert({
        alert: {
          id: generateAlertID(),
          type: 'ERROR',
          title: 'Load Error',
          message: 'Error while loading your image.',
        },
      })
    );
  }

  crop() {
    if(!this.croppedImageBlob) return;
    const file = new File([this.croppedImageBlob], 'file_name', {
      lastModified: new Date().getTime(),
      type: this.croppedImageBlob?.type,
    });
    this.fileUpload(file);
    this.resetCropper();
  }

  resetCropper() {
    this.croppedImage = undefined;
    this.imageChangedEvent = undefined;
    this.croppedImageBlob = undefined;
    this.fileInput.nativeElement.value = '';
  }

  fileUpload(file: File) {
    if (!file) {
      return;
    }
    const prevFilename = this.userProfile()?.filename ?? '';
    const form = {
      profile: file,
      prevFilename,
    };
    this.store.dispatch(userActions.uploadProfile(form));
  }

  @HostListener('keydown')
  onClose(event: KeyboardEvent) {
    if (event?.key === 'Escape' || event?.keyCode === 27) {
      this.resetCropper();
    }
  }
}

export default ProfilePictureComponent;
