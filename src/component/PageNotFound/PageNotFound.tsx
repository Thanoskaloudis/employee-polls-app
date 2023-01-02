import { Link } from 'react-router-dom';
import NotFound from '../../assets/404-error.png';
import './PageNotFound.scss';

export const PageNotFound = () => {

  return (
    <div className="pageNotFound">
    <h1>404 - Not Found!</h1>
    <img src={NotFound} alt="404 icon - page not found" />
    <Link to="/">Go Home</Link>
  </div>
  )
}
