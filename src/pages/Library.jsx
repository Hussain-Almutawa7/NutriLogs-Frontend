import { Link } from "react-router";
import { useState, useEffect } from "react";
import FoodCard from "../components/FoodCard";
import { getFoods } from "../services/foodService";

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

    if (isLoading) return <p>Loading Library...</p>;
    if (error) return <p>Error Occurred: {error}</p>;

    return (
        <main>
            <Link to={"/foods/new"}>
                <button>+ Create Custom Food</button>
            </Link>

            <h2>Favorite Foods</h2>
            {favorites.length === 0 ? (
                <div className="food-log-empty">
                    <h3>No favorite food.</h3>
                    <p>You haven't favorite any food yet.</p>
                </div>
            ) : (
                <div className="food-log-list">
                    {favorites.map(food => (
                        <FoodCard key={food._id} food={food} onFoodUpdated={fetchLibraryFood} />
                    ))}
                </div>
            )}

            <h2>My Foods</h2>
            {customFoods.length === 0 ? (
                <div className="food-log-empty">
                    <h3>No custom food.</h3>
                    <p>You haven't created any custom food yet.</p>
                </div>
            ) : (
                <div className="food-log-list">
                    {customFoods.map(food => (
                        <FoodCard key={food._id} food={food} onFoodUpdated={fetchLibraryFood} />
                    ))}
                </div>
            )}

        </main>
    )
}

export default Library;