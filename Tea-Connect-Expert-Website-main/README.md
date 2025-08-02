# Tea Consultation Project

## Deployment Notes

- The project is configured for static hosting (Netlify, Vercel, GitHub Pages, etc.).
- The `vite.config.ts` file sets `base: './'` for correct asset and routing handling.
- The `index.html` file includes `<base href="./">` for proper relative asset loading.

### For Netlify/Vercel
- No extra configuration is needed for routing if you use the default settings.
- If you have issues with client-side routing, add a `_redirects` file in the `public` folder with:
  ```
  /*    /index.html   200
  ```

### For GitHub Pages
- If deploying to a subdirectory, set the `base` in `vite.config.ts` to your repo name (e.g., `/repo/`).

### For Custom Servers
- Ensure your server is configured to serve `index.html` for all routes (SPA fallback).

