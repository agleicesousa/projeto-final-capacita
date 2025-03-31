import { useState, useEffect } from "react";
import s from "./pedidos.module.css";
import Modal from "../../Components/Modal/modal";
import { createOrderWithClient } from "../../services/api";

export default function Pedidos() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [pedido, setPedido] = useState([]);
  const [total, setTotal] = useState(0);
  const [nome, setNome] = useState("");
  const [mesa, setMesa] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Debug
  useEffect(() => {
    console.log('Itens no pedido:', pedido);
  }, [pedido]);

  // Atualiza o total sempre que o pedido muda
  useEffect(() => {
    const newTotal = pedido.reduce((sum, item) => sum + (item.precoUnitario * item.quantidade), 0);
    setTotal(parseFloat(newTotal.toFixed(2)));
  }, [pedido]);

  const openModal = (category) => {
    setSelectedCategory(category);
    setIsModalVisible(true);
  };

  const closeModal = () => setIsModalVisible(false);

  const addItemToPedido = (itemName, menuId, quantidade, precoUnitario) => {
    setPedido(prevPedido => {
      const itemExistenteIndex = prevPedido.findIndex(item => item.menuId === menuId);
      
      if (itemExistenteIndex >= 0) {
        const updatedItems = [...prevPedido];
        updatedItems[itemExistenteIndex] = {
          ...updatedItems[itemExistenteIndex],
          quantidade: updatedItems[itemExistenteIndex].quantidade + quantidade,
          precoUnitario: precoUnitario
        };
        return updatedItems;
      } else {
        return [
          ...prevPedido,
          {
            item: itemName,
            menuId,
            quantidade,
            precoUnitario
          }
        ];
      }
    });
  };

  const removerItem = (menuId) => {
    setPedido(prevPedido => prevPedido.filter(item => item.menuId !== menuId));
  };

  const finalizarPedido = async () => {
    if (!nome || !mesa) {
      setError("Nome e número da mesa são obrigatórios!");
      return;
    }
  
    if (pedido.length === 0) {
      setError("Adicione itens ao pedido antes de finalizar");
      return;
    }
  
    setLoading(true);
    setError("");
  
    try {
      // Prepara os dados no formato correto
      const pedidoData = {
        cliente: {
          nome: nome.trim(),
          mesaNumero: parseInt(mesa)
        },
        itens: pedido.map(item => ({
          menuId: parseInt(item.menuId),
          quantidade: parseInt(item.quantidade),
          precoUnitario: parseFloat(item.precoUnitario)
        })),
        total: parseFloat(total.toFixed(2))
      };
  
      console.log('Dados sendo enviados:', JSON.stringify(pedidoData, null, 2));
  
      const response = await createOrderWithClient(pedidoData);
      
      if (response.error) {
        throw new Error(response.message || 'Erro ao criar pedido');
      }
  
      // Limpa o estado após sucesso
      setPedido([]);
      setTotal(0);
      setNome("");
      setMesa("");
      alert("Pedido finalizado com sucesso!");
    } catch (err) {
      console.error("Erro detalhado:", {
        error: err,
        message: err.message,
        stack: err.stack
      });
      setError(err.message || "Erro ao finalizar pedido. Verifique os dados.");
    } finally {
      setLoading(false);
    }
  };

  const cancelarPedido = () => {
    if (pedido.length > 0 && !window.confirm("Deseja realmente cancelar este pedido?")) {
      return;
    }
    setPedido([]);
    setTotal(0);
    setNome("");
    setMesa("");
    setError("");
  };

  return (
    <>
      <main className={s.main_pedidos}>
        <section className={s.section_pedidos}>
          <h1 className={s.titulo_pedidos}>Faça seu pedido</h1>
          <section className={s.container_pedidos}>
            <div className={s.cliente_pedidos}>
              <section className={s.section_name}>
                <label htmlFor="name">Nome:</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                  disabled={loading}
                />
              </section>
              <section className={s.section_mesa}>
                <label htmlFor="mesa">Número da mesa:</label>
                <input
                  id="mesa"
                  type="number"
                  name="mesa"
                  value={mesa}
                  onChange={(e) => setMesa(e.target.value)}
                  min="1"
                  required
                  disabled={loading}
                />
              </section>
            </div>

            <div className={s.produtos_pedidos}>
              <section className={s.section_produtos}>
                <button
                  className={s.btn_produtos}
                  onClick={() => openModal("CAFES")}
                  disabled={loading}
                >
                  Cafés
                </button>
                <button
                  className={s.btn_produtos}
                  onClick={() => openModal("SOBREMESAS")}
                  disabled={loading}
                >
                  Sobremesas
                </button>
              </section>
              <section className={s.section_produtos}>
                <button
                  className={s.btn_produtos}
                  onClick={() => openModal("ESPECIAIS")}
                  disabled={loading}
                >
                  Especiais
                </button>
                <button
                  className={s.btn_produtos}
                  onClick={() => openModal("BEBIDAS_GELADAS")}
                  disabled={loading}
                >
                  Bebidas
                </button>
              </section>
              <section className={s.section_produtos}>
                <button
                  className={s.btn_produtos}
                  onClick={() => openModal("CHAS")}
                  disabled={loading}
                >
                  Chás
                </button>
              </section>
            </div>

            <div className={s.itens_pedido}>
              <h2>Itens no pedido:</h2>
              {error && <p className={s.error}>{error}</p>}
              <div className={s.lista_itens}>
                {pedido.length === 0 ? (
                  <p>Nenhum item adicionado</p>
                ) : (
                  <ul>
                    {pedido.map((item, index) => (
                      <li key={`${item.menuId}-${index}`}>
                        {item.quantidade}x {item.item} - R${" "}
                        {(item.quantidade * item.precoUnitario).toFixed(2)}
                        <button
                          onClick={() => removerItem(item.menuId)}
                          className={s.btn_remover}
                          disabled={loading}
                        >
                          ×
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className={s.total_pedidos}>
              <section className={s.section_total}>
                <h2>Total:</h2>
                <h2>R$ {total.toFixed(2)}</h2>
              </section>
              <section className={s.section_total}>
                <button
                  className={s.btn_total}
                  onClick={finalizarPedido}
                  disabled={pedido.length === 0 || loading}
                >
                  {loading ? "Processando..." : "Finalizar Pedido"}
                </button>
                <button
                  className={s.btn_total}
                  onClick={cancelarPedido}
                  disabled={pedido.length === 0 || loading}
                >
                  Cancelar Pedido
                </button>
              </section>
            </div>
          </section>
        </section>
      </main>

      {isModalVisible && (
        <Modal
          closeModal={closeModal}
          category={selectedCategory}
          addItemToPedido={addItemToPedido}
        />
      )}
    </>
  );
}