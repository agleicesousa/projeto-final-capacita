const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

export const fetchItemsByCategory = async (category) => {
    try {
        const response = await fetch(`${API_URL}/menu/itens/categoria/${category}`);
        if (!response.ok) {
            throw new Error('Erro ao buscar itens');
        }
        return await response.json();
    } catch (error) {
        console.error('Erro na requisição:', error);
        throw error;
    }
};

export const createOrder = async (orderData) => {
    try {
        const response = await fetch(`${API_URL}/pedidos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        });
        if (!response.ok) {
            throw new Error('Erro ao criar pedido');
        }
        return await response.json();
    } catch (error) {
        console.error('Erro na requisição:', error);
        throw error;
    }
};

export const createOrderWithClient = async (orderData) => {
    try {
        const response = await fetch(`${API_URL}/pedidos/com-cliente`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        });

        const data = await response.json();

        if (!response.ok) {
            // Extrai mensagem de erro do backend se disponível
            const errorMsg = data.message || `Erro ${response.status}: ${response.statusText}`;
            throw new Error(errorMsg);
        }

        return data;
    } catch (error) {
        console.error('Erro na requisição:', {
            url: `${API_URL}/pedidos/com-cliente`,
            error: error.message,
            requestData: orderData
        });
        throw error;
    }
}
