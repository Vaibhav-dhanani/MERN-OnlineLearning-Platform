import React, { useEffect, useState } from "react";
import { URL } from "../../constant";
import Form from "../common/Form/Form";

const Lectures = ({ subject }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lectures, setLectures] = useState([]);
  const [title, setTitle] = useState("");

  const fetchLectures = async () => {
    try {
      const response = await fetch(`${URL}/lectures`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ subject: subject }),
      });

      if (!response.ok) {
        console.error("Status:", response.status);
        console.error("Status Text:", response.statusText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setLectures(data);
    } catch (error) {
      console.error("There was a problem fetching the lectures:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchLectures();
  }, [subject, lectures]);
  //   console.log(lectures);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${URL}/lectures/upload`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title: title,
          subject: subject,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      await fetchLectures();
      setOpen(false);
      setTitle("");

      // Optionally, show a success message
      //   alert('Lecture uploaded successfully!');
    } catch (error) {
      console.error("Error uploading lecture:", error);
      alert("Failed to upload lecture. Please try again.");
    }
  };
  const fields = [
    {
      id: "subject",
      label: "Class Code",
      type: "text",
      placeholder: "Subject",
      value: subject,
      onChange: null,
      required: true,
      disabled: true, // Field is disabled
    },
    {
      id: "title",
      label: "Title",
      type: "text",
      placeholder: "Class Title",
      value: title,
      onChange: setTitle,
      required: true,
      disabled: false, // Field is not disabled
    },
  ];

  if (isLoading) return <p>Loading .... </p>;

  return (
    <div className="container h-full mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Lectures</h1>
      <div className="space-y-4">
        {lectures.length != 0 ? (
          lectures.map((lecture) => (
            <div
              key={lecture.id}
              className="bg-yellow-100 border-l-8 border-yellow-400 hover:bg-yellow-200 transition-colors duration-200 ease-in-out"
            >
              <div className="p-4 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">{lecture.title}</h2>
                  <p className="text-gray-600">Date: {lecture.createdAt}</p>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-yellow-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          ))
        ) : (
          <p>This Class have not lectures yet</p>
        )}
      </div>
      <div className="fixed bottom-10 right-10">
        <button
          className="x border-green-500 border-2 bg-white text-green-500 hover:bg-green-500 hover:text-white text-base p-2 min-w-[40px] rounded-xl font-bold cursor-pointer transition-all duration-300 ease-in-out flex justify-center items-center leading-none"
          onClick={() => setOpen(true)}
        >
          Add Lecture
        </button>
        {open && (
          <Form
            title="Enter Material Details"
            fields={fields}
            onSubmit={handleSubmit}
            onClose={() => setOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Lectures;
