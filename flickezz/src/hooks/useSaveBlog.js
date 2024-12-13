import axios from "axios";
import { BACKEND_URL } from "../api/urls";

const useSaveBlog = () => {
  const createBlog = async (
    image,
    categoryId,
    title,
    description,
    sections
  ) => {
    const status = handleErrors(
      image,
      categoryId,
      title,
      description,
      sections
    );
    if (!status) return false;

    const accessToken = localStorage.getItem("accessToken");

    const formData = new FormData();
    if (image) formData.append("image", image);
    formData.append("categoryId", categoryId);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("count", sections.length);

    for (let i = 0; i < sections.length; i++) {
      if (sections[i].image) formData.append(`image${i}`, sections[i].image);
      formData.append(`title${i}`, sections[i].title);
      formData.append(`description${i}`, sections[i].description);
    }

    try {
      const { data } = await axios.post(`${BACKEND_URL}blog`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  return { createBlog };
};

const handleErrors = (image, categoryId, title, description, sections) => {
  console.log(title);

  if (parseInt(categoryId) === 0) {
    alert("Please select category");
  } else if (!title) {
    alert("Please enter title");
  } else {
    return true;
  }
  return false;
};

export default useSaveBlog;
