import { useState, useEffect } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("mytheme");

  // Initialize theme based on localStorage or default to light
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "mytheme";
    document.documentElement.setAttribute("data-theme", storedTheme);
    setTheme(storedTheme);
  }, []);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    const newTheme = theme === "mytheme" ? "myDarktheme" : "mytheme";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <input
      type="checkbox"
      value="synthwave"
      checked={theme === "mytheme"}
      onChange={toggleTheme} // Changed from onClick to onChange
      className="toggle theme-controller hidden sm:block"
    />
  );
};

export default ThemeToggle;
