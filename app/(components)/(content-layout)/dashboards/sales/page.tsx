"use client";

import React, { Fragment, useEffect, useRef, useState } from "react";
import SpkHrmCard from "@/shared/@spk-reusable-components/dashboards-reusable/spk-htmcard";
import SpkBadge from "@/shared/@spk-reusable-components/general-reusable/reusable-uielements/spk-badge";
import SpkButton from "@/shared/@spk-reusable-components/general-reusable/reusable-uielements/spk-buttons";
import SpkDropdown from "@/shared/@spk-reusable-components/general-reusable/reusable-uielements/spk-dropdown";
import Spkapexcharts from "@/shared/@spk-reusable-components/reusable-plugins/spk-apexcharts";
import SpkTables from "@/shared/@spk-reusable-components/reusable-tables/spk-tables";
import {
  Applicants,
  AttendanceData,
  AttendanceOptions,
  AttendanceSeries,
  AttendancesToday,
  CandidateOptions,
  CandidateSeries,
  EmployeeOptions,
  Employees,
  EmployeeSeries,
  Hrmcards,
} from "@/shared/data/dashboards/hrmdata";
import Pageheader from "@/shared/layouts-components/pageheader/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Image from "next/image";
import Link from "next/link";
import { Card, Col, Dropdown, Form, Pagination, Row } from "react-bootstrap";

interface SalesProps {}

const Sales: React.FC<SalesProps> = () => {
  const [data, setData] = useState({
    photo: [],
    expense: [],
    invoice: [],
    paymentpaid: [],
    paymentupcoming: [],
    projects: [],
  });
  const [loading, setLoading] = useState(true);
  const [taskCounts, setTaskCounts] = useState([]);
  const [shootCounts, setShootCounts] = useState([]);
  const [deliverableCounts, setDeliverableCounts] = useState([]);
  const [projectCounts, setProjectCounts] = useState([]);

  function getStatusColor(dateString: string): string {
    if (!dateString) return "secondary"; // default if no date

    const month = new Date(dateString).getMonth() + 1; // JS months are 0–11

    switch (month) {
      case 1:
      case 2:
        return "remote"; // Jan-Feb → Blue
      case 3:
      case 4:
        return "probation"; // Mar-Apr → Green
      case 5:
      case 6:
        return "contract"; // May-Jun → Yellow
      case 7:
      case 8:
        return "work-home"; // Jul-Aug → Red
      case 9:
      case 10:
        return "remote"; // Sep-Oct → Teal
      case 11:
      case 12:
        return "probation"; // Nov-Dec → Purple (custom)
      default:
        return "secondary";
    }
  }

  function getVendorColor(name: string): string {
    switch (name) {
      case "A":
        return "primary";
      case "B":
        return "secondary";
      case "C":
        return "warning";
      case "D":
        return "info";
      case "G":
        return "danger";
      case "K":
        return "orange";
      default:
        return "success";
    }
  }

  const fetchItems = async () => {
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/dashboard`)
      .then((res) => res.json())
      .then((result) => {
        console.log("API Response:", result); // 🔍 check shape
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
    console.log("items", data);
  };

  async function fetchCounts() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/projects/count`
      );
      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();
      console.log(data);
      setTaskCounts(data.taskCount || 0);
      setShootCounts(data.shootCount || 0);
      setDeliverableCounts(data.deliverableCount || 0);
      setProjectCounts(data.projectCount || 0);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
    }
  }
  const taskData = [
    {
      title: "Total Projects",
      value: projectCounts,
      iconColor: "success",
      iconClass: "ti ti-arrow-up",
      percent: " 3.21%",
      year: "This Year",
      svgIcon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          enableBackground="new 0 0 24 24"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#5f6368"
        >
          <g>
            <rect fill="none" height="24" width="24" />
          </g>
          <g>
            <path d="M20,7h-5V4c0-1.1-0.9-2-2-2h-2C9.9,2,9,2.9,9,4v3H4C2.9,7,2,7.9,2,9v11c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V9 C22,7.9,21.1,7,20,7z M9,12c0.83,0,1.5,0.67,1.5,1.5S9.83,15,9,15s-1.5-0.67-1.5-1.5S8.17,12,9,12z M12,18H6v-0.75c0-1,2-1.5,3-1.5 s3,0.5,3,1.5V18z M13,9h-2V4h2V9z M18,16.5h-4V15h4V16.5z M18,13.5h-4V12h4V13.5z" />
          </g>
        </svg>
      ),
      svgColor: "primary",
      cardClass:
        "dashboard-main-card border-0 shadow-none border-lg-end border-bottom mb-0 rounded-0",
    },
    {
      title: "New Shoots",
      value: shootCounts,
      iconColor: "danger",
      iconClass: "ti ti-arrow-down",
      percent: " 1.86%",
      year: "This Year",
      svgIcon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#5f6368"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      ),
      svgColor: "secondary",
      cardClass:
        "dashboard-main-card border-0 shadow-none border-bottom mb-0 rounded-0",
    },
    {
      title: "Total Tasks",
      value: taskCounts,
      iconColor: "success",
      iconClass: "ti ti-arrow-up",
      percent: " 3.09%",
      year: "This Year",
      svgIcon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#5f6368"
        >
          <path d="M0 0h24v24H0zm10 5h4v2h-4zm0 0h4v2h-4z" fill="none" />
          <path d="M10 16v-1H3.01L3 19c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2v-4h-7v1h-4zm10-9h-4.01V5l-2-2h-4l-2 2v2H4c-1.1 0-2 .9-2 2v3c0 1.11.89 2 2 2h6v-2h4v2h6c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm-6 0h-4V5h4v2z" />
        </svg>
      ),
      svgColor: "success",
      cardClass:
        "dashboard-main-card border-0 shadow-none border-lg-end mb-0 rounded-0",
    },
    {
      title: "Total Deliverables",
      value: deliverableCounts,
      iconColor: "success",
      iconClass: "ti ti-arrow-up",
      percent: " 0.97%",
      year: "This Year",
      svgIcon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          enableBackground="new 0 0 24 24"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#5f6368"
        >
          <g>
            <rect fill="none" height="24" width="24" />
          </g>
          <g>
            <path d="M14,8c0-2.21-1.79-4-4-4S6,5.79,6,8s1.79,4,4,4S14,10.21,14,8z M17,10v2h6v-2H17z M2,18v2h16v-2c0-2.66-5.33-4-8-4 S2,15.34,2,18z" />
          </g>
        </svg>
      ),
      svgColor: "warning",
      cardClass: "dashboard-main-card border-0 shadow-none mb-0 rounded-0",
    },
  ];

  useEffect(() => {
    fetchItems();
    fetchCounts();
  }, []);

  const capitalizeFirst = (str) => {
    if (!str || typeof str !== "string" || str.trim() === "") return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <Fragment>
      {/* <!-- Page Header --> */}

      <Seo title="Dashboards-Analytics" />

      <Pageheader
        title="Dashboards"
        currentpage="Dashboards"
        activepage="Dashboards"
      />

      {/* <!-- Page Header Close --> */}

      {/* <!-- Start:: row-1 --> */}

      <Row>
        <Col xxl={4} xl={6} className="">
          <Row>
            <Col xl={12}>
              <Card className="custom-card overflow-hidden">
                <Card.Body className="p-0">
                  <div className="row g-0">
                    {(taskData ?? []).map((vendor, index) => (
                      <Col xl={6} key={index}>
                        <Card className={`custom-card ${vendor.cardClass}`}>
                          <Card.Body className={vendor.bodyClass}>
                            <div className="mb-3">
                              <span
                                className={`avatar avatar-lg avatar-rounded bg-${vendor.svgColor}-transparent svg-${vendor.svgColor}`}
                              >
                                {vendor.svgIcon}
                              </span>
                            </div>
                            <div className="text-muted mb-2">
                              {vendor.title}
                            </div>
                            <div className="d-flex align-items-end gap-2 flex-wrap">
                              <h5 className="fw-semibold mb-0 lh-1">
                                {vendor.value}
                              </h5>
                              <div>
                                <SpkBadge
                                  variant=""
                                  Customclass={`badge bg-${vendor.iconColor}-transparent rounded-pill`}
                                >
                                  <i className={vendor.iconClass}></i>
                                  {vendor.percent}
                                </SpkBadge>
                                <span className="text-muted fs-12">
                                  {" "}
                                  {vendor.year}
                                </span>
                              </div>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col xxl={5} xl={6}>
          <Card className="custom-card">
            <Card.Body>
              <h6 className="fw-semibold mb-3">Expenses Status</h6>
              <div className="progress-stacked progress-xl mb-3">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: "25%" }}
                  aria-valuenow={25}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  25%
                </div>
                <div
                  className="progress-bar bg-success"
                  role="progressbar"
                  style={{ width: "35%" }}
                  aria-valuenow={35}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  35%
                </div>
                <div
                  className="progress-bar bg-warning"
                  role="progressbar"
                  style={{ width: "25%" }}
                  aria-valuenow={25}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  25%
                </div>
                <div
                  className="progress-bar bg-danger"
                  role="progressbar"
                  style={{ width: "15%" }}
                  aria-valuenow={15}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  15%
                </div>
              </div>
              <Row className="gy-2">
                {(data?.expense ?? []).slice(0, 12).map((expenses, index) => (
                  <Col xl={6} key={index}>
                    <div className="d-flex align-items-center gap-4 flex-wrap">
                      <div
                        className={`employee-status-marker text-capitalize ${getStatusColor(
                          expenses.date
                        )}`}
                      >
                        {expenses.event} :
                      </div>
                      <div className="fw-semibold">{expenses.amount}</div>
                    </div>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col xxl={3}>
          <Card className="custom-card overflow-hidden">
            <Card.Header>
              <div className="card-title">Recent Transactions</div>
            </Card.Header>
            <Card.Body>
              <ul className="list-unstyled projects-recent-transactions-list">
                {(data?.paymentpaid ?? []).slice(0, 4).map((tx, idx) => (
                  <li key={idx}>
                    <div className="d-flex align-items-center gap-2">
                      <div className="lh-1">
                        <span
                          className={`avatar avatar-md avatar-rounded bg-${getVendorColor(
                            tx.project_client?.charAt(0)
                          )}-transparent`}
                        >
                          {tx.project_client?.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-fill">
                        <span className="d-block fw-semibold">
                          {tx.project_client}
                        </span>
                        <span className="fs-13 text-muted">
                          {tx.due_date || tx.paid_date}
                        </span>
                      </div>
                      <div className="text-end">
                        <span className="d-block fw-semibold">{tx.amount}</span>
                        <span
                          className={`fw-medium fs-13 text-capitalize ${
                            tx.status === "paid"
                              ? "text-success"
                              : tx.status === "upcoming"
                              ? "text-warning"
                              : "text-danger"
                          }`}
                        >
                          {tx.status}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* <!-- End:: row-1 --> */}

      {/* <!-- Start:: row-2 --> */}

      <Row>
        <Col xxl={6}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">Vendors List</div>
              <Link scroll={false} href="#!" className="text-muted fs-13">
                View All<i className="ti ti-arrow-narrow-right ms-1"></i>
              </Link>
            </Card.Header>
            <Card.Body>
              <ul className="list-unstyled hrm-employee-list">
                {(data?.photo ?? []).slice(0, 5).map((vendor, index) => (
                  <li key={index}>
                    <div className="d-flex align-items-center gap-2 flex-wrap">
                      <div className="lh-1">
                        <span
                          className={`avatar avatar-md avatar-rounded bg-${getVendorColor(
                            vendor.name?.charAt(0)
                          )}-transparent`}
                        >
                          {vendor.name?.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-fill">
                        <span className="d-block fw-semibold">
                          {vendor.name}
                          <SpkBadge
                            variant=""
                            Customclass={`bg-${vendor.status}-transparent ms-2`}
                          >
                            {vendor.half}
                          </SpkBadge>
                        </span>
                        <span className="text-muted fs-13">
                          {vendor.half_label}
                        </span>
                      </div>
                      <div className="text-end">
                        <span className="fw-medium">{vendor.full}</span>
                        <span className="d-block fs-12 mt-1 text-muted">
                          {vendor.status}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
        <Col xxl={6}>
          <Card className="custom-card overflow-hidden">
            <Card.Header className="justify-content-between">
              <div className="card-title">Payments's List</div>
              <SpkDropdown
                toggleas="a"
                Navigate="#!"
                Customtoggleclass="fs-12 text-muted no-caret"
                Toggletext="Sort By"
                Arrowicon={true}
              >
                <Dropdown.Item href="#!">This Week</Dropdown.Item>
                <Dropdown.Item href="#!">This Month</Dropdown.Item>
                <Dropdown.Item href="#!">This Year</Dropdown.Item>
              </SpkDropdown>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive custom-sales-table">
                <SpkTables
                  tableClass="text-nowrap table-hover"
                  header={[
                    { title: "Name" },
                    { title: "Date" },
                    { title: "Status" },
                  ]}
                >
                  {(data?.paymentpaid ?? [])
                    .slice(0, 4)
                    .map((payment, index) => (
                      <tr key={index}>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <div className="lh-1">
                              <span
                                className={`avatar avatar-md avatar-rounded bg-${getVendorColor(
                                  payment.project_name?.charAt(0)
                                )}-transparent`}
                              >
                                {payment.project_name?.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <p className="fw-medium mb-0">
                                {payment.project_name}
                              </p>
                              <span className="text-muted fs-12">
                                {payment.payment_mode}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>{payment.due_date || payment.paid_date}</td>
                        <td>
                          <SpkBadge
                            variant=""
                            Customclass={`bg-${payment.badgeColor}-transparent rounded-pill min-w-badge`}
                          >
                            {payment.status}
                          </SpkBadge>
                        </td>
                      </tr>
                    ))}
                </SpkTables>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* <!-- End:: row-2 --> */}

      {/* <!-- Start:: row-3 --> */}

      <Row>
        <Col xl={12}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">Projects Details</div>
              <div className="d-flex flex-wrap gap-2">
                <div>
                  <Form.Control
                    className="form-control-sm"
                    type="text"
                    placeholder="Search Here"
                    aria-label=".form-control-sm example"
                  />
                </div>
                <SpkDropdown
                  Id="dropdownMenuButton1"
                  toggleas="a"
                  Togglevariant=""
                  Menulabel="dropdownMenuButton1"
                  Toggletext="Sort By"
                  Customtoggleclass=" btn-primary btn-sm btn-wave waves-effect waves-light no-caret btn"
                  Arrowicon={true}
                >
                  <Dropdown.Item as="li" href="#!">
                    New
                  </Dropdown.Item>
                  <Dropdown.Item as="li" href="#!">
                    Popular
                  </Dropdown.Item>
                  <Dropdown.Item as="li" href="#!">
                    Relevant
                  </Dropdown.Item>
                </SpkDropdown>
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive">
                <SpkTables
                  tableClass="text-nowrap"
                  header={[
                    { title: "Project ID" },
                    { title: "Applicant Name" },
                    { title: "Client" },
                    { title: "Relation" },
                    { title: "Email" },
                    { title: "Mobile" },
                    { title: "Status" },
                    { title: "Action" },
                  ]}
                >
                  {(data?.projects ?? []).slice(0, 5).map((project, index) => (
                    <tr key={index}>
                      <td>{`#SPT-${index}`}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="lh-1">
                            <span
                              className={`avatar avatar-md avatar-rounded bg-${getVendorColor(
                                project.name?.charAt(0)
                              )}-transparent`}
                            >
                              {project.name?.charAt(0)}
                            </span>
                          </div>
                          {project.name}
                        </div>
                      </td>
                      <td>{project.client}</td>
                      <td>{project.relation}</td>
                      <td>{project.email}</td>
                      <td>{project.phone}</td>
                      <td>
                        <SpkBadge
                          variant=""
                          Customclass={`bg-${
                            project.cost > 100000
                              ? "primary"
                              : project.cost >= 200000
                              ? "success"
                              : project.cost > 500000
                              ? "info"
                              : project.cost < 100000
                              ? "secondary"
                              : "danger"
                          }-transparent`}
                        >
                          {project.cost}
                        </SpkBadge>
                      </td>
                      <td>
                        <div className="hstack gap-2 fs-15">
                          <Link
                            scroll={false}
                            aria-label="anchor"
                            href="#!"
                            className="btn btn-icon waves-effect waves-light btn-sm btn-success-light rounded-circle"
                          >
                            <i className="ri-phone-line"></i>
                          </Link>
                          <Link
                            scroll={false}
                            aria-label="anchor"
                            href="#!"
                            className="btn btn-icon waves-effect waves-light btn-sm btn-primary-light rounded-circle"
                          >
                            <i className="ri-edit-line"></i>
                          </Link>
                          <Link
                            scroll={false}
                            aria-label="anchor"
                            href="#!"
                            className="btn btn-icon btn-wave waves-effect waves-light btn-sm btn-danger-light rounded-circle"
                          >
                            <i className="ri-delete-bin-line"></i>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </SpkTables>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* <!-- End:: row-3 --> */}
    </Fragment>
  );
};

export default Sales;
