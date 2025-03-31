import s from "./header.module.css";
import { NavLink } from "react-router-dom";
import Logo from "/assets/coffee.png";

export default function Header() {
  return (
    <header className={s.header}>
      <section className={s.logo}>
        <img src={Logo} alt="Logo da página" />
        <h1 className={s.titulo_header}>Café do Amanhã</h1>
      </section>
      <section className={s.nav_header}>
        <ul className={s.nav_menu}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? s.active : "")}
            >
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/menu"
              className={({ isActive }) => (isActive ? s.active : "")}
            >
              Menu
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/pedidos"
              className={({ isActive }) => (isActive ? s.active : "")}
            >
              Pedidos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contatos"
              className={({ isActive }) => (isActive ? s.active : "")}
            >
              Contatos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/historias"
              className={({ isActive }) => (isActive ? s.active : "")}
            >
              Histórias
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/sobre-nos"
              className={({ isActive }) => (isActive ? s.active : "")}
            >
              Sobre Nós
            </NavLink>
          </li>
        </ul>
      </section>
    </header>
  );
}

