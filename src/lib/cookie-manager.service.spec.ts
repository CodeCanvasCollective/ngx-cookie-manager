import { TestBed } from '@angular/core/testing';
import { CookieManagerService } from './cookie-manager.service';
import { DOCUMENT } from '@angular/common';

describe('CookieManagerService', () => {
  let service: CookieManagerService;
  let mockDocument: any;

  beforeEach(() => {
    // A more realistic mock for document.cookie
    mockDocument = {
      _cookie: '',
      get cookie() {
        return this._cookie;
      },
      set cookie(value: string) {
        // In a real browser, setting document.cookie appends/updates.
        // For testing purposes, we'll append to verify multiple operations.
        this._cookie = this._cookie ? `${this._cookie}; ${value}` : value;
      }
    };

    TestBed.configureTestingModule({
      providers: [
        CookieManagerService,
        { provide: DOCUMENT, useValue: mockDocument }
      ]
    });
    service = TestBed.inject(CookieManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get a cookie', () => {
    service.set('test_cookie', 'test_value');
    expect(mockDocument.cookie).toContain('test_cookie=test_value');
    
    // Reset and simulate browser behavior for get()
    mockDocument._cookie = 'test_cookie=test_value';
    expect(service.get('test_cookie')).toBe('test_value');
  });

  it('should check if a cookie exists', () => {
    mockDocument._cookie = 'existing_cookie=true';
    expect(service.check('existing_cookie')).toBeTrue();
    expect(service.check('non_existent')).toBeFalse();
  });

  it('should get all cookies as an object', () => {
    mockDocument._cookie = 'c1=v1; c2=v2';
    const all = service.getAll();
    expect(all['c1']).toBe('v1');
    expect(all['c2']).toBe('v2');
  });

  it('should delete a cookie', () => {
    mockDocument._cookie = 'to_delete=gone';
    service.delete('to_delete');
    expect(mockDocument.cookie).toContain('to_delete=;');
    expect(mockDocument.cookie).toContain('expires=Thu, 01 Jan 1970');
  });

  it('should handle special characters in names and values', () => {
    const name = 'special@name';
    const value = 'special=value;';
    service.set(name, value);
    
    expect(mockDocument.cookie).toContain(encodeURIComponent(name) + '=' + encodeURIComponent(value));
    
    mockDocument._cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
    expect(service.get(name)).toBe(value);
  });

  it('should delete all cookies', () => {
    mockDocument._cookie = 'a=1; b=2';
    service.deleteAll();
    // Now that our mock appends, we can check for both deletions
    expect(mockDocument.cookie).toContain('a=;');
    expect(mockDocument.cookie).toContain('b=;');
  });
});
