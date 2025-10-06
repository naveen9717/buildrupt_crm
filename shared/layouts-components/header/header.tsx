"use client";

import React, { useEffect, useRef, useState } from "react";
import Switcher from "../switcher/switcher";
import {
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  Form,
  ListGroup,
  Modal,
} from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import { basePath } from "@/next.config";
import SimpleBar from "simplebar-react";
import { MENUITEMS } from "../sidebar/nav";
import { getState, setState } from "../services/switcherServices";
import SpkButton from "@/shared/@spk-reusable-components/general-reusable/reusable-uielements/spk-buttons";
import { useRouter } from "next/navigation";

const Header = () => {
  let [variable, setVariable] = useState(getState());
  const router = useRouter();

  // state
  const [profile, setProfile] = useState({
    id: "",
    name: "",
    role: "",
    mobile: "",
    email: "",
    address: "",
    password: "",
  });

  // load from localStorage, then refresh from DB using id
  useEffect(() => {
    try {
      const saved = localStorage.getItem("LoginData");
      if (saved) {
        const u = JSON.parse(saved);
        // Prefill immediately from localStorage
        setProfile((p) => ({
          ...p,
          id: u.id || "",
          name: u.name || "",
          role: u.role || "",
          mobile: u.mobile || "",
          email: u.email || "",
          password: u.password || "", // you requested plain
          address: u.address || "",
        }));

        // Then fetch the latest from DB using id
        if (u.id) {
          const url = `${
            process.env.NEXT_PUBLIC_URL ?? ""
          }/api/login?id=${encodeURIComponent(u.id)}`;
          fetch(url)
            .then((r) => r.json())
            .then((res) => {
              if (res?.success && res.user) {
                // overwrite with server truth
                setProfile((p) => ({
                  ...p,
                  id: res.user.id ?? "",
                  name: res.user.name ?? "",
                  role: res.user.role ?? "",
                  mobile: res.user.mobile ?? "",
                  email: res.user.email ?? "",
                  password: res.user.password ?? "", // plain per your flow
                  address: res.user.address ?? "",
                }));
                // keep localStorage in sync
                localStorage.setItem("LoginData", JSON.stringify(res.user));
              }
            })
            .catch(() => {
              /* ignore fetch error; we already have local copy */
            });
        }
      }
    } catch {}

    const user = localStorage.getItem("LoginData");

    // ✅ if no user found, redirect to login page
    if (!user) {
      router.push("/");
    }
  }, []);
  // MenuClose Function

  const handleLogout = () => {
    localStorage.removeItem("LoginData");
    router.push("/");
  };
  function menuClose() {
    const theme = getState();

    if (window.innerWidth <= 992) {
      const newState = {
        toggled: "close",
      };
      setState(newState);
    }

    if (window.innerWidth >= 992) {
      const local_varaiable = theme;
      const newToggledValue = local_varaiable.toggled
        ? local_varaiable.toggled
        : "";

      setState({ toggled: newToggledValue });
    }
  }

  // Sidebar Toggle Function

  const overlayRef = useRef<HTMLDivElement | null>(null);
  const Query = (selector: any) => document.querySelector(selector);

  const toggleSidebar = () => {
    const theme = getState();
    const sidemenuType = theme.dataNavLayout;
    if (window.innerWidth >= 992) {
      if (sidemenuType === "vertical") {
        const verticalStyle = theme.dataVerticalStyle;
        const navStyle = theme.dataNavStyle;
        switch (verticalStyle) {
          case "closed":
            // Toggle between open/close state for "closed" vertical style
            setState({
              dataNavStyle: "",
              toggled:
                theme.toggled === "close-menu-close" ? "" : "close-menu-close",
            });
            break;
          case "overlay":
            // Handle icon-overlay state with window width check
            setState({
              dataNavStyle: "",
              toggled:
                theme.toggled === "icon-overlay-close"
                  ? ""
                  : "icon-overlay-close",
              iconOverlay: "",
            });

            if (
              theme.toggled !== "icon-overlay-close" &&
              window.innerWidth >= 992
            ) {
              setState({
                toggled: "icon-overlay-close",
                iconOverlay: "",
              });
            }
            break;
          case "icontext":
            // Handle icon-text state
            setState({
              dataNavStyle: "",
              toggled:
                theme.toggled === "icon-text-close" ? "" : "icon-text-close",
            });
            break;
          case "doublemenu":
            // Handle double menu state
            setState({ dataNavStyle: "" });
            if (theme.toggled === "double-menu-open") {
              setState({ toggled: "double-menu-close" });
            } else {
              // Toggle the active double menu item
              const sidemenu = Query(".side-menu__item.active");
              if (sidemenu) {
                setState({ toggled: "double-menu-open" });
                if (sidemenu.nextElementSibling) {
                  sidemenu.nextElementSibling.classList.add(
                    "double-menu-active"
                  );
                } else {
                  setState({ toggled: "double-menu-close" });
                }
              }
            }
            break;
          case "detached":
            // Handle detached menu state
            setState({
              toggled:
                theme.toggled === "detached-close" ? "" : "detached-close",
              iconOverlay: "",
            });
            break;
          default:
            setState({ toggled: "" });
            break;
        }

        // Handle navStyle changes
        switch (navStyle) {
          case "menu-click":
            setState({
              toggled:
                theme.toggled === "menu-click-closed"
                  ? ""
                  : "menu-click-closed",
            });
            break;
          case "menu-hover":
            setState({
              toggled:
                theme.toggled === "menu-hover-closed"
                  ? ""
                  : "menu-hover-closed",
            });
            break;
          case "icon-click":
            setState({
              toggled:
                theme.toggled === "icon-click-closed"
                  ? ""
                  : "icon-click-closed",
            });
            break;
          case "icon-hover":
            setState({
              toggled:
                theme.toggled === "icon-hover-closed"
                  ? ""
                  : "icon-hover-closed",
            });
            break;
        }
      }
    } else {
      // For mobile view (screen width < 992px)
      if (theme.toggled === "close") {
        setState({ toggled: "open" });

        setTimeout(() => {
          if (theme.toggled === "open") {
            const overlay = overlayRef.current;
            if (overlay) {
              overlay.classList.add("active");
              overlay.addEventListener("click", () => {
                const overlay = overlayRef.current;
                if (overlay) {
                  overlay.classList.remove("active");
                  menuClose();
                }
              });
            }
          }
          window.addEventListener("resize", () => {
            if (window.innerWidth >= 992) {
              const overlay = Query("#responsive-overlay");
              if (overlay) {
                overlay.classList.remove("active");
              }
            }
          });
        }, 100);
      } else {
        setState({ toggled: "close" });
      }
    }
  };

  //  Switcher Offcanvas

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Fullscreen Function

  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };
  useEffect(() => {
    const fullscreenChangeHandler = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", fullscreenChangeHandler);
    return () => {
      document.removeEventListener("fullscreenchange", fullscreenChangeHandler);
    };
  }, []);

  // Theme Toggle Function

  const toggleTheme = () => {
    const currentTheme = getState();
    const newState = {
      dataThemeMode: currentTheme.dataThemeMode === "dark" ? "light" : "dark",
      dataHeaderStyles:
        currentTheme.dataThemeMode === "transparent" ? "light" : "transparent",
      dataMenuStyles:
        currentTheme.dataThemeMode === "transparent" ? "light" : "transparent",
    };
    setState(newState);
    if (newState.dataThemeMode != "dark") {
      const newState = {
        bodyBg: "",
        lightRgb: "",
        bodyBg2: "",
        inputBorder: "",
        formControlBg: "",
        gray: "",
      };
      setState(newState);
      localStorage.setItem("vyzorlightTheme", "light");
      localStorage.removeItem("vyzordarkTheme");
      localStorage.removeItem("vyzormenu");
      localStorage.removeItem("vyzorheader");
      localStorage.removeItem("bodyBg");
      localStorage.removeItem("bodyBg2");
      localStorage.removeItem("bgImg");
    } else {
      localStorage.setItem("vyzordarkTheme", "dark");
      localStorage.removeItem("vyzorlightTheme");
      localStorage.removeItem("vyzormenu");
      localStorage.removeItem("vyzorheader");
      localStorage.removeItem("bodyBg");
      localStorage.removeItem("bodyBg2");
      localStorage.removeItem("inputBorder");
      localStorage.removeItem("lightRgb");
      localStorage.removeItem("formControlBg");
      localStorage.removeItem("gray");
    }
  };

  //*** Notifications ***//

  const notificationNotes = [
    {
      id: 1,
      image: "/assets/images/ecommerce/png/13.png",
      name: "Urban Chic Satchel",
      description: "Sleek, stylish, and perfect for daily use",
      oldprice: "$120",
      newprice: "$90",
      off: "25%",
    },
    {
      id: 2,
      image: "/assets/images/ecommerce/png/15.png",
      name: "TrailBlaze Runners",
      description: "Lightweight and built for comfort",
      oldprice: "$80",
      newprice: "$60",
      off: "25%",
    },
    {
      id: 3,
      image: "/assets/images/ecommerce/png/19.png",
      name: "VisionTech SLR",
      description: "High-quality shots with every click",
      oldprice: "$500",
      newprice: "$375",
      off: "25%",
    },
    {
      id: 4,
      image: "/assets/images/ecommerce/png/6.png",
      name: "FlexiSeat Office Chair",
      description: "Comfortable support for long hours",
      oldprice: "$200",
      newprice: "$150",
      off: "25%",
    },
    {
      id: 5,
      image: "/assets/images/ecommerce/png/11.png",
      name: "DecoDial Classic",
      description: "A bold, colorful timepiece for any room",
      oldprice: "$50",
      newprice: "$35",
      off: "30%",
    },
  ];

  const [note, setNote] = useState(notificationNotes);

  const handleNoteRemove = (id: any, e: React.MouseEvent) => {
    e.stopPropagation();
    const deleteNoti = note.filter((item) => item.id !== id);
    setNote(deleteNoti);
  };

  function dec(el: any) {
    let unit = el.currentTarget.parentElement.querySelector("input").value;
    if (Number(unit) === 0) {
      return false;
    } else {
      let unit = el.currentTarget.parentElement.querySelector("input").value--;
    }
  }
  function inc(el: any) {
    let unit = el.currentTarget.parentElement.querySelector("input").value;
    if (Number(unit) === 30) {
      return false;
    } else {
      let unit = el.currentTarget.parentElement.querySelector("input").value++;
    }
  }

  //Search Functionality

  const searchRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleClick = (event: MouseEvent) => {
    const searchInput = searchRef.current;
    const container = containerRef.current;

    if (
      searchInput &&
      container &&
      !searchInput.contains(event.target as Node) &&
      !container.contains(event.target as Node)
    ) {
      container.classList.remove("searchdrop");
    } else if (
      searchInput &&
      container &&
      (searchInput === event.target ||
        searchInput.contains(event.target as Node))
    ) {
      container.classList.add("searchdrop");
    }
  };

  useEffect(() => {
    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, []);

  const searchResultRef = useRef<HTMLDivElement | null>(null);
  const [showa, setShowa] = useState(false);
  const [InputValue, setInputValue] = useState("");
  const [show2, setShow2] = useState(false);
  const [searchcolor, setsearchcolor] = useState("text-dark");
  const [searchval, setsearchval] = useState("Type something");
  const [NavData, setNavData] = useState([]);

  useEffect(() => {
    const clickHandler = (event: any) => {
      if (
        searchResultRef.current &&
        !searchResultRef.current.contains(event.target)
      ) {
        searchResultRef.current.classList.add("d-none");
      }
    };

    document.addEventListener("click", clickHandler);

    return () => {
      document.removeEventListener("click", clickHandler);
    };
  }, []);

  const myfunction = (inputvalue: string) => {
    if (searchResultRef.current) {
      searchResultRef.current.classList.remove("d-none");
    }

    const i: any = [];
    const allElement2: any = [];
    MENUITEMS.forEach((mainLevel: any) => {
      if (mainLevel.children) {
        setShowa(true);
        mainLevel.children.forEach((subLevel: any) => {
          i.push(subLevel);
          if (subLevel.children) {
            subLevel.children.forEach((subLevel1: any) => {
              i.push(subLevel1);
              if (subLevel1.children) {
                subLevel1.children.forEach((subLevel2: any) => {
                  i.push(subLevel2);
                });
              }
            });
          }
        });
      }
    });
    for (const allElement of i) {
      if (allElement.title.toLowerCase().includes(inputvalue.toLowerCase())) {
        if (
          allElement.title.toLowerCase().startsWith(inputvalue.toLowerCase())
        ) {
          setShow2(true);
          if (
            allElement.path &&
            !allElement2.some((el: any) => el.title === allElement.title)
          ) {
            allElement2.push(allElement);
          }
        }
      }
    }

    if (!allElement2.length || inputvalue === "") {
      if (inputvalue === "") {
        setShow2(false);
        setsearchval("Type something");
        setsearchcolor("text-dark");
      }
      if (!allElement2.length) {
        setShow2(false);
        setsearchcolor("text-danger");
        setsearchval("There is no component with this name");
      }
    }
    setNavData(allElement2);
  };

  //Responsive Search
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  //Languages

  interface Language {
    name: string;
    flag: string;
  }
  const Languages: Language[] = [
    { name: "English", flag: "us_flag.jpg" },
    { name: "Spanish", flag: "spain_flag.jpg" },
    { name: "français", flag: "french_flag.jpg" },
    { name: "عربي", flag: "uae_flag.jpg" },
    { name: "Deutsch", flag: "germany_flag.jpg" },
    { name: "中国人", flag: "china_flag.jpg" },
    { name: "Italiano", flag: "italy_flag.jpg" },
    { name: "Русский", flag: "russia_flag.jpg" },
  ];

  useEffect(() => {
    const navbar = document?.querySelector(".app-header");
    const navbar1 = document?.querySelector(".app-sidebar");
    const sticky: any = navbar?.clientHeight;
    // const sticky1 = navbar1.clientHeight;

    function stickyFn() {
      if (window.pageYOffset >= sticky) {
        navbar?.classList.add("sticky-pin");
        navbar1?.classList.add("sticky-pin");
      } else {
        navbar?.classList.remove("sticky-pin");
        navbar1?.classList.remove("sticky-pin");
      }
    }

    window.addEventListener("scroll", stickyFn);
    window.addEventListener("DOMContentLoaded", stickyFn);

    // Cleanup event listeners when the component unmounts
    return () => {
      window.removeEventListener("scroll", stickyFn);
      window.removeEventListener("DOMContentLoaded", stickyFn);
    };
  }, []);

  return (
    <div>
      <header className="app-header sticky" id="header">
        {/* <!-- Start::main-header-container --> */}

        <div className="main-header-container container-fluid">
          {variable.toggled === "open" && (
            <div ref={overlayRef} id="responsive-overlay"></div>
          )}

          {/* <!-- Start::header-content-left --> */}

          <div className="header-content-left">
            {/* <!-- Start::header-element --> */}

            <div className="header-element">
              <div className="horizontal-logo">
                <Link
                  scroll={false}
                  href="/dashboards/sales/"
                  className="header-logo"
                >
                  <Image
                    fill
                    src={`${
                      process.env.NODE_ENV === "production" ? basePath : ""
                    }/assets/images/brand-logos/desktop-logo.png`}
                    alt="logo"
                    className="desktop-logo"
                  />
                  <Image
                    fill
                    src={`${
                      process.env.NODE_ENV === "production" ? basePath : ""
                    }/assets/images/brand-logos/toggle-logo.png`}
                    alt="logo"
                    className="toggle-logo"
                  />
                  <Image
                    fill
                    src={`${
                      process.env.NODE_ENV === "production" ? basePath : ""
                    }/assets/images/brand-logos/desktop-dark.png`}
                    alt="logo"
                    className="desktop-dark"
                  />
                  <Image
                    fill
                    src={`${
                      process.env.NODE_ENV === "production" ? basePath : ""
                    }/assets/images/brand-logos/toggle-dark.png`}
                    alt="logo"
                    className="toggle-dark"
                  />
                </Link>
              </div>
            </div>

            {/* <!-- End::header-element --> */}

            {/* <!-- Start::header-element --> */}

            <div className="header-element mx-lg-0 mx-2">
              <Link
                scroll={false}
                aria-label="Hide Sidebar"
                onClick={toggleSidebar}
                className="sidemenu-toggle header-link animated-arrow hor-toggle horizontal-navtoggle"
                data-bs-toggle="sidebar"
                href="#!"
              >
                <span></span>
              </Link>
            </div>

            {/* <!-- End::header-element --> */}

            <div
              ref={containerRef}
              className="header-element header-search d-md-block d-none my-auto auto-complete-search"
            >
              {/* <!-- Start::header-link --> */}

              <div className="autoComplete_wrapper">
                <input
                  type="text"
                  className="header-search-bar form-control"
                  onClick={() => {}}
                  ref={searchRef}
                  defaultValue={InputValue}
                  onChange={(ele) => {
                    myfunction(ele.target.value);
                    setInputValue(ele.target.value);
                  }}
                  id="header-search"
                  placeholder="Search"
                  spellCheck={false}
                  autoComplete="off"
                  autoCapitalize="off"
                />
              </div>
              <a href="#!;" className="header-search-icon border-0">
                <i className="bi bi-search fs-12"></i>
              </a>
              {showa ? (
                <div
                  className="card custom-card search-result position-absolute z-index-9 search-fix  border"
                  ref={searchResultRef}
                >
                  <div className="card-header p-2">
                    <div className="card-title mb-0 text-break">
                      Search result of {InputValue}
                    </div>
                  </div>
                  <div className="card-body overflow-auto p-2">
                    <ListGroup className="m-2 header-searchdropdown">
                      {show2 ? (
                        NavData.map((e: any) => (
                          <ListGroup.Item key={Math.random()} className="">
                            <Link
                              href={`${e.path}/`}
                              className="search-result-item"
                              onClick={() => {
                                setShowa(false), setInputValue("");
                              }}
                            >
                              {e.title}
                            </Link>
                          </ListGroup.Item>
                        ))
                      ) : (
                        <b className={`${searchcolor} `}>{searchval}</b>
                      )}
                    </ListGroup>
                  </div>
                </div>
              ) : (
                ""
              )}

              {/* <!-- End::header-link --> */}
            </div>
          </div>

          {/* <!-- End::header-content-left --> */}

          {/* <!-- Start::header-content-right --> */}

          <ul className="header-content-right">
            {/* <!-- Start::header-element --> */}

            <li className="header-element d-md-none d-block">
              <Link
                scroll={false}
                href="#!"
                className="header-link"
                onClick={handleShow1}
                data-bs-toggle="modal"
                data-bs-target="#header-responsive-search"
              >
                {/* <!-- Start::header-link-icon --> */}

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="header-link-icon"
                  viewBox="0 0 256 256"
                >
                  <rect width="256" height="256" fill="none" />
                  <circle cx="112" cy="112" r="80" opacity="0.2" />
                  <circle
                    cx="112"
                    cy="112"
                    r="80"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="16"
                  />
                  <line
                    x1="168.57"
                    y1="168.57"
                    x2="224"
                    y2="224"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="16"
                  />
                </svg>

                {/* <!-- End::header-link-icon --> */}
              </Link>
            </li>

            {/* <!-- End::header-element --> */}

            {/* <!-- Start::header-element --> */}

            <Dropdown className="header-element country-selector d-sm-block d-none">
              {/* <!-- Start::header-link|dropdown-toggle --> */}

              <DropdownToggle
                as="a"
                variant=""
                className="header-link dropdown-toggle"
                data-bs-auto-close="outside"
                data-bs-toggle="dropdown"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="header-link-icon"
                  viewBox="0 0 256 256"
                >
                  <rect width="256" height="256" fill="none"></rect>
                  <path
                    d="M215,168.71a96.42,96.42,0,0,1-30.54,37l-9.36-9.37a8,8,0,0,0-3.63-2.09L150,188.59a8,8,0,0,1-5.88-8.9l2.38-16.2a8,8,0,0,1,4.85-6.22l30.45-12.66a8,8,0,0,1,8.47,1.49Z"
                    opacity="0.2"
                  ></path>
                  <path
                    d="M184,74a8,8,0,0,1-1.94,5.22L159.89,105a8,8,0,0,1-5,2.71l-31.46,4.26a8.06,8.06,0,0,1-5.77-1.45l-19.81-13a8,8,0,0,0-11.34,2l-20.94,31.3a8.06,8.06,0,0,0-1.35,4.41L64,171.49a8,8,0,0,1-3.61,6.64l-9.92,6.52A96,96,0,0,1,184,50Z"
                    opacity="0.2"
                  ></path>
                  <circle
                    cx="128"
                    cy="128"
                    r="96"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="16"
                  ></circle>
                  <path
                    d="M184.42,205.68l-9.36-9.37a8,8,0,0,0-3.63-2.09L150,188.59a8,8,0,0,1-5.88-8.9l2.38-16.2a8,8,0,0,1,4.85-6.22l30.45-12.66a8,8,0,0,1,8.47,1.49L215,168.71"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="16"
                  ></path>
                  <path
                    d="M50.49,184.65l9.92-6.52A8,8,0,0,0,64,171.49l.21-36.23a8.06,8.06,0,0,1,1.35-4.41l20.94-31.3a8,8,0,0,1,11.34-2l19.81,13a8.06,8.06,0,0,0,5.77,1.45l31.46-4.26a8,8,0,0,0,5-2.71L182.06,79.2A8,8,0,0,0,184,74V50"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="16"
                  ></path>
                </svg>
              </DropdownToggle>

              {/* <!-- End::header-link|dropdown-toggle --> */}

              <DropdownMenu
                className="main-header-dropdown dropdown-menu"
                data-popper-placement="none"
                align="end"
              >
                {Languages.map((lang, index) => (
                  <li key={index}>
                    <Link
                      scroll={false}
                      className="dropdown-item d-flex align-items-center justify-content-between"
                      href="#!"
                    >
                      <div className="d-flex align-items-center">
                        <span className="avatar avatar-rounded avatar-xs lh-1 me-2">
                          <Image
                            width={20}
                            height={20}
                            src={`${
                              process.env.NODE_ENV === "production"
                                ? basePath
                                : ""
                            }/assets/images/flags/${lang.flag}`}
                            alt={lang.name}
                          />
                        </span>
                        {lang.name}
                      </div>
                    </Link>
                  </li>
                ))}
              </DropdownMenu>
            </Dropdown>

            {/* <!-- End::header-element --> */}

            {/* <!-- Start::header-element --> */}

            <li className="header-element header-theme-mode">
              {/* <!-- Start::header-link|layout-setting --> */}

              <a
                href="#!"
                className="header-link layout-setting"
                onClick={toggleTheme}
              >
                <span className="light-layout">
                  {/* <!-- Start::header-link-icon --> */}

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="header-link-icon"
                    viewBox="0 0 256 256"
                  >
                    <rect width="256" height="256" fill="none" />
                    <path
                      d="M108.11,28.11A96.09,96.09,0,0,0,227.89,147.89,96,96,0,1,1,108.11,28.11Z"
                      opacity="0.2"
                    />
                    <path
                      d="M108.11,28.11A96.09,96.09,0,0,0,227.89,147.89,96,96,0,1,1,108.11,28.11Z"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="16"
                    />
                  </svg>

                  {/* <!-- End::header-link-icon --> */}
                </span>
                <span className="dark-layout">
                  {/* <!-- Start::header-link-icon --> */}

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="header-link-icon"
                    viewBox="0 0 256 256"
                  >
                    <rect width="256" height="256" fill="none" />
                    <circle cx="128" cy="128" r="56" opacity="0.2" />
                    <line
                      x1="128"
                      y1="40"
                      x2="128"
                      y2="32"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="16"
                    />
                    <circle
                      cx="128"
                      cy="128"
                      r="56"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="16"
                    />
                    <line
                      x1="64"
                      y1="64"
                      x2="56"
                      y2="56"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="16"
                    />
                    <line
                      x1="64"
                      y1="192"
                      x2="56"
                      y2="200"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="16"
                    />
                    <line
                      x1="192"
                      y1="64"
                      x2="200"
                      y2="56"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="16"
                    />
                    <line
                      x1="192"
                      y1="192"
                      x2="200"
                      y2="200"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="16"
                    />
                    <line
                      x1="40"
                      y1="128"
                      x2="32"
                      y2="128"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="16"
                    />
                    <line
                      x1="128"
                      y1="216"
                      x2="128"
                      y2="224"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="16"
                    />
                    <line
                      x1="216"
                      y1="128"
                      x2="224"
                      y2="128"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="16"
                    />
                  </svg>

                  {/* <!-- End::header-link-icon --> */}
                </span>
              </a>

              {/* <!-- End::header-link|layout-setting --> */}
            </li>

            {/* <!-- End::header-element --> */}

            {/* <!-- Start::header-element --> */}

            {/* <!-- End::header-element --> */}

            {/* <!-- Start::header-element --> */}

            <Dropdown
              className="header-element notifications-dropdown d-xl-block d-none dropdown"
              autoClose="outside"
            >
              {/* <!-- Start::header-link|dropdown-toggle --> */}

              <Dropdown.Toggle
                as="a"
                variant=""
                href="#!"
                className="header-link dropdown-toggle"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
                id="messageDropdown"
                aria-expanded="false"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="header-link-icon"
                  viewBox="0 0 256 256"
                >
                  <rect width="256" height="256" fill="none" />
                  <path
                    d="M56,104a72,72,0,0,1,144,0c0,35.82,8.3,64.6,14.9,76A8,8,0,0,1,208,192H48a8,8,0,0,1-6.88-12C47.71,168.6,56,139.81,56,104Z"
                    opacity="0.2"
                  />
                  <path
                    d="M96,192a32,32,0,0,0,64,0"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="16"
                  />
                  <path
                    d="M56,104a72,72,0,0,1,144,0c0,35.82,8.3,64.6,14.9,76A8,8,0,0,1,208,192H48a8,8,0,0,1-6.88-12C47.71,168.6,56,139.81,56,104Z"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="16"
                  />
                </svg>
                <span className="header-icon-pulse bg-secondary rounded pulse pulse-secondary"></span>
              </Dropdown.Toggle>

              {/* <!-- End::header-link|dropdown-toggle --> */}

              {/* <!-- Start::main-header-dropdown --> */}

              <Dropdown.Menu
                className="main-header-dropdown dropdown-menu dropdown-menu-end"
                data-popper-placement="none"
              >
                <div className="p-3 bg-primary text-fixed-white">
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="mb-0 fs-16">Notifications</p>
                    <Link
                      scroll={false}
                      href="#!"
                      className="badge bg-light text-default border"
                    >
                      Clear All
                    </Link>
                  </div>
                </div>
                <div className="dropdown-divider"></div>
                <SimpleBar
                  className="list-unstyled mb-0"
                  id="header-notification-scroll"
                >
                  <li className="dropdown-item position-relative">
                    <Link
                      scroll={false}
                      href="/applications/chat"
                      className="stretched-link"
                    ></Link>
                    <div className="d-flex align-items-start gap-3">
                      <div className="lh-1">
                        <span className="avatar avatar-sm avatar-rounded bg-primary-transparent">
                          <Image
                            fill
                            src={`${
                              process.env.NODE_ENV === "production"
                                ? basePath
                                : ""
                            }/assets/images/faces/1.jpg`}
                            alt=""
                          />
                        </span>
                      </div>
                      <div className="flex-fill">
                        <span className="d-block fw-semibold">New Message</span>
                        <span className="d-block text-muted fs-12">
                          You have received a new message from John Doe
                        </span>
                      </div>
                      <div className="text-end">
                        <span className="d-block mb-1 fs-12 text-muted">
                          11:45am
                        </span>
                        <span className="d-block text-primary d-none">
                          <i className="ri-circle-fill fs-9"></i>
                        </span>
                      </div>
                    </div>
                  </li>
                  <li className="dropdown-item position-relative">
                    <Link
                      scroll={false}
                      href="/applications/chat"
                      className="stretched-link"
                    ></Link>
                    <div className="d-flex align-items-start gap-3">
                      <div className="lh-1">
                        <span className="avatar avatar-sm avatar-rounded bg-primary-transparent">
                          <i className="ri-notification-line fs-16"></i>
                        </span>
                      </div>
                      <div className="flex-fill">
                        <span className="d-block fw-semibold">
                          Task Reminder
                        </span>
                        <span className="d-block text-muted fs-12">
                          Don't forget to submit your report by 3 PM today
                        </span>
                      </div>
                      <div className="text-end">
                        <span className="d-block mb-1 fs-12 text-muted">
                          02:16pm
                        </span>
                        <span className="d-block text-primary d-none">
                          <i className="ri-circle-fill fs-9"></i>
                        </span>
                      </div>
                    </div>
                  </li>
                  <li className="dropdown-item position-relative">
                    <Link
                      scroll={false}
                      href="/applications/chat"
                      className="stretched-link"
                    ></Link>
                    <div className="d-flex align-items-start gap-3">
                      <div className="lh-1">
                        <span className="avatar avatar-sm avatar-rounded bg-primary-transparent fs-5">
                          <Image
                            fill
                            src={`${
                              process.env.NODE_ENV === "production"
                                ? basePath
                                : ""
                            }/assets/images/faces/12.jpg`}
                            alt=""
                          />
                        </span>
                      </div>
                      <div className="flex-fill">
                        <span className="d-block fw-semibold">
                          Friend Request
                        </span>
                        <span className="d-block text-muted fs-12">
                          Jane Smith sent you a friend request
                        </span>
                      </div>
                      <div className="text-end">
                        <span className="d-block mb-1 fs-12 text-muted">
                          10:04am
                        </span>
                        <span className="d-block text-primary">
                          <i className="ri-circle-fill fs-9"></i>
                        </span>
                      </div>
                    </div>
                  </li>
                  <li className="dropdown-item position-relative">
                    <Link
                      scroll={false}
                      href="/applications/chat"
                      className="stretched-link"
                    ></Link>
                    <div className="d-flex align-items-start gap-3">
                      <div className="lh-1">
                        <span className="avatar avatar-sm avatar-rounded bg-primary-transparent fs-5">
                          <i className="ri-notification-line fs-16"></i>
                        </span>
                      </div>
                      <div className="flex-fill">
                        <span className="d-block fw-semibold">
                          Event Reminder
                        </span>
                        <span className="d-block text-muted fs-12">
                          You have an upcoming event: Team Meeting on October 25
                          at 10 AM.
                        </span>
                      </div>
                      <div className="text-end">
                        <span className="d-block mb-1 fs-12 text-muted">
                          12:58pm
                        </span>
                        <span className="d-block text-primary">
                          <i className="ri-circle-fill fs-9"></i>
                        </span>
                      </div>
                    </div>
                  </li>
                  <li className="dropdown-item position-relative">
                    <Link
                      scroll={false}
                      href="/applications/chat"
                      className="stretched-link"
                    ></Link>
                    <div className="d-flex align-items-start gap-3">
                      <div className="lh-1">
                        <span className="avatar avatar-sm avatar-rounded bg-primary-transparent fs-5">
                          <i className="ri-notification-line fs-16"></i>
                        </span>
                      </div>
                      <div className="flex-fill">
                        <span className="d-block fw-semibold">
                          File Uploaded
                        </span>
                        <span className="d-block text-muted fs-12">
                          The file "Project_Proposal.pdf" has been uploaded
                          successfully
                        </span>
                      </div>
                      <div className="text-end">
                        <span className="d-block mb-1 fs-12 text-muted">
                          05:13pm
                        </span>
                        <span className="d-block text-primary">
                          <i className="ri-circle-fill fs-9"></i>
                        </span>
                      </div>
                    </div>
                  </li>
                </SimpleBar>
                <div className="p-5 empty-item1 d-none">
                  <div className="text-center">
                    <span className="avatar avatar-xl avatar-rounded bg-secondary-transparent">
                      <i className="ri-notification-off-line fs-2"></i>
                    </span>
                    <h6 className="fw-medium mt-3">No New Notifications</h6>
                  </div>
                </div>
              </Dropdown.Menu>

              {/* <!-- End::main-header-dropdown --> */}
            </Dropdown>

            {/* <!-- End::header-element --> */}

            {/* <!-- Start::header-element --> */}

            <li className="header-element header-fullscreen">
              {/* <!-- Start::header-link --> */}

              <Link
                href="#!"
                className="header-link"
                onClick={toggleFullscreen}
              >
                {isFullscreen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="full-screen-close header-link-icon d-block"
                    viewBox="0 0 256 256"
                  >
                    <rect width="256" height="256" fill="none"></rect>
                    <rect
                      x="32"
                      y="32"
                      width="192"
                      height="192"
                      rx="16"
                      opacity="0.2"
                    ></rect>
                    <polyline
                      points="160 48 208 48 208 96"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="16"
                    ></polyline>
                    <line
                      x1="144"
                      y1="112"
                      x2="208"
                      y2="48"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="16"
                    ></line>
                    <polyline
                      points="96 208 48 208 48 160"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="16"
                    ></polyline>
                    <line
                      x1="112"
                      y1="144"
                      x2="48"
                      y2="208"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="16"
                    ></line>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="full-screen-open header-link-icon"
                    viewBox="0 0 256 256"
                  >
                    <rect width="256" height="256" fill="none"></rect>
                    <rect
                      x="48"
                      y="48"
                      width="160"
                      height="160"
                      opacity="0.2"
                    ></rect>
                    <polyline
                      points="168 48 208 48 208 88"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="16"
                    ></polyline>
                    <polyline
                      points="88 208 48 208 48 168"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="16"
                    ></polyline>
                    <polyline
                      points="208 168 208 208 168 208"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="16"
                    ></polyline>
                    <polyline
                      points="48 88 48 48 88 48"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="16"
                    ></polyline>
                  </svg>
                )}
              </Link>

              {/* <!-- End::header-link --> */}
            </li>

            {/* <!-- End::header-element --> */}

            {/* <!-- Start::header-element --> */}

            <Dropdown className="header-element dropdown">
              {/* <!-- Start::header-link|dropdown-toggle --> */}

              <Dropdown.Toggle
                as="a"
                variant=""
                href="#!"
                className="header-link dropdown-toggle"
                id="mainHeaderProfile"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
                aria-expanded="false"
              >
                <div>
                  <Image
                    width={36}
                    height={36}
                    src="https://nextjs.spruko.com/bootstrap/app-router/vyzor-ts/preview/assets/images/faces/2.jpg"
                    alt="img"
                    className="header-link-icon"
                  />
                </div>
              </Dropdown.Toggle>

              {/* <!-- End::header-link|dropdown-toggle --> */}

              <Dropdown.Menu
                className="main-header-dropdown dropdown-menu pt-0 overflow-hidden header-profile-dropdown dropdown-menu-end"
                aria-labelledby="mainHeaderProfile"
              >
                <div className="p-3 bg-primary text-fixed-white">
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="mb-0 fs-16">Profile</p>
                    <Link scroll={false} href="#!" className="text-fixed-white">
                      <i className="ti ti-settings-cog"></i>
                    </Link>
                  </div>
                </div>
                <div className="dropdown-divider"></div>
                <div className="p-3">
                  <div className="d-flex align-items-start gap-2">
                    <div className="lh-1">
                      <span className="avatar avatar-sm bg-primary-transparent avatar-rounded">
                        <Image
                          width={36}
                          height={36}
                          src="https://nextjs.spruko.com/bootstrap/app-router/vyzor-ts/preview/assets/images/faces/2.jpg"
                          alt=""
                        />
                      </span>
                    </div>
                    <div>
                      <span className="d-block fw-semibold lh-1">
                        {profile?.name}
                      </span>
                      <span className="text-muted fs-12">{profile?.email}</span>
                    </div>
                  </div>
                </div>
                <div className="dropdown-divider"></div>
                <ul className="list-unstyled mb-0">
                  <li>
                    <ul className="list-unstyled mb-0 sub-list">
                      <li>
                        <Link
                          scroll={false}
                          className="dropdown-item d-flex align-items-center"
                          href="/login/profile-settings/"
                        >
                          <i className="ti ti-user-circle me-2 fs-18"></i>View
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          scroll={false}
                          className="dropdown-item d-flex align-items-center"
                          href="/finance/"
                        >
                          <i className="ti ti-settings-cog me-2 fs-18"></i>
                          Account Settings
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <ul className="list-unstyled mb-0 sub-list">
                      <li>
                        <Link
                          scroll={false}
                          className="dropdown-item d-flex align-items-center"
                          href="/pages/timeline"
                        >
                          <i className="ti ti-bolt me-2 fs-18"></i>Activity Log
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="dropdown-item d-flex align-items-center btn btn-link text-start"
                      style={{ textDecoration: "none" }}
                    >
                      <i className="ti ti-logout me-2 fs-18"></i>Log Out
                    </button>
                  </li>
                </ul>
              </Dropdown.Menu>
            </Dropdown>

            {/* <!-- End::header-element --> */}

            {/* <!-- Start::header-element --> */}

            {/* <!-- End::header-element --> */}
          </ul>

          {/* <!-- End::header-content-right --> */}
        </div>

        {/* <!-- End::main-header-container --> */}
      </header>
      <Modal
        show={show1}
        onHide={handleClose1}
        className="fade"
        id="header-responsive-search"
        tabIndex={-1}
        aria-labelledby="header-responsive-search"
      >
        <div className="modal-content border-0">
          <Modal.Body>
            <div className="input-group">
              <Form.Control
                type="text"
                className="border-end-0"
                placeholder="Search Anything ..."
                aria-label="Search Anything ..."
                aria-describedby="button-addon2"
              />
              <SpkButton
                Buttonvariant="primary"
                Buttontype="button"
                Id="button-addon2"
              >
                <i className="bi bi-search"></i>
              </SpkButton>
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </div>
  );
};

export default Header;
