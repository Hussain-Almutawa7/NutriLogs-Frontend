import { useEffect, useState } from "react";
import { getSummary } from "../services/foodLogService";

function Dashboard({ user }) {

    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`
    }

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
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchSummaryDetails = async () => {
            try {
                const { startDate, endDate, today } = getCurrentWeek();

                const summaryData = await getSummary(startDate, endDate, today);
                setSummary(summaryData);

            } catch (e) {
                console.log("Error:", e.message);
            } finally {
                setIsLoading(false);
            }
        }

        fetchSummaryDetails();

    }, []);

    console.log(summary);

    if (isLoading) return <p>Loading Dashboard...</p>

    if (!summary) return <p>No Summary Details.</p>


    return (
        <>
            <h1>Hello {user.username}</h1>
            <p></p>
            <p></p>
        </>
    )
}

export default Dashboard;