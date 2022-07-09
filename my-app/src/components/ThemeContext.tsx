import React, { useEffect, useState, useContext, createContext } from "react";

const ThemeContext = createContext<any>({});

export const ThemeProvider = ({ children }) => {
  //Background colors

  const purpleMain = "#805AD5";
  const themes = {
    dark: {
      navbar: {
        borderBottom: "1px solid #262626",
      },
      buttons: {
        signupButtonNav: {
          initial: {
            borderRadius: "7px",
            padding: "5px 10px 5px 10px",
            color: "#fafafa",
            fontSize: "12px",
            background: purpleMain,
            border: "1px solid #805AD5",
            position: "absolute",
          },
          hover: {
            borderRadius: "7px",
            padding: "5px 10px 5px 10px",
            color: "#805AD5",
            fontSize: "12px",
            border: "1px solid #805AD5",
          },
        },
        signupButtonLanding: {
          initial: {
            position: "absolute",
            borderRadius: "5px",
            width: "200px",
            fontWeight: "500",
            marginRight: "10px",
            color: "#fafafa",
            padding: "10px 20px 10px 20px",
            background: "#805AD5",
            border: "1px solid #805AD5",
          },
          hover: {
            width: "200px",
            fontWeight: "500",
            marginRight: "10px",
            borderRadius: "5px",
            padding: "10px 20px 10px 20px",
            color: "#805AD5",
            border: "1px solid #805AD5",
          },
        },
        navButton: {
          initial: {
            borderRadius: "7px",
            padding: "5px 10px 5px 10px",
            color: "#805AD5",
            fontSize: "12px",
            border: "1px solid #805AD5",
            position: "absolute",
          },
          hover: {
            borderRadius: "7px",
            padding: "5px 10px 5px 10px",
            background: "#805AD5",
            color: "#fafafa",
            fontSize: "12px",
            border: "1px solid #805AD5",
          },
        },
        authButton: {
          initial: {
            borderRadius: "7px",
            padding: "10px 20px 10px 20px",
            color: "white",
            width: "100%",
            fontSize: "16px",
            background: "#805AD5",
            border: "1px solid #805AD5",
            position: "absolute",
          },
          hover: {
            borderRadius: "7px",
            width: "100%",
            padding: "10px 20px 10px 20px",
            color: "#ffffffb3",
            fontSize: "16px",
            border: "1px solid #ffffffb3",
          },
        },
      },
      color: "white",
      background: "black",
    },
    light: {
      navbar: {
        borderBottom: "1px solid #eaeaea",
      },
      buttons: {
        signupButtonNav: {
          initial: {
            borderRadius: "7px",
            padding: "5px 10px 5px 10px",
            color: "white",
            fontSize: "12px",
            background: "#805AD5",
            border: "1px solid #805AD5",
            position: "absolute",
          },
          hover: {
            borderRadius: "7px",
            padding: "5px 10px 5px 10px",
            color: "#ffffffb3",
            fontSize: "12px",
            border: "1px solid #ffffffb3",
          },
        },
        signupButtonLanding: {
          initial: {
            position: "absolute",
            borderRadius: "5px",
            background: "white",
            width: "200px",
            fontWeight: "500",
            marginRight: "10px",
            color: "black",
            padding: "10px 20px 10px 20px",
            border: "1px solid white",
          },
          hover: {
            width: "200px",
            fontWeight: "500",
            marginRight: "10px",
            borderRadius: "5px",
            padding: "10px 20px 10px 20px",
            color: "#805AD5",
            border: "1px solid #805AD5",
          },
        },
        navButton: {
          initial: {
            borderRadius: "7px",
            padding: "5px 10px 5px 10px",
            color: "#ffffffb3",
            fontSize: "12px",
            border: "1px solid #262626",
            position: "absolute",
          },
          hover: {
            borderRadius: "7px",
            padding: "5px 10px 5px 10px",
            color: "#ffffffb3",
            fontSize: "12px",
            border: "1px solid #ffffffb3",
          },
        },
        authButton: {
          initial: {
            borderRadius: "7px",
            padding: "10px 20px 10px 20px",
            color: "white",
            width: "100%",
            fontSize: "16px",
            background: "#7928CA",
            border: "1px solid #7928CA",
            position: "absolute",
          },
          hover: {
            borderRadius: "7px",
            width: "100%",
            padding: "10px 20px 10px 20px",
            color: "#ffffffb3",
            fontSize: "16px",
            border: "1px solid #ffffffb3",
          },
        },
      },
    },
  };
  const [themeVal, setThemeVal] = useState("dark");
  const [theme, setTheme] = useState(themes.dark);
  useEffect(() => {
    setTheme(themes[themeVal]);
  }, [themeVal]);

  return (
    <>
      <ThemeContext.Provider
        value={{
          themeVal,
          theme,
          setThemeVal,
        }}
      >
        {children}
      </ThemeContext.Provider>
    </>
  );
};

export const useTheme = () => useContext(ThemeContext);
