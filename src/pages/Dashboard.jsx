import { useEffect, useState } from "react";
import { getSummary } from "../services/foodLogService";
import NutritionCard from "../components/dashboard/NutritionCard";
import WeeklyCaloriesChart from "../components/dashboard/WeeklyCaloriesChart";
import { formatDate } from "../utils/dateUtils";
import { Link } from "react-router";
import LoadingSpinner from "../components/common/LoadingSpinner";

function Dashboard({ user }) {

    function getCurrentWeek() {
        const today = new Date();

        const day = today.getDay();

        const daySinceMonday = day === 0 ? 6 : day - 1;

        const start = new Date(today);
        start.setDate(today.getDate() - daySinceMonday);

        const end = new Date(start);
        end.setDate(start.getDate() + 6);

        return {
            startDate: formatDate(start),
            endDate: formatDate(end),
            today: formatDate(today),
        }
    }

    const [summary, setSummary] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchSummaryDetails = async () => {
            try {
                const { startDate, endDate, today } = getCurrentWeek();

                const summaryData = await getSummary(startDate, endDate, today);
                setSummary(summaryData);

            } catch (e) {
                setError(e.message);
            } finally {
                setIsLoading(false);
            }
        }

        fetchSummaryDetails();

    }, []);

    if (isLoading) return <LoadingSpinner message="Loading Dashboard" />
    if (error) return <p>Error Occured: {error}</p>
    if (!summary) return <p>No Summary Details.</p>



    return (
        <main className="dashboard">

            <section className="dashboard-header">
                <div>
                    <h1>Hello {user.username}</h1>
                    <p>Here's your nutrition progress for today</p>
                </div>

                <Link to="/goals">
                    <button>Edit Goals</button>
                </Link>
            </section>

            <section className="nutrition-section">
                <h2>Today's Nutrition</h2>

                <div className="nutrition-cards">
                    <NutritionCard
                        name="Calories"
                        consumed={summary.today.consumed.calories}
                        goal={summary.goals.calories}
                        remaining={summary.today.remaining.calories}
                        unit="kcal"
                    />

                    <NutritionCard
                        name="Protein"
                        consumed={summary.today.consumed.protein}
                        goal={summary.goals.protein}
                        remaining={summary.today.remaining.protein}
                        unit="g"
                    />

                    <NutritionCard
                        name="Carbohydrates"
                        consumed={summary.today.consumed.carbohydrates}
                        goal={summary.goals.carbohydrates}
                        remaining={summary.today.remaining.carbohydrates}
                        unit="g"
                    />

                    <NutritionCard
                        name="Fat"
                        consumed={summary.today.consumed.fat}
                        goal={summary.goals.fat}
                        remaining={summary.today.remaining.fat}
                        unit="g"
                    />
                </div>
            </section>

            <section className="weekly-section">
                <h2>This Week</h2>
                <WeeklyCaloriesChart week={summary.week} calorieGoal={summary.goals.calories} />
            </section>

        </main>
    )
}

export default Dashboard;