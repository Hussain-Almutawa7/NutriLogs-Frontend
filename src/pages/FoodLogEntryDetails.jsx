import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { showEntry } from "../services/foodLogService";

function FoodLogEntryDetails() {
    const { entryId } = useParams();

    const [entry, setEntry] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchEntryDetails = async () => {
            try {
                const entryData = await showEntry(entryId);
                setEntry(entryData);
            } catch (e) {
                setError(e.message);
            } finally {
                setIsLoading(false);
            }
        }

        fetchEntryDetails();
    }, [entryId]);

    if (isLoading) return <p>Loading entry...</p>
    if (error) return <p>Error: {error}</p>
    if (!entry) return <p>No entry Found</p>

    return (
        <div>
            <h1>This is Food log details page</h1>
        </div>
    );
}

export default FoodLogEntryDetails;