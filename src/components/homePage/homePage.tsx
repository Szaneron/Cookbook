import './homePage.scss';
import { Link } from 'react-router-dom';

export const HomePage = () => {
  return (
    <div className="wraper text-center jus p-5 mt-5">
      <div className="container ">
        <main className="px-3">
          <h1>Cookbook RFE6</h1>
          <p className="lead">
            Jak lipiec, to maliny, wiśnie i agrest. Niewiele potrzeba, aby
            wydobyć z nich pełnię smaku. Można je zajadać prosto z krzaczka,
            drzewa lub łubianki. Jeśli jednak uda Wam się nie ulec pokusie
            zjedzenia wszystkiego, zaproście je do kuchni i dodajcie do ciasta,
            lodów albo kompotu. Niektóre będą też pasować do obiadowych dań, o
            czym przekonacie się, przeglądając nasze inspiracje.
          </p>
          <p className="lead">
            <Link className="navbar-brand mb-0 h1" to="/recipes">
              <button className="btn btn-primary">Zobacz przepisy</button>
            </Link>
          </p>
        </main>
        <div className="row mt-5 pt-5">
          <h3 className="mb-5">Członkowie grupy</h3>
          <div className="col-sm-3">
            <h5 className="card-title">Armin Boleń</h5>
          </div>
          <div className="col-sm-3">
            <h5 className="card-title">Krystian Janas</h5>
          </div>
          <div className="col-sm-3">
            <h5 className="card-title">Wiktoria Czech</h5>
          </div>
          <div className="col-sm-3">
            <h5 className="card-title">Bartłomiej Kielar</h5>
          </div>
        </div>
      </div>
    </div>
  );
};
