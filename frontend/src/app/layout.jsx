import "./globals.css";
import Header from "@/components/Header";

export const metadata = {
  title: "DevResources Manager",
  description: "Catálogo colaborativo de ferramentas para desenvolvedores.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        <main className="app-content">{children}</main>
        <footer className="site-footer">© {new Date().getFullYear()} DevResources Manager · Feito para quem desenvolve.</footer>
      </body>
    </html>
  );
}
