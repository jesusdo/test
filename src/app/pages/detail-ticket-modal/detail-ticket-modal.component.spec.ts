import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTicketModalComponent } from './detail-ticket-modal.component';

describe('DetailTicketModalComponent', () => {
  let component: DetailTicketModalComponent;
  let fixture: ComponentFixture<DetailTicketModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailTicketModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailTicketModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
