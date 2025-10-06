"use client";

import { useRouter } from "next/navigation";
import Pageheader from "@/shared/layouts-components/pageheader/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import React, { Fragment, useState, useEffect, useRef } from "react";
import Link from "next/link";
import DataTable from "react-data-table-component";
import SpkBadge from "@/shared/@spk-reusable-components/general-reusable/reusable-uielements/spk-badge";
import SpkButton from "@/shared/@spk-reusable-components/general-reusable/reusable-uielements/spk-buttons";
import SpkTooltips from "@/shared/@spk-reusable-components/general-reusable/reusable-uielements/spk-tooltips";
import Image from "next/image";
import html2pdf from "html2pdf.js/dist/html2pdf.min.js";
import SpkTables from "@/shared/@spk-reusable-components/reusable-tables/spk-tables";

import {
  Card,
  Col,
  Form,
  Row,
  Table,
  ToastContainer,
  Tab,
  Nav,
} from "react-bootstrap";
import { useParams } from "next/navigation";

interface CreateProjectProps {}

const EditShoot: React.FC<CreateProjectProps> = () => {
  const { projectId, shootId } = useParams();

  const router = useRouter();

  const [items, setItems] = useState([]);
  const [shootitems, setShootItems] = useState([]);
  const [deliverableitems, setDeliverableItems] = useState([]);
  const [taskitems, setTaskItems] = useState([]);
  const [expenseitems, setExpenseItems] = useState([]);
  const [invoiceitems, setInvoiceItems] = useState([]);

  const [paymentpaid, setPaymentPaid] = useState([]);
  const [paymentupcoming, setPaymentUpcoming] = useState([]);

  const [loading, setLoading] = useState(true);

  function getStatusColor(status: string): string {
    switch (status) {
      case "active":
        return "success";
      default:
        return "secondary";
    }
  }

  function getInvoiceClass(priority: string): string {
    switch (priority) {
      case "bank transfer":
        return "bg-danger-transparent";
      case "upi":
        return "bg-warning-transparent";
      case "cash":
        return "bg-teal-transparent";
      default:
        return "bg-secondary";
    }
  }
  function getPriorityClass(priority: string): string {
    switch (priority) {
      case "high":
        return "bg-danger-transparent";
      case "medium":
        return "bg-warning-transparent";
      case "low":
        return "bg-teal-transparent";
      default:
        return "bg-secondary";
    }
  }

  const capitalizeFirst = (str) => {
    if (!str || typeof str !== "string" || str.trim() === "") return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // PDF DOWNLOADED HERE

  const invoiceRefs = useRef({});

  const handleDownload = (id) => {
    const element = invoiceRefs.current[id];
    const options = {
      margin: 0,
      filename: "invoice.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(options).from(element).save();
  };

  const fetchItems = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/projects/project/${projectId}`
      );
      const data = await res.json();
      console.log("fetching data:", data);

      setShootItems(data.shoot);
      setDeliverableItems(data.deliverable);
      setTaskItems(data.task);
      setExpenseItems(data.expense);
      setInvoiceItems(data.invoice);
      setPaymentPaid(data.paymentpaid);
      setPaymentUpcoming(data.paymentupcoming);
    } catch (error) {
      console.error("Error fetching name:", error);
    } finally {
      setLoading(false);
    }
  };

  // `/projects/${projectId}/shoots/${shootId}`
  const handleExpenseEdit = (id: string) => {
    router.push(
      `${process.env.NEXT_PUBLIC_URL}/projects/project/${projectId}/expense/${id}`
    );
    // You can trigger a modal or setForm(item)
  };

  const handleExpenseDelete = async (id: string) => {
    await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/projects/project/expense/${id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      }
    );
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/projects/shoots`
    );
    const data = await res.json();
    setItems(data.data);
  };

  // `/projects/${projectId}/shoots/${shootId}`
  const handlePaymentEdit = (id: string) => {
    router.push(
      `${process.env.NEXT_PUBLIC_URL}/projects/project/${projectId}/payment/${id}`
    );
    // You can trigger a modal or setForm(item)
  };

  const handlePaymentDelete = async (id: string) => {
    await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/projects/project/payment/${id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      }
    );
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/projects/shoots`
    );
    const data = await res.json();
    setItems(data.data);
  };

  // calculate total before return
  const totalAmount = paymentpaid.reduce((acc, invoice) => {
    const amount = Number(String(invoice.amount).replace(/[^\d.-]/g, "")) || 0;
    return acc + amount;
  }, 0);

  // Final submit handler

  const shootcolumns = [
    {
      name: "S.NO",
      cell: (row, index) => index + 1, // auto-increment serial number
      sortable: true,
    },
    {
      name: "SHOOT",
      selector: (row) => capitalizeFirst(row.name),
      sortable: true,
    },
    {
      name: "TYPE",
      selector: (row) => capitalizeFirst(row.type),
      sortable: true,
    },
    {
      name: "STATUS",
      selector: (row) => (
        <span className={`fw-medium text-${getStatusColor(row.status)}`}>
          {capitalizeFirst(row.status)}
        </span>
      ),
      sortable: true,
    },
    {
      name: "CITY",
      selector: (row) => capitalizeFirst(row.city),
      sortable: true,
    },

    { name: "DATE", selector: (row) => `${row.date}`, sortable: true },
  ];

  const deliverablecolumns = [
    {
      name: "S.NO",
      cell: (row, index) => index + 1, // auto-increment serial number
      sortable: true,
    },
    {
      name: "PROJECT",
      selector: (row) => capitalizeFirst(row.name),
      sortable: true,
    },
    {
      name: "ASSIGNED TO",
      selector: (row) => capitalizeFirst(row.assigned),
      sortable: true,
    },
    {
      name: "PRIORITY",
      selector: (row) => (
        <SpkBadge
          variant=""
          Customclass={`badge ${getPriorityClass(row.priority)}`}
        >
          {capitalizeFirst(row.priority)}
        </SpkBadge>
      ),
      sortable: true,
    },
    {
      name: "STATUS",
      selector: (row) => (
        <span className={`fw-medium text-${getStatusColor(row.status)}`}>
          {capitalizeFirst(row.status)}
        </span>
      ),
      sortable: true,
    },

    { name: "DATE", selector: (row) => `${row.date}`, sortable: true },
  ];
  const taskcolumns = [
    {
      name: "S.NO",
      cell: (row, index) => index + 1, // auto-increment serial number
      sortable: true,
    },
    {
      name: "NAME",
      selector: (row) => capitalizeFirst(row.name),
      sortable: true,
    },
    {
      name: "ASSIGNED TO",
      selector: (row) => capitalizeFirst(row.assigned),
      sortable: true,
    },
    {
      name: "STATUS",
      selector: (row) => (
        <span className={`fw-medium text-${getStatusColor(row.status)}`}>
          {capitalizeFirst(row.status)}
        </span>
      ),
      sortable: true,
    },
    {
      name: "PRIORITY",
      selector: (row) => (
        <SpkBadge
          variant=""
          Customclass={`badge ${getPriorityClass(row.priority)}`}
        >
          {capitalizeFirst(row.priority)}
        </SpkBadge>
      ),
      sortable: true,
    },
    { name: "DATE", selector: (row) => `${row.date}`, sortable: true },
  ];
  const expensecolumns = [
    {
      name: "S.NO",
      cell: (row, index) => index + 1, // auto-increment serial number
      sortable: true,
    },
    {
      name: "CATEGORY",
      selector: (row) => capitalizeFirst(row.category),
      sortable: true,
    },
    {
      name: "BILLED",
      selector: (row) => capitalizeFirst(row.billed),
      sortable: true,
    },
    {
      name: "AMOUNT",
      selector: (row) => `₹ ${row.amount}`,
      sortable: true,
    },

    { name: "DATE", selector: (row) => `${row.date}`, sortable: true },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <SpkTooltips placement="top" title="Edit">
            <SpkButton
              Buttonvariant=""
              onClickfunc={() => handleExpenseEdit(row.id)}
              Customclass="btn btn-primary-light btn-icon btn-sm"
            >
              <i className="ri-edit-line"></i>
            </SpkButton>
          </SpkTooltips>
          <SpkButton
            Buttonvariant=""
            onClickfunc={() => handleExpenseDelete(row.id)}
            Customclass="btn btn-danger-light btn-icon ms-1 btn-sm task-delete-btn"
          >
            <i className="ri-delete-bin-5-line"></i>
          </SpkButton>
        </>
      ),
    },
  ];

  const invoicecolumns = [
    {
      name: "S.NO",
      cell: (row, index) => index + 1, // auto-increment serial number
      sortable: true,
    },
    {
      name: "PROJECT NAME",
      selector: (row) => capitalizeFirst(row.project_name),
      sortable: true,
    },
    {
      name: "BILLED BY",
      selector: (row) => capitalizeFirst(row.billed_by),
      sortable: true,
    },
    {
      name: "INVOICE N0.",
      selector: (row) => `${row.invoice_number}`,
      sortable: true,
    },
    { name: "DATE", selector: (row) => `${row.invoice_date}`, sortable: true },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <SpkTooltips placement="top" title="Download">
            <SpkButton
              Buttonvariant=""
              onClickfunc={() => handleDownload(row.id)}
              Customclass="btn btn-primary-light btn-icon btn-sm"
            >
              <i className="ri-download-line"></i>
            </SpkButton>
          </SpkTooltips>
          <SpkButton
            Buttonvariant=""
            onClickfunc={() => handleExpenseDelete(row.id)}
            Customclass="btn btn-danger-light btn-icon ms-1 btn-sm task-delete-btn"
          >
            <i className="ri-delete-bin-5-line"></i>
          </SpkButton>

          <Col className="d-none">
            <Row ref={(el) => (invoiceRefs.current[row.id] = el)}>
              <Col xl={12}>
                <Card className="custom-card invoice-card">
                  <Card.Body>
                    <div className="row gy-3">
                      {/* Layout of Pdf */}
                      <Col xl={12}>
                        <Row>
                          <Col xl={4} lg={4} md={6} sm={6} className="">
                            <p className="text-muted mb-2">Billing From :</p>
                            <p className="fw-bold mb-1">
                              BUILDRUPT INFOTECH PRIVATE LIMITED
                            </p>
                            <p className="mb-1 text-muted">
                              C/O POONAM SHARMA S MOH
                            </p>
                            <p className="mb-1 text-muted">
                              RAMSHALA GANESH CHOWK , Shamli , Garhi ,Shamli,
                              Uttar Pradesh- 247776, India
                            </p>
                            <p className="mb-1 text-muted">
                              weddingqueen@gmail.com
                            </p>
                            <p className="mb-1 text-muted">(91) 123-456-1234</p>
                            <p className="text-muted">
                              For more information check for{" "}
                              <a href="#!" className="text-primary fw-medium">
                                <u>GSTIN: 09AAMCB9211D1ZQ</u>
                              </a>{" "}
                              Details.
                            </p>
                          </Col>
                          <Col
                            xl={4}
                            lg={4}
                            md={6}
                            sm={6}
                            className="ms-auto mt-sm-0 mt-3"
                          >
                            <p className="text-muted mb-2">Billing To :</p>
                            <p className="fw-bold mb-1">{row.client}</p>

                            <p className="text-muted mb-1">
                              Email: {row.email}
                            </p>
                            <p className="text-muted">Mobile: {row.phone}</p>
                          </Col>
                        </Row>
                      </Col>
                      <Col xl={3}>
                        <p className="fw-medium text-muted mb-1">
                          Invoice ID :
                        </p>
                        <p className="fs-15 mb-1">#{row.invoice_number}</p>
                      </Col>
                      <Col xl={3}>
                        <p className="fw-medium text-muted mb-1">
                          Date Issued :
                        </p>
                        <p className="fs-15 mb-1">{row.invoice_date}</p>
                      </Col>
                      <Col xl={3}>
                        <p className="fw-medium text-muted mb-1">Client :</p>
                        <p className="fs-15 mb-1">{row.client}</p>
                      </Col>
                      <Col xl={3}>
                        <p className="fw-medium text-muted mb-1">Amount :</p>
                        <p className="fs-16 mb-1 fw-medium">₹ {row.cost}</p>
                      </Col>
                      <Col xl={12}>
                        <div className="table-responsive">
                          <SpkTables
                            tableClass="nowrap text-nowrap table-border border mt-4"
                            header={[
                              { title: "S.No" },
                              { title: "DATE" },
                              { title: "PAYMENT MODE" },
                              { title: "AMOUNT" },
                            ]}
                          >
                            {paymentpaid.map((invoice, idx) => (
                              <tr key={idx}>
                                <td>{invoice.id}</td>
                                <td>
                                  <div className="fw-medium">
                                    {invoice.paid_date}
                                  </div>
                                </td>
                                <td>
                                  <SpkBadge
                                    variant=""
                                    Customclass={`badge ${getInvoiceClass(
                                      invoice.payment_mode
                                    )}`}
                                  >
                                    {capitalizeFirst(invoice.payment_mode)}
                                  </SpkBadge>
                                </td>
                                <td>₹ {invoice.amount}</td>
                              </tr>
                            ))}

                            <tr>
                              <td colSpan={2}></td>
                              <td colSpan={2}>
                                <table className="table table-sm text-nowrap mb-0 table-borderless">
                                  <tbody>
                                    <tr>
                                      <th scope="row" className="w-60">
                                        <p className="mb-0">TOTAL :</p>
                                      </th>
                                      <td>
                                        <p className="mb-0 fw-medium fs-15">
                                          ₹ {totalAmount}
                                        </p>
                                      </td>
                                    </tr>
                                    <tr>
                                      <th scope="row" className="w-60">
                                        <p className="mb-0">BALANCE :</p>
                                      </th>
                                      <td>
                                        <p className="mb-0 fw-medium fs-15">
                                          ₹ {totalAmount - row.cost}
                                        </p>
                                      </td>
                                    </tr>

                                    <tr>
                                      <th scope="row" className="w-60">
                                        <p className="mb-0 fs-14">
                                          BOOKING AMOUNT :
                                        </p>
                                      </th>
                                      <td>
                                        <p className="mb-0 fw-medium fs-16 text-success">
                                          ₹ {row.cost}
                                        </p>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </SpkTables>
                        </div>
                      </Col>
                      <Col xl={4}>
                        <Card className="custom-card">
                          <Card.Body>
                            <h6 className="fw-semibold mb-4">
                              Payment Process :
                            </h6>
                            <div className="row">
                              <Col xl={12}>
                                <p className="fs-14 fw-medium">Advance (20%)</p>
                                <p>
                                  <span className="fw-medium text-muted fs-12">
                                    On Pre-Wedding (20%)
                                  </span>{" "}
                                </p>

                                <p>
                                  <span className="fw-medium text-muted fs-12">
                                    On Event Day (50%)
                                  </span>{" "}
                                </p>
                                <p className="mb-0">
                                  <span className="fw-medium text-muted fs-12">
                                    On Album Designing Approval (10%)
                                  </span>
                                </p>
                              </Col>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </>
      ),
    },
  ];

  const today = new Date();

  const day = today.getDate();
  const month = today.toLocaleString("en-US", { month: "short" }); // "Jan", "Feb", etc.
  const year = today.getFullYear();

  const todayDate = `${day},${month} ${year}`;

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <Fragment>
      {/* <!-- Page Header --> */}

      <Seo title="Projects Details" />

      <Pageheader
        title="Dashboards"
        subtitle="Projects"
        currentpage="Projects Details"
        activepage="Projects Details"
      />

      {/* <!-- Page Header Close --> */}

      {/* <!-- Start::row-1 --> */}

      <Row>
        <Col xl={12}>
          <Card className="custom-card">
            <Card.Body>
              <Col xxl={12} xl={6}>
                <Card className="custom-card">
                  <Tab.Container defaultActiveKey="ordertab1">
                    <Card.Body className="">
                      <Nav
                        className=" nav-tabs tab-style-2 nav-justified mb-3 d-sm-flex d-block"
                        id="myTab1"
                        role="tablist"
                      >
                        <Nav.Item className="" role="presentation">
                          <Nav.Link
                            eventKey="ordertab1"
                            className=""
                            id="shoot-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#shoot-tab-pane"
                            type="button"
                            role="tab"
                            aria-controls="shoot-tab-pane"
                            aria-selected="true"
                          >
                            <i className="ri-live-line me-1 align-middle"></i>
                            Shoots
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="" role="presentation">
                          <Nav.Link
                            eventKey="ordertab2"
                            className=""
                            id="deliverable-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#deliverable-tab-pane"
                            type="button"
                            role="tab"
                            aria-controls="deliverable-tab-pane"
                            aria-selected="false"
                          >
                            <i className="ri-check-double-line me-1 align-middle"></i>
                            Deliverables
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="" role="presentation">
                          <Nav.Link
                            eventKey="ordertab3"
                            className=""
                            id="task-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#task-tab-pane"
                            type="button"
                            role="tab"
                            aria-controls="task-tab-pane"
                            aria-selected="false"
                          >
                            <i className="ri-list-check-3 me-1 align-middle"></i>
                            Tasks
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="" role="presentation">
                          <Nav.Link
                            eventKey="ordertab4"
                            className=""
                            id="payment-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#payment-tab-pane"
                            type="button"
                            role="payment-tab-pane"
                            aria-selected="false"
                          >
                            <i className="ri-money-rupee-circle-line me-1 align-middle"></i>
                            Payments
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="" role="presentation">
                          <Nav.Link
                            eventKey="ordertab5"
                            className=""
                            id="expense-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#expense-tab-pane"
                            type="button"
                            role="expense-tab-pane"
                            aria-selected="false"
                          >
                            <i className="ri-wallet-2-line me-1 align-middle"></i>
                            Expenses
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="" role="presentation">
                          <Nav.Link
                            eventKey="ordertab6"
                            className=""
                            id="invoice-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#invoice-tab-pane"
                            type="button"
                            role="invoice-tab-pane"
                            aria-selected="false"
                          >
                            <i className="ri-truck-line me-1 align-middle"></i>
                            Invoices
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>
                      <Tab.Content className="" id="myTabContent">
                        <Tab.Pane
                          eventKey="ordertab1"
                          className=" fade text-muted"
                          id="shoot-tab-pane"
                          role="tabpanel"
                          aria-labelledby="shoot-tab"
                          tabIndex={0}
                        >
                          <div className="justify-content-between d-flex">
                            <div className="card-title">Total Shoots</div>
                            <div className="d-flex mb-2">
                              <Link
                                scroll={false}
                                href="/projects/shoots/create-shoot/"
                                className="btn btn-sm btn-primary me-2"
                              >
                                <i className="ri-add-line me-1 fw-medium align-middle"></i>
                                New Shoot
                              </Link>
                            </div>
                          </div>

                          <DataTable
                            columns={shootcolumns}
                            data={shootitems}
                            pagination
                            striped
                          />
                        </Tab.Pane>
                        <Tab.Pane
                          eventKey="ordertab2"
                          className=" fade text-muted"
                          id="deliverable-tab-pane"
                          role="tabpanel"
                          aria-labelledby="deliverable-tab"
                          tabIndex={0}
                        >
                          <div className="justify-content-between d-flex">
                            <div className="card-title">Total Deliverables</div>
                            <div className="d-flex mb-2">
                              <Link
                                scroll={false}
                                href="/projects/deliverables/create-deliverable/"
                                className="btn btn-sm btn-primary me-2"
                              >
                                <i className="ri-add-line me-1 fw-medium align-middle"></i>
                                New Deliverbale
                              </Link>
                            </div>
                          </div>

                          <DataTable
                            columns={deliverablecolumns}
                            data={deliverableitems}
                            pagination
                            striped
                          />
                        </Tab.Pane>
                        <Tab.Pane
                          eventKey="ordertab3"
                          className=" fade text-muted"
                          id="task-tab-pane"
                          role="tabpanel"
                          aria-labelledby="task-tab"
                          tabIndex={0}
                        >
                          <div className="justify-content-between d-flex">
                            <div className="card-title">Total Tasks</div>
                            <div className="d-flex mb-2">
                              <Link
                                scroll={false}
                                href="/projects/tasks/create-task/"
                                className="btn btn-sm btn-primary me-2"
                              >
                                <i className="ri-add-line me-1 fw-medium align-middle"></i>
                                New Task
                              </Link>
                            </div>
                          </div>

                          <DataTable
                            columns={taskcolumns}
                            data={taskitems}
                            pagination
                            striped
                          />
                        </Tab.Pane>
                        <Tab.Pane
                          eventKey="ordertab4"
                          className=" fade text-muted"
                          id="payment-tab-pane"
                          role="tabpanel"
                          tabIndex={0}
                        >
                          <div className="justify-content-between d-flex">
                            <div className="card-title text-dark">
                              Total Payemnt Details
                            </div>
                            <div className="d-flex mb-2">
                              <Link
                                scroll={false}
                                href={`${process.env.NEXT_PUBLIC_URL}/projects/project/${projectId}/create-payment`}
                                className="btn btn-sm btn-primary me-2"
                              >
                                <i className="ri-add-line me-1 fw-medium align-middle"></i>
                                New Payment
                              </Link>
                            </div>
                          </div>
                          <Row>
                            <Card>
                              <Col xl={12} lg={12} className="mr-1">
                                <ul className="list-unstyled mb-1 mt-2">
                                  <li className="mb-3">
                                    <div className="d-flex justify-content-between ">
                                      <div className="text-dark">
                                        Total Payable
                                      </div>
                                      <div className="fs-14 fw-medium text-dark">
                                        ₹ 60,000
                                      </div>
                                    </div>
                                  </li>
                                  <li className="mb-3">
                                    <div className="d-flex justify-content-between">
                                      <div className="text-dark">Received</div>
                                      <div className="fs-14 fw-medium text-dark">
                                        ₹ 60,000
                                      </div>
                                    </div>
                                  </li>
                                  <li className="mb-3">
                                    <div className="d-flex justify-content-between">
                                      <div className="text-dark">Upcoming</div>
                                      <div className="fs-14 fw-medium text-dark">
                                        ₹ 0
                                      </div>
                                    </div>
                                  </li>
                                  <li className="mb-3">
                                    <div className="d-flex justify-content-between">
                                      <div className="text-dark">
                                        Unscheduled
                                      </div>
                                      <div className="fs-14 fw-medium text-dark">
                                        ₹ 0
                                      </div>
                                    </div>
                                  </li>
                                </ul>
                              </Col>
                            </Card>
                          </Row>
                          <Row>
                            <Col xl={6} lg={6} className="ml-1">
                              <div className="text-dark">PAID PAYMENTS</div>
                              <Table striped bordered hover responsive>
                                <thead>
                                  <tr>
                                    <th>S.No</th>
                                    <th>Amount</th>
                                    <th>Paid On</th>
                                    <th>Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {paymentpaid.map((paid, idx) => (
                                    <tr key={idx}>
                                      <td>{paid.id}</td>
                                      <td>₹ {paid.amount}</td>
                                      <td>{paid.paid_date}</td>
                                      <td>
                                        <>
                                          <SpkTooltips
                                            placement="top"
                                            title="Edit"
                                          >
                                            <SpkButton
                                              Buttonvariant=""
                                              onClickfunc={() =>
                                                handlePaymentEdit(paid.id)
                                              }
                                              Customclass="btn btn-primary-light btn-icon btn-sm"
                                            >
                                              <i className="ri-edit-line"></i>
                                            </SpkButton>
                                          </SpkTooltips>
                                          <SpkButton
                                            Buttonvariant=""
                                            onClickfunc={() =>
                                              handlePaymentDelete(paid.id)
                                            }
                                            Customclass="btn btn-danger-light btn-icon ms-1 btn-sm task-delete-btn"
                                          >
                                            <i className="ri-delete-bin-5-line"></i>
                                          </SpkButton>
                                        </>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </Table>
                            </Col>
                            <Col xl={6} lg={6} className="ml-1">
                              <div className="text-dark">UNPAID PAYMENTS</div>
                              <Table striped bordered hover responsive>
                                <thead>
                                  <tr>
                                    <th>S.No</th>
                                    <th>Amount</th>
                                    <th>Due Date</th>
                                    <th>Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {paymentupcoming.map((upcoming, idx) => (
                                    <tr key={idx}>
                                      <td>{upcoming.id}</td>
                                      <td>₹ {upcoming.amount}</td>
                                      <td>{upcoming.due_date}</td>
                                      <td>
                                        <>
                                          <SpkTooltips
                                            placement="top"
                                            title="Edit"
                                          >
                                            <SpkButton
                                              Buttonvariant=""
                                              onClickfunc={() =>
                                                handlePaymentEdit(upcoming.id)
                                              }
                                              Customclass="btn btn-primary-light btn-icon btn-sm"
                                            >
                                              <i className="ri-edit-line"></i>
                                            </SpkButton>
                                          </SpkTooltips>
                                          <SpkButton
                                            Buttonvariant=""
                                            onClickfunc={() =>
                                              handlePaymentDelete(upcoming.id)
                                            }
                                            Customclass="btn btn-danger-light btn-icon ms-1 btn-sm task-delete-btn"
                                          >
                                            <i className="ri-delete-bin-5-line"></i>
                                          </SpkButton>
                                        </>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </Table>
                            </Col>
                            {/* PDF LAYOUT IS STARTED FROM HERE */}
                          </Row>
                        </Tab.Pane>
                        <Tab.Pane
                          eventKey="ordertab5"
                          className=" fade text-muted"
                          id="expense-tab-pane"
                          role="tabpanel"
                          tabIndex={0}
                        >
                          <div className="justify-content-between d-flex">
                            <div className="card-title">Total Expenses</div>
                            <div className="d-flex mb-2">
                              <Link
                                scroll={false}
                                href={`${process.env.NEXT_PUBLIC_URL}/projects/project/${projectId}/create-expense`}
                                className="btn btn-sm btn-primary me-2"
                              >
                                <i className="ri-add-line me-1 fw-medium align-middle"></i>
                                New Expense
                              </Link>
                            </div>
                          </div>

                          <DataTable
                            columns={expensecolumns}
                            data={expenseitems}
                            pagination
                            striped
                          />
                        </Tab.Pane>
                        <Tab.Pane
                          eventKey="ordertab6"
                          className=" fade text-muted"
                          id="invoice-tab-pane"
                          role="tabpanel"
                          tabIndex={0}
                        >
                          <div className="justify-content-between d-flex">
                            <div className="card-title">Total Invoices</div>
                            <div className="d-flex mb-2">
                              <Link
                                scroll={false}
                                href={`${process.env.NEXT_PUBLIC_URL}/projects/project/${projectId}/create-invoice`}
                                className="btn btn-sm btn-primary me-2"
                              >
                                <i className="ri-add-line me-1 fw-medium align-middle"></i>
                                New Invoice
                              </Link>
                            </div>
                          </div>

                          <DataTable
                            columns={invoicecolumns}
                            data={invoiceitems}
                            pagination
                            striped
                          />
                        </Tab.Pane>
                      </Tab.Content>
                    </Card.Body>
                  </Tab.Container>
                </Card>
              </Col>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* <!--End::row-1 --> */}
    </Fragment>
  );
};

export default EditShoot;
