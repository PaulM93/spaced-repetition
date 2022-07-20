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
      studyCard: {
        visible: {
          zIndex: 0,
          border: "1px solid #262626",
          background: "#141414",
          position: "absolute",
          width: "100%",
          padding: "25px",
          minHeight: "75vh",
          display: "flex",
          flexDirection: "column",
          borderRadius: "10px",
          justifyContent: "space-between",
        },
        hidden: {
          zIndex: -1,
          position: "absolute",
          width: "100%",
          minHeight: "75vh",
          boxShadow: "5px 5px 11px 10px rgba(53,255,24,0.44)",
          borderRadius: "10px",
        },
        progressBarVisible: {
          position: "relative",
          marginTop: "20px",
          width: "200px",
          height: "7px",
          background: "#4A5568",
          borderRadius: "3px",
          boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
        },
        progressBarHidden: {
          position: "absolute",
          height: "100%",
          background: "linear-gradient(to right, #805AD5, #5E23E3)",
          borderRadius: "3px",
        },
        valueButton: {
          background: "transparent",
          color: whiteMain,
          border: "1px solid #262626",
          padding: "7px 15px 7px 15px",
          fontWeight: "500",
          fontSize: "14px",
          borderRadius: "7px",
        },
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
      studyCard: {
        visible: {
          zIndex: 0,
          background: "#EDF2F7",
          border: "1px solid #CBD5E0",
          position: "absolute",
          width: "100%",
          padding: "25px",
          minHeight: "75vh",
          display: "flex",
          flexDirection: "column",
          borderRadius: "10px",
          justifyContent: "space-between",
        },
        hidden: {
          zIndex: -1,
          position: "absolute",
          width: "100%",
          minHeight: "75vh",
          boxShadow: "5px 5px 11px 10px rgba(53,255,24,0.44)",
          borderRadius: "10px",
        },
        progressBarVisible: {
          position: "relative",
          marginTop: "20px",
          width: "200px",
          height: "7px",
          background: "#CBD5E0",
          borderRadius: "3px",
          boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
        },
        progressBarHidden: {
          position: "absolute",
          height: "100%",
          background:
            "-webkit-linear-gradient(left, #805AD5, #5E23E3), -webkit-linear-gradient(left, #805AD5, #5E23E3), -moz-linear-gradient(left, #805AD5, #5E23E3), linear-gradient(to right, #805AD5, #5E23E3)",
          borderRadius: "3px",
        },
        valueButton: {
          background: "transparent",
          color: blackMain,
          border: "1px solid #CBD5E0",
          padding: "7px 15px 7px 15px",
          fontWeight: "500",
          fontSize: "14px",
          borderRadius: "7px",
        },
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
            zIndez: 0,
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
            zIndez: -2,
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
