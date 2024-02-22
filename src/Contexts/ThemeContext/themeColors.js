// themeColors.js
// Define color themes for dark and light modes

const darkTheme = {
  general: {
    backgroundColor: "#414141",
    textColor: "#fff",
    bgPaperContent: "#525252",
    inputBgColor: "#2a323c",
  },
  appBar: {
    backgroundColor: "#313131",
    color: "#f4f5fa",
  },
  drawer: {
    backgroundColor: "#525252",
    borderRight: "2px dashed #525252",
    color: "#fff",
    buttonActive: "#313131",
  },
  Paper: {
    backgroundColor: "#525252",
  },
};

const lightTheme = {
  general: {
    backgroundColor: "#f4f5fa",
    textColor: "#1d232a",
    bgPaperContent: "#fafafa",
    inputBgColor: "#fafafa",
  },
  appBar: {
    backgroundColor: "#89CFF3",
    color: "#313131",
  },
  drawer: {
    backgroundColor: "#f4f5fa",
    borderRight: "2px dashed #ddd",
    color: "#1d232a",
    buttonActive: "#A0E9FF",
  },
  Paper: {
    backgroundColor: "#525252",
  },
};

export { darkTheme, lightTheme };
