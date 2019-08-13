import { createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import pink from "@material-ui/core/colors/pink";

const customTheme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: pink
  }
});

const expandedTheme = {
  ...customTheme,
  status: {
    danger: "orange"
  }
};

const theme = expandedTheme;

export default theme;

export type Theme = typeof expandedTheme;
