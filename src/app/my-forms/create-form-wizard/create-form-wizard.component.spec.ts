import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFormWizardComponent } from './create-form-wizard.component';

describe('CreateFormWizardComponent', () => {
  let component: CreateFormWizardComponent;
  let fixture: ComponentFixture<CreateFormWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateFormWizardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFormWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
