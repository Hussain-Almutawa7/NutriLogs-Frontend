import FoodForm from "../../components/food/FoodForm";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { showFood } from "../../services/foodService";
import LoadingSpinner from "../../components/common/LoadingSpinner";

function EditFood() {
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

    if (isLoading) return <LoadingSpinner message="Loading food..." />;
    if (error) return <p>{error}</p>;
    if (!food) return <p>Food not found.</p>;

    return (
        <main className="create-food">
            <section className="create-food-header">
                <h1>Edit Custom Food</h1>
                <p>Edit your own food and nutrition information.</p>
            </section>

            <section className="create-food-form">
                <FoodForm mode="edit" foodId={foodId} food={food} />
            </section>
        </main>
    );
}

export default EditFood;