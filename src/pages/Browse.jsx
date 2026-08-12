import { useState, useEffect } from "react";
import { getFoods } from "../services/foodService";
import { searchApiFoods } from "../services/nutritionService";
import FoodCard from "../components/FoodCard";
import ApiFoodCard from "../components/ApiFoodCard";

function Browse() {

    const [foods, setFoods] = useState([]);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [searchedFoods, setSearchedFoods] = useState([]);

    const fetchAllFoods = async () => {
        try {
            const libraryFoods = await getFoods();
            setFoods(libraryFoods);
        } catch (e) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchAllFoods();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const searchResults = await searchApiFoods(search);
            setSearchedFoods(searchResults)
        } catch (e) {
            setError(e.message)
        }
    }

    function handleChange(e) {
        setSearch(e.target.value);
    }

    return (
        <main className="browse">
            <section className="browse-header">
                <h1>Browse Food</h1>
                <p>Search for foods or choose from your library</p>
            </section>

            <section className="browse-search">
                <form className="food-search-form" onSubmit={handleSubmit}>
                    <input type="search" name="search" onChange={handleChange} value={search} placeholder="Search for chicken, rice, milk..." />
                    <button type="submit">Search Foods</button>
                </form>
            </section>

            {error && (
                <p className="browse-error">{error}</p>
            )}

            {searchedFoods.length > 0 && (
                <section className="browse-section">

                    <div className="browse-section-header">
                        <div>
                            <h2>Search Results</h2>
                            <p>Foods found from USDA</p>
                        </div>
                    </div>

                    <div className="food-grid">
                        {searchedFoods.map(apiFood => {
                            const savedFood = foods.find(food => food.source === "api" && food.externalId === apiFood.externalId)
                            return (
                                <ApiFoodCard
                                    key={apiFood.externalId}
                                    apiFood={apiFood}
                                    savedFood={savedFood}
                                    onFoodUpdated={fetchAllFoods}
                                />
                            )
                        })}
                    </div>

                </section>
            )}

            <section className="browse-section">
                <div className="browse-section-header">
                    <div>
                        <h2>Your Foods</h2>
                        <p>Your custom and saved foods</p>
                    </div>
                </div>

                {isLoading ? (
                    <p>Loading foods...</p>
                ) : foods.length === 0 ? (
                    <div className="browse-empty">

                    </div>
                ) : (
                    <div className="food-grid">
                        {foods.map(food => (
                            <FoodCard key={food._id} food={food} onFoodUpdated={fetchAllFoods} />
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}

export default Browse;