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
  },
  darkMode: {
    backgroundColor: "#3e3340",
    auxColor: "#856c89",
    linkColor: "#161417"
  }
};

const theme = expandedTheme;

export default theme;

export type Theme = typeof expandedTheme;
