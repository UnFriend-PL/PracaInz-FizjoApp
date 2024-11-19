import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: "en", // Domyślny język
    fallbackLng: "en",
    debug: true,
    defaultNS: "translation",
    backend: {
      loadPath: (lng, ns) => {
        // Dynamiczna ścieżka do plików tłumaczeń
        return `/${ns}/locales/${lng}.json`;
      },
    },
    interpolation: {
      escapeValue: false, // react już automatycznie wykonuje escaping
    },
  });

export default i18n;
