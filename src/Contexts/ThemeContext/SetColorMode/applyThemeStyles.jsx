// applyThemeStyles.js
import { darkTheme, lightTheme } from "../themeColors"; // Adjust the path as necessary

export function applyThemeStyles(isDarkMode) {
  const theme = isDarkMode ? darkTheme : lightTheme;

  // General theme styles
  document.documentElement.style.setProperty(
    "--background-color-theme",
    theme.general.backgroundColor
  );
  document.documentElement.style.setProperty(
    "--text-color-theme",
    theme.general.textColor
  );
  document.documentElement.style.setProperty(
    "--PaperBg-color-theme",
    theme.general.bgPaperContent
  );
  document.documentElement.style.setProperty(
    "--InputBgcolor-color-theme",
    theme.general.inputBgColor
  );

  // AppBar theme styles
  document.documentElement.style.setProperty(
    "--Appbar-background-color-theme",
    theme.appBar.backgroundColor
  );
  document.documentElement.style.setProperty(
    "--Appbar-text-color-theme",
    theme.appBar.color
  );

  // Drawer theme styles
  document.documentElement.style.setProperty(
    "--Drawer-background-color-theme",
    theme.drawer.backgroundColor
  );
  document.documentElement.style.setProperty(
    "--Drawer-borderRight-color-theme",
    theme.drawer.borderRight
  );
  document.documentElement.style.setProperty(
    "--Drawer-color-theme",
    theme.drawer.color
  );
  document.documentElement.style.setProperty(
    "--Drawer-buttonActive-color-theme",
    theme.drawer.buttonActive
  );
}
