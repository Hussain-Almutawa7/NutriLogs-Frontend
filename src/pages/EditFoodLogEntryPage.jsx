import LogFoodForm from "../components/LogFoodForm";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { showEntry } from "../services/foodLogService";

function EditFoodLogEntryPage() {

    const { entryId } = useParams();
    const navigate = useNavigate();

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
        <main>
            <LogFoodForm entry={entry} entryId={entryId} mode={"edit"} />
        </main>
    );
}

export default EditFoodLogEntryPage;