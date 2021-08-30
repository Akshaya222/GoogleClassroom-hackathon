import React, { useEffect } from "react";
import JoinedClasses from "./JoinedClasses";
import { getAllClasses } from "../../store/actions/class";
import { useDispatch, useSelector } from "react-redux";

const AllJoinedClass = () => {
  const dispatch = useDispatch();
  const classesList = useSelector((state) => state.state.classes);
  console.log("classList is..", classesList);
  const [createdClasses, setCreatedClasses] = React.useState([]);

  useEffect(() => {
    dispatch(getAllClasses());
  }, [dispatch]);

  if (classesList.length === 0) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        {/* {console.log(classesList.classes)} */}
        {classesList.classes.map((item) => (
          <JoinedClasses classData={item} />
        ))}
        {/* <JoinedClasses classData={classesList[0]} /> */}
      </div>
    );
  }
};

export default AllJoinedClass;
