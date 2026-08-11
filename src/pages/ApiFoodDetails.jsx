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
        <div>
            <h1>Api</h1>
            <h1>{food.name}</h1>
        </div>
    );
}

export default ApiFoodDetails;