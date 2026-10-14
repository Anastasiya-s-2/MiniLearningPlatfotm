import React, { useEffect, useState } from 'react';

function Courses() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [courses, setCourses] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editPrice, setEditPrice] = useState("");
    const [editCategory, setEditCategory] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState("");

    function formatDate(value) {
        if (!value) {
            return "No date";
        }

        return new Date(value).toLocaleDateString();
    }

    function handleEdit(item) {
        setEditingId(item.id);
        setEditTitle(item.title || "");
        setEditDescription(item.description || "");
        setEditPrice(item.price || "");
        setEditCategory(item.category || "");
    }

    async function getCourses() {
        try {
            setIsLoading(true);
            setMessage("");
            const response = await fetch("/api/courses");
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Could not load courses");
            }

            setCourses(Array.isArray(data) ? data : [data]);
        } catch (error) {
            setMessage(error.message);
            setCourses([]);
        } finally {
            setIsLoading(false);
        }
    }

    async function handleCourses(event) {
        event.preventDefault();
        const token = localStorage.getItem("token");
        const response = await fetch("/api/courses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                title,
                description,
                price: Number(price),
                category: categoryName,
            }),
        });
        const data = await response.json();

        if (!response.ok) {
            setMessage(data.message || "Could not create course");
            return;
        }

        setTitle("");
        setDescription("");
        setPrice("");
        setCategoryName("");
        await getCourses();
    }

    async function getCoursesByTitle() {
        if (!searchTitle.trim()) {
            await getCourses();
            return;
        }

        const response = await fetch(`/api/courses/title/${searchTitle}`);
        const data = await response.json();

        if (!response.ok) {
            setMessage(data.message || "Course not found");
            setCourses([]);
            return;
        }

        setMessage("");
        setCourses(Array.isArray(data) ? data : [data]);
    }

    async function deleteCourse(id) {
        const token = localStorage.getItem("token");
        await fetch(`/api/courses/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        await getCourses();
    }

    async function patchCourse(id, title, description, price, categoryName) {
        const token = localStorage.getItem("token");
        console.log("TOKEN:", token);
        const response = await fetch(`/api/courses/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                title,
                description,
                price: Number(price),
                category: categoryName,
            }),
        });
        const data = await response.json();

        if (!response.ok) {
            setMessage(data.message || "Could not update course");
            return;
        }

        await getCourses();
        setEditingId(null);
    }

    useEffect(() => {
        getCourses();
    }, []);

    return (
        <main className="courses-page">
            <section className="courses-hero">
                <div>
                    <p className="eyebrow">Mini Learning Platform</p>
                    <h1>Courses</h1>
                    <p className="hero-copy">
                        Manage course content, categories, prices and updates from one workspace.
                    </p>
                </div>
                <div className="course-count">
                    <span>{courses.length}</span>
                    <p>active courses</p>
                </div>
            </section>

            <section className="toolbar">
                <form className="course-form" onSubmit={handleCourses}>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        value={price}
                        onChange={(event) => setPrice(event.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Category"
                        value={categoryName}
                        onChange={(event) => setCategoryName(event.target.value)}
                    />
                    <button type="submit">Create</button>
                </form>

                <div className="search-row">
                    <input
                        type="text"
                        placeholder="Search by title"
                        value={searchTitle}
                        onChange={(event) => setSearchTitle(event.target.value)}
                    />
                    <button onClick={getCoursesByTitle}>Search</button>
                    <button className="secondary" onClick={getCourses}>Reset</button>
                </div>
            </section>

            {message && <p className="notice">{message}</p>}

            <section className="course-grid">
                {isLoading && <p className="empty-state">Loading courses...</p>}

                {!isLoading && courses.length === 0 && (
                    <div className="empty-state">
                        <h2>No courses yet</h2>
                        <p>Create the first course or add records to the database.</p>
                    </div>
                )}

                {!isLoading && courses.map((item) => (
                    <article className="course-card" key={item.id}>
                        <div className="card-topline">
                            <span>{item.category || "Uncategorized"}</span>
                            <span>{formatDate(item.created_at)}</span>
                        </div>
                        <h2>{item.title}</h2>
                        <p>{item.description}</p>
                        <div className="card-footer">
                            <strong>${item.price}</strong>
                            <div className="card-actions">
                                <button className="secondary" onClick={() => handleEdit(item)}>
                                    Update
                                </button>
                                <button className="danger" onClick={() => deleteCourse(item.id)}>
                                    Delete
                                </button>
                            </div>
                        </div>

                        {editingId === item.id && (
                            <div className="edit-panel">
                                <input
                                    type="text"
                                    value={editTitle}
                                    onChange={(event) => setEditTitle(event.target.value)}
                                />
                                <input
                                    type="text"
                                    value={editDescription}
                                    onChange={(event) => setEditDescription(event.target.value)}
                                />
                                <input
                                    type="number"
                                    value={editPrice}
                                    onChange={(event) => setEditPrice(event.target.value)}
                                />
                                <input
                                    type="text"
                                    value={editCategory}
                                    onChange={(event) => setEditCategory(event.target.value)}
                                />
                                <div className="edit-actions">
                                    <button
                                        onClick={() => patchCourse(
                                            item.id,
                                            editTitle,
                                            editDescription,
                                            editPrice,
                                            editCategory
                                        )}
                                    >
                                        Save
                                    </button>
                                    <button className="secondary" onClick={() => setEditingId(null)}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </article>
                ))}
            </section>
        </main>
    );
}

export default Courses;
