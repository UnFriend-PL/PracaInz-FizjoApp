/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["en", "pl"], // Define supported locales
    defaultLocale: "en", // Set the default locale
  },
  swcMinify: true,
};

export default nextConfig;
