import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemfavsComponent } from './itemfavs.component';

describe('ItemfavsComponent', () => {
  let component: ItemfavsComponent;
  let fixture: ComponentFixture<ItemfavsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemfavsComponent]
    });
    fixture = TestBed.createComponent(ItemfavsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
