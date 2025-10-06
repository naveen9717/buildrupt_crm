"use client";
import { useParams } from "next/navigation";

import SpkButton from "@/shared/@spk-reusable-components/general-reusable/reusable-uielements/spk-buttons";
import Pageheader from "@/shared/layouts-components/pageheader/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import React, { Fragment, useState, useEffect } from "react";
import { Card, Col, Form, Row, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import SpkToastify from "@/shared/@spk-reusable-components/reusable-plugins/spk-toastify";

interface CreateProjectProps {}

const UpdateExpense: React.FC<CreateProjectProps> = () => {
  const { projectId, expenseId } = useParams();
  const EventSelect = [{ value: "wedding", label: "Wedding" }];
  const BilledSelect = [{ value: "us", label: "US" }];
  const [projects, setProjects] = useState([]);

  const CateorySelect = [
    { value: "food", label: "Food" },
    { value: "travel", label: "Travel" },
    { value: "equipments", label: "Equipments" },
    { value: "others", label: "Others" },
  ];

  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    event: "",
    billed: "",
    category: "",
    amount: "",
    date: "",
    photo_id: "",
    descriptions: "",
    notes: "",
  });

  // Handlers for Form 1
  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Final submit handler
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      form,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/projects/account-project/expense/${expenseId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      // alert("Submitted All Forms successfully!");
      toast("Updated Expense successfully!");
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

  const fetchPhotoCrew = async () => {
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/crews/photo`)
      .then((res) => res.json())
      .then((data) => setPhotos(data.data));
  };

  const fetchPrefilledExpense = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/projects/project/${projectId}/expense/${expenseId}`
      );
      const data = await res.json();
      console.log("fetching data:", data);

      setForm(data.expense[0]);
    } catch (error) {
      console.error("Error fetching name:", error);
    } finally {
      setLoading(false);
    }
  };
  // Second Form
  const fetchItems = async () => {
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/projects`)
      .then((res) => res.json())
      .then((data) => setProjects(data.data));
  };

  useEffect(() => {
    fetchPhotoCrew();
    fetchPrefilledExpense();
    fetchItems();
  }, []);

  return (
    <Fragment>
      {/* <!-- Page Header --> */}

      <Seo title="Update Expense" />

      <Pageheader
        title="Dashboards"
        subtitle="Projects"
        currentpage="Update Expenses"
        activepage="Update Expenses"
      />

      {/* <!-- Page Header Close --> */}

      {/* <!-- Start::row-1 --> */}

      <Row>
        <Col xl={12}>
          <Card className="custom-card">
            <Card.Header>
              <div className="card-title">UPDATE EXPENSE</div>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleUpdate} className="mb-4">
                <div className="row gy-3">
                  <Col xl={4}>
                    <Form.Label htmlFor="input-label" className="">
                      Project :
                    </Form.Label>
                    <Form.Select
                      name="project_id"
                      value={form.project_id}
                      aria-readonly
                    >
                      <option value="">Select Project</option>
                      {projects.map((opt) => (
                        <option key={opt.name} value={`${opt.id}`}>
                          {opt.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col xl={4}>
                    <Form.Label htmlFor="input-label" className="">
                      Event :
                    </Form.Label>
                    <Form.Select
                      name="event"
                      value={form.event}
                      onChange={handleFormChange}
                      required
                    >
                      <option value="">Select Event</option>
                      {EventSelect.map((opt) => (
                        <option key={opt.value} value={`${opt.value}`}>
                          {opt.label}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col xl={4}>
                    <Form.Label className="">Billed To :</Form.Label>
                    <Form.Select
                      name="billed"
                      value={form.billed}
                      onChange={handleFormChange}
                      required
                    >
                      <option value="">Select Billed To</option>
                      {BilledSelect.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col xl={4}>
                    <Form.Label htmlFor="input-label1" className="">
                      Category :
                    </Form.Label>
                    <Form.Select
                      name="category"
                      value={form.category}
                      onChange={handleFormChange}
                      required
                    >
                      <option value="">Select Category</option>
                      {CateorySelect.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col xl={4}>
                    <Form.Label htmlFor="input-label11" className="">
                      Amount :
                    </Form.Label>
                    <div className="form-group">
                      <div className="input-group">
                        <div className="input-group-text text-muted">
                          {" "}
                          <i className="ri-money-rupee-circle-line"></i>
                        </div>
                        <Form.Control
                          type="number"
                          name="amount"
                          placeholder="Enter Amount"
                          value={form.amount}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                    </div>
                  </Col>
                  <Col xl={4}>
                    <Form.Label className="">Billed Date :</Form.Label>
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
                    <Form.Label className="">Spent By</Form.Label>
                    <Form.Select
                      name="photo_id"
                      value={form.photo_id}
                      onChange={handleFormChange}
                      required
                      aria-readonly
                    >
                      <option value="">Select </option>
                      {photos.map((opt) => (
                        <option key={opt.id} value={opt.id}>
                          {opt.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>

                  <Col xl={6}>
                    <Form.Label htmlFor="input-label1" className="">
                      Description :
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="descriptions"
                      placeholder="Enter Description"
                      value={form.descriptions}
                      onChange={handleFormChange}
                      required
                    />
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
                    Save Expense
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

export default UpdateExpense;
