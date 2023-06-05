import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrderRequisitionFormComponent } from './purchase-order-requisition-form.component';

describe('PurchaseOrderRequisitionFormComponent', () => {
  let component: PurchaseOrderRequisitionFormComponent;
  let fixture: ComponentFixture<PurchaseOrderRequisitionFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PurchaseOrderRequisitionFormComponent]
    });
    fixture = TestBed.createComponent(PurchaseOrderRequisitionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
