# ngx-cookie-manager

[![Build and Test](https://github.com/CodeCanvasCollective/ngx-cookie-manager/actions/workflows/build.yml/badge.svg)](https://github.com/CodeCanvasCollective/ngx-cookie-manager/actions/workflows/build.yml)
[![npm version](https://img.shields.io/npm/v/ngx-cookie-manager.svg?style=flat-square)](https://www.npmjs.com/package/ngx-cookie-manager)
[![NPM Downloads](https://img.shields.io/npm/dm/ngx-cookie-manager.svg?style=flat-square)](https://www.npmjs.com/package/ngx-cookie-manager)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Angular Version](https://img.shields.io/badge/angular-%3E%3D17.0.0-red.svg?style=flat-square)](https://angular.dev)

A lightweight, high-performance Angular service for managing browser cookies. Optimized for **Angular 17, 18, and 19+**, featuring full support for **Standalone Components** and **Server-Side Rendering (SSR)**.

---

## ✨ Features

- 🚀 **Modern Angular**: Built with Angular 19 and the latest Package Format (APF).
- 🌍 **SSR & Universal Ready**: Safely handles cookies in Server-Side Rendering (Angular Universal/Hydration) without `document is not defined` errors.
- 💉 **Modern DI**: Supports the `inject()` function for clean, tree-shakable implementation.
- 🛡️ **Security First**: Easy configuration for `SameSite`, `Secure`, and `HttpOnly` attributes.
- 📦 **Zero Dependencies**: Ultra-lightweight with no external bloat.
- ⌨️ **Strongly Typed**: Full TypeScript support for a better developer experience.

---

## 📦 Installation

```bash
npm install ngx-cookie-manager
```

---

## 🚀 Quick Start

### 1. Basic Usage (Standalone)

Inject the service into your component using the modern `inject()` pattern:

```typescript
import { Component, inject, OnInit } from '@angular/core';
import { CookieManagerService } from 'ngx-cookie-manager';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `<h1>User: {{ username }}</h1>`
})
export class AppComponent implements OnInit {
  private cookieService = inject(CookieManagerService);
  username = '';

  ngOnInit() {
    // Set a cookie
    this.cookieService.set('username', 'JohnDoe', 7); // Expires in 7 days
    
    // Get a cookie
    this.username = this.cookieService.get('username');
  }
}
```

### 2. Advanced Configuration

```typescript
this.cookieService.set(
  'session_id', 
  'xyz123', 
  { 
    expires: 1,           // 1 day
    path: '/', 
    secure: true, 
    sameSite: 'Strict' 
  }
);
```

---

## 🛠️ API Reference

| Method | Return Type | Description |
| :--- | :--- | :--- |
| `check(name: string)` | `boolean` | Returns `true` if the cookie exists. |
| `get(name: string)` | `string` | Returns the cookie value or an empty string. |
| `getAll()` | `object` | Returns an object of all accessible cookies. |
| `set(name, value, ...)` | `void` | Creates or updates a cookie with optional config. |
| `delete(name, path?, domain?)` | `void` | Removes a specific cookie. |
| `deleteAll(path?, domain?)` | `void` | Clears all cookies accessible from the current path/domain. |

---

## 🌐 Server-Side Rendering (SSR)

`ngx-cookie-manager` uses Angular's `DOCUMENT` token and `PLATFORM_ID` to determine the execution context. 

- **In the Browser**: Interacts directly with `document.cookie`.
- **On the Server**: Safely returns default values (empty strings/objects) to prevent application crashes during pre-rendering or hydration.

---

## 📄 License

Released under the [MIT License](./LICENSE). Created by [Lasantha Lakmal](https://github.com/lasalasa).

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
