import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import useSaveBlog from "../../hooks/useSaveBlog";
import useLoadCategories from "../../hooks/useLoadCategories";

const CreateBlog = () => {
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("0");
  const [title, setTitle] = useState("");

  const [mainEditor, setMainEditor] = useState(null);

  const editRef = useRef();

  useEffect(() => {
    if (!editRef.current) {
      const quill = new Quill("#mainEditor", { theme: "snow" });
      setMainEditor(quill);
      editRef.current = true;
    }
  }, []);

  const [sections, setSections] = useState([]);

  const addSection = () => {
    setSections((prev) => [
      ...prev,
      {
        id: Date.now(),
        image: null,
        title: "",
        descriptionEditor: null,
      },
    ]);
  };

  const handleChangeMainImage = (e) => {
    if (e.target.files.length > 0) {
      setImage(e.target.files[0]);
      let view = document.getElementById(`img1View`);
      view.style.backgroundImage = `url(${URL.createObjectURL(
        e.target.files[0]
      )})`;
    }
  };

  const handleSectionImageChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const sectionId = parseInt(e.target.id, 10); // Ensure ID is parsed as a number

      setSections((prev) =>
        prev.map((section) =>
          section.id === sectionId ? { ...section, image: file } : section
        )
      );

      let view = document.getElementById(`view${e.target.id}`);
      view.style.backgroundImage = `url(${URL.createObjectURL(
        e.target.files[0]
      )})`;
    }
  };

  const handleChangeSectionInput = (e, id) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === parseInt(id)
          ? { ...section, title: e.target.value }
          : section
      )
    );
  };

  useEffect(() => {
    sections.forEach((s) => {
      if (!s.descriptionEditor) {
        const quillInstance = new Quill(`#editor${s.id}`, { theme: "snow" });
        setSections((prev) =>
          prev.map((section) =>
            section.id === s.id
              ? { ...section, descriptionEditor: quillInstance }
              : section
          )
        );
      }
    });
  }, [sections.length]);

  const { createBlog } = useSaveBlog();

  const handleSave = async () => {
    const status = await createBlog(
      image,
      category,
      title,
      mainEditor.root.innerHTML,
      sections.map((s) => {
        return {
          image: s.image,
          title: s.title,
          description: s.descriptionEditor.root.innerHTML,
        };
      })
    );

    if (status) {
      alert("Blog created success");
      window.location.reload();
    }
  };

  const { loadCategories } = useLoadCategories();
  useEffect(() => {
    const load = async () => {
      const data = await loadCategories();
      setCategories(data);
    };
    load();
  }, []);

  return (
    <div className="container-fluid text-white">
      <div className="row">
        <div className="container mt-5">
          <div className="row mt-5">
            <div className="col-12 col-md-6 col-lg-6 offset-lg-3">
              <div className="row">
                <div className="col-12 mt-2">
                  <label htmlFor="" className="form-label">
                    Image
                  </label>
                  <input
                    type="file"
                    className="form-control d-none"
                    id="img1"
                    onChange={handleChangeMainImage}
                  />
                  <label
                    htmlFor="img1"
                    className="div-img-1 d-flex justify-content-center align-items-center rounded-2"
                    id="img1View"
                  >
                    <span>Select Image</span>
                  </label>
                </div>
                <div className="col-12 mt-2">
                  <label htmlFor="" className="form-label">
                    Category
                  </label>
                  <select
                    name="category"
                    id=""
                    className="form-select bg-black inpp-1 h-45"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="0">Select Category</option>
                    {categories.map((c, index) => (
                      <option key={index} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-12 mt-2">
                  <label htmlFor="" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control bg-black inpp-1 h-45"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="col-12 mt-2">
                  <label htmlFor="" className="form-label">
                    Description
                  </label>
                  <div id="mainEditor"></div>
                </div>
                <div style={{ height: "100px" }}></div>
              </div>

              <div className="col-12 d-inline-flex justify-content-between align-items-center">
                <h2>Sections</h2>
              </div>

              <div className="row">
                <div className="col-12 sections">
                  {sections.map((section, index) => (
                    <div className="row" key={index}>
                      <div className="col-12 mt-2">
                        <label htmlFor="" className="form-label">
                          Image
                        </label>
                        <input
                          type="file"
                          className="form-control d-none"
                          id={`${section.id}`}
                          onChange={handleSectionImageChange}
                        />
                        <label
                          htmlFor={`${section.id}`}
                          id={`view${section.id}`}
                          className={` div-img-1 d-flex justify-content-center align-items-center rounded-2`}
                        >
                          <span>Select Image</span>
                        </label>
                      </div>
                      <div className="col-12 mt-2">
                        <label htmlFor="" className="form-label">
                          Title
                        </label>
                        <input
                          type="text"
                          className="form-control bg-black inpp-1 h-45"
                          name="title"
                          value={section.title}
                          onChange={(e) =>
                            handleChangeSectionInput(e, section.id)
                          }
                        />
                      </div>
                      <div className="col-12 mt-2">
                        <label htmlFor="" className="form-label">
                          Description
                        </label>
                        <div id={`editor${section.id}`}></div>
                      </div>
                      <div style={{ height: "100px" }}></div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-12 d-inline-flex justify-content-end mb-5">
                <button className="btn btn-light" onClick={addSection}>
                  Add New
                </button>
              </div>

              <div className="col-12 d-inline-flex justify-content-end mb-5">
                <button className="btn btn-success" onClick={handleSave}>
                  Publish
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
