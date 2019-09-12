import React from "react";
import { makeStyles } from "@material-ui/core";
import { Theme } from "../../theme";

const useDarkGlobalStyles = makeStyles((theme: Theme) => {
  return {
    "@global": {
      body: {
        backgroundColor: theme.darkMode.backgroundColor,
      },
    },
  };
});
const DarkMode = () => {
  useDarkGlobalStyles();
  return <></>;
};

export default DarkMode;
