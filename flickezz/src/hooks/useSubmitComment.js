import axios from "axios";
import { BACKEND_URL } from "../api/urls";

const useSubmitComment = () => {
  const addComment = async (formData, id) => {
    const status = handleErrors(formData);
    if (!status) return false;
    try {
      const { data } = await axios.post(
        `${BACKEND_URL}blog/comment/${id}`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      return true;
    } catch (error) {
      return false;
    }
  };
  return { addComment };
};

const handleErrors = (formData) => {
  if (formData.name.trim().length === 0) {
    alert("Please enter your name");
  } else if (formData.email.trim().length === 0) {
    alert("Please enter your email");
  } else if (formData.description.trim().length === 0) {
    alert("Please enter comment");
  } else {
    return true;
  }

  return false;
};

export default useSubmitComment;
