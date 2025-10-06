"use client";

import SpkButton from "@/shared/@spk-reusable-components/general-reusable/reusable-uielements/spk-buttons";
import SpkSelect from "@/shared/@spk-reusable-components/reusable-plugins/spk-reactselect";
import {
  Languagedata,
  timeZoneOptions,
} from "@/shared/data/pages/profilesettingdata";
import Pageheader from "@/shared/layouts-components/pageheader/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useState, useEffect } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

interface ProfileSettingsProps {}

const ProfileSettings: React.FC<ProfileSettingsProps> = () => {
  const [toggles, setToggles] = useState<{ [key: string]: string }>({});
  const RoleSelect = [
    { value: "admin", label: "Admin" },
    { value: "member", label: "Member" },
  ];
  const toggle = (toggleKey: string) => {
    setToggles((prevState) => ({
      ...prevState,
      [toggleKey]: prevState[toggleKey] === "on" ? "off" : "on",
    }));
  };

  // state
  const [profile, setProfile] = useState({
    id: "",
    name: "",
    role: "",
    mobile: "",
    email: "",
    address: "",
    password: "",
  });
  const [saving, setSaving] = useState(false);

  // load from localStorage, then refresh from DB using id
  useEffect(() => {
    try {
      const saved = localStorage.getItem("LoginData");
      if (saved) {
        const u = JSON.parse(saved);
        // Prefill immediately from localStorage
        setProfile((p) => ({
          ...p,
          id: u.id || "",
          name: u.name || "",
          role: u.role || "",
          mobile: u.mobile || "",
          email: u.email || "",
          password: u.password || "", // you requested plain
          address: u.address || "",
        }));

        // Then fetch the latest from DB using id
        if (u.id) {
          const url = `${
            process.env.NEXT_PUBLIC_URL ?? ""
          }/api/login?id=${encodeURIComponent(u.id)}`;
          fetch(url)
            .then((r) => r.json())
            .then((res) => {
              if (res?.success && res.user) {
                // overwrite with server truth
                setProfile((p) => ({
                  ...p,
                  id: res.user.id ?? "",
                  name: res.user.name ?? "",
                  role: res.user.role ?? "",
                  mobile: res.user.mobile ?? "",
                  email: res.user.email ?? "",
                  password: res.user.password ?? "", // plain per your flow
                  address: res.user.address ?? "",
                }));
                // keep localStorage in sync
                localStorage.setItem("LoginData", JSON.stringify(res.user));
              }
            })
            .catch(() => {
              /* ignore fetch error; we already have local copy */
            });
        }
      }
    } catch {}
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Use onSubmit on your <Form onSubmit={handleSave}>
  const handleSave = async (e) => {
    if (e?.preventDefault) e.preventDefault();

    setSaving(true);
    try {
      const payload = {
        id: profile.id,
        name: profile.name,
        role: profile.role || null,
        mobile: profile.mobile || null,
        email: profile.email,
        address: profile.address || null,
        ...(profile.password ? { password: profile.password } : {}),
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL ?? ""}/api/login`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const result = await res.json();

      if (!res.ok) {
        toast.error(result.error || "Failed to save profile");
        return;
      }

      // Update localStorage with fresh server values (you want password kept)
      localStorage.setItem("LoginData", JSON.stringify(result.user));

      // reflect in state
      setProfile((p) => ({
        ...p,
        id: result.user.id ?? "",
        name: result.user.name ?? "",
        role: result.user.role ?? "",
        mobile: result.user.mobile ?? "",
        email: result.user.email ?? "",
        password: result.user.password ?? "",
        address: result.user.address ?? "",
        confirmPassword: "", // if you keep a confirm field in the UI
      }));

      toast.success("Profile saved");
    } catch (e) {
      toast.error("Server error");
    } finally {
      setSaving(false);
    }
  };
  return (
    <Fragment>
      {/* <!-- Page Header --> */}

      <Seo title="Profile Settings" />

      <Pageheader
        title="Pages"
        currentpage="Profile Settings"
        activepage="Profile Settings"
      />

      {/* <!-- Page Header Close --> */}

      {/* <!-- Start::row-1 --> */}

      <Row>
        <Col xl={12}>
          <Card className="custom-card">
            <Card.Header>
              <div className="card-title">Account</div>
            </Card.Header>
            <Card.Body className="p-4">
              <Form onSubmit={handleSave}>
                <Row className="gy-3">
                  <Col xl={12}>
                    <div className="d-flex align-items-start flex-wrap gap-3">
                      <div>
                        <span className="avatar avatar-xxl">
                          <Image
                            width={80}
                            height={80}
                            src="https://nextjs.spruko.com/bootstrap/app-router/vyzor-ts/preview/assets/images/faces/team/3.png"
                            alt=""
                          />
                        </span>
                      </div>
                      <div>
                        <span className="fw-medium d-block mb-2">
                          Profile Picture
                        </span>
                        <div className="btn-list mb-1">
                          <SpkButton
                            Buttonvariant="primary"
                            Customclass="btn btn-sm btn-wave"
                          >
                            <i className="ri-upload-2-line me-1"></i>Change
                            Image
                          </SpkButton>
                          <SpkButton
                            Buttonvariant="light"
                            Customclass="btn btn-sm btn-wave"
                          >
                            <i className="ri-delete-bin-line me-1"></i>Remove
                          </SpkButton>
                        </div>
                        <span className="d-block fs-12 text-muted">
                          Use JPEG, PNG, or GIF. Best size: 200x200 pixels. Keep
                          it under 5MB
                        </span>
                      </div>
                    </div>
                  </Col>
                  <Col xl={6}>
                    <Form.Label htmlFor="profile-user-name" className="">
                      User Name :
                    </Form.Label>
                    <Form.Control
                      type="text"
                      className=""
                      name="name"
                      placeholder="Enter Name"
                      value={profile.name}
                      onChange={onChange}
                    />
                  </Col>
                  <Col xl={6}>
                    <Form.Label htmlFor="profile-email" className="">
                      Email :
                    </Form.Label>
                    <Form.Control
                      type="email"
                      className=""
                      name="email"
                      placeholder="Enter Email"
                      value={profile.email}
                      onChange={onChange}
                    />
                  </Col>
                  <Col xl={6}>
                    <Form.Label htmlFor="profile-phn-no" className="">
                      Phone No :
                    </Form.Label>
                    <Form.Control
                      type="text"
                      className=""
                      name="mobile"
                      placeholder="Enter Number"
                      value={profile.mobile}
                      onChange={onChange}
                    />
                  </Col>

                  <Col xl={6}>
                    <Form.Label htmlFor="profile-designation" className="">
                      Role :
                    </Form.Label>
                    <Form.Label className="">Status</Form.Label>
                    <Form.Select
                      name="role"
                      value={profile.role}
                      onChange={onChange}
                      required
                    >
                      <option value="">Select </option>
                      {RoleSelect.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col xl={12}>
                    <Form.Label htmlFor="profile-address" className="">
                      Address :
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      className=""
                      name="address"
                      rows={3}
                      value={profile.address}
                      onChange={onChange}
                    />
                  </Col>
                  <Col xl={12}>
                    <Card className="custom-card">
                      <Card.Header>
                        <div className="card-title">Change Password</div>
                      </Card.Header>
                      <Card.Body>
                        <Row className="gy-3">
                          <Col xl={12}>
                            <Form.Label htmlFor="Password" className="">
                              New Password
                            </Form.Label>
                            <Form.Control
                              type="text"
                              className=""
                              name="password"
                              placeholder="Enter Password"
                              value={profile.password}
                              onChange={onChange}
                            />
                          </Col>
                        </Row>
                      </Card.Body>
                      <Card.Footer>
                        <SpkButton
                          Buttonvariant="primary"
                          Customclass="btn float-end"
                        >
                          Save Changes
                        </SpkButton>
                      </Card.Footer>
                    </Card>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
          <ToastContainer />
        </Col>
      </Row>

      {/* <!--End::row-1 --> */}
    </Fragment>
  );
};

export default ProfileSettings;
