"use client";

import SpkButton from "@/shared/@spk-reusable-components/general-reusable/reusable-uielements/spk-buttons";
import SpkDatepickr from "@/shared/@spk-reusable-components/reusable-plugins/spk-datepicker";
import SpkSelect from "@/shared/@spk-reusable-components/reusable-plugins/spk-reactselect";
import SpkSunEditor from "@/shared/@spk-reusable-components/reusable-plugins/spk-suneditor";
import Pageheader from "@/shared/layouts-components/pageheader/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import React, { Fragment, useState, useEffect } from "react";
import { Card, Col, Form, Row, ToastContainer } from "react-bootstrap";
import { FilePond } from "react-filepond";
import CreatableSelect from "react-select/creatable";
import { useParams } from "next/navigation";
import SpkToast from "@/shared/@spk-reusable-components/general-reusable/reusable-uielements/spk-toast";

interface CreateProjectProps {}

const UpdatePhoto: React.FC<CreateProjectProps> = () => {
  const PrioritySelect = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

  const SlotSelect = [
    { value: "morning", label: "Morning" },
    { value: "evening", label: "Evening" },
    { value: "night", label: "Night" },
  ];

  const StatusSelect = [
    { value: "Completed", label: "Completed" },
    { value: "Inprogress", label: "Inprogress" },
    { value: "On Hold", label: "On Hold" },
  ];

  const AsignSelect = [
    { value: "Angelina May", label: "Angelina May" },
    { value: "Kiara advain", label: "Kiara advain" },
    { value: "Hercules Jhon", label: "Hercules Jhon" },
    { value: "Mayor Kim", label: "Mayor Kim" },
    { value: "Alexa Biss", label: "Alexa Biss" },
    { value: "Karley Dia", label: "Karley Dia" },
    { value: "Kim Jong", label: "Kim Jong" },
    { value: "Darren Sami", label: "Darren Sami" },
  ];
  const { photoId } = useParams();

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    half: "",
    full: "",
    halffull: "",
    status: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const [toasts, setToasts] = useState<{ [key: string]: boolean }>({});

  const handleToasts = (toastName: string) => {
    setToasts((prevToasts) => ({ ...prevToasts, [toastName]: false }));
  };
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      form,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/crews/photo/${photoId}`,
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

  const fetchPrefilled = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/crews/photo/${photoId}`
      );
      const data = await res.json();
      console.log("fetching data:", data);

      setForm(data.photos[0]);
    } catch (error) {
      console.error("Error fetching name:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrefilled();
  }, []);
  return (
    <Fragment>
      {/* <!-- Page Header --> */}

      <Seo title="Projects-Photo Crew" />

      <Pageheader
        title="Dashboards"
        subtitle="Crews"
        currentpage="Update Photo Crew"
        activepage="Update Photo Crew"
      />

      {/* <!-- Page Header Close --> */}

      {/* <!-- Start::row-1 --> */}

      <Row>
        <Col xl={12}>
          <Card className="custom-card">
            <Card.Header>
              <div className="card-title">Update Photo Crew</div>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleUpdate} className="mb-4">
                <div className="row gy-3">
                  <Col xl={6}>
                    <Form.Label htmlFor="input-label" className="">
                      Name :
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={form.name}
                      onChange={handleInputChange}
                      required
                    />
                  </Col>
                  <Col xl={6}>
                    <Form.Label htmlFor="input-label" className="">
                      Half Day Cost :
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="half"
                      placeholder="Half Day Cost"
                      value={form.half}
                      onChange={handleInputChange}
                      required
                    />
                  </Col>
                  <Col xl={6}>
                    <Form.Label htmlFor="input-label" className="">
                      Full Day Cost :
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="full"
                      placeholder="Full Day Cost"
                      value={form.full}
                      onChange={handleInputChange}
                      required
                    />
                  </Col>
                  <Col xl={6}>
                    <Form.Label htmlFor="input-label" className="">
                      Half + Full Day Cost :
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="halffull"
                      placeholder="Half + Full Day Cost "
                      value={form.halffull}
                      onChange={handleInputChange}
                      required
                    />
                  </Col>
                  <Col xl={6}>
                    <Form.Label className="">Status :</Form.Label>
                    <Form.Select
                      name="status"
                      value={form.status}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, status: e.target.value }))
                      }
                      required
                    >
                      <option value="">Select Status</option>
                      {PrioritySelect.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                </div>

                <Col xl={12} className="mt-5">
                  <SpkButton
                    Buttonvariant=""
                    Customclass="btn btn-primary-light btn-wave ms-auto float-end"
                  >
                    Update Photo Crew
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
                      message="Updated Photo Crews Successfully!"
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

export default UpdatePhoto;
