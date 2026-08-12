import LogFoodForm from "../../components/food/LogFoodForm";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { showFood } from "../../services/foodService";
import { showApiFoodDetails } from "../../services/nutritionService";
import LoadingSpinner from "../../components/common/LoadingSpinner";

function LogFoodPage({ type }) {

    const { foodId, externalId } = useParams();

    const [food, setFood] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchFoodDetails = async () => {
            try {
                let foodData;

                if (type === "saved") {
                    foodData = await showFood(foodId);
                } else {
                    foodData = await showApiFoodDetails(externalId);
                }

                setFood(foodData);
            } catch (e) {
                setError(e.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFoodDetails();

    }, [type, foodId, externalId]);

    if (isLoading) return <LoadingSpinner message="Loading food..." />;;
    if (error) return <p>Error: {error}</p>;
    if (!food) return <p>Food not found.</p>;

    return (
        <main className="form-page">
            {type === "saved" ? (
                <LogFoodForm food={food} foodId={foodId} mode="create" />
            ) : (
                <LogFoodForm food={food} externalId={externalId} mode="create" />
            )}
        </main>
    );
}

export default LogFoodPage