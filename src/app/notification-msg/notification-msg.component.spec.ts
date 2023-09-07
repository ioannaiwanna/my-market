import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationMsgComponent } from './notification-msg.component';

describe('NotificationMsgComponent', () => {
  let component: NotificationMsgComponent;
  let fixture: ComponentFixture<NotificationMsgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NotificationMsgComponent]
    });
    fixture = TestBed.createComponent(NotificationMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
