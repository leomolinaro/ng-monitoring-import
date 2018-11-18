import { TestBed } from '@angular/core/testing';

import { TemplateDefinitionsService } from './template-definitions.service';

describe('TemplateDefinitionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TemplateDefinitionsService = TestBed.get(TemplateDefinitionsService);
    expect(service).toBeTruthy();
  });
});
