import Link from "next/link";

// Cabeçalho simples reutilizado pelo layout principal.
export default function Header() {
  return (
    <nav className="navbar navbar-expand header">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-6" href="/">DevResources Manager</Link>
        <Link className="btn btn-primary btn-sm" href="https://github.com/Stevcomp/ATV_PFEND1_INDIVIDUAL" target="_blank" rel="noreferrer"> GitHub </Link>
      </div>
    </nav>
  );
}
