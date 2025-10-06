"use client";

import SpkTables from "@/shared/@spk-reusable-components/reusable-tables/spk-tables";
import SpkBadge from "@/shared/@spk-reusable-components/general-reusable/reusable-uielements/spk-badge";
import SpkDropdown from "@/shared/@spk-reusable-components/general-reusable/reusable-uielements/spk-dropdown";
import Pageheader from "@/shared/layouts-components/pageheader/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useState, useEffect } from "react";
import { Card, Col, Nav, NavDropdown, Row, Tab } from "react-bootstrap";
import DataTable from "react-data-table-component";
import SpkButton from "@/shared/@spk-reusable-components/general-reusable/reusable-uielements/spk-buttons";
import { Table, Dropdown, DropdownButton, Badge } from "react-bootstrap";
import SpkTooltips from "@/shared/@spk-reusable-components/general-reusable/reusable-uielements/spk-tooltips";
import { useRouter } from "next/navigation";

interface NavsTabsProps {}

const FinanceTabs: React.FC<NavsTabsProps> = () => {
  const [amounts, setAmounts] = useState<any[]>([]);
  const [expenses, setExpenses] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  function getStatusColor(status: string): string {
    switch (status) {
      case "paid":
        return "bg-success";
      default:
        return "bg-primary";
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
  // ✅ Separate function for fetching the API data

  const capitalizeFirst = (str) => {
    if (!str || typeof str !== "string" || str.trim() === "") return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleAmountAdd = (project_id: string) => {
    router.push(
      `${process.env.NEXT_PUBLIC_URL}/projects/account-project/create-payment/`
    );
    // You can trigger a modal or setForm(item)
  };

  const handleExpenseAdd = (project_id: string) => {
    router.push(
      `${process.env.NEXT_PUBLIC_URL}/projects/account-project/create-expense/`
    );
    // You can trigger a modal or setForm(item)
  };

  const handleAmountEdit = (amount_id: string) => {
    router.push(
      `${process.env.NEXT_PUBLIC_URL}/projects/account-project/payment/${amount_id}`
    );
    // You can trigger a modal or setForm(item)
  };

  const handleExpenseEdit = (expense_id: string) => {
    router.push(
      `${process.env.NEXT_PUBLIC_URL}/projects/account-project/expense/${expense_id}`
    );
    // You can trigger a modal or setForm(item)
  };
  // const years = [2025, 2024, 2023];

  // const dataByYear = {
  //   2025: {
  //     totalPayments: "₹ 2,13,000",
  //     totalExpenses: "₹ 100",
  //     totalProfit: "₹ 9,54,410",
  //     months: [
  //       {
  //         month: "January 2025",
  //         payments: "₹ 0",
  //         expenses: "₹ 0",
  //         profit: "₹ 0",
  //       },
  //       {
  //         month: "February 2025",
  //         payments: "₹ 56,200",
  //         expenses: "₹ 0",
  //         profit: "₹ 56,200",
  //       },
  //       {
  //         month: "March 2025",
  //         payments: "₹ 1,11,500",
  //         expenses: "₹ 0",
  //         profit: "₹ 1,11,500",
  //       },
  //       {
  //         month: "April 2025",
  //         payments: "₹ 1,11,500",
  //         expenses: "₹ 0",
  //         profit: "₹ 1,11,500",
  //       },
  //       {
  //         month: "May 2025",
  //         payments: "₹ 1,11,500",
  //         expenses: "₹ 0",
  //         profit: "₹ 1,11,500",
  //       },
  //       {
  //         month: "June 2025",
  //         payments: "₹ 1,11,500",
  //         expenses: "₹ 0",
  //         profit: "₹ 1,11,500",
  //       },
  //       {
  //         month: "July 2025",
  //         payments: "₹ 1,11,500",
  //         expenses: "₹ 0",
  //         profit: "₹ 1,11,500",
  //       },
  //     ],
  //   },
  //   2024: {
  //     totalPayments: "₹ 1,50,000",
  //     totalExpenses: "₹ 10,000",
  //     totalProfit: "₹ 1,40,000",
  //     months: [
  //       {
  //         month: "January 2024",
  //         payments: "₹ 50,000",
  //         expenses: "₹ 5,000",
  //         profit: "₹ 45,000",
  //       },
  //       {
  //         month: "February 2024",
  //         payments: "₹ 1,00,000",
  //         expenses: "₹ 5,000",
  //         profit: "₹ 95,000",
  //       },
  //     ],
  //   },
  //   2023: {
  //     totalPayments: "₹ 1,50,000",
  //     totalExpenses: "₹ 10,000",
  //     totalProfit: "₹ 1,40,000",
  //     months: [
  //       {
  //         month: "January 2024",
  //         payments: "₹ 50,000",
  //         expenses: "₹ 5,000",
  //         profit: "₹ 45,000",
  //       },
  //       {
  //         month: "February 2024",
  //         payments: "₹ 1,00,000",
  //         expenses: "₹ 5,000",
  //         profit: "₹ 95,000",
  //       },
  //     ],
  //   },
  // };
  const currentYear = new Date().getFullYear();
  const years = [currentYear, currentYear - 1, currentYear - 2];

  const inr0 = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const monthLabel = (y, m) =>
    new Date(`${y}-${String(m).padStart(2, "0")}-01T00:00:00`).toLocaleString(
      "en-IN",
      { month: "long", year: "numeric" }
    );

  const ymFrom = (dateStr) => {
    if (!dateStr) return null;
    const d = new Date(dateStr + "T00:00:00");
    return Number.isNaN(d.getTime())
      ? null
      : { y: d.getFullYear(), m: d.getMonth() + 1 };
  };

  // Build structure like your example (payments/expenses/profit, months as array of objects)
  function buildDataByYearLikeExample(yearList, amountsRows, expensesRows) {
    // 1) aggregate per year-month
    const agg = {}; // { [year]: { [month]: { payments, expenses } } }

    const upsert = (y, m) => {
      agg[y] ||= {};
      agg[y][m] ||= { payments: 0, expenses: 0 };
      return agg[y][m];
    };

    // payments: count ONLY status === 'paid' using paid_date
    for (const r of amountsRows ?? []) {
      if (r?.status === "paid") {
        const ym = ymFrom(r.paid_date);
        if (!ym) continue;
        upsert(ym.y, ym.m).payments += Number(r.amount) || 0;
      }
    }

    // expenses: use expense date
    for (const r of expensesRows ?? []) {
      const ym = ymFrom(r.date);
      if (!ym) continue;
      upsert(ym.y, ym.m).expenses += Number(r.amount) || 0;
    }

    // 2) build final object for requested years
    const dataByYear = {};
    for (const y of yearList) {
      const monthsObj = agg[y] || {};
      const monthsArray = Object.keys(monthsObj)
        .map((m) => Number(m))
        .sort((a, b) => a - b)
        .map((m) => {
          const { payments, expenses } = monthsObj[m];
          const profit = payments - expenses;
          return {
            month: monthLabel(y, m),
            payments: inr0.format(payments),
            expenses: inr0.format(expenses),
            profit: inr0.format(profit),
          };
        });

      // totals from months
      let totalPayments = 0,
        totalExpenses = 0;
      for (const m of Object.values(monthsObj)) {
        totalPayments += m.payments;
        totalExpenses += m.expenses;
      }
      const totalProfit = totalPayments - totalExpenses;

      dataByYear[y] = {
        totalPayments: inr0.format(totalPayments),
        totalExpenses: inr0.format(totalExpenses),
        totalProfit: inr0.format(totalProfit),
        months: monthsArray, // only months that have activity, like your sample
      };
    }

    return { years: yearList, dataByYear };
  }
  // whenever data is ready:
  const { years: yearTabs, dataByYear } = buildDataByYearLikeExample(
    years,
    amounts,
    expenses
  );
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const yearData = dataByYear[selectedYear];

  const amountsColumns = [
    {
      name: "DUE DATE/PAID DATE",
      selector: (row) => (row.due_date === "" ? row.paid_date : row.due_date),
    },
    { name: "AMOUNT", selector: (row) => row.amount },
    {
      name: "STATUS",
      selector: (row) => (
        <SpkBadge
          variant=""
          Customclass={`badge ${getStatusColor(row.status)}`}
        >
          {capitalizeFirst(row.status)}
        </SpkBadge>
      ),
      sortable: true,
    },
    { name: "CLIENT", selector: (row) => row.project_name, sortable: true },

    { name: "REMARKS", selector: (row) => row.notes, sortable: true },
    {
      name: "ACTIONS",
      cell: (row) => (
        <>
          <SpkTooltips placement="top" title="Edit">
            <SpkButton
              Buttonvariant=""
              onClickfunc={() => handleAmountEdit(row.id)}
              Customclass="btn btn-primary-light btn-icon btn-sm"
            >
              <i className="ri-edit-line"></i>
            </SpkButton>
          </SpkTooltips>
          <SpkButton
            Buttonvariant=""
            onClickfunc={() => handleAmountAdd(row.id)}
            Customclass="btn btn-danger-light btn-icon ms-1 btn-sm task-delete-btn"
          >
            <i className="ri-add-circle-line"></i>
          </SpkButton>
        </>
      ),
    },
  ];

  const expensesColumns = [
    {
      name: "DATE",
      selector: (row) => row.date,
    },
    { name: "CLIENT", selector: (row) => row.project_name, sortable: true },
    { name: "AMOUNT", selector: (row) => row.amount },
    {
      name: "BILLED",
      selector: (row) => (
        <SpkBadge
          variant=""
          Customclass={`badge ${getStatusColor(row.billed)}`}
        >
          {capitalizeFirst(row.billed)}
        </SpkBadge>
      ),
      sortable: true,
    },
    { name: "REMARKS", selector: (row) => row.notes, sortable: true },
    {
      name: "ACTIONS",
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
            onClickfunc={() => handleExpenseAdd(row.id)}
            Customclass="btn btn-danger-light btn-icon ms-1 btn-sm task-delete-btn"
          >
            <i className="ri-add-circle-line"></i>
          </SpkButton>
        </>
      ),
    },
  ];

  const invoicesColumns = [
    {
      name: "INVOICE ID",
      selector: (row) => row.invoice_number,
      sortable: true,
    },
    { name: "CLIENT", selector: (row) => row.project_name, sortable: true },
    { name: "SUBJECT", selector: (row) => row.subject },
    {
      name: "BILLED BY",
      selector: (row) => (
        <SpkBadge
          variant=""
          Customclass={`badge ${getStatusColor(row.billed_by)}`}
        >
          {capitalizeFirst(row.billed_by)}
        </SpkBadge>
      ),
      sortable: true,
    },
    {
      name: "DATE",
      selector: (row) => row.invoice_date,
    },
    {
      name: "ACTIONS",
      cell: (row) => (
        <>
          <SpkButton
            Buttonvariant=""
            onClickfunc={() => row.id}
            Customclass="btn btn-primary-light btn-icon btn-sm"
          >
            <i className="ri-edit-line"></i>
          </SpkButton>
          <SpkButton
            Buttonvariant=""
            onClickfunc={() => row.id}
            Customclass="btn btn-danger-light btn-icon ms-1 btn-sm task-delete-btn"
          >
            <i className="ri-delete-bin-5-line"></i>
          </SpkButton>
        </>
      ),
    },
  ];
  const fetchCombinedData = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/finance`);
      const data = await res.json();

      setAmounts(data.amounts?.rows || []);
      setExpenses(data.expenses?.rows || []);
      setInvoices(data.invoices?.rows || []);
      console.log("amounts", amounts);
      console.log("expenses", expenses);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCombinedData();
  }, []);
  return (
    <Fragment>
      {/* <!-- Page Header --> */}

      <Seo title="Accounts Tabs" />

      <Pageheader
        title="Accounts"
        currentpage="Accounts Tabs"
        activepage="Accounts Tabs"
      />

      {/* <!-- Page Header Close --> */}

      {/* <!-- Start:: row-2 --> */}

      <Row>
        <Col xxl={12} xl={6}>
          <Card className="custom-card">
            <Card.Header>
              <div className="card-title">Summary</div>
            </Card.Header>
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
                      id="profit-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#profit-tab-pane"
                      type="button"
                      role="tab"
                      aria-controls="profit-tab-pane"
                      aria-selected="true"
                    >
                      <i className="ri-gift-line me-1 align-middle"></i>Profit &
                      Loss
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="" role="presentation">
                    <Nav.Link
                      eventKey="ordertab2"
                      className=""
                      id="client-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#client-tab-pane"
                      type="button"
                      role="tab"
                      aria-controls="client-tab-pane"
                      aria-selected="false"
                    >
                      <i className="ri-check-double-line me-1 align-middle"></i>
                      Payments
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="" role="presentation">
                    <Nav.Link
                      eventKey="ordertab3"
                      className=""
                      id="expense-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#expense-tab-pane"
                      type="button"
                      role="tab"
                      aria-controls="expense-tab-pane"
                      aria-selected="false"
                    >
                      <i className="ri-shopping-bag-3-line me-1 align-middle"></i>
                      Expenses
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="" role="presentation">
                    <Nav.Link
                      eventKey="ordertab4"
                      className=""
                      id="invoice-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#invoice-tab-pane"
                      type="button"
                      role="tab"
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
                    className="fade text-muted"
                    id="profit-tab-pane"
                    role="tabpanel"
                    aria-labelledby="profit-tab"
                    tabIndex={0}
                  >
                    {/* Main Content */}
                    <Col xs={12} className="p-4">
                      <Row className="d-flex justify-content-between align-items-center mb-4">
                        <Col>
                          <h4>Accounts / Profit & Loss</h4>
                        </Col>
                        <Col className="text-end">
                          <DropdownButton
                            id="dropdown-basic-button"
                            title={selectedYear}
                            variant="secondary"
                            onSelect={(e) => setSelectedYear(Number(e))}
                          >
                            {years.map((year) => (
                              <Dropdown.Item eventKey={year} key={year}>
                                {year}
                              </Dropdown.Item>
                            ))}
                          </DropdownButton>
                        </Col>
                      </Row>

                      {/* Summary */}
                      <Row className="mb-4">
                        <Col md={4}>
                          <Card className="text-white text-center p-3">
                            <h6>INCOME</h6>
                            <h4>{yearData.totalPayments}</h4>
                          </Card>
                        </Col>
                        <Col md={4}>
                          <Card className="text-white text-center p-3">
                            <h6>EXPENSES</h6>
                            <h4>{yearData.totalExpenses}</h4>
                          </Card>
                        </Col>
                        <Col md={4}>
                          <Card className="text-white text-center p-3">
                            <h6>ACTUAL PROFIT</h6>
                            <h4 className="text-success">
                              {yearData.totalProfit}
                            </h4>
                          </Card>
                        </Col>
                      </Row>

                      {/* Payments Table */}
                      <Card className="text-white p-3">
                        <h5>PAYMENTS - {selectedYear}</h5>
                        <Table
                          bordered
                          responsive
                          className="table text-nowrap"
                        >
                          <thead className="table-primary">
                            <tr>
                              <th></th>
                              <th>TOTAL</th>
                              {yearData.months.map((m, idx) => (
                                <th key={idx}>{m.month}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>[+] PAID CLIENT PAYMENTS</td>
                              <td>{yearData.totalPayments}</td>
                              {yearData.months.map((m, idx) => (
                                <td key={idx}>{m.payments}</td>
                              ))}
                            </tr>
                            <tr>
                              <td>[-] MY EXPENSES</td>
                              <td>{yearData.totalExpenses}</td>
                              {yearData.months.map((m, idx) => (
                                <td key={idx}>{m.expenses}</td>
                              ))}
                            </tr>
                            <tr className="table-primary">
                              <td>[=] PROFIT / LOSS</td>
                              <td>
                                <Badge bg="success" pill>
                                  {yearData.totalProfit}
                                </Badge>
                              </td>
                              {yearData.months.map((m, idx) => (
                                <td key={idx}>
                                  <Badge
                                    bg={
                                      m.profit.startsWith("₹ 0")
                                        ? "secondary"
                                        : "success"
                                    }
                                    pill
                                  >
                                    {m.profit}
                                  </Badge>
                                </td>
                              ))}
                            </tr>
                          </tbody>
                        </Table>
                      </Card>
                    </Col>
                  </Tab.Pane>
                  <Tab.Pane
                    eventKey="ordertab2"
                    className=" fade text-muted"
                    id="cclient-tab-pane"
                    role="tabpanel"
                    aria-labelledby="client-tab"
                    tabIndex={0}
                  >
                    <DataTable
                      columns={amountsColumns}
                      data={amounts}
                      pagination
                      striped
                    />
                  </Tab.Pane>
                  <Tab.Pane
                    eventKey="ordertab3"
                    className=" fade text-muted"
                    id="expense-tab-pane"
                    role="tabpanel"
                    aria-labelledby="expense-tab"
                    tabIndex={0}
                  >
                    <DataTable
                      columns={expensesColumns}
                      data={expenses}
                      pagination
                      striped
                    />
                  </Tab.Pane>
                  <Tab.Pane
                    eventKey="ordertab4"
                    className=" fade text-muted"
                    id="invoice-tab-pane"
                    role="tabpanel"
                    tabIndex={0}
                  >
                    <DataTable
                      columns={invoicesColumns}
                      data={invoices}
                      pagination
                      striped
                    />
                  </Tab.Pane>
                </Tab.Content>
              </Card.Body>
            </Tab.Container>
          </Card>
        </Col>
      </Row>

      {/* <!-- End:: row-12 --> */}
    </Fragment>
  );
};

export default FinanceTabs;
