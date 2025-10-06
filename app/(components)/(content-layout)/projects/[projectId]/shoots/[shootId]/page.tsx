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

const EditShoot: React.FC<CreateProjectProps> = () => {
  const RelationSelect = [
    { value: "bride", label: "Bride" },
    { value: "groom", label: "Groom" },
    { value: "father", label: "Father" },
    { value: "mother", label: "Mother" },
    { value: "other", label: "Other" },
  ];

  const DaySlot = [
    { value: "half", label: "Half Day" },
    { value: "full", label: "Full Day" },
    { value: "halffull", label: "Half + Full Day" },
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
  const { projectId, shootId } = useParams();
  const [deliverables, setDeliverables] = useState([]);
  const [shootsdata, setShootsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [photos, setPhotos] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const router = useRouter();

  const PrioritySelect = [
    { value: "wedding", label: "Wedding" },
    { value: "engagement", label: "Engagement" },
    { value: "reception", label: "Reception" },
  ];
  const TimeSelect = [
    { value: "9:00 AM", label: "9:00 AM" },
    { value: "10:00 AM", label: "10:00 AM" },
    { value: "11:00 AM", label: "11:00 AM" },
  ];
  const SlotSelect = [
    { value: "morning", label: "Morning" },
    { value: "evening", label: "Evening" },
    { value: "night", label: "Night" },
  ];

  const StatusSelect = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "InActive" },
  ];

  const AsignSelect = [
    { value: "candid", label: "Candid" },
    { value: "traditional", label: "Traditional" },
  ];
  const AsignAdditional = [
    { value: "drone", label: "Drone" },
    { value: "light", label: "Light" },
  ];
  const [form1, setForm1] = useState({
    name: "",
    type: "",
    duration: "",
    venue: "",
    city: "",
    reporting: "",
    slot: "",
    date: "",
    status: "",
    notes: "",
  });

  const [form2Rows, setForm2Rows] = useState([
    { photo_id: "", photo_role: "", dayslot: "" },
  ]);

  const [form3Rows, setForm3Rows] = useState([
    { photo_id: "", video_role: "", dayslot: "" },
  ]);

  const [form4Rows, setForm4Rows] = useState([
    { additional_crew: "", additional_role: "" },
  ]);

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

  // Handlers for Form 4
  const handleForm4Change = (index: number, field: string, value: string) => {
    const updated = [...form4Rows];
    updated[index][field as keyof (typeof updated)[0]] = value;
    setForm4Rows(updated);
  };

  const addForm4Row = () =>
    setForm4Rows([...form4Rows, { task: "", priority: "low" }]);
  const removeForm4Row = (index: number) => {
    const updated = [...form4Rows];
    updated.splice(index, 1);
    setForm4Rows(updated);
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
      form1,
      form2: form2Rows,
      form3: form3Rows,
      form4: form4Rows,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/projects/${projectId}/shoots/${shootId}`,
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

  const handleToasts = (toastName: string) => {
    setToasts((prevToasts) => ({ ...prevToasts, [toastName]: false }));
  };

  // Second Form

  const fetchPhotoCrew = async () => {
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/crews/photo`)
      .then((res) => res.json())
      .then((data) => setPhotos(data.data));
  };

  const fetchExpenses = async () => {
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/projects/shoots/expenses`)
      .then((res) => res.json())
      .then((data) => setExpenses(data.data));
  };

  const fetchPrefilledShoot = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/projects/${projectId}/shoots/${shootId}`
      );
      const data = await res.json();
      console.log("fetching data:", data);

      setForm1(data.shoot[0]);
      setForm2Rows(data.photo_crew[0]);
      setForm3Rows(data.video_crew[0]);
      setForm4Rows(data.additional_crew[0]);
    } catch (error) {
      console.error("Error fetching name:", error);
    } finally {
      setLoading(false);
    }
  };

  // const formattedDate = form1.date
  //   ? new Date(form1.date).toISOString().split("T")[0]
  //   : "";
  useEffect(() => {
    fetchPhotoCrew();
    fetchExpenses();
    fetchPrefilledShoot();
  }, []);

  return (
    <Fragment>
      {/* <!-- Page Header --> */}

      <Seo title="Update Shoots" />

      <Pageheader
        title="Dashboards"
        subtitle="Projects"
        currentpage="Update Shoots"
        activepage="Update Shoots"
      />

      {/* <!-- Page Header Close --> */}

      {/* <!-- Start::row-1 --> */}

      <Row>
        <Col xl={12}>
          <Card className="custom-card">
            <Card.Header>
              <div className="card-title">UPDATE SHOOT</div>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleUpdate} className="mb-4">
                <div className="row gy-3">
                  <Col xl={4}>
                    <Form.Label className="">Shoot :</Form.Label>
                    <Form.Control
                      type="text"
                      name="type"
                      value={form1.type}
                      onChange={handleForm1Change}
                      required
                    />
                  </Col>
                  <Col xl={4}>
                    <Form.Label className="">Date :</Form.Label>
                    <div className="form-group">
                      <div className="input-group">
                        <div className="input-group-text text-muted">
                          {" "}
                          <i className="ri-calendar-line"></i>{" "}
                        </div>
                        <Form.Control
                          type="date"
                          name="date"
                          value={form1.date}
                          onChange={handleForm1Change}
                          required
                        />
                      </div>
                    </div>
                  </Col>
                  <Col xl={4}>
                    <Form.Label htmlFor="input-label1" className="">
                      Reporting Time :
                    </Form.Label>
                    <Form.Select
                      name="reporting"
                      value={form1.reporting}
                      onChange={handleForm1Change}
                      required
                    >
                      <option value="">Select Time</option>
                      {TimeSelect.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col xl={4}>
                    <Form.Label className="">Select Slot</Form.Label>
                    <Form.Select
                      name="slot"
                      value={form1.slot}
                      onChange={handleForm1Change}
                      required
                    >
                      <option value="">Select Slot</option>
                      {SlotSelect.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col xl={4}>
                    <Form.Label htmlFor="input-label11" className="">
                      Duration :
                    </Form.Label>
                    <div className="form-group">
                      <div className="input-group">
                        <div className="input-group-text text-muted">
                          {" "}
                          <i className="ri-hourglass-fill"></i>{" "}
                        </div>
                        <Form.Control
                          type="text"
                          name="duration"
                          placeholder="Enter Duration"
                          value={form1.duration}
                          onChange={handleForm1Change}
                          required
                        />
                      </div>
                    </div>
                  </Col>
                  <Col xl={4}>
                    <Form.Label htmlFor="input-label1" className="">
                      City :
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="city"
                      placeholder="Enter City"
                      value={form1.city}
                      onChange={handleForm1Change}
                      required
                    />
                  </Col>
                  <Col xl={6}>
                    <Form.Label htmlFor="input-label1" className="">
                      Venue :
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="venue"
                      placeholder="Enter Venue"
                      value={form1.venue}
                      onChange={handleForm1Change}
                      required
                    />
                  </Col>

                  <Col xl={6}>
                    <Form.Label className="">Status :</Form.Label>
                    <Form.Select
                      name="status"
                      value={form1.status}
                      onChange={handleForm1Change}
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

                  <Col xl={12}>
                    <Form.Label htmlFor="product-description-add" className="">
                      Notes
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      className=""
                      value={form1.notes}
                      id="product-description-add"
                      onChange={handleForm1Change}
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
                    <div className="card-title">CREW DETAILS</div>
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
                            id="order-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#order-tab-pane"
                            type="button"
                            role="tab"
                            aria-controls="home-tab-pane"
                            aria-selected="true"
                          >
                            <i className="ri-user-community-line"></i>
                            CREWS ASSIGNED
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>
                      <Tab.Content className="" id="myTabContent">
                        <Tab.Pane
                          eventKey="ordertab1"
                          className=" fade text-muted"
                          id="order-tab-pane"
                          role="tabpanel"
                          aria-labelledby="home-tab"
                          tabIndex={0}
                        >
                          <div className="row gy-3 mt-1">
                            <div className="card-title">PHOTO CREW</div>
                            <p className="mt-0 mb-0">
                              Add your Photographer crew here and assign them
                              roles.
                            </p>

                            <Table bordered hover>
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>Photographer</th>
                                  <th>Role</th>
                                  <th>Day Slot</th>
                                  <th className="text-center">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {form2Rows.map((row, idx) => (
                                  <tr key={idx}>
                                    <td>{row.id}</td>
                                    <td>
                                      <Form.Select
                                        name="photo_id"
                                        value={row.photo_id}
                                        onChange={(e) =>
                                          handleForm2Change(
                                            idx,
                                            "photo_id",
                                            e.target.value
                                          )
                                        }
                                        required
                                      >
                                        <option value="">Select</option>
                                        {photos.map((opt) => (
                                          <option key={opt.id} value={opt.id}>
                                            {opt.name}
                                          </option>
                                        ))}
                                      </Form.Select>
                                    </td>

                                    <td>
                                      <Form.Select
                                        name="photo_role"
                                        value={row.photo_role}
                                        onChange={(e) =>
                                          handleForm2Change(
                                            idx,
                                            "photo_role",
                                            e.target.value
                                          )
                                        }
                                        required
                                      >
                                        <option value="">Select Role</option>
                                        {AsignSelect.map((opt) => (
                                          <option
                                            key={opt.value}
                                            value={opt.value}
                                          >
                                            {opt.label}
                                          </option>
                                        ))}
                                      </Form.Select>
                                    </td>
                                    <td>
                                      <Form.Select
                                        name="dayslot"
                                        value={row.dayslot}
                                        onChange={(e) =>
                                          handleForm2Change(
                                            idx,
                                            "dayslot",
                                            e.target.value
                                          )
                                        }
                                        required
                                      >
                                        <option value="">
                                          Select Day Slot
                                        </option>
                                        {DaySlot.map((opt) => (
                                          <option
                                            key={opt.value}
                                            value={opt.value}
                                          >
                                            {opt.label}
                                          </option>
                                        ))}
                                      </Form.Select>
                                    </td>
                                    <td className="text-center">
                                      <Row>
                                        <SpkButton
                                          Buttonvariant=""
                                          onClickfunc={() =>
                                            removeForm2Row(idx)
                                          }
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
                            <div className="card-title">VIDEO CREW</div>
                            <p className="mt-0 mb-0">
                              Add your video crew here and assign them roles.
                            </p>

                            <Table bordered hover>
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>Videographer</th>
                                  <th>Role</th>
                                  <th>Day Slot</th>
                                  <th className="text-center">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {form3Rows.map((row, idx) => (
                                  <tr key={idx}>
                                    <td>{row.id}</td>
                                    <td>
                                      <Form.Select
                                        name="photo_id"
                                        value={row.photo_id}
                                        onChange={(e) =>
                                          handleForm3Change(
                                            idx,
                                            "photo_id",
                                            e.target.value
                                          )
                                        }
                                        required
                                      >
                                        <option value="">Select</option>
                                        {photos.map((opt) => (
                                          <option key={opt.id} value={opt.id}>
                                            {opt.name}
                                          </option>
                                        ))}
                                      </Form.Select>
                                    </td>

                                    <td>
                                      <Form.Select
                                        name="video_role"
                                        value={row.video_role}
                                        onChange={(e) =>
                                          handleForm3Change(
                                            idx,
                                            "video_role",
                                            e.target.value
                                          )
                                        }
                                        required
                                      >
                                        <option value="">Select Role</option>
                                        {AsignSelect.map((opt) => (
                                          <option
                                            key={opt.value}
                                            value={opt.value}
                                          >
                                            {opt.label}
                                          </option>
                                        ))}
                                      </Form.Select>
                                    </td>
                                    <td>
                                      <Form.Select
                                        name="dayslot"
                                        value={row.dayslot}
                                        onChange={(e) =>
                                          handleForm3Change(
                                            idx,
                                            "dayslot",
                                            e.target.value
                                          )
                                        }
                                        required
                                      >
                                        <option value="">
                                          Select Day Slot
                                        </option>
                                        {DaySlot.map((opt) => (
                                          <option
                                            key={opt.value}
                                            value={opt.value}
                                          >
                                            {opt.label}
                                          </option>
                                        ))}
                                      </Form.Select>
                                    </td>
                                    <td className="text-center">
                                      <Row>
                                        <SpkButton
                                          Buttonvariant=""
                                          onClickfunc={() =>
                                            removeForm3Row(idx)
                                          }
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
                          <div className="row gy-3 mt-1">
                            <div className="card-title">ADDITIONAL CREW</div>
                            <p className="mt-0 mb-0">
                              Add your support crew here and assign them roles.
                            </p>

                            <Table bordered hover>
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>ADDITIONAL</th>
                                  <th>Role</th>
                                  <th className="text-center">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {form4Rows.map((row, idx) => (
                                  <tr key={idx}>
                                    <td>{row.id}</td>
                                    <td>
                                      <Form.Select
                                        name="additional_crew"
                                        value={row.additional_crew}
                                        onChange={(e) =>
                                          handleForm4Change(
                                            idx,
                                            "additional_crew",
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
                                      <Form.Select
                                        name="additional_role"
                                        value={row.additional_role}
                                        onChange={(e) =>
                                          handleForm4Change(
                                            idx,
                                            "additional_role",
                                            e.target.value
                                          )
                                        }
                                        required
                                      >
                                        <option value="">Select Role</option>
                                        {AsignAdditional.map((opt) => (
                                          <option
                                            key={opt.value}
                                            value={opt.value}
                                          >
                                            {opt.label}
                                          </option>
                                        ))}
                                      </Form.Select>
                                    </td>
                                    <td className="text-center">
                                      <Row>
                                        <SpkButton
                                          Buttonvariant=""
                                          onClickfunc={() =>
                                            removeForm4Row(idx)
                                          }
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
                              onClickfunc={addForm4Row}
                              Customclass="btn btn-success-light btn-icon ms-1 btn-sm task-plus-btn"
                            >
                              <i className="ri-add-line"></i>
                            </SpkButton>
                            {/* Show Add Row button only in the last row */}
                          </div>
                        </Tab.Pane>
                      </Tab.Content>
                    </Card.Body>
                  </Tab.Container>
                </div>

                <Col xl={12} className="mt-5">
                  <SpkButton
                    Buttonvariant=""
                    Customclass="btn btn-primary-light btn-wave ms-auto float-end"
                  >
                    Save Shoot
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

export default EditShoot;
