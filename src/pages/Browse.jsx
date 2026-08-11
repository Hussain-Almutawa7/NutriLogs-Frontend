import { useState, useEffect } from "react";
import { getFoods, searchApiFoods } from "../services/foodService";
import FoodCard from "../components/FoodCard";
import ApiFoodCard from "../components/ApiFoodCard";
import { Link } from "react-router";

function Browse() {

    const [foods, setFoods] = useState([]);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [searchedFoods, setSearchedFood] = useState([]);

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

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const searchResults = await searchApiFoods(search);
            setSearchedFood(searchResults)
        } catch (e) {
            setError(e.message)
        }
    }

    function handleChange(e) {
        setSearch(e.target.value);
    }

    return (
        <main>
            <form onSubmit={handleSubmit}>
                <input type="search" name="search" onChange={handleChange} value={search} placeholder="Search Food..." />
                <button type="submit">Search Foods</button>
            </form>

            {foods.map(food => (
                <FoodCard key={food._id} food={food} />
            ))}

            {searchedFoods.map(apiFood => (
                <ApiFoodCard key={apiFood.externalId} apiFood={apiFood} />
            ))}
        </main>
    );
}

export default Browse;