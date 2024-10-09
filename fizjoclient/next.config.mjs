/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["en", "pl"], // Define supported locales
    defaultLocale: "en", // Set the default locale
  },
  swcMinify: true, // Enable the Next.js SWC compiler for minifying the code
  //   images: {
  //     domains: ["example.com"], // Add external domains to allow loading images
  //   },
  // Any other configuration can go here
};

export default nextConfig;
