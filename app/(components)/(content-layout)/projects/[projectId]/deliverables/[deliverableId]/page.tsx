"use client";

import SpkButton from "@/shared/@spk-reusable-components/general-reusable/reusable-uielements/spk-buttons";
import { useRouter } from "next/navigation";
import Pageheader from "@/shared/layouts-components/pageheader/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import React, { Fragment, useState, useEffect } from "react";
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
import SpkToast from "@/shared/@spk-reusable-components/general-reusable/reusable-uielements/spk-toast";
import { useParams } from "next/navigation";

interface CreateProjectProps {}

const EditDeliverable: React.FC<CreateProjectProps> = () => {
  const CostSelect = [
    { value: "part of package", label: "Part of Package" },
    { value: "additional charges", label: "Additional Charges" },
  ];

  const { projectId, deliverableId } = useParams();
  const [loading, setLoading] = useState(true);

  const [photos, setPhotos] = useState([]);
  const router = useRouter();

  const PrioritySelect = [
    { value: "critical", label: "Critical" },
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" },
  ];

  const StatusSelect = [
    { value: "todo", label: "Todo" },
    { value: "inprogress", label: "inProgress" },
    { value: "inreview", label: "inReview" },
    { value: "done", label: "Done" },
  ];

  const [form, setForm] = useState({
    project: "",
    name: "",
    quantity: "",
    date: "",
    status: "",
    priority: "",
    cost: "",
    assigned: "",
    notes: "",
  });

  const [form2Rows, setForm2Rows] = useState([
    { name: "", assigned: "", priority: "", date: "" },
  ]);

  // Handlers for Form 1
  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handlers for Form 2
  const handleForm2Change = (index: number, field: string, value: string) => {
    const updated = [...form2Rows];
    updated[index][field as keyof (typeof updated)[0]] = value;
    setForm2Rows(updated);
  };

  const addForm2Row = () =>
    setForm2Rows([...form2Rows, { item: "", type: "option1" }]);
  const removeForm2Row = (index: number) => {
    const updated = [...form2Rows];
    updated.splice(index, 1);
    setForm2Rows(updated);
  };

  const RedirectExpense = () => {
    router.push(
      `${process.env.NEXT_PUBLIC_URL}/projects/${projectId}/create-expense`
    );
  };

  // Final submit handler
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      form,
      form2: form2Rows,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/projects/${projectId}/deliverables/${deliverableId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      setToasts((prevToasts) => ({
        ...prevToasts,
        ["SuccessColor"]: true,
      }));
      // alert("Submitted All Forms successfully!");
    } catch (error) {
      console.error(error);
      alert("Submission failed!");
    }
  };

  const [toasts, setToasts] = useState<{ [key: string]: boolean }>({});

  // const addToast = (toastName: string) => {
  //   setToasts((prevToasts) => ({
  //     ...prevToasts,
  //     [toastName]: true,
  //   }));
  // };

  const handleToasts = (toastName: string) => {
    setToasts((prevToasts) => ({ ...prevToasts, [toastName]: false }));
  };

  // Second Form
  const fetchPhotoCrew = async () => {
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/crews/photo`)
      .then((res) => res.json())
      .then((data) => setPhotos(data.data));
  };
  const fetchPrefilledDeliverable = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/projects/${projectId}/deliverables/${deliverableId}`
      );
      const data = await res.json();
      console.log("fetching data:", data);

      setForm(data.deliverable[0]);
      setForm2Rows(data.tasks[0]);
      // setForm3Rows(data.video_crew[0]);
      // setForm4Rows(data.additional_crew[0]);
    } catch (error) {
      console.error("Error fetching name:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotoCrew();
    fetchPrefilledDeliverable();
  }, []);

  return (
    <Fragment>
      {/* <!-- Page Header --> */}

      <Seo title="Update Deliverable" />

      <Pageheader
        title="Dashboards"
        subtitle="Projects"
        currentpage="Update Deliverables"
        activepage="Update Deliverables"
      />

      {/* <!-- Page Header Close --> */}

      {/* <!-- Start::row-1 --> */}

      <Row>
        <Col xl={12}>
          <Card className="custom-card">
            <Card.Header>
              <div className="card-title">UPDATE DELIVERABLE</div>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleUpdate} className="mb-4">
                <div className="row gy-3">
                  <Col xl={4}>
                    <Form.Label className="">Title :</Form.Label>{" "}
                    <div className="form-group">
                      <div className="input-group">
                        <div className="input-group-text text-muted">
                          {" "}
                          <i className="ri-file-cloud-fill"></i>
                        </div>
                        <Form.Control
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                    </div>
                  </Col>
                  <Col xl={4}>
                    <Form.Label className="">Quantity :</Form.Label>
                    <div className="form-group">
                      <div className="input-group">
                        <div className="input-group-text text-muted">
                          {" "}
                          <i className="ri-calendar-line"></i>{" "}
                        </div>
                        <Form.Control
                          type="number"
                          name="quantity"
                          value={form.quantity}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                    </div>
                  </Col>

                  <Col xl={4}>
                    <Form.Label className="">Due Date :</Form.Label>
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
                  <Col xl={3}>
                    <Form.Label className="">Status :</Form.Label>
                    <Form.Select
                      name="status"
                      value={form.status}
                      onChange={handleFormChange}
                      required
                    >
                      <option value="">Select Status</option>
                      {StatusSelect.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col xl={3}>
                    <Form.Label className="">Priority :</Form.Label>
                    <Form.Select
                      name="priority"
                      value={form.priority}
                      onChange={handleFormChange}
                      required
                    >
                      <option value="">Select Priority</option>
                      {PrioritySelect.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>

                  <Col xl={3}>
                    <Form.Label className="">Cost :</Form.Label>
                    <Form.Select
                      name="cost"
                      value={form.cost}
                      onChange={handleFormChange}
                      required
                    >
                      <option value="">Select Cost</option>
                      {CostSelect.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col xl={3}>
                    <Form.Label className="">Assigned To :</Form.Label>
                    <Form.Select
                      name="assigned"
                      value={form.assigned}
                      onChange={handleFormChange}
                      required
                    >
                      <option value="">Select Assigned</option>
                      {photos.map((opt) => (
                        <option key={opt.id} value={opt.name}>
                          {opt.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col xl={12}>
                    <Form.Label htmlFor="product-description-add" className="">
                      Notes
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      className=""
                      value={form.notes}
                      id="product-description-add"
                      onChange={handleFormChange}
                      placeholder="Add new notes here"
                      rows={2}
                      name="notes"
                    />
                    <Form.Label
                      htmlFor="product-description-add"
                      className=" mt-1 fs-12 fw-normal text-muted mb-0"
                    >
                      *Notes should not exceed 500 letters
                    </Form.Label>
                  </Col>
                  <Card.Header>
                    <div className="card-title">TASKS DETAILS</div>
                  </Card.Header>

                  <Table bordered hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Task</th>
                        <th>Assigned</th>
                        <th>Priority</th>
                        <th>Due Date</th>
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {form2Rows.map((row, idx) => (
                        <tr key={idx}>
                          <td>{row.id}</td>
                          <td>
                            {" "}
                            <Form.Control
                              type="text"
                              name="name"
                              value={row.name}
                              onChange={(e) =>
                                handleForm2Change(idx, "name", e.target.value)
                              }
                              required
                            />
                          </td>
                          <td>
                            <Form.Select
                              name="assigned"
                              value={row.assigned}
                              onChange={(e) =>
                                handleForm2Change(
                                  idx,
                                  "assigned",
                                  e.target.value
                                )
                              }
                              required
                            >
                              <option value="">Select</option>
                              {photos.map((opt) => (
                                <option key={opt.id} value={opt.name}>
                                  {opt.name}
                                </option>
                              ))}
                            </Form.Select>
                          </td>

                          <td>
                            {" "}
                            <Form.Select
                              name="priority"
                              value={row.priority}
                              onChange={(e) =>
                                handleForm2Change(
                                  idx,
                                  "priority",
                                  e.target.value
                                )
                              }
                              required
                            >
                              <option value="">Select Priority</option>
                              {PrioritySelect.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </Form.Select>
                          </td>

                          <td>
                            <Form.Control
                              type="date"
                              name="date"
                              value={row.date}
                              onChange={(e) =>
                                handleForm2Change(idx, "date", e.target.value)
                              }
                              required
                            />
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

                <Col xl={12} className="mt-5">
                  <SpkButton
                    Buttonvariant=""
                    Customclass="btn btn-primary-light btn-wave ms-auto float-end"
                  >
                    Save Deliverable
                  </SpkButton>

                  <ToastContainer className="toast-container position-fixed top-0 end-0 p-3">
                    <SpkToast
                      ToastHeader={true}
                      bg="success-transparent"
                      toastClass="colored-toast"
                      onClose={() => handleToasts("SuccessColor")}
                      show={toasts["SuccessColor"] || false}
                      delay={3000}
                      autohide={true}
                      headerClass="text-fixed-white bg-success"
                      imgClass="bd-placeholder-img rounded me-2"
                      imgSrc="https://www.weddingqueen.in/images/logo-weddingqueen.png"
                      message="Updated Shoots Successfully!"
                      title="WeddingQueen"
                    />
                  </ToastContainer>
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

export default EditDeliverable;
