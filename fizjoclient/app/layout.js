import { Inter } from "next/font/google";
import "./globals.scss";
import { AppWrapper } from "./appWraper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Fizjo panel",
  description: "Fizjo panel - end-to-end physiotherapy management system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}
