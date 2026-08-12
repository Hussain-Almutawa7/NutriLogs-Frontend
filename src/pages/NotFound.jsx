import { Link } from "react-router";

function NotFound() {
    return (
        <main className="not-found">
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p>The page you're looking for doesn't exist.</p>

            <Link to="/">
                <button>Back Home</button>
            </Link>
        </main>
    );
}

export default NotFound;