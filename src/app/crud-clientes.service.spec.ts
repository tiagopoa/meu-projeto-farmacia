import { TestBed, inject } from '@angular/core/testing';

import { CrudClientesService } from './crud-clientes.service';

describe('CrudClientesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrudClientesService]
    });
  });

  it('should be created', inject([CrudClientesService], (service: CrudClientesService) => {
    expect(service).toBeTruthy();
  }));
});
