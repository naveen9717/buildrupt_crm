"use client"

import SpkButton from "@/shared/@spk-reusable-components/general-reusable/reusable-uielements/spk-buttons";
import SpkDatepickr from "@/shared/@spk-reusable-components/reusable-plugins/spk-datepicker";
import SpkSelect from "@/shared/@spk-reusable-components/reusable-plugins/spk-reactselect";
import SpkSunEditor from "@/shared/@spk-reusable-components/reusable-plugins/spk-suneditor";
import Pageheader from "@/shared/layouts-components/pageheader/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import React, { Fragment, useState, useEffect } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import { FilePond } from "react-filepond";
import CreatableSelect from 'react-select/creatable';

interface CreateProjectProps { }

const CreateAdditional: React.FC<CreateProjectProps> = () => {

const PrioritySelect = [
    { value: "active", label: 'Active' },
    { value: "inactive", label: 'Inactive' },
  ];

  const SlotSelect = [
    { value: "morning", label: 'Morning' },
    { value: "evening", label: 'Evening' },
    { value: "night", label: 'Night' },
  ];

  const StatusSelect = [
      { value: "Completed", label: 'Completed' },
      { value: "Inprogress", label: 'Inprogress' },
      { value: "On Hold", label: 'On Hold' },
    ];
  
  const AsignSelect = [
      { value: "Angelina May", label: 'Angelina May' },
      { value: "Kiara advain", label: 'Kiara advain' },
      { value: "Hercules Jhon", label: 'Hercules Jhon' },
      { value: "Mayor Kim", label: 'Mayor Kim' },
      { value: "Alexa Biss", label: 'Alexa Biss' },
      { value: "Karley Dia", label: 'Karley Dia' },
      { value: "Kim Jong", label: 'Kim Jong' },
      { value: "Darren Sami", label: 'Darren Sami' },
    ];

const [form, setForm] = useState({ 
   name: '',status:''
});

const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

const handleCategoryChange = (selectedOption) => {
    setForm((prev) => ({ ...prev, category: selectedOption }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${process.env.NEXT_PUBLIC_URL}/api/crews/additional`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setForm({ name: '',status:'' });
  };

 

    return (
        <Fragment>

            {/* <!-- Page Header --> */}

            <Seo title="Projects-Additional Crew" />

            <Pageheader title="Dashboards" subtitle="Crews" currentpage="Create Additional Crew" activepage="Create Additional Crew" />

            {/* <!-- Page Header Close --> */}

            {/* <!-- Start::row-1 --> */}

            <Row>
                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Header>
                            <div className="card-title">
                                Create Additional Crew
                            </div>
                        </Card.Header>
                        <Card.Body>
                         
                     
                     <Form onSubmit={handleSubmit} className="mb-4">
                           <div className="row gy-3">
                            <Col xl={6}>
                                <Form.Label htmlFor="input-label" className="">Name :</Form.Label>
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
                                   <SpkButton Buttonvariant="" Customclass="btn btn-primary-light btn-wave ms-auto float-end">Create Additional Crew</SpkButton>
                               </Col>
                                </Form> 
                        </Card.Body>
                        
                      
                    </Card>
                </Col>
            </Row>

            {/* <!--End::row-1 --> */}

        </Fragment>
    )
};

export default CreateAdditional;