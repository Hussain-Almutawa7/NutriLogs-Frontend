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
        throw Error(e);
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
        throw Error(e);
    }
}

export {
    getSummary,
    getEntries,
}