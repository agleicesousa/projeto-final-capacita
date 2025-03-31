import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import s from "./modal.module.css";
import { fetchItemsByCategory } from "../../services/api";

export default function Modal({ closeModal, category, addItemToPedido }) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantidade, setQuantidade] = useState(1);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Debug
  useEffect(() => {
    console.log('Itens selecionados no modal:', selectedItems);
  }, [selectedItems]);

  useEffect(() => {
    const loadMenuItems = async () => {
      try {
        setLoading(true);
        const response = await fetchItemsByCategory(category);
        setMenuItems(response.data);
        setError(null);
      } catch (err) {
        console.error("Erro ao carregar itens:", err);
        setError("Erro ao carregar itens do menu. Tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    loadMenuItems();
  }, [category]);

  const addItem = () => {
    try {
      if (!selectedItem || quantidade < 1) {
        alert('Selecione um item e uma quantidade válida');
        return;
      }

      const item = menuItems.find(item => item.id === parseInt(selectedItem));
      if (!item) {
        alert('Item não encontrado');
        return;
      }

      setSelectedItems(prevItems => {
        const existingItemIndex = prevItems.findIndex(i => i.menuId === selectedItem);
        
        if (existingItemIndex >= 0) {
          const updatedItems = [...prevItems];
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantidade: updatedItems[existingItemIndex].quantidade + quantidade,
            precoUnitario: item.preco
          };
          return updatedItems;
        } else {
          return [
            ...prevItems,
            {
              item: item.nome,
              menuId: item.id,
              quantidade,
              precoUnitario: item.preco
            }
          ];
        }
      });

      setSelectedItem(null);
      setQuantidade(1);
    } catch (error) {
      console.error('Erro ao adicionar item:', error);
      alert('Erro ao adicionar item');
    }
  };

  const confirmItems = () => {
    try {
      if (selectedItems.length === 0) {
        alert('Nenhum item selecionado');
        return;
      }

      selectedItems.forEach(item => {
        addItemToPedido(
          item.item,
          item.menuId,
          item.quantidade,
          item.precoUnitario
        );
      });

      setSelectedItems([]);
      closeModal();
    } catch (error) {
      console.error('Erro ao confirmar itens:', error);
      alert('Erro ao adicionar itens ao pedido');
    }
  };

  if (loading) {
    return (
      <main className={s.modal}>
        <section className={s.container_modal}>
          <p>Carregando itens do menu...</p>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className={s.modal}>
        <section className={s.container_modal}>
          <p>{error}</p>
          <button onClick={closeModal}>Fechar</button>
        </section>
      </main>
    );
  }

  return (
    <main className={s.modal}>
      <section className={s.container_modal} id="modal">
        <section className={s.section_modal}>
          <h2>Selecione os itens e as quantidades</h2>
          <div className={s.produtos_modal}>
            <section className={s.section_produtos_modal}>
              <div className={s.item_modal}>
                <h3>Item:</h3>
                <select
                  value={selectedItem || ""}
                  onChange={(e) => setSelectedItem(e.target.value)}
                  disabled={menuItems.length === 0}
                >
                  <option value="">Selecione um item</option>
                  {menuItems.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.nome} - R$ {Number(item.preco).toFixed(2)}
                    </option>
                  ))}
                </select>
              </div>
            </section>
            <section className={s.section_quantidade_modal}>
              <h3>Quantidade:</h3>
              <input
                type="number"
                value={quantidade}
                onChange={(e) => setQuantidade(Math.max(1, Number(e.target.value)))}
                min="1"
                disabled={!selectedItem}
              />
            </section>
          </div>

          {selectedItems.length > 0 && (
            <div className={s.lista_itens_modal}>
              <h3>Itens adicionados:</h3>
              <ul>
                {selectedItems.map((item, index) => (
                  <li key={index}>
                    {item.quantidade}x {item.item} - R$ {(item.quantidade * item.precoUnitario).toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <section className={s.btn_modal}>
            <button 
              className={s.btn_add_item} 
              onClick={addItem}
              disabled={!selectedItem || quantidade < 1}
            >
              Adicionar Item
            </button>
            <button 
              className={s.btn_confirmar} 
              onClick={confirmItems}
              disabled={selectedItems.length === 0}
            >
              Adicionar ao Pedido
            </button>
            <button className={s.btn_cancelar} onClick={closeModal}>
              Cancelar
            </button>
          </section>
        </section>
      </section>
    </main>
  );
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  addItemToPedido: PropTypes.func.isRequired,
};