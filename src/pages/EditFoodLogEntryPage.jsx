import LogFoodForm from "../components/LogFoodForm";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { showEntry } from "../services/foodLogService";

function EditFoodLogEntryPage() {
    const { entryId } = useParams();

    
    return (
        <div>
            <h1>Edit page</h1>
        </div>
    );
}

export default EditFoodLogEntryPage;