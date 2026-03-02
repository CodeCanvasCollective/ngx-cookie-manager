# ngx-cookie-manager (Modern Angular Library)

This is a professional, modernized version of the `ngx-cookie-manager` library.

## ✨ Highlights
- **Angular 19 Ready**: Built with the latest Angular Package Format.
- **Standalone Support**: Fully compatible with the modern `bootstrapApplication`.
- **SSR Compatible**: Safely handles cookies in Server-Side Rendering (Angular Universal).
- **Automated CI/CD**: Integrated with GitHub Actions for automated building, testing, and NPM deployment via **Trusted Publishers (OIDC)**.

## 📁 Repository Structure
- `projects/ngx-cookie-manager`: The library source code.
- `.github/workflows/build.yml`: CI/CD pipeline for build, test, and automated NPM release on tags.
- `dist/`: Build output directory (generated after `npm run build`).

## 🚀 Development
```bash
npm install
npm run build
npm run test
```

## 📦 Publishing to NPM
To release a new version:
1. Update `version` in `projects/ngx-cookie-manager/package.json`.
2. Push a tag starting with `v`:
```bash
git tag v1.0.1
git push origin v1.0.1
```

For more details, see the [Library Documentation](./projects/ngx-cookie-manager/README.md).
