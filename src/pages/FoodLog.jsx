import { useEffect, useState } from "react";
import { formatDate } from "../utils/dateUtils";
import { getEntries } from "../services/foodLogService";

function FoodLog() {
    function getCurrentDate() {
        const today = new Date();
        return formatDate(today);
    }

    const [entries, setEntries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedDate, setSelectedDate] = useState(getCurrentDate());

    useEffect(() => {
        const fetchEntryDetails = async () => {
            setError("");
            setIsLoading(true);

            try {
                const entriesData = await getEntries(selectedDate);
                setEntries(entriesData);
            } catch (e) {
                setError(e.message);
            } finally {
                setIsLoading(false);
            }
        }

        fetchEntryDetails();
    }, [selectedDate]);

    if (isLoading) return <p>Loading Food Logs...</p>
    if (error) return <p>Error Occured: {error}</p>
    if (entries.length === 0) return <p>No Food Log entries.</p>


    return (
        <main>
            <h1>Here Will be the food Log page</h1>
        </main>
    );
}

export default FoodLog;