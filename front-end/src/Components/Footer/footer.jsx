import s from "./footer.module.css";

const getYear = () => new Date().getFullYear();

export default function Footer() {
  return (
    <footer className={s.footer}>
      <p>
        &copy; {getYear()} Café da Manhã com história. Todos os direitos
        reservados.
      </p>
    </footer>
  );
}
