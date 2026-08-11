import { useParams } from "react-router";
import { showApiFoodDetails } from "../services/nutritionService";
import { useEffect, useState } from "react";

function ApiFoodDetails() {

    const { externalId } = useParams();

    const [food, setFood] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchFoodDetails = async () => {
            try {
                const foodData = await showApiFoodDetails(externalId);
                setFood(foodData);
            } catch (e) {
                setError(e.message);
            } finally {
                setIsLoading(false);
            }
        }

        fetchFoodDetails();
    }, [externalId]);

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

                    <span className="food-source-badge">USDA</span>
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

export default ApiFoodDetails;