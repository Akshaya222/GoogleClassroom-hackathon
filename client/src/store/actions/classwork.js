import axios from "axios";
export const GET_FULL_INFO = "GET_FULL_INFO";
export const SET_SELECTEDCLASS_ID="SET_SELECTEDCLASS_ID";
const token = JSON.parse(localStorage.getItem("token"));

export const selectClass = (classId) => {
  console.log("from actions",classId)
  return (dispatch) => {
    dispatch(getFullInfo(classId));
  };
};

export const setSelectedClassId=(classId)=>{
  console.log("from setselectedclassId",classId)
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
        `http://localhost:3002/classwork/create/${classId}`,
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
        console.log("sucess from createclasswork",response)
        dispatch(getFullInfo(classId));
      }
    } catch (e) {
      console.log("error from create assignment",e.response.data.message);
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
        `http://localhost:3002/classwork/edit/${classId}/${classworkId}`,
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
        `http://localhost:3002/classwork/answer/${classId}/${classworkId}`,
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
        `http://localhost:3002/classwork/addmarks/${classId}/${classworkId}`,
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
        `http://localhost:3002/classwork/delete-classwork/${classId}/${classworkId}`,
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
        `http://localhost:3002/class/${classId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      console.log("response",response)
      dispatch({ type: GET_FULL_INFO, payload: response.data.data });
    } catch (e) {
      console.log(e);
    }
  };
};
