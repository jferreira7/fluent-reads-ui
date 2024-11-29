import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTextoComponent } from './card-texto.component';

describe('CardTextoComponent', () => {
  let component: CardTextoComponent;
  let fixture: ComponentFixture<CardTextoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardTextoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardTextoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
