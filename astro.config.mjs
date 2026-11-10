import { defineConfig } from 'astro/config';

// Static site for GitHub Pages (custom domain anoren.me, so no `base`).
export default defineConfig({
  site: 'https://anoren.me',
  // Emit cooking.html / music.html / poker.html (not folders) so every pre-Astro URL keeps working.
  build: { format: 'file' },
  devToolbar: { enabled: false },
});
