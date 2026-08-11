import { useState, useEffect } from "react";
import { getFoods, getApiFoods } from "../services/foodService";
import FoodCard from "../components/FoodCard";
import { Link } from "react-router";

function Browse() {

    const [foods, setFoods] = useState([]);
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchAllFoods = async () => {
            try {
                const libraryFoods = await getFoods();
                setFoods(customFoods);
            } catch (e) {
                setError(e.message);
            } finally {
                setIsLoading(false);
            }
        }

        fetchAllFoods();
    }, []);

    console.log(foods);

    return (
        <main>
            <h1>Here Will be the browse page</h1>
            {foods.map(food => (
                <FoodCard key={food._id} food={food} />
            ))}
        </main>
    );
}

export default Browse;