import { Link } from 'react-router-dom';
import './NotFound.scss';

function NotFound() {
    return (
        <div className="NotFound">
            <h1>Page not found! </h1>
            <Link to={'/'} className="btn">
                Go home
            </Link>
        </div>
    );
}

export { NotFound };
