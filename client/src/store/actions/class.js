import axios from "axios";
export const GET_ALL_CLASSES = "GET_ALL_CLASSES";
const token = JSON.parse(localStorage.getItem("token"));

export const createClass = (name, description) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:3002/class/create",
        {
          name,
          description
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("response from createClass action", response);
      if (response) {
        dispatch(getAllClasses());
      }
    } catch (e) {
      console.log(e.response.data.message);
    }
  };
};

export const joinClass = (code) => {
  return async (dispatch) => {
    try {
      const response = await axios.patch(
        "http://localhost:3002/class/join",
        {
          code
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      if (response) {
        dispatch(getAllClasses());
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const editClass = (name, description, classId) => {
  return async (dispatch) => {
    try {
      const response = await axios.patch(
        `http://localhost:3002/class/edit/${classId}`,
        {
          name,
          description
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      if (response) {
        dispatch(getAllClasses());
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const exitFromClass = (classId) => {
  return async (dispatch) => {
    try {
      const response = await axios.patch(
        `http://localhost:3002/class/exit/${classId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      if (response) {
        dispatch(getAllClasses());
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const removeStudent = (student, classId) => {
  return async (dispatch) => {
    try {
      const response = await axios.patch(
        `http://localhost:3002/class/remove-student/${classId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      if (response) {
        dispatch(getAllClasses());
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const deleteClass = (classId) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `http://localhost:3002/class/delete/${classId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      if (response) {
        dispatch(getAllClasses());
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const getAllClasses = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:3002/user/classes`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      dispatch({ type: GET_ALL_CLASSES, payload: response.data.data });
    } catch (e) {
      console.log(e);
    }
  };
};
