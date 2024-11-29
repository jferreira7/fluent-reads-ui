import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTraducaoComponent } from './card-traducao.component';

describe('CardTraducaoComponent', () => {
  let component: CardTraducaoComponent;
  let fixture: ComponentFixture<CardTraducaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardTraducaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardTraducaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
