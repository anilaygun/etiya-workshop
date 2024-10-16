import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoCartComponent } from './todo-cart.component';

describe('TodoCartComponent', () => {
  let component: TodoCartComponent;
  let fixture: ComponentFixture<TodoCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoCartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
