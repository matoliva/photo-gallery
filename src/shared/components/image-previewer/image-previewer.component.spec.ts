import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagePreviewerComponent } from './image-previewer.component';

describe('ImagePreviewerComponent', () => {
  let component: ImagePreviewerComponent;
  let fixture: ComponentFixture<ImagePreviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagePreviewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagePreviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
