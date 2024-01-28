import React from "react";
import { withStyles } from "@mui/styles";
import { style } from "./PageStyles";


const SideMenu = (props) => {
  const  {classes}  = props;
  return (
    <div className={classes.sideMenu} >
    </div>
  );
};

export default withStyles(style)(SideMenu);
