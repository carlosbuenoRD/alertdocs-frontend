import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import App from "./App";

const AppWrapper = (props: any) => {
  const [colorScheme, setColorScheme] = useState("light");
  const [theme, setTheme] = useState("blue");
  const [componentTheme, setComponentTheme] = useState("blue");

  let location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const onColorSchemeChange = (scheme: string) => {
    changeStyleSheetUrl("layout-css", "layout-" + scheme + ".css", 1);
    changeStyleSheetUrl("theme-css", "theme-" + scheme + ".css", 1);
    setColorScheme(scheme);
  };

  const changeStyleSheetUrl = (id: any, value: any, from: any) => {
    const element = document.getElementById(id) as HTMLInputElement;
    const urlTokens = (element.getAttribute("href") as String).split("/");

    if (from === 1) {
      // which function invoked this function - change scheme
      urlTokens[urlTokens.length - 1] = value;
    } else if (from === 2) {
      // which function invoked this function - change color
      urlTokens[urlTokens.length - 2] = value;
    }

    const newURL = urlTokens.join("/");

    replaceLink(element, newURL);
  };

  const onMenuThemeChange = (theme: string) => {
    const layoutLink = document.getElementById("layout-css");
    const href =
      "/assets/layout/css/" + theme + "/layout-" + colorScheme + ".css";

    replaceLink(layoutLink, href);
    setTheme(theme);
  };

  const onComponentThemeChange = (theme: string) => {
    const themeLink = document.getElementById("theme-css");
    const href = "/assets/theme/" + theme + "/theme-" + colorScheme + ".css";

    replaceLink(themeLink, href);
    setComponentTheme(theme);
  };

  const replaceLink = (linkElement: any, href: string, callback?: any) => {
    const id = linkElement.getAttribute("id");
    const cloneLinkElement = linkElement.cloneNode(true);

    cloneLinkElement.setAttribute("href", href);
    cloneLinkElement.setAttribute("id", id + "-clone");

    linkElement.parentNode.insertBefore(
      cloneLinkElement,
      linkElement.nextSibling
    );

    cloneLinkElement.addEventListener("load", () => {
      linkElement.remove();
      cloneLinkElement.setAttribute("id", id);

      if (callback) {
        callback();
      }
    });
  };

  return (
    <App
      colorScheme={colorScheme}
      onColorSchemeChange={onColorSchemeChange}
      componentTheme={componentTheme}
      onComponentThemeChange={onComponentThemeChange}
      theme={theme}
      onMenuThemeChange={onMenuThemeChange}
    />
  );
};

export default AppWrapper;
