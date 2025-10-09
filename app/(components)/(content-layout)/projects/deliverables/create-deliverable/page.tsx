"use client";

import SpkButton from "@/shared/@spk-reusable-components/general-reusable/reusable-uielements/spk-buttons";
import Pageheader from "@/shared/layouts-components/pageheader/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import React, { Fragment, useState, useEffect } from "react";
import { Card, Col, Form, Row, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import SpkToastify from "@/shared/@spk-reusable-components/reusable-plugins/spk-toastify";

interface CreateProjectProps {}

const CreateDeliverable: React.FC<CreateProjectProps> = () => {
  const CostSelect = [
    { value: "part of package", label: "Part of Package" },
    { value: "additional charges", label: "Additional Charges" },
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
  const [projects, setProjects] = useState([]);
  const [photos, setPhotos] = useState([]);

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

  // Handlers for Form 1
  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handlers for Form 2

  // Final submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const savedLoginData = localStorage.getItem("LoginData");
    const loginData = savedLoginData ? JSON.parse(savedLoginData) : null;
    const member_id = loginData?.id ?? null;

    const payload = {
      form,
      member_id,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/projects/deliverables`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      // alert("Submitted All Forms successfully!");
      toast("Submitted Deliverable Successfully!");
    } catch (error) {
      console.error(error);
      toast("Submission failed!");
    }
  };

  const addToast = (toastName: string) => {
    setToasts((prevToasts) => ({
      ...prevToasts,
      [toastName]: true,
    }));
  };
  // Second Form

  const fetchItems = async () => {
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/projects`)
      .then((res) => res.json())
      .then((data) => setProjects(data.data));
  };

  const fetchPhotoCrew = async () => {
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/crews/photo`)
      .then((res) => res.json())
      .then((data) => setPhotos(data.data));
  };

  // const notify = () => toast("I'm a toast message.");

  useEffect(() => {
    fetchItems();
    fetchPhotoCrew();
  }, []);

  return (
    <Fragment>
      {/* <!-- Page Header --> */}

      <Seo title="Create Deliverable" />

      <Pageheader
        title="Dashboards"
        subtitle="Projects"
        currentpage="Create Deliverable"
        activepage="Create Deliverable"
      />

      {/* <!-- Page Header Close --> */}

      {/* <!-- Start::row-1 --> */}

      <Row>
        <Col xl={12}>
          <Card className="custom-card">
            <Card.Header>
              <div className="card-title">CREATE DELIVERABLE</div>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit} className="mb-4">
                <div className="row gy-3">
                  <Col xl={4}>
                    <Form.Label htmlFor="input-label" className="">
                      Project :
                    </Form.Label>
                    <Form.Select
                      name="project"
                      value={form.project}
                      onChange={handleFormChange}
                      required
                    >
                      <option value="">Select Project</option>
                      {projects.map((opt) => (
                        <option key={opt.name} value={`${opt.id}-${opt.name}`}>
                          {opt.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col xl={4}>
                    <Form.Label className="">Title :</Form.Label>
                    <Form.Select
                      name="name"
                      value={form.name}
                      onChange={handleFormChange}
                      required
                    >
                      <option value="">Select Title</option>
                      {DeliverSelect.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </Form.Select>
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
                  <Col xl={4}>
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
                  <Col xl={4}>
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

                  <Col xl={6}>
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
                  <Col xl={6}>
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
                </div>
                <Col xl={12} className="mt-5">
                  <SpkButton
                    Buttonvariant=""
                    Customclass="btn btn-primary-light btn-wave ms-auto float-end"
                  >
                    Create Deliverable
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

export default CreateDeliverable;
