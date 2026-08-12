import { Link } from "react-router";
import { useState, useEffect } from "react";
import FoodCard from "../../components/food/FoodCard";
import { getFoods } from "../../services/foodService";
import LoadingSpinner from "../../components/common/LoadingSpinner";

function Library() {

    const [favorites, setFavorites] = useState([]);
    const [customFoods, setCustomFoods] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchLibraryFood = async () => {
        try {
            const favoriteFoodData = await getFoods("?favorite=true");
            const customFoodData = await getFoods("?source=custom");

            setFavorites(favoriteFoodData);
            setCustomFoods(customFoodData);
        } catch (e) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchLibraryFood();
    }, []);

    if (isLoading) return <LoadingSpinner message="Loading library..." />;;
    if (error) return <p className="page-error">Error Occurred: {error}</p>;

    return (
        <main className="library">

            <section className="library-header">
                <div>
                    <h1>Library</h1>
                    <p>Manage your favorite and custom foods. </p>
                </div>

                <Link to="/foods/new">
                    <button>+ Create Custom Food</button>
                </Link>
            </section>

            <section className="library-section">
                <div className="browse-section-header">
                    <div>
                        <h2>Favorite Foods</h2>
                        <p>Foods you want quick access to.</p>
                    </div>
                </div>

                {favorites.length === 0 ? (
                    <div className="browse-empty">
                        <h3>No favorite foods yet</h3>
                        <p>Favorite a food from Browse or Food Details to see it here.</p>
                    </div>
                ) : (
                    <div className="food-grid">
                        {favorites.map(food => (
                            <FoodCard key={food._id} food={food} onFoodUpdated={fetchLibraryFood} />
                        ))}
                    </div>
                )}
            </section>

            <section className="library-section">
                <div className="browse-section-header">
                    <div>
                        <h2>My Foods</h2>
                        <p> Foods you created yourself.</p>
                    </div>
                </div>

                {customFoods.length === 0 ? (
                    <div className="browse-empty">
                        <h3>No custom foods yet</h3>
                        <p>Create your first custom food to see it here.</p>
                    </div>
                ) : (
                    <div className="food-grid">
                        {customFoods.map(food => (
                            <FoodCard key={food._id} food={food} onFoodUpdated={fetchLibraryFood} />
                        ))}
                    </div>
                )}
            </section>

        </main>
    );
}

export default Library;