import './recipes.scss';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PaginationBar } from '../pagination/pagination';

export interface Recipe {
  id: number;
  name: string;
  content: string;
  rates_count: number;
}

export const Recipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(0);
  const [sortingOrder, setSortingOrder] = useState('asc');
  const [sortingBy, setSortingBy] = useState('name');
  const pageSize: number = 10;
  const [searchTerm, setSearchTerm] = useState('');

  const fetchRecipes = async (
    currentPage: number,
    pageSize: number,
    sortBy: string,
    sortOrder: string
  ) => {
    let responce = null;
    if (sortBy.length > 0) {
      if (sortOrder.length > 0) {
        responce = await fetch(
          `https://cookbook-docs.herokuapp.com/api/v1/recipes?page=${currentPage}&per_page=${pageSize}&sort_by=${sortBy}&sort_order=${sortOrder}`
        );
      } else {
        responce = await fetch(
          `https://cookbook-docs.herokuapp.com/api/v1/recipes?page=${currentPage}&per_page=${pageSize}&sort_by=${sortBy}`
        );
      }
    } else {
      if (sortOrder.length > 0) {
        responce = await fetch(
          `https://cookbook-docs.herokuapp.com/api/v1/recipes?page=${currentPage}&per_page=${pageSize}&sort_by=name&sort_order=${sortOrder}`
        );
      } else {
        responce = await fetch(
          `https://cookbook-docs.herokuapp.com/api/v1/recipes?page=${currentPage}&per_page=${pageSize}`
        );
      }
    }
    return responce.json();
  };

  const onPagination = (currentPage: number) => {
    fetchRecipes(currentPage, pageSize, sortingBy, sortingOrder).then(
      (recipes) => {
        setRecipes(recipes.data);
      }
    );
    setCurrentPage(currentPage);
  };

  const sortingOrderChange = (event: string) => {
    if (event === 'desc' || event === 'asc') {
      setSortingOrder(event);
      fetchRecipes(currentPage, pageSize, sortingBy, event).then((recipes) => {
        setRecipes(recipes.data);
      });
    } else {
      setSortingBy(event);
      if (event.includes('- - - - - - - - - - - - - -')) {
        fetchRecipes(currentPage, pageSize, '', '').then((recipes) => {
          setRecipes(recipes.data);
        });
      } else {
        setSortingBy(event);
        fetchRecipes(currentPage, pageSize, event, sortingOrder).then(
          (recipes) => {
            setRecipes(recipes.data);
          }
        );
      }
    }
  };

  useEffect(() => {
    fetchRecipes(currentPage, pageSize, 'name', 'asc').then((recipes) => {
      setRecipes(recipes.data);
      setPageCount(recipes.pagination.total);
    });
  }, []);

  return (
    <div>
      <div className="recipe-list">
        <div className="mt-1">
          <h1> Lista przepisów</h1>
        </div>

        <div className="recipe-sort">
          Sortowanie listy:&nbsp;
          <select
            onChange={(event) => sortingOrderChange(event.target.value)}
            value={sortingOrder}>
            <option value="asc">rosnąco</option>
            <option value="desc">malejąco</option>
          </select>
        </div>
        <div className="recipe-sort">
          Sortowanie ze względu na:&nbsp;
          <select
            onChange={(event) => sortingOrderChange(event.target.value)}
            value={sortingBy}>
            <option value="name">nazwę</option>
            <option value="level">trudność wykonania</option>
            <option value="cooking_time">czas przygotowywania</option>
            <option value="avg_rate">średnią ocenę</option>
          </select>
        </div>
        <div className="col-sm-3 col-sm-offset-8 m-auto mt-2 ps-3 pe-3">
          <input
            className="form-control col-xs-3 text-center"
            placeholder="Szukaj..."
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="item-container">
          {recipes
            // eslint-disable-next-line array-callback-return
            .filter((value) => {
              if (searchTerm === '') {
                return value;
              } else if (
                value.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                value.content.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return value;
              }
            })
            .map((recipe) => {
              return (
                <Link
                  className="cards2"
                  to={`../recipe/${recipe.id}`}
                  key={recipe.id}>
                  <div className="card">
                    <h3>{recipe.name}</h3>
                    <hr></hr>
                    <div className="card_content">{recipe.content}</div>
                    <hr></hr>
                    <p>Liczba ocen: {recipe.rates_count}</p>
                  </div>
                </Link>
              );
            })}
        </div>
        <PaginationBar
          onPagination={onPagination}
          currentPage={currentPage}
          pageCount={pageCount}
        />
      </div>
    </div>
  );
};
