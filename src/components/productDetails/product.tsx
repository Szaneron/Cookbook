import './product.scss';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';

interface Prod {
  id: number;
  name: string;
}

export const Product = () => {
  const [product, setProduct] = useState<Prod | null>(null);
  const params = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');

  const getMyData = async () => {
    const response = await fetch(
      `https://cookbook-docs.herokuapp.com/api/v1/products/${params.id}`
    );
    const data: Prod = await response.json();
    setProduct(data);
  };

  const deleteProduct = async (id: number) => {
    const proceed = confirm('Potwierdź, że chcesz usunąć produkt.');
    if (proceed) {
      const response = await fetch(
        `https://cookbook-docs.herokuapp.com/api/v1/products/${id}`,
        {
          method: 'DELETE',
        }
      );
      await response.json();
      navigate('../products');
    }
  };

  const updateProduct = async (id: number, _name: string) => {
    if (_name && _name.length > 0) {
      const response = await fetch(
        `https://cookbook-docs.herokuapp.com/api/v1/products/${id}`,
        {
          method: 'PUT',
          headers: {
            'content-type': 'application/json;charset=UTF-8',
          },
          body: JSON.stringify({ name: _name }),
        }
      );
      await response.json();
      setName('');
      getMyData();
      alert('Pomyślnie zaktualizowano nazwę przepisu!');
    } else {
      alert('Nie podano nazwy przepisu. Powinna być ona dłuższa niż 1 znak!');
    }
  };

  useEffect(() => {
    getMyData();
  }, []);

  return (
    <div>
      {product ? (
        <>
          <div className="container-product">
            <div className="title-product">Szczegóły produktu</div>

            <div className="product-info-details">
              Nazwa produktu: {product.name}
              <br />
              ID produktu w bazie danych: {product.id}
            </div>
            {localStorage.getItem('user-info') ||
            localStorage.getItem('client') ? (
              <div>
                <div className="product-edit">
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Podaj nazwę produktu (max 64 znaki)</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Nazwa produktu"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                    />
                  </Form.Group>
                  <button
                    type="button"
                    className="product-button"
                    onClick={() => {
                      updateProduct(product.id, name);
                    }}>
                    Edytuj nazwę produktu
                  </button>
                  <button
                    type="button"
                    className="product-button"
                    onClick={async () => {
                      await deleteProduct(product.id);
                    }}>
                    Usuń produkt
                  </button>
                </div>
              </div>
            ) : (
              <span></span>
            )}
          </div>
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
};
