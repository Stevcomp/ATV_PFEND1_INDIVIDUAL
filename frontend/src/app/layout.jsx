import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Header from "@/components/Header";

// Estrutura compartilhada: Bootstrap, estilos próprios, cabeçalho e rodapé.
export const metadata = {
  title: "DevResources Manager",
  description: "Gerenciador local de ferramentas para desenvolvedores.",
};

export default function RootLayout({ children }) {
  // Define a estrutura compartilhada por todas as páginas do front-end.
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        <main className="conteudo">{children}</main>
        <footer className="rodape border-top py-3 text-center">
          © {new Date().getFullYear()} DevResources Manager · Catálogo local de ferramentas
        </footer>
      </body>
    </html>
  );
}
