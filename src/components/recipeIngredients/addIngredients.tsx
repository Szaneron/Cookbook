import './addIngredients.scss';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

type Recipe = {
  id: number;
  name: string;
  price: string;
  avg_rate: number;
  rates_count: number;
  cooking_time: number;
  level: number;
  content: string;
  video_link: string;
  photo_url: string;
  ingredients: [];
};

interface Product {
  id: number;
  name: string;
}
interface ProductList {
  product_id: number;
  quantity: number;
}

export const AddIngredients = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [filterList, setFilterList] = useState('');
  const [productsList, setProductsList] = useState<ProductList[]>([]);

  const params = useParams();
  const navigate = useNavigate();

  if (!localStorage.getItem('user-info')) {
    navigate(`../recipe/${params.id}`);
  }

  const fetchProducts = async () => {
    const response = await fetch(
      'https://cookbook-docs.herokuapp.com/api/v1/products'
    );
    const data = await response.json();
    setProducts(data.products);
  };

  const fetchRecipes = async () => {
    const response = await fetch(
      `https://cookbook-docs.herokuapp.com/api/v1/recipes/${params.id}`
    );
    const data: Recipe = await response.json();
    setRecipe(data);
    setProductsList(data.ingredients);

    console.log(recipe);
  };

  const addProductToList = (productID: number) => {
    const id = productsList.findIndex(
      (product) => product.product_id === productID
    );

    if (id > -1) {
      productsList[id].quantity++;
      setProductsList([...productsList]);
    } else {
      setProductsList([
        ...productsList,
        { product_id: productID, quantity: 1 },
      ]);
    }
  };

  const getProductName = (productID: number) => {
    let str = '';
    for (const product of products) {
      if (product.id === productID) {
        str = product.name;
        break;
      }
    }
    return str;
  };

  const saveProducts = async () => {
    const response = await fetch(
      `https://cookbook-docs.herokuapp.com/api/v1/recipes/${params.id}`,
      {
        method: 'PUT',
        headers: {
          'content-type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify({
          ingredients_attributes: productsList,
        }),
      }
    );
    console.log(productsList);
    await response.json();
    navigate(`../recipe/${params.id}`);
    alert('Skład przepisu został pomyślnie edytowany!');
    console.log(productsList);
  };

  useEffect(() => {
    fetchProducts();
    fetchRecipes();
  }, []);

  return (
    <>
      <div className="add-ingredients-container">
        <div className="addIngredient-title">Lista produktów</div>
        <div className="addIngredient-searchBar">
          Wyszukiwanie produktu po nazwie
        </div>
        <div className="addIngredient-searchBar">
          <input
            type="search"
            placeholder="(np. chleb)"
            id="wyszukiwarka-produktow"
            onChange={(e) => setFilterList(e.target.value)}></input>
        </div>
        <div className="add-ingredients-container">
          {' '}
          {productsList && productsList.length > 0 ? (
            <div className="addIngredient-yourProducts">
              <span className="addIngredient-titleProducts">
                Twoje produkty:
              </span>
              {productsList.map((product, index) => {
                return (
                  <div key={product.product_id + 'i: ' + index}>
                    {getProductName(product.product_id)}, ilość:{' '}
                    {product.quantity}
                  </div>
                );
              })}
              {
                <button
                  type="button"
                  className="addIngredient-button"
                  onClick={saveProducts}>
                  Zaktualizuj skład produktów
                </button>
              }
            </div>
          ) : (
            <div></div>
          )}
        </div>

        <div className="item-container">
          {products.map((product) => {
            if (product.name.includes(filterList)) {
              return (
                <button
                  type="button"
                  key={product.name}
                  className="product"
                  onClick={() => {
                    addProductToList(product.id);
                  }}>
                  {product.name}
                </button>
              );
            } else return null;
          })}
        </div>
      </div>
    </>
  );
};
