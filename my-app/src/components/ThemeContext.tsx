import React, { useState, useContext, createContext } from "react";

const ThemeContext = createContext<any>({});

export const ThemeProvider = ({ children }) => {
  //Background colors

  //We need to ensure the theme is set on page refresh
  // light: "#171923",
  // lightSubtle: "#4A5568",
  // dark: "#ffffff",
  // darkSubtle: "#ffffffb3",

  //Colors
  const purpleMain = "#805AD5";
  const blackMain = "#171923";
  const borderSubtle = "#eaeaea";
  const whiteMain = "#ffffff";
  const borderRadius = "7px";
  const themes = {
    //Dark theme
    dark: {
      collectionCard: {
        background: "#141414",
        border: "1px solid #262626",
        boxShadow:
          "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
        borderRadius: "10px",
        height: "100%",
        width: "100%",
      },
      navbar: {
        borderBottom: "1px solid #262626",
      },
      buttons: {
        addCollectionButton: {
          borderRadius: "7px",
          padding: "5px 10px 5px 10px",
          color: "#805AD5",
          height: "30px",
          postition: "relative",
          fontWeight: 500,
          fontSize: "12px",
          width: "130px",
          border: "1px solid #805AD5",
        },
        signupButtonNav: {
          initial: {
            fontWeight: 500,
            borderRadius: borderRadius,
            padding: "5px 10px 5px 10px",
            color: whiteMain,
            fontSize: "12px",
            background: purpleMain,
            border: `1px solid ${purpleMain}`,
            position: "absolute",
          },
          hover: {
            fontWeight: 500,
            borderRadius: borderRadius,
            padding: "5px 10px 5px 10px",
            color: "#ffffffb3",
            fontSize: "12px",
            border: "1px solid #ffffffb3",
          },
        },
        signupButtonLanding: {
          initial: {
            position: "absolute",
            borderRadius: borderRadius,
            background: whiteMain,
            width: "200px",
            fontWeight: "500",
            marginRight: "10px",
            color: "black",
            padding: "10px 20px 10px 20px",
            border: "1px solid whiteMain",
          },
          hover: {
            width: "200px",
            fontWeight: "500",
            marginRight: "10px",
            borderRadius: borderRadius,
            padding: "10px 20px 10px 20px",
            color: purpleMain,
            border: `1px solid ${purpleMain}`,
          },
        },
        navButton: {
          initial: {
            fontWeight: 500,
            borderRadius: borderRadius,
            padding: "5px 10px 5px 10px",
            color: "#ffffffb3",
            fontSize: "12px",
            border: "1px solid #262626",
            position: "absolute",
          },
          hover: {
            fontWeight: 500,
            borderRadius: borderRadius,
            padding: "5px 10px 5px 10px",
            color: "#ffffffb3",
            fontSize: "12px",
            border: "1px solid #ffffffb3",
          },
        },
        authButton: {
          initial: {
            fontWeight: 500,
            borderRadius: borderRadius,
            padding: "10px 20px 10px 20px",
            color: whiteMain,
            width: "100%",
            fontSize: "16px",
            background: purpleMain,
            border: `1px solid ${purpleMain}`,
            position: "absolute",
          },
          hover: {
            fontWeight: 500,
            borderRadius: borderRadius,
            width: "100%",
            padding: "10px 20px 10px 20px",
            color: "#ffffffb3",
            fontSize: "16px",
            border: "1px solid #ffffffb3",
          },
          helperText: {
            color: whiteMain,
            fontWeight: 500,
            marginLeft: borderRadius,
          },
        },
      },
    },
    light: {
      collectionCard: {
        background: "#EDF2F7",
        border: "1px solid #CBD5E0",
        boxShadow:
          "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
        borderRadius: "10px",
        height: "100%",
        width: "100%",
      },
      navbar: {
        borderBottom: "1px solid #eaeaea",
      },
      buttons: {
        addCollectionButton: {
          borderRadius: "7px",
          padding: "5px 10px 5px 10px",
          color: whiteMain,
          background: purpleMain,
          fontSize: "12px",
          fontWeight: 500,
          dispay: "flex",
          alignItems: "center",
          width: "130px",
          border: `1px solid ${purpleMain}`,
        },
        signupButtonNav: {
          initial: {
            fontWeight: 500,
            borderRadius: borderRadius,
            padding: "5px 10px 5px 10px",
            color: "#fafafa",
            fontSize: "12px",
            background: purpleMain,
            border: `1px solid ${purpleMain}`,
            position: "absolute",
          },
          hover: {
            fontWeight: 500,
            borderRadius: borderRadius,
            padding: "5px 10px 5px 10px",
            color: purpleMain,
            fontSize: "12px",
            border: `1px solid ${purpleMain}`,
          },
        },
        signupButtonLanding: {
          initial: {
            position: "absolute",
            borderRadius: borderRadius,
            width: "200px",
            fontWeight: 500,
            marginRight: "10px",
            color: "#fafafa",
            padding: "10px 20px 10px 20px",
            background: purpleMain,
            border: `1px solid ${purpleMain}`,
          },
          hover: {
            width: "200px",
            fontWeight: 500,
            marginRight: "10px",
            borderRadius: borderRadius,
            padding: "10px 20px 10px 20px",
            color: purpleMain,
            border: `1px solid ${purpleMain}`,
          },
        },
        navButton: {
          initial: {
            fontWeight: 500,
            borderRadius: borderRadius,
            padding: "5px 10px 5px 10px",
            color: purpleMain,
            fontSize: "12px",
            border: `1px solid ${borderSubtle}`,
            position: "absolute",
          },
          hover: {
            fontWeight: 500,
            borderRadius: borderRadius,
            padding: "5px 10px 5px 10px",
            background: "none",
            color: purpleMain,
            fontSize: "12px",
            border: `1px solid ${purpleMain}`,
          },
        },
        authButton: {
          initial: {
            fontWeight: 500,
            borderRadius: borderRadius,
            padding: "10px 20px 10px 20px",
            color: whiteMain,
            width: "100%",
            fontSize: "16px",
            background: "purpleMain",
            border: `1px solid ${purpleMain}`,
            position: "absolute",
          },
          hover: {
            fontWeight: 500,
            borderRadius: borderRadius,
            width: "100%",
            padding: "10px 20px 10px 20px",
            color: purpleMain,
            fontSize: "16px",
            border: `1px solid ${purpleMain}`,
          },
          helperText: {
            color: blackMain,
            marginLeft: borderRadius,
            fontWeight: 500,
          },
        },
      },
    },
  };
  const [theme, setTheme] = useState(themes.dark);

  return (
    <>
      <ThemeContext.Provider
        value={{
          theme,
          themes,
          setTheme,
        }}
      >
        {children}
      </ThemeContext.Provider>
    </>
  );
};

export const useTheme = () => useContext(ThemeContext);
