import LogFoodForm from "../components/LogFoodForm";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { showFood } from "../services/foodService";
import { showApiFoodDetails } from "../services/nutritionService";

function LogFoodPage({ type }) {

    const { foodId, externalId } = useParams();
    const [food, setFood] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    if (type === "saved") {
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
    } else {
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
        }, []);
    }

    return (
        <main>
            <h1>This is log food page</h1>
            {foodId ? (
                <LogFoodForm food={food} foodId={foodId} />
            ) : (
                <LogFoodForm food={food} externalId={externalId} />
            )}
        </main>
    );
}

export default LogFoodPage