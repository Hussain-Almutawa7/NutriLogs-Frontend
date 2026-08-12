const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api`

const getSummary = async (startDate, endDate, today) => {
    try {
        const res = await fetch(`${BASE_URL}/food-logs/summary?startDate=${startDate}&endDate=${endDate}&today=${today}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.err);

        return data;

    } catch (e) {
        throw Error(e.message);
    }
}

const getEntries = async (date) => {
    try {
        const res = await fetch(`${BASE_URL}/food-logs?date=${date}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.err);

        return data;

    } catch (e) {
        throw Error(e.message);
    }
}

const createEntry = async (formData) => {
    try {
        const res = await fetch(`${BASE_URL}/food-logs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.err);

        return data;

    } catch (e) {
        throw Error(e.message);
    }
}

const showEntry = async entryId => {
    try {
        const res = await fetch(`${BASE_URL}/food-logs/${entryId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.err);

        return data;
    } catch (e) {
        throw Error(e.message);
    }
}

const editEntry = async (entryId, formData) => {
    try {
        const res = await fetch(`${BASE_URL}/food-logs/${entryId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.err);

        return data;
    } catch (e) {
        throw Error(e.message);
    }
}

const deleteEntry = async entryId => {
    try {
        const res = await fetch(`${BASE_URL}/food-logs/${entryId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });

        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.err);
        }
    } catch (e) {
        throw Error(e.message);
    }
}

export {
    getSummary,
    getEntries,
    createEntry,
    showEntry,
    editEntry,
    deleteEntry,
}