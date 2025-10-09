"use client";

import SpkButton from "@/shared/@spk-reusable-components/general-reusable/reusable-uielements/spk-buttons";
import Pageheader from "@/shared/layouts-components/pageheader/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import React, { Fragment, useState, useEffect } from "react";
import { Card, Col, Form, Row, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import SpkToastify from "@/shared/@spk-reusable-components/reusable-plugins/spk-toastify";

interface CreateProjectProps {}

const CreateProject: React.FC<CreateProjectProps> = () => {
  const RelationSelect = [
    { value: "bride", label: "Bride" },
    { value: "groom", label: "Groom" },
    { value: "father", label: "Father" },
    { value: "mother", label: "Mother" },
    { value: "other", label: "Other" },
  ];

  const SlotSelect = [
    { value: "morning", label: "Morning" },
    { value: "evening", label: "Evening" },
    { value: "night", label: "Night" },
  ];

  const CostSelect = [
    { value: "part of package", label: "Part of Package" },
    { value: "additional charges", label: "Additional Charges" },
  ];

  const AsignSelect = [
    { value: "wedding", label: "Wedding" },
    { value: "engagement", label: "Engagement" },
    { value: "reception", label: "Reception" },
    { value: "mehndi", label: "Mehndi" },
    { value: "haldi", label: "Haldi" },
    { value: "sangeet", label: "Sangeet" },
  ];
  const DeliverSelect = [
    { value: "edited photos", label: "Edited Photos" },
    {
      value: "full length traditional videos",
      label: "Full Length Traditional Videos",
    },
    { value: "wedding film", label: "Wedding Film" },
    { value: "print albums", label: "Print Albums" },
  ];
  const [deliverables, setDeliverables] = useState([]);

  const [form1, setForm1] = useState({
    name: "",
    cost: "",
    client: "",
    relation: "",
    phone: "",
    email: "",
    date: "",
  });

  const [form2Rows, setForm2Rows] = useState([
    { name: "", date: "", slot: "", city: "" },
  ]);

  const [form3Rows, setForm3Rows] = useState([
    { name: "", cost: "", quantity: "", date: "" },
  ]);

  const [form4, setForm4] = useState({
    amount: "",
    description: "",
    date: "",
  });
  // Handlers for Form 1
  const handleForm1Change = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm1((prev) => ({ ...prev, [name]: value }));
  };

  // Handlers for Form 2
  const handleForm2Change = (index: number, field: string, value: string) => {
    const updated = [...form2Rows];
    updated[index][field as keyof (typeof updated)[0]] = value;
    setForm2Rows(updated);
  };

  const handleForm4Change = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm4((prev) => ({ ...prev, [name]: value }));
  };

  const addForm2Row = () =>
    setForm2Rows([...form2Rows, { item: "", type: "option1" }]);
  const removeForm2Row = (index: number) => {
    const updated = [...form2Rows];
    updated.splice(index, 1);
    setForm2Rows(updated);
  };

  // Handlers for Form 3
  const handleForm3Change = (index: number, field: string, value: string) => {
    const updated = [...form3Rows];
    updated[index][field as keyof (typeof updated)[0]] = value;
    setForm3Rows(updated);
  };

  const addForm3Row = () =>
    setForm3Rows([...form3Rows, { task: "", priority: "low" }]);
  const removeForm3Row = (index: number) => {
    const updated = [...form3Rows];
    updated.splice(index, 1);
    setForm3Rows(updated);
  };

  // Final submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const savedLoginData = localStorage.getItem("LoginData");
    const loginData = savedLoginData ? JSON.parse(savedLoginData) : null;
    const member_id = loginData?.id ?? null;

    const payload = {
      form1,
      form2: form2Rows,
      form3: form3Rows,
      form4,
      member_id,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      toast("Submitted Projects successfully!");
    } catch (error) {
      console.error(error);
      toast("Submission failed!");
    }
  };

  useEffect(() => {}, []);
  return (
    <Fragment>
      {/* <!-- Page Header --> */}

      <Seo title="Projects Create" />

      <Pageheader
        title="Dashboards"
        subtitle="Projects"
        currentpage="Create Project"
        activepage="Create Project"
      />

      {/* <!-- Page Header Close --> */}

      {/* <!-- Start::row-1 --> */}

      <Row>
        <Col xl={12}>
          <Card className="custom-card">
            <Card.Header>
              <div className="card-title">Project Create</div>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit} className="mb-4">
                <div className="row gy-3">
                  <Col xl={6}>
                    <Form.Label htmlFor="input-label" className="">
                      Project Name :
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Enter Project Name"
                      value={form1.name}
                      onChange={handleForm1Change}
                      required
                    />
                  </Col>
                  <Col xl={6}>
                    <Form.Label htmlFor="input-label" className="">
                      Package Cost :
                    </Form.Label>
                    <div className="form-group">
                      <div className="input-group">
                        <div className="input-group-text text-muted">
                          {" "}
                          <i className="ri-money-rupee-circle-line"></i>{" "}
                        </div>
                        <Form.Control
                          type="number"
                          name="cost"
                          placeholder="Cost"
                          value={form1.cost}
                          onChange={handleForm1Change}
                          required
                        />
                      </div>
                    </div>
                  </Col>
                  <Col xl={6}>
                    <Form.Label htmlFor="input-label11" className="">
                      Client Name :
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="client"
                      placeholder="Enter Client Name"
                      value={form1.client}
                      onChange={handleForm1Change}
                      required
                    />
                  </Col>
                  <Col xl={6}>
                    <Form.Label className="">Relation :</Form.Label>
                    <Form.Select
                      name="relation"
                      value={form1.relation}
                      onChange={handleForm1Change}
                      required
                    >
                      <option value="">Select Relation</option>
                      {RelationSelect.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col xl={6}>
                    <Form.Label htmlFor="input-label1" className="">
                      Phone :
                    </Form.Label>
                    <div className="form-group">
                      <div className="input-group">
                        <div className="input-group-text text-muted">
                          {" "}
                          <i className="ri-phone-line"></i>{" "}
                        </div>
                        <Form.Control
                          type="phone"
                          name="phone"
                          placeholder="Enter Phone"
                          value={form1.phone}
                          onChange={handleForm1Change}
                          required
                        />
                      </div>
                    </div>
                  </Col>

                  <Col xl={6}>
                    <Form.Label htmlFor="input-label11" className="">
                      Email :
                    </Form.Label>
                    <div className="form-group">
                      <div className="input-group">
                        <div className="input-group-text text-muted">
                          {" "}
                          <i className="ri-mail-line"></i>{" "}
                        </div>
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="Enter Email"
                          value={form1.email}
                          onChange={handleForm1Change}
                          required
                        />
                      </div>
                    </div>
                  </Col>
                  <Card.Header>
                    <div className="card-title">
                      SHOOTS/DELIVERABLE/AMOUNT DETAILS
                    </div>
                  </Card.Header>
                  <div className="row gy-3 mt-1">
                    <div className="card-title">SHOOTS</div>

                    <Table bordered hover>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Title</th>
                          <th>Date</th>
                          <th>Slot</th>
                          <th>City</th>
                          <th className="text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {form2Rows.map((row, idx) => (
                          <tr key={idx}>
                            <td>{row.id}</td>
                            <td>
                              <Form.Select
                                name="name"
                                value={row.name}
                                onChange={(e) =>
                                  handleForm2Change(idx, "name", e.target.value)
                                }
                                required
                              >
                                <option value="">Select</option>
                                {AsignSelect.map((opt) => (
                                  <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                  </option>
                                ))}
                              </Form.Select>
                            </td>
                            <td>
                              <div className="form-group">
                                <div className="input-group">
                                  <div className="input-group-text text-muted">
                                    {" "}
                                    <i className="ri-calendar-line"></i>{" "}
                                  </div>
                                  <Form.Control
                                    type="date"
                                    name="date"
                                    value={row.date}
                                    onChange={(e) =>
                                      handleForm2Change(
                                        idx,
                                        "date",
                                        e.target.value
                                      )
                                    }
                                    required
                                  />
                                </div>
                              </div>
                            </td>
                            <td>
                              <Form.Select
                                name="slot"
                                value={row.slot}
                                onChange={(e) =>
                                  handleForm2Change(idx, "slot", e.target.value)
                                }
                                required
                              >
                                <option value="">Select Slot</option>
                                {SlotSelect.map((opt) => (
                                  <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                  </option>
                                ))}
                              </Form.Select>
                            </td>
                            <td>
                              <div className="form-group">
                                <div className="input-group">
                                  <div className="input-group-text text-muted">
                                    {" "}
                                    <i className="ri-map-pin-line"></i>
                                  </div>
                                  <Form.Control
                                    type="text"
                                    name="city"
                                    value={row.city}
                                    onChange={(e) =>
                                      handleForm2Change(
                                        idx,
                                        "city",
                                        e.target.value
                                      )
                                    }
                                    required
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="text-center">
                              <Row>
                                <SpkButton
                                  Buttonvariant=""
                                  onClickfunc={() => removeForm2Row(idx)}
                                  Customclass="btn btn-danger-light btn-icon ms-1 btn-sm task-delete-btn"
                                >
                                  <i className="ri-delete-bin-5-line"></i>
                                </SpkButton>
                              </Row>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    {/* Show Add Row button only in the last row */}

                    <SpkButton
                      Buttonvariant=""
                      onClickfunc={addForm2Row}
                      Customclass="btn btn-success-light btn-icon ms-1 btn-sm task-plus-btn"
                    >
                      <i className="ri-add-line"></i>
                    </SpkButton>
                  </div>

                  <div className="row gy-3 mt-1">
                    <div className="card-title">DELIVERABLES</div>

                    <Table bordered hover>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Title</th>
                          <th>Cost</th>
                          <th>Quantity</th>
                          <th>Due Date</th>
                          <th className="text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {form3Rows.map((row, idx) => (
                          <tr key={idx}>
                            <td>{row.id}</td>
                            <td>
                              <Form.Select
                                name="name"
                                value={row.name}
                                onChange={(e) =>
                                  handleForm3Change(idx, "name", e.target.value)
                                }
                                required
                              >
                                <option value="">Select</option>
                                {DeliverSelect.map((opt) => (
                                  <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                  </option>
                                ))}
                              </Form.Select>
                            </td>
                            <td>
                              <div className="form-group">
                                <div className="input-group">
                                  <div className="input-group-text text-muted">
                                    {" "}
                                    <i className="ri-money-rupee-circle-line"></i>
                                  </div>
                                  <Form.Select
                                    name="cost"
                                    value={row.cost}
                                    onChange={(e) =>
                                      handleForm3Change(
                                        idx,
                                        "cost",
                                        e.target.value
                                      )
                                    }
                                    required
                                  >
                                    <option value="">Select</option>
                                    {CostSelect.map((opt) => (
                                      <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                      </option>
                                    ))}
                                  </Form.Select>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="form-group">
                                <div className="input-group">
                                  <div className="input-group-text text-muted">
                                    {" "}
                                    <i className="ri-list-ordered"></i>
                                  </div>
                                  <Form.Control
                                    type="text"
                                    name="quantity"
                                    value={row.quantity}
                                    onChange={(e) =>
                                      handleForm3Change(
                                        idx,
                                        "quantity",
                                        e.target.value
                                      )
                                    }
                                    required
                                  />
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="form-group">
                                <div className="input-group">
                                  <div className="input-group-text text-muted">
                                    {" "}
                                    <i className="ri-calendar-line"></i>{" "}
                                  </div>
                                  <Form.Control
                                    type="date"
                                    name="date"
                                    value={row.date}
                                    onChange={(e) =>
                                      handleForm3Change(
                                        idx,
                                        "date",
                                        e.target.value
                                      )
                                    }
                                    required
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="text-center">
                              <Row>
                                <SpkButton
                                  Buttonvariant=""
                                  onClickfunc={() => removeForm3Row(idx)}
                                  Customclass="btn btn-danger-light btn-icon ms-1 btn-sm task-delete-btn"
                                >
                                  <i className="ri-delete-bin-5-line"></i>
                                </SpkButton>

                                {/* Show Add Row button only in the last row */}
                              </Row>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <SpkButton
                      Buttonvariant=""
                      onClickfunc={addForm3Row}
                      Customclass="btn btn-success-light btn-icon ms-1 btn-sm task-plus-btn"
                    >
                      <i className="ri-add-line"></i>
                    </SpkButton>
                  </div>
                </div>
                <div className="row gy-3 mt-1">
                  <div className="card-title">RECIEVED AMOUNT</div>

                  <Table bordered hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Amount</th>
                        <th>Description</th>
                        <th>Paid On</th>
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td></td>
                        <td>
                          <div className="form-group">
                            <div className="input-group">
                              <div className="input-group-text text-muted">
                                {" "}
                                <i className="ri-money-rupee-circle-line"></i>
                              </div>
                              <Form.Control
                                type="text"
                                name="amount"
                                placeholder="Enter Amount"
                                value={form4.amount}
                                onChange={handleForm4Change}
                                required
                              />
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="form-group">
                            <div className="input-group">
                              <div className="input-group-text text-muted">
                                {" "}
                                <i className="ri-space"></i>
                              </div>
                              <Form.Control
                                type="text"
                                name="description"
                                placeholder="Enter Description"
                                value={form4.description}
                                onChange={handleForm4Change}
                                required
                              />
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="form-group">
                            <div className="input-group">
                              <div className="input-group-text text-muted">
                                {" "}
                                <i className="ri-calendar-line"></i>{" "}
                              </div>
                              <Form.Control
                                type="date"
                                name="date"
                                value={form4.date}
                                onChange={handleForm4Change}
                                required
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                  {/* Show Add Row button only in the last row */}
                </div>
                <Col xl={12} className="mt-5">
                  <SpkButton
                    Buttonvariant=""
                    Customclass="btn btn-primary-light btn-wave ms-auto float-end"
                  >
                    Create Project
                  </SpkButton>
                  <SpkToastify position="top-right" />
                </Col>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* <!--End::row-1 --> */}
    </Fragment>
  );
};

export default CreateProject;
