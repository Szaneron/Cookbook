import './pagination.scss';
import { Link } from 'react-router-dom';

interface Bar {
  onPagination: any;
  currentPage: number;
  pageCount: number;
}

const isPreviousDisabled = (currPage: number): boolean => {
  if (currPage <= 1) {
    return true;
  } else return false;
};

const isNextDisabled = (currPage: number, pageNumber: number): boolean => {
  if (currPage >= pageNumber) {
    return true;
  } else return false;
};

export const PaginationBar = ({
  onPagination,
  currentPage,
  pageCount,
}: Bar) => {
  const previousDisable = isPreviousDisabled(currentPage);
  const nextDisable = isNextDisabled(currentPage, pageCount);
  const pageSize: number = 10;

  return (
    <div className="wrapper">
      <Link to={`../recipes?page=${currentPage - 1}&per_page=${pageSize}`}>
        <button
          disabled={previousDisable}
          className="pagin_button"
          onClick={() => onPagination(currentPage - 1)}>
          Poprzednia
        </button>
      </Link>
      <Link to={`../recipes?page=${currentPage + 1}&per_page=${pageSize}`}>
        <button
          disabled={nextDisable}
          className="pagin_button"
          onClick={() => onPagination(currentPage + 1)}>
          Nastepna
        </button>
      </Link>
    </div>
  );
};
