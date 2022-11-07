import './recipe.scss';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DelRec as DeleteRecipe } from '../recipeDeletion/deletereq';

type Rec = {
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
  value: number;
  user_id: number;
  thumbnail_url: string;
  comments: [
    {
      id: number;
      author: string;
      body: string;
      created_at: string;
      updated_at: string;
    }
  ];
  ingredients: [
    {
      product_id: number;
      name: string;
      quantity: number;
    }
  ];
};

export const Recipe = () => {
  const [myArray, setTable] = useState<Rec | null>(null);
  const [comment, setComment] = useState('');
  const params = useParams();

  const userInfo = localStorage.getItem('user-info');
  const user = userInfo ? JSON.parse(userInfo) : '';

  const getMyData = async () => {
    const response = await fetch(
      `https://cookbook-docs.herokuapp.com/api/v1/recipes/${params.id}`
    );

    const data: Rec = await response.json();
    setTable(data);
    if (myArray?.price.includes('unknown')) {
      myArray.price = '0';
    } else {
      <span></span>;
    }
  };

  const insertNewComment = async (_comment: string) => {
    if (_comment.length >= 10) {
      const response = await fetch(
        `https://cookbook-docs.herokuapp.com/api/v1/recipes/${params.id}/comments`,
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'access-token': localStorage.getItem('access-token') || '',
            'token-type': 'Bearer',
            expiry: localStorage.getItem('expiry') || '',
            client: localStorage.getItem('client') || '',
            uid: user.data.uid,
          },
          body: JSON.stringify({ author: user.data.email, body: _comment }),
        }
      );
      if (response.status === 200) {
        alert('Pomyślnie dodano komentarz ' + comment + ' do przepisu.');
        setComment('');
        getMyData();
      } else if (response.status === 401) {
        alert(
          'Wystąpił błąd autoryzacji! Spróbuj zalogować się ponownie na konto.'
        );
      } else {
        alert('Wystąpił błąd! Poczekaj chwilę i spróbuj ponownie!');
      }
    } else {
      alert('Komentarz powinien zawierać co najmniej 10 znaków!');
    }
  };

  const insertNewVote = async (vote: number) => {
    const response = await fetch(
      `https://cookbook-docs.herokuapp.com/api/v1/recipes/${params.id}/rates`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value: vote }),
      }
    );
    if (response.status === 200) {
      alert('Pomyślnie oddano ocenę ' + vote + ' na przepis.');
      getMyData();
    } else if (response.status === 422) {
      alert('Już wcześniej głosowano na ten przepis.');
    } else {
      alert('Wystąpił błąd serwera! Poczekaj chwilę i spróbuj ponownie!');
    }
  };

  useEffect(() => {
    getMyData();
  }, []);

  return (
    <>
      {myArray ? (
        <div className="container-recipe">
          <div className="title-recipe mt-3 text-center">
            <h3>{myArray.name}</h3>
          </div>
          {myArray && myArray.video_link && myArray.video_link.length > 8 ? (
            <iframe className="video" src={myArray.video_link}></iframe>
          ) : (
            <div></div>
          )}
          <div className="recipe-details">
            Średnia głosów: {myArray.avg_rate}, łączna liczba głosów:&nbsp;
            {myArray.rates_count}
            <br />
            Na przygotowanie tego przepisu potrzeba około {myArray.cooking_time}
            min.
            <br />
            {myArray.price.includes('unknown')
              ? ''
              : 'Przewidywalna cena potrzebna na zakup produktów: ' +
                myArray.price +
                ' zł'}
          </div>
          <div className="recipe-rates">
            Trudność wykonania:&nbsp;
            {Array.from({ length: 5 }, (_, index) =>
              myArray.level > index ? (
                <span className="difficulty-level-yellow" key={index}>
                  ★&nbsp;&nbsp;
                </span>
              ) : (
                <span className="difficulty-level-black" key={index}>
                  ★&nbsp;&nbsp;
                </span>
              )
            )}
          </div>
          {user && user.data && user.data.email ? (
            <span className="recipe-setVote">
              Oceń przepis:&nbsp;
              {Array.from({ length: 5 }, (_, index) => (
                <button
                  type="button"
                  className="setVoteStar"
                  key={index}
                  onClick={() => {
                    insertNewVote(index + 1);
                  }}>
                  ★
                </button>
              ))}
            </span>
          ) : (
            <span></span>
          )}
          <div className="recipe-media">
            {myArray.thumbnail_url ? (
              <span>Link do miniaturki: {myArray.thumbnail_url}</span>
            ) : (
              <span>Ten przepis nie ma odnośnika do miniaturki.</span>
            )}
            <br />
            {myArray.photo_url ? (
              <span>Link do przykładowych zdjęć: {myArray.photo_url}</span>
            ) : (
              <span>Ten przepis nie ma przesłanych przykładowych zdjeć.</span>
            )}
          </div>

          <div className="recipe-description">
            Opis: <br />
            {myArray.content}
          </div>

          {myArray.ingredients && myArray.ingredients.length > 0 ? (
            <div className="recipe-ingredients">
              <div className="recipe-ingredient">Składniki:</div>
              {myArray.ingredients.map((ingredient, index) => {
                return (
                  <div
                    key={ingredient.product_id + ',i:' + index}
                    className="recipe-ingredient">
                    {ingredient.name} ({ingredient.quantity} szt.)
                  </div>
                );
              })}
            </div>
          ) : (
            <span></span>
          )}

          {localStorage && localStorage.getItem('user-info') ? (
            <div className="recipe-options">
              <DeleteRecipe
                recipe={myArray}
                onClick={() => {
                  return null;
                }}
              />
              <Link
                to={`../recipe/${myArray.id}/edit`}
                type="button"
                key={'editRecipe'}
                className="recipe-button">
                Edytuj przepis
              </Link>
              <Link
                to={`../recipe/${myArray.id}/addIngredients`}
                type="button"
                key={'addIngredients'}
                className="recipe-button">
                Dodaj składniki
              </Link>
            </div>
          ) : (
            <span></span>
          )}

          {myArray.comments && myArray.comments.length > 0 ? (
            <div className="comments">
              <div className="comments-title">Sekcja komentarzy</div>
              {myArray.comments.map((comment, index) => {
                return (
                  <div className="comment" key={comment.id}>
                    <div className="author">{comment.author}</div>
                    <div className="date">{comment.created_at}</div>
                    <div className="body">{comment.body}</div>
                  </div>
                );
              })}
              <br />
            </div>
          ) : (
            <span></span>
          )}
          {user && user.data && user.data.uid ? (
            <>
              <div className="recipe-add-comment">
                <textarea
                  id="content"
                  className="recipe-textArea-comment"
                  placeholder="Tu wpisz komentarz... (min. 10 znaków)"
                  maxLength={1024}
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                />
              </div>
              <div className="recipe-add-comment">
                <button
                  type="button"
                  className="recipe-button"
                  onClick={() => {
                    insertNewComment(comment);
                  }}>
                  Dodaj komentarz
                </button>
              </div>
            </>
          ) : (
            <span></span>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};
