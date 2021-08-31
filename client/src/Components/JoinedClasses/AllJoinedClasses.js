import React, { useEffect } from "react";
import JoinedClasses from "./JoinedClasses";
import { getAllClasses } from "../../store/actions/class";
import HomeNavbar from "../Navbar/Home-Navbar/home.navbar";
import Drawer from "../Drawer/Drawer";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
const AllJoinedClass = () => {
  const dispatch = useDispatch();
  const classesList = useSelector((state) => state.state.classes);
  const [createdClasses, setCreatedClasses] = React.useState([]);

  useEffect(() => {
    dispatch(getAllClasses());
  }, [dispatch]);

  if (Object.keys(classesList).length==0) {
    return <div>Loading...</div>;
  } else {
    return (
     <div style={{minHeight:"100vh"}} >
      <Drawer classesList={classesList.classes} />
      <div className="classees_container" >
        {classesList.classes.map((item) => (
          <JoinedClasses classData={item} />
        ))}
        {/* <JoinedClasses classData={classesList[0]} /> */}
      </div>
     </div>

    );
  }
};

export default AllJoinedClass;
