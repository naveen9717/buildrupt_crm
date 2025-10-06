"use client";

import SpkKanbanCard from "@/shared/@spk-reusable-components/application-reusable/spk-kanbancard";
import SpkButton from "@/shared/@spk-reusable-components/general-reusable/reusable-uielements/spk-buttons";
import SpkSelect from "@/shared/@spk-reusable-components/reusable-plugins/spk-reactselect";
import {
  KanbanCards,
  kanbanCardsdanger,
  kanbanCardsinfo,
  kanbanCardswarning,
  Option1,
  kanbanCardsuccess,
  simpleItems1,
  cars,
} from "@/shared/data/applications/task/kanbandata";
import SpkDropdown from "@/shared/@spk-reusable-components/general-reusable/reusable-uielements/spk-dropdown";

import Pageheader from "@/shared/layouts-components/pageheader/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Image from "next/image";
import React, { Fragment, useEffect, useRef, useState, useMemo } from "react";
import { Card, Col, Form, Modal, Row, Dropdown } from "react-bootstrap";
import SimpleBar from "simplebar-react";
import { FilePond } from "react-filepond";
import SpkDatepickr from "@/shared/@spk-reusable-components/reusable-plugins/spk-datepicker";
import Link from "next/link";
import dayjs from "dayjs";

interface CalendarsProps {}

const Calendars: React.FC<CalendarsProps> = () => {
  const [files, setFiles] = useState<any>([]);
  const [dates, setDates] = useState<{ [key: string]: Date | string | null }>(
    {}
  );
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  function getCardColor(status: string): string {
    switch (status) {
      case "Fri":
        return "new";
      case "Sat":
        return "todo";
      case "Sun":
        return "in-progress";
      case "Mon":
        return "inreview";
      case "Tue":
        return "new";
      case "Wed":
        return "";
      default:
        return "completed";
    }
  }
  const handleDateChange = (key: string, date: Date | null) => {
    if (date) {
      setDates((prevDates) => ({
        ...prevDates,
        [key]: date,
      }));
    } else {
      setDates((prevDates) => {
        const { [key]: removedKey, ...rest } = prevDates;
        return rest;
      });
    }
  };

  const [show, setShow] = useState<{ [key: string]: boolean }>({});

  const handleShow = (offcanvasName: string) => {
    setShow((prevShow) => {
      if (prevShow[offcanvasName] !== true) {
        return { ...prevShow, [offcanvasName]: true };
      }
      return prevShow;
    });
  };

  const handleClose = (offcanvasName: string) => {
    setShow((prevShow) => {
      if (prevShow[offcanvasName] !== false) {
        return { ...prevShow, [offcanvasName]: false };
      }
      return prevShow;
    });
  };

  const [form, setForm] = useState({
    name: "",
    type: "",
    venue: "",
    city: "",
    reporting: "",
    slot: "",
    date: "",
  });

  const TimeSelect = [
    { value: "9:00 AM", label: "9:00 AM" },
    { value: "10:00 AM", label: "10:00 AM" },
    { value: "11:00 AM", label: "11:00 AM" },
  ];

  const SlotSelect = [
    { value: "morning", label: "Morning" },
    { value: "evening", label: "Evening" },
    { value: "night", label: "Night" },
  ];
  // Handlers for Form 1
  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (formSnapshot) => {
    // e.preventDefault();
    console.log("formSnapshot", formSnapshot);
    const payload = {
      form,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/calendars/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      // Close modal
      handleClose("taskmodal");

      // // Alert success
      // alert("Updated Events successfully!");

      // Refresh page to show new changes
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Submission failed!");
    }
  };
  const leftContainerRef = useRef(null);
  const rightContainerRef = useRef(null);
  const topContainerRef = useRef(null);
  const bottomContainerRef = useRef(null);
  const lastContainerRef = useRef(null);

  const leftButtonRef = useRef(null);
  const rightButtonRef = useRef(null);
  const topButtonRef = useRef(null);
  const bottomButtonRef = useRef(null);
  const lastButtonRef = useRef(null);

  // Store all the refs in an array
  const elementsToModify = [
    { containerRef: leftContainerRef, buttonRef: leftButtonRef },
    { containerRef: rightContainerRef, buttonRef: rightButtonRef },
    { containerRef: topContainerRef, buttonRef: topButtonRef },
    { containerRef: bottomContainerRef, buttonRef: bottomButtonRef },
    { containerRef: lastContainerRef, buttonRef: lastButtonRef },
  ];

  const OnDivChange = () => {
    elementsToModify.forEach(({ containerRef, buttonRef }: any) => {
      const element = containerRef.current;
      const button = buttonRef.current;

      if (element?.children.length <= 0) {
        element?.classList.add("task-Null");
        if (button) {
          button.classList.add("d-none");
        }
      } else {
        element?.classList.remove("task-Null");
        if (button) {
          button.classList.remove("d-none");
        }
      }
    });
  };

  // ✅ Step 1: Put your JSON data here
  const events = [
    {
      id: 1,
      date: "2025-11-04",
      client: "Rishabh & Sonia",
      event: "Engagement",
      time: "3pm to 10pm",
      venue: "Delhi",
      photo: ["Praveen", "Sidd"],
    },
    {
      id: 2,
      date: "2025-05-04",
      client: "Naveen & Priya",
      event: "Engagement",
      time: "2pm to 5pm",
      venue: "Gurgoan",
      photo: ["Priya", "Sidd"],
    },
    {
      id: 3,
      date: "2025-03-08",
      client: "Pooja & Amit",
      event: "Lagan",
      time: "4pm to 11pm",
      venue: "Noida",
      photo: ["Bob", "Praveen"],
    },
    {
      id: 4,
      date: "2025-12-01",
      client: "Simran & Gaurav",
      event: "Wedding",
      venue: "Delhi",
      time: "12pm to 10pm",
      photo: ["Kapil"],
    },
    {
      id: 5,
      date: "2025-01-03",
      client: "Arjun & Riya",
      event: "Reception",
      time: "7pm",
      venue: "Mumbai",
      photo: ["Rahul"],
    },
    {
      id: 6,
      date: "2025-02-15",
      client: "Arjun & Reena",
      event: "Reception",
      time: "7pm",
      venue: "South Delhi",
      photo: ["Rahul"],
    },
    {
      id: 7,
      date: "2025-09-20",
      client: "Arun & Reena",
      event: "Reception",
      time: "7pm",
      venue: "West Delhi",
      photo: ["Rahul"],
    },
  ];

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/calendars/`);
      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      setProjects(data.projects);

      // If you want to log updated state, use data.projects directly:
      console.log("projects", data.projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);
  // ✅ Step 2: Group events by month
  // const eventsByMonth = useMemo(() => {
  //   const grouped = {};
  //   events.forEach((ev) => {
  //     const monthKey = dayjs(ev.date).format("YYYY-MM");
  //     if (!grouped[monthKey]) grouped[monthKey] = [];
  //     grouped[monthKey].push(ev);
  //   });
  //   return grouped;
  // }, [events]);

  // const months = Object.keys(eventsByMonth).sort();

  function useEventsByMonth(projects: any[]) {
    return useMemo(() => {
      const grouped: Record<string, any[]> = {};

      projects.forEach((project) => {
        project.shoots?.forEach((shoot: any) => {
          const monthKey = dayjs(shoot.date).format("YYYY-MM");
          if (!grouped[monthKey]) grouped[monthKey] = [];
          grouped[monthKey].push({
            ...shoot,
            projectId: project.id,
            projectName: project.name,
            client: project.client,
          });
        });
      });

      return grouped;
    }, [projects]);
  }

  const eventsByMonth = useEventsByMonth(projects);
  const months = Object.keys(eventsByMonth).sort();

  return (
    <Fragment>
      {/* <!-- Page Header --> */}

      <Seo title="Calendars" />

      <Pageheader
        title="Calendars"
        currentpage="Calendars"
        activepage="Calendars"
      />
      {/* <!-- Start::Main-row-1- --> */}
      <Row>
        <Col xl={12}>
          <Card className="custom-card">
            <Card.Body className="p-3">
              <div className="d-sm-flex align-items-center flex-wrap gap-3 kanban-header justify-content-between">
                <div className="d-sm-flex align-items-center flex-wrap gap-3 w-sm-50 mb-sm-0 mb-3">
                  <div className="mb-sm-0 mb-3">
                    <SpkButton
                      Buttonvariant="primary"
                      Customclass="btn me-2"
                      onClickfunc={() => handleShow("addmodal")}
                    >
                      <i className="ri-add-line me-1 fw-medium align-middle"></i>
                      New Event
                    </SpkButton>
                  </div>
                  <div>
                    <div className="avatar-list-stacked">
                      <span className="avatar avatar-sm avatar-rounded">
                        <Image
                          width={20}
                          height={20}
                          src="../../../assets/images/faces/2.jpg"
                          alt="img"
                        />
                      </span>
                      <span className="avatar avatar-sm avatar-rounded">
                        <Image
                          width={20}
                          height={20}
                          src="../../../assets/images/faces/8.jpg"
                          alt="img"
                        />
                      </span>
                      <span className="avatar avatar-sm avatar-rounded">
                        <Image
                          width={20}
                          height={20}
                          src="../../../assets/images/faces/2.jpg"
                          alt="img"
                        />
                      </span>
                      <span className="avatar avatar-sm avatar-rounded">
                        <Image
                          width={20}
                          height={20}
                          src="../../../assets/images/faces/10.jpg"
                          alt="img"
                        />
                      </span>
                      <span className="avatar avatar-sm avatar-rounded">
                        <Image
                          width={20}
                          height={20}
                          src="../../../assets/images/faces/4.jpg"
                          alt="img"
                        />
                      </span>
                      <span className="avatar avatar-sm avatar-rounded">
                        <Image
                          width={20}
                          height={20}
                          src="../../../assets/images/faces/13.jpg"
                          alt="img"
                        />
                      </span>
                      <Link
                        scroll={false}
                        className="avatar avatar-sm bg-primary avatar-rounded text-fixed-white"
                        href="#!"
                      >
                        +8
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="d-sm-flex align-items-center flex-wrap justify-content-end gap-3 custom-kanaban">
                  <SpkSelect
                    name="colors"
                    option={Option1}
                    mainClass="w-full !rounded-md"
                    menuplacement="auto"
                    classNameprefix="Select2"
                    defaultvalue={[Option1[0]]}
                  />
                  <div className="d-flex mt-sm-0 mt-3" role="search">
                    <Form.Control
                      className="me-2"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                    />
                    <SpkButton
                      Buttonvariant=""
                      Customclass="btn btn-light"
                      Buttontype="submit"
                    >
                      Search
                    </SpkButton>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* <!-- End:: row-1 --> */}
      {/* <!-- Page Header Close --> */}

      {/* <!-- Start::Main-row- --> */}
      <Row>
        <main className="p-6 space-y-10">
          {months.map((monthKey) => {
            const monthEvents = eventsByMonth[monthKey];
            const start = dayjs(monthKey + "-01");
            const end = start.endOf("month");

            // Generate all days of the month
            const days = [];
            for (
              let d = start;
              d.isBefore(end) || d.isSame(end);
              d = d.add(1, "day")
            ) {
              days.push(d);
            }

            // // Events by date
            // const eventsByDate = {};
            // monthEvents.forEach((ev) => {
            //   if (!eventsByDate[ev.date]) eventsByDate[ev.date] = [];
            //   eventsByDate[ev.date].push(ev);
            // });
            // inside your map(months.map(...)) before rendering
            // normalize eventsByDate using YYYY-MM-DD keys
            const eventsByDate: Record<string, any[]> = {};
            monthEvents.forEach((ev) => {
              // defensive: ensure ev.date exists
              if (!ev?.date) {
                console.warn("Missing date for event:", ev);
                return;
              }

              // Use dayjs to normalize to YYYY-MM-DD so keys match
              const evDateKey = dayjs(ev.date).format("YYYY-MM-DD");
              if (!eventsByDate[evDateKey]) eventsByDate[evDateKey] = [];
              eventsByDate[evDateKey].push(ev);
            });

            return (
              <div key={monthKey}>
                {/* Month Heading */}
                <h6 className="text-xl font-bold mb-4">
                  {start.format("MMMM YYYY")}
                </h6>

                {/* Calendar Grid */}
                <div className="VYZOR-kanban-board">
                  {days.map((day, idx) => {
                    const dateKey = day.format("YYYY-MM-DD");
                    const dayEvents = eventsByDate[dateKey] || [];
                    const WeekDay = day.format("ddd");

                    return (
                      <div
                        key={idx}
                        className={`kanban-tasks-type ${getCardColor(WeekDay)}`}
                      >
                        <div className="pe-3 mb-3">
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="d-block fw-medium fs-13">
                              {day.format("D - dddd - YYYY")}
                            </span>
                          </div>
                        </div>
                        <SimpleBar className="kanban-tasks" id="new-tasks">
                          <div
                            id="new-tasks-draggable"
                            data-view-btn="new-tasks"
                            ref={leftContainerRef}
                            onMouseEnter={OnDivChange}
                          >
                            {dayEvents.length > 0 ? (
                              <>
                                {dayEvents.map((ev, i) => (
                                  <Card key={i} className={`custom-card card}`}>
                                    <Card.Body className="p-0">
                                      <div className="p-3 kanban-board-head">
                                        <div className="d-flex text-muted justify-content-between mb-1 fs-12 fw-medium">
                                          <div>
                                            <i className="ri-time-line me-1 align-middle d-inline-block"></i>

                                            {`${new Date(
                                              ev.date
                                            ).getDate()} - ${new Date(
                                              ev.date
                                            ).toLocaleDateString("en-US", {
                                              weekday: "long",
                                            })} - ${new Date(
                                              ev.date
                                            ).getFullYear()}`}
                                          </div>
                                          <div>
                                            <Link
                                              scroll={false}
                                              aria-label="anchor"
                                              href="#!"
                                              onClick={() => {
                                                setForm(ev);
                                                handleShow("taskmodal");
                                              }}
                                              className="btn btn-sm bg-white text-default border btn-wave"
                                            >
                                              <i className="ri-edit-line align-middle me-1 fw-medium"></i>
                                              Edit
                                            </Link>
                                          </div>
                                        </div>
                                        <div className="">
                                          <div className="d-flex align-items-center justify-content-between">
                                            <div className="task-badges">
                                              <span className="badge ">
                                                #CLIENT -
                                              </span>
                                              <span className="badge ms-1">
                                                {ev.projectName}
                                              </span>
                                            </div>
                                          </div>
                                          <div className="d-flex align-items-center justify-content-between">
                                            <div className="task-badges">
                                              <span className="badge ">
                                                #EVENT -
                                              </span>
                                              <span className="badge ms-1 text-capitalize">
                                                {ev.type}
                                              </span>
                                            </div>
                                          </div>
                                          {ev.reporting && (
                                            <div className="d-flex align-items-center justify-content-between">
                                              <div className="task-badges">
                                                <span className="badge ">
                                                  #TIME -
                                                </span>
                                                <span className="badge ms-1">
                                                  {ev.reporting}
                                                </span>
                                              </div>
                                            </div>
                                          )}
                                          {ev.venue && (
                                            <div className="d-flex align-items-center justify-content-between">
                                              <div className="task-badges">
                                                <span className="badge ">
                                                  #VENUE -
                                                </span>
                                                <span className="badge ms-1">
                                                  {ev.venue}
                                                </span>
                                              </div>
                                            </div>
                                          )}

                                          {ev.photos?.length > 0 &&
                                            (() => {
                                              const labels = ev.photos
                                                .map(
                                                  (p) =>
                                                    p.photo_crew ??
                                                    p.photo_role ??
                                                    ""
                                                ) // pick field
                                                .map((s) => s.trim())
                                                .filter(Boolean);
                                              const unique = Array.from(
                                                new Set(labels)
                                              );
                                              const joined = unique.join(" | ");
                                              return (
                                                <div className="d-flex align-items-center justify-content-between">
                                                  <div className="task-badges">
                                                    <span className="badge">
                                                      #PHOTO CREW -
                                                    </span>
                                                    <span className="badge ms-1">
                                                      {joined}
                                                    </span>
                                                  </div>
                                                </div>
                                              );
                                            })()}

                                          {ev.videos?.length > 0 &&
                                            (() => {
                                              const labels = ev.videos
                                                .map(
                                                  (p) =>
                                                    p.video_crew ??
                                                    p.video_role ??
                                                    ""
                                                ) // pick field
                                                .map((s) => s.trim())
                                                .filter(Boolean);
                                              const unique = Array.from(
                                                new Set(labels)
                                              );
                                              const joined = unique.join(" | ");
                                              return (
                                                <div className="d-flex align-items-center justify-content-between">
                                                  <div className="task-badges">
                                                    <span className="badge">
                                                      #VIDEO CREW -
                                                    </span>
                                                    <span className="badge ms-1">
                                                      {joined}
                                                    </span>
                                                  </div>
                                                </div>
                                              );
                                            })()}
                                        </div>
                                      </div>

                                      <div className="p-3 border-top border-block-start-dashed">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div>
                                            <Link
                                              scroll={false}
                                              href="#!"
                                              className="me-2 text-primary"
                                            >
                                              <span className="me-1">
                                                <i className="ri-thumb-up-fill align-middle fw-normal"></i>
                                              </span>
                                              <span className="fw-medium fs-12">
                                                5
                                              </span>
                                            </Link>
                                            <Link
                                              scroll={false}
                                              href="#!"
                                              className="text-muted"
                                            >
                                              <span className="me-1">
                                                <i className="ri-message-2-line align-middle fw-normal"></i>
                                              </span>
                                              <span className="fw-medium fs-12">
                                                11
                                              </span>
                                            </Link>
                                          </div>
                                          <div className="avatar-list-stacked">
                                            <span
                                              key={i}
                                              className="avatar avatar-sm avatar-rounded"
                                            >
                                              <Image
                                                width={20}
                                                height={20}
                                                src="../../../assets/images/faces/13.jpg"
                                                alt={`avatar-${i}`}
                                              />
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </Card.Body>
                                  </Card>
                                ))}
                              </>
                            ) : (
                              /* <!-- EMPTY EVENTS START HERE --> */

                              <div className="text-gray-400">
                                <Card key={1} className={`custom-card card}`}>
                                  <Card.Body className="p-0">
                                    <div className="p-3 kanban-board-head">
                                      <div className="d-flex text-muted justify-content-between mb-1 fs-12 fw-medium">
                                        <div>
                                          <i className="ri-time-line me-1 align-middle d-inline-block"></i>
                                          Created - 0
                                        </div>
                                        <div>
                                          <Link
                                            scroll={false}
                                            aria-label="anchor"
                                            href="#!"
                                            onClick={() => {
                                              setForm([]);
                                              handleShow("taskmodal");
                                            }}
                                            className="btn btn-sm bg-white text-default border btn-wave"
                                          >
                                            <i className="ri-edit-line align-middle me-1 fw-medium"></i>
                                            Edit
                                          </Link>
                                        </div>
                                      </div>

                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="task-badges">
                                          <span className="badge ">
                                            #EMP - EMPTY
                                          </span>
                                        </div>
                                      </div>

                                      <div className="kanban-content mt-2">
                                        <h6 className="fw-medium mb-1 fs-15">
                                          No weddings today 🎉
                                        </h6>
                                        <div className="kanban-task-description">
                                          <p>
                                            Relax and enjoy the day — your
                                            calendar is clear!
                                          </p>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="p-3 border-top border-block-start-dashed">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div>
                                          <Link
                                            scroll={false}
                                            href="#!"
                                            className="me-2 text-primary"
                                          >
                                            <span className="me-1">
                                              <i className="ri-thumb-up-fill align-middle fw-normal"></i>
                                            </span>
                                            <span className="fw-medium fs-12">
                                              0
                                            </span>
                                          </Link>
                                          <Link
                                            scroll={false}
                                            href="#!"
                                            className="text-muted"
                                          >
                                            <span className="me-1">
                                              <i className="ri-message-2-line align-middle fw-normal"></i>
                                            </span>
                                            <span className="fw-medium fs-12">
                                              0
                                            </span>
                                          </Link>
                                        </div>
                                        <div className="avatar-list-stacked">
                                          <span
                                            key={1}
                                            className="avatar avatar-sm avatar-rounded"
                                          >
                                            <Image
                                              width={20}
                                              height={20}
                                              src="../../../assets/images/faces/13.jpg"
                                              alt={`avatar-${2}`}
                                            />
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </Card.Body>
                                </Card>
                              </div>
                            )}
                          </div>
                        </SimpleBar>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </main>
      </Row>

      {/* <!-- Start::row-2 --> */}

      {/* <!--End::row-2 --> */}

      {/* Modal Code */}

      <Modal
        show={show["addmodal"] || false}
        onHide={() => handleClose("addmodal")}
        centered
        className="fade"
        id="add-board"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Modal.Header>
          <h6 className="modal-title">Add Board</h6>
          <SpkButton
            Buttonvariant=""
            Buttontype="button"
            onClickfunc={() => handleClose("addmodal")}
            Customclass="btn-close"
            Buttondismiss="modal"
            Buttonlabel="Close"
          ></SpkButton>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xl={12}>
              <label htmlFor="board-title" className="form-label">
                Task Board Title
              </label>
              <Form.Control
                type="text"
                className=""
                id="board-title"
                placeholder="Board Title"
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <SpkButton
            Buttonvariant="light"
            Buttontype="button"
            onClickfunc={() => handleClose("addmodal")}
            data-bs-dismiss="modal"
          >
            Cancel
          </SpkButton>
          <SpkButton Buttonvariant="primary" Buttontype="button">
            Add Board
          </SpkButton>
        </Modal.Footer>
      </Modal>

      {/* <!-- Start::add task modal --> */}

      <Modal
        show={show["taskmodal"] || false}
        onHide={() => handleClose("taskmodal")}
        centered
        className="fade"
        id="add-task"
        tabIndex={-1}
      >
        <div className="">
          <div className="">
            <Modal.Header>
              <Modal.Title as="h6">Update Event</Modal.Title>
              <SpkButton
                Buttontype="button"
                Buttonvariant=""
                Customclass="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClickfunc={() => handleClose("taskmodal")}
              ></SpkButton>
            </Modal.Header>
            <Modal.Body className="px-4">
              <Form className="mb-4">
                <Row className="gy-2">
                  <Col xl={6}>
                    <Form.Label htmlFor="task-name" className="form-label">
                      Client Name
                    </Form.Label>
                    <input
                      type="text"
                      className="form-control"
                      id="task-name"
                      placeholder="Client Name"
                      value={form?.projectName || ""}
                      readOnly
                    />
                  </Col>
                  <Col xl={6}>
                    <Form.Label className="">Event :</Form.Label>
                    <Form.Control
                      type="text"
                      name="type"
                      value={form.type}
                      onChange={handleFormChange}
                      required
                    />
                  </Col>
                  <Col xl={6}>
                    <Form.Label htmlFor="input-label1" className="">
                      Venue :
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="venue"
                      placeholder="Enter Venue"
                      value={form.venue}
                      onChange={handleFormChange}
                      required
                    />
                  </Col>
                  <Col xl={6}>
                    <Form.Label className="">Date :</Form.Label>
                    <div className="form-group">
                      <div className="input-group">
                        <div className="input-group-text text-muted">
                          {" "}
                          <i className="ri-calendar-line"></i>{" "}
                        </div>
                        <Form.Control
                          type="date"
                          name="date"
                          value={form.date}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                    </div>
                  </Col>
                  <Col xl={6}>
                    <Form.Label className="form-label">Time Slot</Form.Label>
                    <div className="form-group">
                      <div className="input-group">
                        <div className="input-group-text text-muted">
                          {" "}
                          <i className="ri-calendar-line"></i>{" "}
                        </div>
                        <Form.Select
                          name="reporting"
                          value={form.reporting}
                          onChange={handleFormChange}
                          required
                        >
                          <option value="">Select Time</option>
                          {TimeSelect.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </Form.Select>
                      </div>
                    </div>
                  </Col>
                  <Col xl={6}>
                    <Form.Label className="">Select Slot</Form.Label>
                    <Form.Select
                      name="slot"
                      value={form.slot}
                      onChange={handleFormChange}
                      required
                    >
                      <option value="">Select Slot</option>
                      {SlotSelect.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col xl={12} className="text-end">
                    <SpkButton
                      Buttonvariant="primary"
                      Buttontype="button"
                      Customclass="btn btn-primary"
                      onClickfunc={() => handleUpdate(form)}
                    >
                      Add Task
                    </SpkButton>
                  </Col>
                </Row>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <SpkButton
                Buttonvariant="light"
                Buttontype="button"
                Customclass="btn btn-light"
                data-bs-dismiss="modal"
                onClickfunc={() => handleClose("taskmodal")}
              >
                Cancel
              </SpkButton>
            </Modal.Footer>
          </div>
        </div>
      </Modal>

      {/* <!-- End::add task modal --> */}
    </Fragment>
  );
};

export default Calendars;
