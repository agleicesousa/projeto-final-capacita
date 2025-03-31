import { useState, useEffect } from "react";
import { fetchItemsByCategory } from "../../services/api";
import s from "./menu.module.css";

export default function Menu() {
  const [category, setCategory] = useState("CAFES");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadItems = async () => {
      try {
        setLoading(true);
        const response = await fetchItemsByCategory(category);
        setItems(response.data);
        setError(null);
      } catch (err) {
        console.error("Erro ao carregar itens:", err);
        setError("Erro ao carregar itens do menu. Tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, [category]);

  const categories = [
    { value: "CAFES", label: "Cafés" },
    { value: "SOBREMESAS", label: "Sobremesas" },
    { value: "ESPECIAIS", label: "Especiais" },
    { value: "BEBIDAS_GELADAS", label: "Bebidas Geladas" },
    { value: "CHAS", label: "Chás" }
  ];

  return (
    <main className={s.main_menu}>
      <section className={s.section_menu}>
        <img 
          src="/logo-cafe.png" 
          alt="Cafeteria Avante" 
          className={s.img_menu}
        />
        <h1>Menu</h1>
      </section>

      <nav className={s.nav_opcao_menu}>
        <ul>
          {categories.map((cat) => (
            <li key={cat.value}>
              <button
                className={category === cat.value ? "active" : ""}
                onClick={() => setCategory(cat.value)}
              >
                {cat.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className={s.lista_itens_menu}>
        {loading ? (
          <p>Carregando itens...</p>
        ) : error ? (
          <p className={s.error}>{error}</p>
        ) : items.length === 0 ? (
          <p>Nenhum item disponível nesta categoria</p>
        ) : (
          <ul>
            {items.map((item) => (
              <li key={item.id} className={s.item_menu}>
                <div>
                  <h3>{item.nome}</h3>
                  <p>{item.descricao}</p>
                </div>
                <span className={s.preco_item}>
                  R$ {Number(item.preco).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}