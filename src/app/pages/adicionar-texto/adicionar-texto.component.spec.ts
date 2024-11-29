import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarTextoComponent } from './adicionar-texto.component';

describe('AdicionarTextoComponent', () => {
  let component: AdicionarTextoComponent;
  let fixture: ComponentFixture<AdicionarTextoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdicionarTextoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdicionarTextoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
