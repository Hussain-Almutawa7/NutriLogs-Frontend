import { useState, useEffect } from "react";
import { getSummary } from "../services/foodLogService";
import { formatDate } from "../utils/dateUtils";
import { updateGoals } from "../services/userService";
import { useNavigate } from "react-router";
import LoadingSpinner from "../components/common/LoadingSpinner";

function UserGoals() {

    const navigate = useNavigate();

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const today = new Date();
    const formatedDate = formatDate(today);

    useEffect(() => {
        const fetchSummarygoals = async () => {
            try {
                const summaryData = await getSummary(formatedDate);
                const goals = summaryData.goals;

                setFormData({
                    calorieGoal: goals.calories,
                    proteinGoal: goals.protein,
                    carbohydrateGoal: goals.carbohydrates,
                    fatGoal: goals.fat,
                });

            } catch (e) {
                setError(e.message);
            } finally {
                setIsLoading(false)
            }
        }

        fetchSummarygoals();
    }, []);

    const initialState = {
        calorieGoal: "",
        proteinGoal: "",
        carbohydrateGoal: "",
        fatGoal: ""
    }

    const [formData, setFormData] = useState(initialState);

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const goalData = {
                calorieGoal: Number(formData.calorieGoal),
                proteinGoal: Number(formData.proteinGoal),
                carbohydrateGoal: Number(formData.carbohydrateGoal),
                fatGoal: Number(formData.fatGoal),
            };

            await updateGoals(goalData);
            navigate("/");
        } catch (e) {
            setError(e.message);
        }
    }

    if (isLoading) return <LoadingSpinner message="Loading user goals..." />;
    if (error) return <p>Error Occured: {error}</p>

    return (
        <main className="user-goals">

            <section className="user-goals-header">
                <h1>Nutrition Goals</h1>
                <p>Set your daily calorie and macronutrient goals.</p>
            </section>

            <section className="user-goals-card">
                <form onSubmit={handleSubmit}>
                    <div className="user-goals-field">
                        <label htmlFor="calories">Calories</label>
                        <input type="number" id="calories" name="calorieGoal" onChange={handleChange} value={formData.calorieGoal} min={0} step={0.01} required />
                        <span>kcal per day</span>
                    </div>

                    <div className="user-goals-field">
                        <label htmlFor="protein">Protein</label>
                        <input type="number" id="protein" name="proteinGoal" onChange={handleChange} value={formData.proteinGoal} min={0} step={0.01} required />
                        <span>g per day</span>
                    </div>

                    <div className="user-goals-field">
                        <label htmlFor="carbohydrates">Carbohydrates</label>
                        <input type="number" id="carbohydrates" name="carbohydrateGoal" onChange={handleChange} value={formData.carbohydrateGoal} min={0} step={0.01} required />
                        <span>g per day</span>
                    </div>

                    <div className="user-goals-field">
                        <label htmlFor="fat">Fat</label>
                        <input type="number" id="fat" name="fatGoal" onChange={handleChange} value={formData.fatGoal} min={0} step={0.01} required />
                        <span>g per day</span>
                    </div>

                    <div className="user-goals-actions">
                        <button type="submit">Save Goals</button>
                    </div>
                </form>
            </section>

        </main>
    );
}

export default UserGoals;