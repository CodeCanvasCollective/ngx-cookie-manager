# ngx-cookie-manager

A lightweight, modern Angular service to manage cookies. Fully compatible with **Angular 17, 18, and 19**, supporting both **Standalone Components** and **Server-Side Rendering (SSR)**.

[![Build and Test](https://github.com/CodeCanvasCollective/ngx-cookie-manager/actions/workflows/build.yml/badge.svg)](https://github.com/CodeCanvasCollective/ngx-cookie-manager/actions/workflows/build.yml)
[![npm version](https://img.shields.io/npm/v/ngx-cookie-manager.svg)](https://www.npmjs.com/package/ngx-cookie-manager)
[![license](https://img.shields.io/npm/l/ngx-cookie-manager.svg)](https://github.com/CodeCanvasCollective/ngx-cookie-manager/blob/master/LICENSE)

## Features

- ✅ **Angular 19+ Ready**: Built with the latest Angular Package Format.
- ✅ **SSR Compatible**: Safely handles cookies in Server-Side Rendering (Angular Universal/Hydration) without crashing.
- ✅ **Standalone Support**: Works out of the box with modern `bootstrapApplication`.
- ✅ **Modern DI**: Uses the `inject()` function for clean, tree-shakable services.
- ✅ **Security Focused**: Built-in support for `SameSite` attributes and `Secure` flags.
- ✅ **Lightweight**: Zero external dependencies (besides Angular).

---

## Installation

Install via npm:

```bash
npm install ngx-cookie-manager
```

---

## Usage

### 1. Basic Usage (Standalone Component)

Inject the service using the modern `inject()` function:

```typescript
import { Component, OnInit, inject } from '@angular/core';
import { CookieManagerService } from 'ngx-cookie-manager';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `<h1>Cookie Value: {{ value }}</h1>`
})
export class AppComponent implements OnInit {
  private cookieService = inject(CookieManagerService);
  value = '';

  ngOnInit() {
    this.cookieService.set('my_cookie', 'Hello Angular!');
    this.value = this.cookieService.get('my_cookie');
  }
}
```

### 2. SSR Support

`ngx-cookie-manager` is built to be safe in SSR environments. When running on the server, methods like `get()`, `check()`, and `set()` will safely return default values or perform no-ops instead of throwing `ReferenceError: document is not defined`.

---

## API Reference

### `check(name: string): boolean`
Checks if a cookie exists by name.

### `get(name: string): string`
Returns the value of a cookie. Returns an empty string if the cookie doesn't exist.

### `getAll(): { [key: string]: string }`
Returns an object containing all accessible cookies.

### `set(name, value, expires?, path?, domain?, secure?, sameSite?)`
Sets a cookie with the specified options.

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `name` | `string` | - | Cookie name |
| `value` | `string` | - | Cookie value |
| `expires` | `number \| Date` | `undefined` | Days until expiry or a specific `Date` |
| `path` | `string` | `'/'` | Cookie path |
| `domain` | `string` | `undefined` | Cookie domain |
| `secure` | `boolean` | `false` | If true, cookie is only sent over HTTPS |
| `sameSite` | `'Lax' \| 'Strict' \| 'None'` | `'Lax'` | SameSite policy |

### `delete(name: string, path?, domain?)`
Deletes a specific cookie.

### `deleteAll(path?, domain?)`
Deletes all accessible cookies.

---

## License

MIT © [Lasantha Lakmal](https://github.com/lasalasa)
