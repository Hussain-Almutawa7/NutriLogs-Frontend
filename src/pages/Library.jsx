import { Link } from "react-router";
import { useState, useEffect } from "react";
import FoodCard from "../components/FoodCard";
import { getFoods } from "../services/foodService";

function Library() {

    const [favorites, setFavorites] = useState(null);
    const [customFoods, setCustomFoods] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
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

        fetchLibraryFood();
    }, []);


    if (isLoading) return <p>Loading food...</p>
    if (error) return <p>Error: {error}</p>
    if (!favorites) return <p>No Food Found</p>
    if (!customFoods) return <p>No Food Found</p>

    return (
        <main>
            <Link to={"/foods/new"}>
                <button>+ Create Custom Food</button>
            </Link>

            <h2>Favorite Foods</h2>
            {favorites.map(food => (
                <FoodCard key={food._id} food={food} />
            ))}

            <h2>My Foods</h2>
            {customFoods.map(food => (
                <FoodCard key={food._id} food={food} />
            ))}
        </main>
    )
}

export default Library;