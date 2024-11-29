import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LerTextoComponent } from './ler-texto.component';

describe('LerTextoComponent', () => {
  let component: LerTextoComponent;
  let fixture: ComponentFixture<LerTextoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LerTextoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LerTextoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
