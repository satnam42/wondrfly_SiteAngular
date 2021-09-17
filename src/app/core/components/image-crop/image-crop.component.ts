import { Component, ChangeDetectionStrategy, AfterViewInit, ViewChild } from '@angular/core';
import { lyl, WithStyles, StyleRenderer, ThemeVariables, ThemeRef } from '@alyle/ui';
import {
  STYLES as CROPPER_STYLES,
  LyImageCropper,
  ImgCropperConfig,
  ImgCropperEvent,
  ImgCropperErrorEvent,
  ImgCropperLoaderConfig
} from '@alyle/ui/image-cropper';
import { Platform } from '@angular/cdk/platform';

const STYLES = (_theme: ThemeVariables, ref: ThemeRef) => {
  ref.renderStyleSheet(CROPPER_STYLES);
  const cropper = ref.selectorsOf(CROPPER_STYLES);

  return {
    root: lyl `{
      ${cropper.root} {
        max-width: 400px
        height: 300px
      }
    }`,
    sliderContainer: lyl `{
      text-align: center
      max-width: 400px
      margin: 14px
    }`,
    cropResult: lyl `{
      border-radius: 50%
    }`
  };
};

@Component({
  selector: 'app-image-crop',
  template: `
  <div [lyDisplay]="'flex'">
  <button ly-button color="primary" (click)="_fileInput.click()">
    <ly-icon>image</ly-icon>
    <span>Select File</span>
  </button>
  <span [lyFlex]="1"></span>
  <!-- Hidden input -->
  <input #_fileInput type="file" (change)="cropper.selectInputEvent($event)" accept="image/*" hidden>
  <button raised ly-button bg="accent" *ngIf="croppedImage">Upload</button>
</div>

<div *ngIf="ready">
  <button (click)="cropper.zoomIn()" ly-button appearance="icon"><ly-icon>zoom_in</ly-icon></button>
  <button (click)="cropper.zoomOut()" ly-button appearance="icon"><ly-icon>zoom_out</ly-icon></button>
  <button (click)="cropper.center()" ly-button appearance="icon"><ly-icon>filter_center_focus</ly-icon></button>
  <button (click)="cropper.rotate(-90)" ly-button appearance="icon"><ly-icon>rotate_90_degrees_ccw</ly-icon></button>
  <button (click)="cropper.fit()" ly-button>Fit</button>
  <button (click)="cropper.fitToScreen()" ly-button>Fit to screen</button>
  <button (click)="cropper.setScale(1)" ly-button>1:1</button>
  <button (click)="cropper.clean()" ly-button>Clean</button>
</div>

<ly-img-cropper
  [config]="myConfig"
  [(scale)]="scale"
  (minScale)="minScale = $event"
  (ready)="ready = true"
  (cleaned)="ready = false"
  (cropped)="onCropped($event)"
  (loaded)="onLoaded($event)"
  (error)="onError($event)"
>
  <span>Drag and drop image</span>
</ly-img-cropper>

<div *ngIf="ready" [className]="classes.sliderContainer">
  <ly-slider
    [thumbVisible]="false"
    [min]="minScale"
    [max]="1"
    [(ngModel)]="scale"
    (input)="scale = $event.value"
    step="0.000001"></ly-slider>
</div>

<button *ngIf="ready" color="accent" (click)="cropper.crop()" ly-button>
  <ly-icon>crop</ly-icon>crop
</button>

<div><img [class]="classes.cropResult" *ngIf="croppedImage" [src]="croppedImage"></div>
`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    StyleRenderer
  ]
})
export class ImageCropComponent implements WithStyles, AfterViewInit {
  classes = this.sRenderer.renderSheet(STYLES, 'root');
  croppedImage?: string;
  scale: number;
  ready: boolean;
  minScale: number;
  @ViewChild(LyImageCropper, { static: true }) readonly cropper: LyImageCropper;
  myConfig: ImgCropperConfig = {
    width: 150, // Default `250`
    height: 150, // Default `200`
    fill: '#ff2997', // Default transparent if type = png else #000
    type: 'image/png', // Or you can also use `image/jpeg`
    round: true
  };

  constructor(
    readonly sRenderer: StyleRenderer,
    private _platform: Platform
  ) { }

  ngAfterViewInit() {

    // demo: Load image from URL and update position, scale, rotate
    // this is supported only for browsers
    if (this._platform.isBrowser) {
      const config: ImgCropperLoaderConfig = {
        scale: 0.745864772531767,
        xOrigin: 642.380608078103,
        yOrigin: 236.26357452128866,
        // rotation: 90,
        originalDataURL: 'https://firebasestorage.googleapis.com/v0/b/alyle-ui.appspot.com/o/img%2Flarm-rmah-47685-unsplash-1.png?alt=media&token=96a29be5-e3ef-4f71-8437-76ac8013372c'
      };
      this.cropper.loadImage(config);
    }

  }

  onCropped(e: ImgCropperEvent) {
    this.croppedImage = e.dataURL;

  }
  onLoaded(e: ImgCropperEvent) {

  }
  onError(e: ImgCropperErrorEvent) {
    console.warn(`'${e.name}' is not a valid image`, e);
  }
}
