const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api`

const searchApiFoods = async search => {
    try {
        const res = await fetch(`${BASE_URL}/nutrition/search?search=${encodeURIComponent(search)}`, {
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

const showApiFoodDetails = async externalId => {
    try {
        const res = await fetch(`${BASE_URL}/nutrition/${externalId}`, {
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

export {
    searchApiFoods,
    showApiFoodDetails,
}