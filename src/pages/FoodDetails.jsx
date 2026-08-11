import { useParams } from "react-router";
import { showFood } from "../services/foodService";
import { useEffect, useState } from "react";

function FoodDetails() {

    const { foodId } = useParams();

    const [food, setFood] = useState({});
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
    }, []);

    if (isLoading) return <p>Loading food...</p>
    if (error) return <p>Error: {error}</p>
    if (!food) return <p>No Food Found</p>

    return (
        <div>
            <h1>{food.name}</h1>
        </div>
    );
}

export default FoodDetails;