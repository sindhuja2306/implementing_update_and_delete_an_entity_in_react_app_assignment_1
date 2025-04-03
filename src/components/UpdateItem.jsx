import React, { useState } from "react";

const UpdateItem = ({ item }) => {
    const [updatedValue, setUpdatedValue] = useState(item ? item.name : "");
    const [message, setMessage] = useState("");
    const [error, setError] = useState(null);

    const handleInputChange = (event) => {
        setUpdatedValue(event.target.value);
    };

    const handleUpdate = () => {
        fetch(`http://${import.meta.env.VITE_API_URI}/doors/${item.id}`, {
            method: "PUT", // or "PATCH"
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: updatedValue }),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to update item");
            }
            return response.json();
        })
        .then((data) => {
            setMessage("Item updated successfully!");
        })
        .catch((error) => {
            setError(error.message);
        });
    };

    return (
        <div>
            <h2>Update Item</h2>
            {item && <p>Current Value: {item.name}</p>}
            <input
                type="text"
                value={updatedValue}
                onChange={handleInputChange}
            />
            <button onClick={handleUpdate}>Update</button>
            {message && <p>{message}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default UpdateItem;
