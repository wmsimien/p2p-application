import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrderRequisitionComponent } from './purchase-order-requisition.component';

describe('PurchaseOrderRequisitionComponent', () => {
  let component: PurchaseOrderRequisitionComponent;
  let fixture: ComponentFixture<PurchaseOrderRequisitionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PurchaseOrderRequisitionComponent]
    });
    fixture = TestBed.createComponent(PurchaseOrderRequisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
