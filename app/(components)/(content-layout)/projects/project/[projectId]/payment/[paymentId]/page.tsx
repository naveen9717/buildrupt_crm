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

const UpdatePayment: React.FC<CreateProjectProps> = () => {
  const { projectId, paymentId } = useParams();
  const StatusSelect = [
    { value: "upcoming", label: "Upcoming" },
    { value: "paid", label: "Paid" },
  ];

  const PaymentSelect = [
    { value: "cash", label: "Cash" },
    { value: "cash deposite", label: "Cash Deposite" },
    { value: "bank transfer", label: "Bank transfer" },
    { value: "upi", label: "UPI" },
    { value: "cheque", label: "Cheque" },
    { value: "others", label: "Others" },
  ];

  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    amount: "",
    status: "",
    due_date: "",
    paid_date: "",
    payment_mode: "",
    description: "",
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
    const savedLoginData = localStorage.getItem("LoginData");
    const loginData = savedLoginData ? JSON.parse(savedLoginData) : null;
    const member_id = loginData?.id ?? null;
    const payload = {
      form,
      member_id,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/projects/project/${projectId}/payment/${paymentId}`,
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

  const fetchPrefilledPayment = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/projects/project/${projectId}/payment/${paymentId}`
      );
      const data = await res.json();
      console.log("fetching data:", data);

      setForm(data.payment[0]);
    } catch (error) {
      console.error("Error fetching name:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotoCrew();
    fetchPrefilledPayment();
  }, []);

  return (
    <Fragment>
      {/* <!-- Page Header --> */}

      <Seo title="Update Payment" />

      <Pageheader
        title="Dashboards"
        subtitle="Projects"
        currentpage="Update Payment"
        activepage="Update Payment"
      />

      {/* <!-- Page Header Close --> */}

      {/* <!-- Start::row-1 --> */}

      <Row>
        <Col xl={12}>
          <Card className="custom-card">
            <Card.Header>
              <div className="card-title">UPDATE PAYMENT</div>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleUpdate} className="mb-4">
                <div className="row gy-3">
                  <Col xl={6}>
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
                  <Col xl={6}>
                    <Form.Label className="">Status</Form.Label>
                    <Form.Select
                      name="status"
                      value={form.status}
                      onChange={handleFormChange}
                      required
                    >
                      <option value="">Select </option>
                      {StatusSelect.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>

                  {form.status === "upcoming" && (
                    <>
                      <Col xl={6}>
                        <Form.Label className="">Due Date :</Form.Label>
                        <div className="form-group">
                          <div className="input-group">
                            <div className="input-group-text text-muted">
                              {" "}
                              <i className="ri-calendar-line"></i>{" "}
                            </div>
                            <Form.Control
                              type="date"
                              name="due_date"
                              value={form.due_date}
                              onChange={handleFormChange}
                              required
                            />
                          </div>
                        </div>
                      </Col>

                      <Col xl={6}>
                        <Form.Label htmlFor="input-label1" className="">
                          Description :
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="description"
                          placeholder="Enter Description"
                          value={form.description}
                          onChange={handleFormChange}
                          required
                        />
                      </Col>
                    </>
                  )}

                  {form.status === "paid" && (
                    <>
                      <Col xl={4}>
                        <Form.Label className="">Paid Date :</Form.Label>
                        <div className="form-group">
                          <div className="input-group">
                            <div className="input-group-text text-muted">
                              {" "}
                              <i className="ri-calendar-line"></i>{" "}
                            </div>
                            <Form.Control
                              type="date"
                              name="paid_date"
                              value={form.paid_date}
                              onChange={handleFormChange}
                              required
                            />
                          </div>
                        </div>
                      </Col>

                      <Col xl={4}>
                        <Form.Label htmlFor="input-label1" className="">
                          Description :
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="description"
                          placeholder="Enter Description"
                          value={form.description}
                          onChange={handleFormChange}
                          required
                        />
                      </Col>
                      <Col xl={4}>
                        <Form.Label className="">Payment Mode</Form.Label>
                        <Form.Select
                          name="payment_mode"
                          value={form.payment_mode}
                          onChange={handleFormChange}
                          required
                        >
                          <option value="">Select </option>
                          {PaymentSelect.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                    </>
                  )}

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
                    Save Payment
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

export default UpdatePayment;
