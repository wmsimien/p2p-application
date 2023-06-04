import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemfavsFormComponent } from './itemfavs-form.component';

describe('ItemfavsFormComponent', () => {
  let component: ItemfavsFormComponent;
  let fixture: ComponentFixture<ItemfavsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemfavsFormComponent]
    });
    fixture = TestBed.createComponent(ItemfavsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
