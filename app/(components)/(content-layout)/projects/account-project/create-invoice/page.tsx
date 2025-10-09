"use client";
import { useParams } from "next/navigation";

import SpkButton from "@/shared/@spk-reusable-components/general-reusable/reusable-uielements/spk-buttons";
import Pageheader from "@/shared/layouts-components/pageheader/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import React, { Fragment, useState, useEffect, useRef } from "react";
import { Card, Col, Form, Row, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import SpkToastify from "@/shared/@spk-reusable-components/reusable-plugins/spk-toastify";
import html2pdf from "html2pdf.js/dist/html2pdf.min.js";
import SpkTables from "@/shared/@spk-reusable-components/reusable-tables/spk-tables";
import SpkBadge from "@/shared/@spk-reusable-components/general-reusable/reusable-uielements/spk-badge";

interface CreateProjectProps {}

const CreateInvoice: React.FC<CreateProjectProps> = () => {
  const { projectId } = useParams();
  const [shootitems, setShootItems] = useState([]);
  const [deliverableitems, setDeliverableItems] = useState([]);
  const [taskitems, setTaskItems] = useState([]);
  const [expenseitems, setExpenseItems] = useState([]);
  const [paymentpaid, setPaymentPaid] = useState([]);
  const [paymentupcoming, setPaymentUpcoming] = useState([]);

  const [loading, setLoading] = useState(true);

  const capitalizeFirst = (str) => {
    if (!str || typeof str !== "string" || str.trim() === "") return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const [photos, setPhotos] = useState([]);

  const [form, setForm] = useState({
    project_name: "",
    invoice_number: "",
    subject: "",
    invoice_date: "",
    billed_by: "",
    customer_notes: "",
    terms: "",
  });

  // Handlers for Form 1
  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

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
        `${process.env.NEXT_PUBLIC_URL}/api/projects/project/${projectId}/create-invoice`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      // alert("Submitted All Forms successfully!");
      toast("Created Invoice successfully!");
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
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/projects/project/${projectId}`
      );
      const data = await res.json();
      console.log("fetching data:", data);

      setForm((prev) => ({
        ...prev,
        project_name: data.projects[0].name,
      }));
    } catch (error) {
      console.error("Error fetching name:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPhotoCrew = async () => {
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/crews/photo`)
      .then((res) => res.json())
      .then((data) => setPhotos(data.data));
  };

  // const notify = () => toast("I'm a toast message.");

  useEffect(() => {
    fetchPhotoCrew();
    fetchItems();
  }, []);

  return (
    <Fragment>
      {/* <!-- Page Header --> */}

      <Seo title="Create Invoice" />

      <Pageheader
        title="Dashboards"
        subtitle="Projects"
        currentpage="CREATE INVOICES"
        activepage="CREATE INVOICES"
      />

      {/* <!-- Page Header Close --> */}

      {/* <!-- Start::row-1 --> */}

      <Row>
        <Col xl={12}>
          <Card className="custom-card">
            <Card.Header>
              <div className="card-title">CREATE INVOICES</div>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit} className="mb-4">
                <div className="row gy-3">
                  <Col xl={4}>
                    <Form.Label className="">Project Name :</Form.Label>
                    <div className="form-group">
                      <div className="input-group">
                        <div className="input-group-text text-muted"> </div>
                        <Form.Control
                          type="text"
                          name="project_name"
                          value={form.project_name}
                          onChange={handleFormChange}
                          required
                          disabled
                        />
                      </div>
                    </div>
                  </Col>
                  <Col xl={4}>
                    <Form.Label className="">Invoice Number :</Form.Label>
                    <div className="form-group">
                      <div className="input-group">
                        <div className="input-group-text text-muted"> </div>
                        <Form.Control
                          type="text"
                          name="invoice_number"
                          value={form.invoice_number}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                    </div>
                  </Col>
                  <Col xl={4}>
                    <Form.Label className="">Subject :</Form.Label>
                    <div className="form-group">
                      <div className="input-group">
                        <div className="input-group-text text-muted"> </div>
                        <Form.Control
                          type="text"
                          name="subject"
                          value={form.subject}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                    </div>
                  </Col>
                  <Col xl={6}>
                    <Form.Label className="">Invoice Date :</Form.Label>
                    <div className="form-group">
                      <div className="input-group">
                        <div className="input-group-text text-muted">
                          {" "}
                          <i className="ri-calendar-line"></i>{" "}
                        </div>
                        <Form.Control
                          type="date"
                          name="invoice_date"
                          value={form.invoice_date}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                    </div>
                  </Col>
                  <Col xl={6}>
                    <Form.Label className="">Billed By</Form.Label>
                    <Form.Select
                      name="billed_by"
                      value={form.billed_by}
                      onChange={handleFormChange}
                      required
                    >
                      <option value="">Select </option>
                      {photos.map((opt) => (
                        <option key={opt.id} value={opt.name}>
                          {opt.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>

                  <Col xl={12}>
                    <Form.Label htmlFor="product-description-add" className="">
                      Customer Notes
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      className=""
                      value={form.customer_notes}
                      id="product-description-add"
                      onChange={handleFormChange}
                      rows={2}
                      name="customer_notes"
                    />
                    <Form.Label
                      htmlFor="product-description-add"
                      className=" mt-1 fs-12 fw-normal text-muted mb-0"
                    >
                      *Notes should not exceed 500 letters
                    </Form.Label>
                  </Col>
                  <Col xl={12}>
                    <Form.Label htmlFor="product-description-add" className="">
                      Terms & Conditions
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      className=""
                      value={form.terms}
                      id="product-description-add"
                      onChange={handleFormChange}
                      rows={2}
                      name="terms"
                    />
                    <Form.Label
                      htmlFor="product-description-add"
                      className=" mt-1 fs-12 fw-normal text-muted mb-0"
                    >
                      *Terms & Conditions should not exceed 500 letters
                    </Form.Label>
                  </Col>
                </div>

                <Col xl={12} className="mt-5">
                  <SpkButton
                    Buttonvariant=""
                    Customclass="btn btn-primary-light btn-wave ms-auto float-end"
                  >
                    Create Invoice
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

export default CreateInvoice;
