import { useParams, useNavigate } from "react-router";
import { showFood, favoriteFood, deleteFood } from "../services/foodService";
import { useEffect, useState } from "react";
import { Link } from "react-router";

function FoodDetails() {

    const navigate = useNavigate();
    const { foodId } = useParams();

    const [food, setFood] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchFoodDetails = async () => {
            try {
                const foodData = await showFood(foodId);
                setFood(foodData);
            } catch (e) {
                setError(e.message);
            } finally {
                setIsLoading(false);
            }
        }

        fetchFoodDetails();
    }, [foodId]);

    if (isLoading) return <p>Loading food...</p>
    if (error) return <p>Error: {error}</p>
    if (!food) return <p>No Food Found</p>

    const handleFavorite = async () => {
        try {
            const updatedFood = await favoriteFood(foodId, !food.isFavorite);

            if (updatedFood.source === "api" && updatedFood.isFavorite === false) {
                navigate("/browse", { replace: true });
                return;
            }

            setFood(updatedFood);
        } catch (e) {
            setError(e.message);
        }
    }

    const handleDelete = async () => {
        try {
            await deleteFood(foodId);
            navigate("/browse")
        } catch (e) {
            setError(e.message)
        }
    }

    return (
        <main className="food-details">
            <section className="food-details-card">

                <div className="food-details-header">
                    <div>
                        <h1>{food.name}</h1>
                        {food.brand && (
                            <p className="food-details-brand">{food.brand}</p>
                        )}
                    </div>

                    <span className="food-source-badge">
                        {food.source === "custom"
                            ? "Custom"
                            : "Saved API"}
                    </span>
                </div>

                <div className="food-details-serving">
                    <span>Per {food.servingAmount} {food.servingUnit}</span>
                </div>

                <div className="food-details-calories">
                    <strong>{Math.round(food.calories)}</strong>
                    <span>kcal</span>
                </div>

                <div className="food-details-macros">
                    <div>
                        <span>Protein</span>
                        <strong>{food.protein === null ? "N/A" : `${Math.round(food.protein)}g`}</strong>
                    </div>

                    <div>
                        <span>Carbohydrates</span>
                        <strong>{food.carbohydrates === null ? "N/A" : `${Math.round(food.carbohydrates)}g`}</strong>
                    </div>

                    <div>
                        <span>Fat</span>
                        <strong>{food.fat === null ? "N/A" : `${Math.round(food.fat)}g`}</strong>
                    </div>
                </div>

                <div className="food-details-actions">
                    <button onClick={handleFavorite}>{food.isFavorite ? "Unfavorite Food" : "Favorite Food"}</button>

                    <Link to={`/foods/${foodId}/log`}>
                        <button>Add to Log</button>
                    </Link>

                    {food.source === "custom" && (
                        <Link to={`/foods/${foodId}/edit`}>
                            <button>Edit Food</button>
                        </Link>
                    )}

                    <button className="danger-button" onClick={handleDelete}>
                        Delete Food
                    </button>
                </div>

            </section>
        </main>
    );
}

export default FoodDetails;