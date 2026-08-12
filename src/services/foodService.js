const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api`

const getFoods = async () => {
    try {
        const res = await fetch(`${BASE_URL}/foods`, {
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

const showFood = async foodId => {
    try {
        const res = await fetch(`${BASE_URL}/foods/${foodId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.err);

        return data;
    } catch (e) {
        throw Error(e.message)
    }
}

const favoriteFood = async (foodId, isFavorite) => {
    try {
        const res = await fetch(`${BASE_URL}/foods/${foodId}/favorite`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                isFavorite,
            })
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.err);

        return data;
    } catch (e) {
        throw Error(e.message);
    }
}

const importFood = async (externalId) => {
    try {
        const res = await fetch(`${BASE_URL}/foods/import`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                externalId,
            })
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.err);

        return data;
    } catch (e) {
        throw Error(e.message);
    }
}

const createFood = async (formData) => {
    try {
        const res = await fetch(`${BASE_URL}/foods`, {
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

const editFood = async (foodId, formData) => {
    try {
        const res = await fetch(`${BASE_URL}/foods/${foodId}`, {
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

export {
    getFoods,
    showFood,
    favoriteFood,
    importFood,
    createFood,
    editFood,
}