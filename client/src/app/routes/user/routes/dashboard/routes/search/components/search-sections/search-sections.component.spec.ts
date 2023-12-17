import { ComponentFixture, TestBed } from '@angular/core/testing';

import SearchSectionsComponent from './search-sections.component';

describe('SearchSectionsComponent', () => {
  let component: SearchSectionsComponent;
  let fixture: ComponentFixture<SearchSectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchSectionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
