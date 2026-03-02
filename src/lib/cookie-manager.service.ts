import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CookieManagerService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  /**
   * Checks if a cookie exists.
   * @param name Cookie name
   * @returns {boolean} True if the cookie exists, false otherwise.
   */
  check(name: string): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }
    name = encodeURIComponent(name);
    const regExp: RegExp = this.getCookieRegExp(name);
    return regExp.test(this.document.cookie);
  }

  /**
   * Gets a cookie value.
   * @param name Cookie name
   * @returns {string} The cookie value, or an empty string if it doesn't exist.
   */
  get(name: string): string {
    if (isPlatformBrowser(this.platformId) && this.check(name)) {
      name = encodeURIComponent(name);
      const regExp: RegExp = this.getCookieRegExp(name);
      const result: RegExpExecArray | null = regExp.exec(this.document.cookie);
      return result ? decodeURIComponent(result[1]) : '';
    }
    return '';
  }

  /**
   * Gets all cookies.
   * @returns {Object} An object containing all cookies.
   */
  getAll(): { [key: string]: string } {
    if (!isPlatformBrowser(this.platformId)) {
      return {};
    }

    const cookies: { [key: string]: string } = {};
    const document: any = this.document;

    if (document.cookie && document.cookie !== '') {
      const split: string[] = document.cookie.split(';');

      for (let i = 0; i < split.length; i += 1) {
        const currentCookie: string[] = split[i].split('=');
        currentCookie[0] = currentCookie[0].replace(/^ /, '');
        cookies[decodeURIComponent(currentCookie[0])] = decodeURIComponent(currentCookie[1]);
      }
    }

    return cookies;
  }

  /**
   * Sets a cookie.
   * @param name Cookie name
   * @param value Cookie value
   * @param expires Number of days until the cookie expires or an actual `Date`
   * @param path Cookie path
   * @param domain Cookie domain
   * @param secure Secure flag
   * @param sameSite SameSite attribute ('Lax', 'None', or 'Strict')
   */
  set(
    name: string,
    value: string,
    expires?: number | Date,
    path?: string,
    domain?: string,
    secure?: boolean,
    sameSite: 'Lax' | 'None' | 'Strict' = 'Lax'
  ): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    let cookieString: string = encodeURIComponent(name) + '=' + encodeURIComponent(value) + ';';

    if (expires) {
      if (typeof expires === 'number') {
        const dateExpires: Date = new Date(new Date().getTime() + expires * 1000 * 60 * 60 * 24);
        cookieString += 'expires=' + dateExpires.toUTCString() + ';';
      } else {
        cookieString += 'expires=' + expires.toUTCString() + ';';
      }
    }

    if (path) {
      cookieString += 'path=' + path + ';';
    }

    if (domain) {
      cookieString += 'domain=' + domain + ';';
    }

    if (secure === false && sameSite === 'None') {
      secure = true;
    }

    if (secure) {
      cookieString += 'secure;';
    }

    cookieString += 'sameSite=' + sameSite + ';';

    this.document.cookie = cookieString;
  }

  /**
   * Deletes a cookie.
   * @param name Cookie name
   * @param path Cookie path
   * @param domain Cookie domain
   * @param secure Secure flag
   * @param sameSite SameSite attribute
   */
  delete(
    name: string,
    path?: string,
    domain?: string,
    secure?: boolean,
    sameSite: 'Lax' | 'None' | 'Strict' = 'Lax'
  ): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.set(name, '', new Date('Thu, 01 Jan 1970 00:00:01 GMT'), path, domain, secure, sameSite);
  }

  /**
   * Deletes all cookies.
   * @param path Cookie path
   * @param domain Cookie domain
   * @param secure Secure flag
   * @param sameSite SameSite attribute
   */
  deleteAll(
    path?: string,
    domain?: string,
    secure?: boolean,
    sameSite: 'Lax' | 'None' | 'Strict' = 'Lax'
  ): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const cookies: any = this.getAll();

    for (const cookieName in cookies) {
      if (Object.prototype.hasOwnProperty.call(cookies, cookieName)) {
        this.delete(cookieName, path, domain, secure, sameSite);
      }
    }
  }

  /**
   * Gets a regular expression for a cookie name.
   * @param name Cookie name
   * @returns {RegExp}
   */
  private getCookieRegExp(name: string): RegExp {
    const escapedName: string = name.replace(/([\[\]\{\}\(\)\|\=\;\+\?\,\.\*\^\$])/gi, '\\$1');
    return new RegExp('(?:^' + escapedName + '|;\\s*' + escapedName + ')=(.*?)(?:;|$)', 'g');
  }
}
