import s from"./notFound.module.css";

export default function NotFound() {
  return (
    <main className={s.container_notFound}>
      <section>
        <h1>404</h1>
        <p>Ops! Página não encontrada.</p>
      </section>
    </main>
  );
}
