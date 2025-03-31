import s from "./inicio.module.css";

export default function Inicio() {
  return (
    <main className={s.main_inicio}>
      <section id="inicio" className={s.section_inicio}>
        <div className={s.inicio__intro}>
          <h2>Bem-vindo ao nosso Café da Manhã!</h2>
          <p>
            Aqui você encontrará histórias e delícias de dar água na boca.
            Aproveite!
          </p>
        </div>
      </section>
    </main>
  );
}
