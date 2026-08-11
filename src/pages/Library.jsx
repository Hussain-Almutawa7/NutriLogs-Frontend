import { Link } from "react-router";

function Library() {
    return (
        <main>
            <h1>Here will be the library page</h1>

            <Link to={"/foods/new"}>
                <button>Create Food</button>
            </Link>
        </main>
    )
}

export default Library;