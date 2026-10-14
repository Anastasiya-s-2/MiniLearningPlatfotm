import React, { useEffect, useState } from 'react';

function Categories() {
    const [categories, setCategories] = useState([]);
    const [message, setMessage] = useState("");
    const [searchId, setSearchId] = useState("");
    const [name, setName] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState("");

    async function getCategories() {
        try {
            const response = await fetch("/api/categories");
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Could not load courses");
            }

            setCategories(Array.isArray(data) ? data : [data]);
        } catch (error) {
            setMessage(error.message);
        }
    }

    async function getCategoriesById() {
        if (!searchId.trim()) {
            await getCategories();
            return;
        }

        const response = await fetch(`/api/categories/${searchId}`);
        const data = await response.json();

        if (!response.ok) {
            setMessage(data.message || "Category not found");
            setCategories([]);
            return;
        }

        setMessage("");
        setCategories(Array.isArray(data) ? data : [data]);
    }

    async function deleteCategory(id) {
        const token = localStorage.getItem("token");
        await fetch(`/api/categories/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        await getCategories();
    }

    async function createCategory(event) {
        event.preventDefault();
        const token = localStorage.getItem("token");
        const response = await fetch(`/api/categories`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ name }),
        });
        const data = await response.json();

        if (!response.ok) {
            setMessage(data.message || "Could not create category");
            return;
        }

        setName("");
        await getCategories();
    }

    async function patchCategory(id, name) {
        const token = localStorage.getItem("token");
        const response = await fetch(`/api/categories/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ name }),
        });
        const data = await response.json();

        if (!response.ok) {
            setMessage(data.message || "Could not edit category");
            return;
        }

        await getCategories();
        setEditingId(null);
    }

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <main className="categories-page">
            <section className="courses-hero">
                <div>
                    <p className="eyebrow">Mini Learning Platform</p>
                    <h1>Categories</h1>
                    <p className="hero-copy">
                        Manage course content, categories, prices and updates from one workspace.
                    </p>
                </div>
                <div className="course-count">
                    <span>{categories.length}</span>
                    <p>active categories</p>
                </div>
            </section>

            <section className="toolbar">
                <form className="course-form" onSubmit={createCategory}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                    <button type="submit">Create</button>
                </form>

                <div className="search-row">
                    <input
                        type="text"
                        placeholder="Search by id"
                        value={searchId}
                        onChange={(event) => setSearchId(event.target.value)}
                    />
                    <button onClick={getCategoriesById}>Search</button>
                    <button className="secondary" onClick={getCategories}>Reset</button>
                </div>
            </section>

            <section className="categories-list">
                {categories.map((item) => (
                    <div className="category-row" key={item.id}>
                        <span>{item.id}</span>
                        <span>{item.name}</span>

                        <button
                            onClick={() => {
                                setEditingId(item.id);
                                setEditName(item.name);
                            }}
                        >
                            Edit
                        </button>

                        <button onClick={() => deleteCategory(item.id)}>
                            Delete
                        </button>

                        {editingId === item.id && (
                            <div className="edit-panel">
                                <input
                                    type="text"
                                    placeholder="Change name"
                                    value={editName}
                                    onChange={(event) => setEditName(event.target.value)}
                                />

                                <div className="edit-actions">
                                    <button onClick={() => patchCategory(item.id, editName)}>
                                        Save
                                    </button>

                                    <button
                                        className="secondary"
                                        onClick={() => setEditingId(null)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </section>
        </main>
    );
}

export default Categories;
