# Employee Management System

## Deploy with GitHub Pages

1. Run `npm run build` and commit the generated root `index.html`, `assets/`, `favicon.svg`, and `icons.svg`.
2. In the repository, open **Settings → Pages**.
3. Set the source to **Deploy from a branch**, select `main`, and choose `/(root)`.

The Vite base path is configured for the `Employee-management-system` repository.

## Development

Run `npm run dev` to start the local development server. Run `npm run build` to generate the production site in the repository root.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
