import './products.scss';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';

interface Prod {
  id: number;
  name: string;
}

export const Products = () => {
  const [products, setProducts] = useState<Prod[]>([]);
  const [title, setName] = useState('');
  const [filterList, setFilterList] = useState('');

  const fetchProducts = async () => {
    const response = await fetch(
      'https://cookbook-docs.herokuapp.com/api/v1/products'
    );
    const data = await response.json();
    setProducts(data.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProducts = async (_name: string) => {
    if (_name && _name.length > 0 && _name.length <= 64) {
      const rawResponse = await fetch(
        'https://cookbook-docs.herokuapp.com/api/v1/products',
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json;charset=UTF-8',
          },
          body: JSON.stringify({ name: _name }),
        }
      );

      await rawResponse.json();
      fetchProducts();
      setName('');
    } else {
      if (_name.length > 64) {
        alert('Nazwa produktu nie powinna być dłuższa niż 64 znaków!');
      } else {
        alert('Nie podano żadnej nazwy produktu!');
      }
    }
  };

  return (
    <>
      <div className="container-products">
        <div className="addIngredient-searchBar">
          <h3 className="mt-3 mb-3">Wyszukiwanie produktu po nazwie</h3>
        </div>
        <div className="addIngredient-searchBar">
          <input
            type="search"
            placeholder="(np. chleb)"
            id="wyszukiwarka-produktow"
            onChange={(e) => setFilterList(e.target.value)}></input>
        </div>
        <div className="products_view align-middle">
          <div className="item-container">
            {products.map((product, index) => {
              if (product.name.includes(filterList)) {
                return (
                  <Link
                    to={`../product/${product.id}`}
                    key={product.id}
                    className="product">
                    {product.name}
                  </Link>
                );
              } else return null;
            })}
          </div>
          <div className="add-product">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Podaj nazwę produktu (max 64 znaki)</Form.Label>
              <Form.Control
                placeholder="Nazwa produktu"
                id="form-name-product"
                onChange={(event) => setName(event.target.value)}
              />
            </Form.Group>
            <button
              type="button"
              className="button-add-products"
              onClick={() => {
                addProducts(title);
              }}>
              <b>Dodaj produkt</b>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
