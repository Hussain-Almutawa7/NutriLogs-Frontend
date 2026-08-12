import { useState, useEffect } from "react";
import { getSummary } from "../services/foodLogService";
import { formatDate } from "../utils/dateUtils";

function UserGoals() {

    const [userGoals, setUserGoals] = useState();
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const today = new Date;
    const formatedDate = formatDate(today);

    useEffect(() => {
        const fetchSummarygoals = async () => {
            try {
                const summaryData = await getSummary(formatedDate);
                setUserGoals(summaryData.goals)
            } catch (e) {
                setError(e.message);
            } finally {
                setIsLoading(false)
            }
        }

        fetchSummarygoals();
    }, []);

    const initialState = {
        calories: userGoals.calories,
        protein: userGoals.protein,
        carbohydrates: userGoals.carbohydrates,
        fat: userGoals.fat,
    }

    const [formData, setFormData] = useState(initialState);

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async e => {
        e.preventDefault();
    }

    if (isLoading) return <p>Loading Dashboard...</p>
    if (error) return <p>Error Occured: {error}</p>
    if (!userGoals) return <p>No Summary Details.</p>

    return (
        <main className="user-goals">

            <section className="user-goals-header">
                <h1>Nutrition Goals</h1>
                <p>Set your daily calorie and macronutrient goals.</p>
            </section>

        </main>
    );
}

export default UserGoals;