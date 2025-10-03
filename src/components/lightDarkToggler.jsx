import { useEffect, useState } from "react";

export default function LightDarkToggler() {
  const [theme, setTheme] = useState(getInitialTheme());

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [theme])

  const handleThemeToggle = () => {
    setTheme((prev) => {
      return prev === "light" ? "dark" : "light";
    });
  };

  return (
    <button
      className={`btn ${theme === "light" ? "btn-dark" : "btn-light"} ms-md-3`}
      onClick={handleThemeToggle}
    >
      {theme === "light" ? (
        <i className="bi bi-moon-stars-fill"></i>
      ) : (
        <i className="bi bi-sun"></i>
      )}
    </button>
  );
}

function getInitialTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}