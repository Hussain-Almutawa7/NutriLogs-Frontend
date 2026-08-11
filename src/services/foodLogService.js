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

        if (!res.ok) throw new Error(date.err);

        return data;

    } catch (e) {
        throw Error(e.message);
    }
}

const createEntry = async (date, formData) => {
    try {
        const rest = await fetch(`${BASE_URL}/food-logs?date=${date}`, {
            method: "POST",
            headers: {
                "Content-Type": "applications/json"
            },
            body: JSON.stringify(formData)
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.err);

        return data;

    } catch (e) {
        throw Error(e.message);
    }
}

export {
    getSummary,
    getEntries,
    createEntry,
}