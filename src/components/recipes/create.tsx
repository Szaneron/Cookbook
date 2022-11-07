import { useState, useEffect } from 'react';
import './recipes.scss';
import { useNavigate } from 'react-router-dom';

export const RecipesForm = () => {
  const navigate = useNavigate();

  const getUserData = () => {
    if (
      localStorage.getItem('user-info') ||
      localStorage.getItem('expiry') ||
      localStorage.getItem('client')
    ) {
      return null;
    } else {
      navigate('../recipes');
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const [name, setName] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [videoLink, setVideoLink] = useState<string>('');
  const [cookingTime, setCookingTime] = useState<number>(0);
  const [level, setLevel] = useState<number>(0);

  const onchangeName = (value: string) => {
    setName(value);
  };
  const onchangeContent = (value: string) => {
    setContent(value);
  };
  const onChangePrice = (value: string) => {
    setPrice(value);
  };
  const onChangeVideoLink = (value: string) => {
    setVideoLink(value);
  };
  const onChangeCookingTime = (value: number) => {
    setCookingTime(value);
  };
  const onChangeLevel = (value: number) => {
    setLevel(value);
  };

  function addRecipe(
    name: string,
    content: string,
    price: string,
    videoLink: string,
    cookingTime: number,
    level: number
  ) {
    console.log(videoLink.length);
    if (
      videoLink.length === 0 ||
      (videoLink.length > 0 && videoLink.includes('youtube.com/embed/')) ||
      videoLink.includes('youtu.be/embed/')
    ) {
      if (!price.includes('-')) {
        if (cookingTime > 1) {
          if (level >= 1 && level <= 5) {
            const data = {
              name,
              content,
              price,
              video_link: videoLink,
              cooking_time: cookingTime,
              level,
            };

            fetch('https://cookbook-docs.herokuapp.com/api/v1/recipes', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            })
              .then((response) => response.json())
              .then((data) => {
                console.log('Success:', data);
                setName('');
                setContent('');
                setPrice('');
                setVideoLink('');
                setLevel(0);
                setCookingTime(0);
                alert('Przepis został pomyślnie dodany!');
              })
              .catch((error) => {
                console.error('Error:', error);
                alert('Wystąpił błąd: ' + error);
              });
          } else
            alert(
              'Poziom trudności powinien zawierać się w przedziale liczbowym pomiędzy 1 a 5!'
            );
        } else alert('Czas wykonania nie może być mniejszy niż 2 minuty!');
      } else alert('Kwota wykonania nie powinna zawierać ujemnego znaku!');
    } else
      alert(
        'Link powinien zawierać link w postaci youtu.be/embed/.... lub youtube.com/embed/....'
      );
  }

  return (
    <>
      <div>
        <h1 className="mt-3 text-center">Dodawanie przepisu</h1>
      </div>
      <div className="formAdd">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addRecipe(name, content, price, videoLink, cookingTime, level);
          }}>
          <div>
            <label>Nazwa przepisu (max 64 znaków)</label>
          </div>
          <div>
            <input
              type="text"
              placeholder="( wymagane )"
              onChange={(e) => onchangeName(e.target.value)}
              id="recipeName"
              className="create_input"
              value={name}
              maxLength={64}
              style={{ textAlign: 'center' }}
              required
            />
          </div>
          <br />
          <div>
            <label>Opis przepisu (max 1024 znaków)</label>
          </div>
          <div>
            <textarea
              placeholder="( wymagane )"
              className="create_input"
              onChange={(e) => onchangeContent(e.target.value)}
              id="recipeContent"
              value={content}
              maxLength={1024}
              style={{ textAlign: 'center' }}
              required
            />
          </div>
          <br />
          <div>
            <label>Czas przygotowywania (minuty)</label>
          </div>
          <div>
            <input
              className="create_input"
              type="number"
              placeholder="( opcjonalnie )"
              onChange={(e) => onChangeCookingTime(+e.target.value)}
              id="cookingTime"
              value={cookingTime}
              maxLength={3}
              style={{ textAlign: 'center' }}
              required
            />
          </div>
          <br />
          <div>
            <label>Koszt przygotowania przepisu</label>
          </div>
          <div>
            <input
              type="number"
              className="create_input"
              placeholder="( opcjonalnie )"
              onChange={(e) => onChangePrice(e.target.value)}
              id="price"
              value={price}
              maxLength={9}
              style={{ textAlign: 'center' }}
            />
          </div>
          <br />
          <div>
            <label>Poziom trudności (1-5)</label>
          </div>
          <div>
            <input
              type="number"
              className="create_input"
              placeholder="( wymagane )"
              onChange={(e) => onChangeLevel(+e.target.value)}
              id="level"
              value={level}
              maxLength={1}
              min={1}
              max={5}
              style={{ textAlign: 'center' }}
            />
          </div>
          <br />
          <div>
            <label>Link do video prezentującego wykonanie przepisu</label>
          </div>
          <div>
            <input
              type="text"
              className="create_input"
              placeholder="( opcjonalnie )"
              onChange={(e) => onChangeVideoLink(e.target.value)}
              id="videoLink"
              value={videoLink}
              style={{ textAlign: 'center' }}
            />
          </div>
          <br />
          <button className="create_btn" type="submit">
            Stwórz przepis
          </button>
        </form>
      </div>
    </>
  );
};
