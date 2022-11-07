import './recipeEdit.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export const RecipeEdit = () => {
  const [name, setName] = useState('');
  const [cookingTime, setCookingTime] = useState(0);
  const [content, setContent] = useState('');
  const [price, setPrice] = useState('');
  const [level, setLevel] = useState(1);
  const [photoURL, setPhotoURL] = useState('');
  const [thumbnailURL, setThumbnailURL] = useState('');

  const navigate = useNavigate();
  const params = useParams();

  const isLogged = () => {
    if (!localStorage.getItem('user-info') || !localStorage.getItem('client')) {
      navigate(`../recipe/${params.id}`);
    }
  };
  setTimeout(isLogged, 50);

  if (!localStorage || !localStorage.getItem('user-info')) {
    navigate(`../recipe/${params.id}`);
  } else {
    const getMyData = async () => {
      const response = await fetch(
        `https://cookbook-docs.herokuapp.com/api/v1/recipes/${params.id}`
      );
      if (response.status !== 404) {
        const data = await response.json();

        setName(data.name);
        setContent(data.content);
        setCookingTime(data.cooking_time);
        if (data.price.includes('unknown')) setPrice('');
        else setPrice(data.price);

        setLevel(data.level);
        if (data.photo_url) {
          setPhotoURL(data.photo_url);
        } else setPhotoURL('');
        if (data.thumbnail_url) {
          setPhotoURL(data.thumbnail_url);
        } else setThumbnailURL('');
      } else {
        navigate('../recipes');
      }
    };

    useEffect(() => {
      getMyData();
    }, []);
  }

  const updateDataRecipe = async (
    _name: string,
    _content: string,
    _cookingTime: number,
    _price: string,
    _level: number,
    _photoURL: string,
    _thumbnailurl: string
  ) => {
    console.log(_photoURL);
    if (
      photoURL.length === 0 ||
      (photoURL.length > 0 &&
        (photoURL.includes('imgur.com/') || photoURL.includes('i.imgur.com/')))
    ) {
      const response = await fetch(
        `https://cookbook-docs.herokuapp.com/api/v1/recipes/${params.id}`,
        {
          method: 'PUT',
          headers: {
            'content-type': 'application/json;charset=UTF-8',
          },
          body: JSON.stringify({
            name: _name,
            content: _content,
            cooking_time: _cookingTime,
            price: _price,
            level: _level,
            photo_url: _photoURL,
            thumbnail_url: _thumbnailurl,
          }),
        }
      );
      await response.json();
      navigate(`../recipe/${params.id}`);
      alert('Przepis został pomyślnie edytowany!');
    } else
      alert('Link do obrazka powinien zawierać link w postaci imgur.com/....');
  };

  return (
    <>
      <div className="container-edit-recipe">
        <div className="edit-background">
          <div className="edit-recipe-title">
            Edycja przepisu - id: {params.id}
          </div>
          <div className="edit-recipe-label">
            <label htmlFor="name">Nazwa przepisu (max 64 znaków)</label>
          </div>
          <div className="edit-recipe-field">
            <input
              type="text"
              id="name"
              className="textField"
              maxLength={64}
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div className="edit-recipe-label">
            <label htmlFor="name">Opis przepisu(max 1024 znaki)</label>
          </div>
          <div className="edit-recipe-field">
            <textarea
              id="content"
              className="textArea"
              maxLength={1024}
              value={content}
              onChange={(event) => setContent(event.target.value)}
            />
          </div>
          <div className="edit-recipe-label">
            <label htmlFor="name">
              Średni czas potrzebny na przygotowanie przepisu (minuty)
            </label>
          </div>
          <div className="edit-recipe-field">
            <input
              type="text"
              id="cooking_time"
              className="cookingTime"
              maxLength={3}
              value={cookingTime}
              onChange={(event) => setCookingTime(+event.target.value)}
            />
          </div>
          <div className="edit-recipe-label">
            <label htmlFor="name">
              Średni koszt produktów potrzebnych do przygotowania przepisu
            </label>
          </div>
          <div className="edit-recipe-field">
            <input
              type="text"
              id="price"
              className="price"
              maxLength={9}
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
          </div>
          <div className="edit-recipe-label">
            <label htmlFor="name">
              Poziom trudności wykonania przepisu (1-5)
            </label>
          </div>
          <div className="edit-recipe-field">
            <input
              type="text"
              id="level"
              className="level"
              minLength={1}
              maxLength={5}
              value={level}
              onChange={(event) => setLevel(+event.target.value)}
            />
          </div>
          <div className="edit-recipe-label">
            <label htmlFor="name">
              Link do miniaturki (serwis: i.imgur.com)
            </label>
          </div>
          <div className="edit-recipe-field">
            <input
              type="text"
              id="thumbnailURL"
              className="media-links"
              value={thumbnailURL}
              onChange={(event) => setThumbnailURL(event.target.value)}
            />
          </div>
          <div className="edit-recipe-label">
            <label htmlFor="name">
              Link do przykładowych zdjęć (serwis: i.imgur.com)
            </label>
          </div>
          <div className="edit-recipe-field">
            <input
              type="text"
              id="photoURL"
              className="media-links"
              value={photoURL}
              onChange={(event) => setPhotoURL(event.target.value)}
            />
          </div>
          {name ? (
            <button
              type="button"
              className="edit-recipe-saveButton"
              key={name}
              onClick={async () => {
                await updateDataRecipe(
                  name,
                  content,
                  cookingTime,
                  price,
                  level,
                  photoURL,
                  thumbnailURL
                );
              }}>
              Zapisz zmiany
            </button>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </>
  );
};
