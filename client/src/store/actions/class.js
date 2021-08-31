import axios from "axios";
export const GET_ALL_CLASSES = "GET_ALL_CLASSES";
const token = JSON.parse(localStorage.getItem("token"));

export const toHandleCreateBox=(bool)=>{
  return {
    type:"OPEN_CREATE_BOX",
    payload:bool
  }
}

export const toHandleJoinBox=(bool)=>{
  return {
    type:"OPEN_JOIN_BOX",
    payload:bool
  }
}


export const createClass = (name, description) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "https://ourgclassroom.herokuapp.com/class/create",
        {
          name,
          description
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
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
        "https://ourgclassroom.herokuapp.com/class/join",
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
        `https://ourgclassroom.herokuapp.com/class/edit/${classId}`,
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
        `https://ourgclassroom.herokuapp.com/class/exit/${classId}`,
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
        `https://ourgclassroom.herokuapp.com/class/remove-student/${classId}`,
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
        `https://ourgclassroom.herokuapp.com/class/delete/${classId}`,
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
      const response = await axios.get(`https://ourgclassroom.herokuapp.com/user/classes`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      dispatch({ type: GET_ALL_CLASSES, payload: response.data.data });
    } catch (e) {
      console.log(e.response.data.message);
    }
  };
};
