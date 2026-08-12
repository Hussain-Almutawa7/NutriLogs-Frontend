import LogFoodForm from "../components/LogFoodForm";
import { useState, useEffect } from "react";
import { showEntry } from "../services/foodLogService";
import LoadingSpinner from "../components/LoadingSpinner";
import { useParams } from "react-router";

function EditFoodLogEntryPage() {

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

    if (isLoading) return <LoadingSpinner message="Loading entry..." />;
    if (error) return <p>Error: {error}</p>
    if (!entry) return <p>No entry Found</p>

    return (
        <main className="form-page">
            <LogFoodForm entry={entry} entryId={entryId} mode={"edit"} />
        </main>
    );
}

export default EditFoodLogEntryPage;