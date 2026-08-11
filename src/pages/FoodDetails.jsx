import { useParams } from "react-router";
import { showFood } from "../services/foodService";
import { useEffect, useState } from "react";

function FoodDetails() {

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

            </section>
        </main>
    );
}

export default FoodDetails;