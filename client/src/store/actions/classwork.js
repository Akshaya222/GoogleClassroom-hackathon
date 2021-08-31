import axios from "axios";
export const GET_FULL_INFO = "GET_FULL_INFO";
export const SET_SELECTEDCLASS_ID="SET_SELECTEDCLASS_ID";
const token = JSON.parse(localStorage.getItem("token"));

export const selectClass = (classId) => {
  return (dispatch) => {
    dispatch(getFullInfo(classId));
  };
};

export const setSelectedClassId=(classId)=>{
  return {
    type:SET_SELECTEDCLASS_ID,
    payload:classId
  }
}

export const createClassWork = (
  title,
  type,
  description,
  photo,
  dueDate,
  points,
  task,
  classId
) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `https://ourgclassroom.herokuapp.com/classwork/create/${classId}`,
        {
          title,
          type,
          description,
          photo,
          dueDate,
          points,
          task
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      if (response) {
        dispatch(getFullInfo(classId));
      }
    } catch (e) {
      console.log(e.response.data.message);
    }
  };
};

export const editClassWork = (
  classId,
  classworkId,
  title,
  type,
  description,
  photo,
  dueDate,
  points,
  task
) => {
  return async (dispatch) => {
    try {
      const response = await axios.patch(
        `https://ourgclassroom.herokuapp.com/classwork/edit/${classId}/${classworkId}`,
        {
          title,
          type,
          description,
          photo,
          dueDate,
          points,
          task
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      if (response) {
        dispatch(getFullInfo(classId));
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const addAnswer = (classId, classworkId, answers) => {
  return async (dispatch) => {
    try {
      const response = await axios.patch(
        `https://ourgclassroom.herokuapp.com/classwork/answer/${classId}/${classworkId}`,
        {
          answers
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      if (response) {
        dispatch(getFullInfo(classId));
      }
    } catch (e) {
      console.log(e.response.data.message);
    }
  };
};

export const addMarks =(classId, classworkId, marks, student) => {
  return async (dispatch) => {
    try {
      const response = await axios.patch(
        `https://ourgclassroom.herokuapp.com/classwork/addmarks/${classId}/${classworkId}`,
        {
          marks,
          student
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      if (response) {
        dispatch(getFullInfo(classId));
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const deleteClassWork = (classId, classworkId) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `https://ourgclassroom.herokuapp.com/classwork/delete-classwork/${classId}/${classworkId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      if (response) {
        dispatch(getFullInfo(classId));
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const getFullInfo = (classId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `https://ourgclassroom.herokuapp.com/class/${classId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      dispatch({ type: GET_FULL_INFO, payload: response.data.data });
    } catch (e) {
      console.log(e);
    }
  };
};
