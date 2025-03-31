import s from "./historias.module.css";

export default function Historias() {
  return (
    <main className={s.main_historias}>
      <h1 className={s.titulo_historias}>Histórias</h1>
      <div className={s.descricao}>
        <h3>
          Descubra as histórias inspiradoras que fazem parte do Café do Amanhã.
          Desde as viagens aventureiras de Nanda até as serenatas à beira-mar de
          Junior, cada momento é uma celebração de suas paixões.
        </h3>
      </div>
      <div className={s.container}>
        <div className={s.box}>
          <h2>Rock nas estradas</h2>
          <h3>
            Nanda sempre teve uma alma inquieta, apaixonada por viagens e pela
            liberdade que só a estrada pode oferecer. Durante uma viagem pelo
            interior do Brasil, ao som de suas bandas de rock favoritas, ela
            descobriu um pequeno café escondido em uma vida remota. Inspirada
            pelo lugar, decidiu trazer essa experiência única para o Café do
            Amanhã, onde o aroma do café se mistura com a trilha sonora de suas
            aventuras.
          </h3>
        </div>

        <div className={s.box}>
          <h2>MPB à Beira-mar</h2>
          <h3>
            Junior, por outro lado, encontra a verdadeira paz ao som das ondas
            do mar e de uma boa música brasileira. Sua paixão pela MPB é
            evidente em cada detalhe do Café do Amanhã, onde as melodias de
            grandes ícones como Vinicius de Moraes e Tom Jobim preenchem o
            ambiente. Foi em uma noite tranquila, sentado na areia e ouvindo
            "Garota de Ipanema", que Junior teve a ideia de criar um espaço onde
            música e café se encontram em perfeita harmonia.
          </h3>
        </div>

        <div className={s.box}>
          <h2>Um encontro de paixões</h2>
          <h3>
            Quando Nanda e Junior se conheceram, parecia que o destino havia
            reunido duas almas complementares. Enquanto Nanda compartilha suas
            histórias de viagem e seu amor pelo rock, Junior fala de suas noites
            à beira-mar e da suavidade da MPB, juntos, transformaram o Café do
            Amanhã em um lugar onde cada visita é uma nova história, cada xícara
            de café um novo capítulo, e cada canção no ar uma celebração de
            paixões.
          </h3>
        </div>
      </div>
    </main>
  );
}