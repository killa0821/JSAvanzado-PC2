import { TestBed } from '@angular/core/testing';
import { Estudiante } from './estudiante.service';

describe('Estudiante', () => {
  let service: Estudiante;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Estudiante);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
