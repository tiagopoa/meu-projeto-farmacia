import { TestBed, inject } from '@angular/core/testing';

import { CrudUsuariosService } from './crud-usuarios.service';

describe('CrudUsuariosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrudUsuariosService]
    });
  });

  it('should be created', inject([CrudUsuariosService], (service: CrudUsuariosService) => {
    expect(service).toBeTruthy();
  }));
});
