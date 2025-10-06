"use client";

import SpkButton from "@/shared/@spk-reusable-components/general-reusable/reusable-uielements/spk-buttons";
import SpkDropdown from "@/shared/@spk-reusable-components/general-reusable/reusable-uielements/spk-dropdown";
import SpkFriendscard from "@/shared/@spk-reusable-components/reusable-pages/spk-friendscard";
import SpkProfileCard from "@/shared/@spk-reusable-components/reusable-pages/spk-profilecard";
import {
  FriendsList,
  ProfileGallery,
  Profiles,
} from "@/shared/data/pages/profiledata";
import Pageheader from "@/shared/layouts-components/pageheader/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useState, useEffect } from "react";
import { Card, Col, Dropdown, Form, Nav, Row, Tab } from "react-bootstrap";
import { FilePond } from "react-filepond";
import { ToastContainer, toast } from "react-toastify";

interface NavsTabsProps {}

const TeamMembers: React.FC<NavsTabsProps> = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/login/team-member`)
      .then((res) => res.json())
      .then((data) => {
        setTeam(data);
        setLoading(false);
        console.log("teams", team);
      })
      .catch((err) => {
        console.error("Error fetching team:", err);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this member?")) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/login/team-member`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }), // ✅ send id in body
        }
      );

      if (res.ok) {
        setTeam((prev) => prev.filter((member) => member.id !== id));
        toast.success("Delete team-member");
      } else {
        const err = await res.json();
        console.error("Failed to delete:", err.error);
      }
    } catch (err) {
      console.error("Error deleting member:", err);
    }
  };

  return (
    <Fragment>
      {/* <!-- Page Header --> */}

      <Seo title="Team Members" />

      <Pageheader
        title="Pages"
        currentpage="Team Members"
        activepage="Team Members"
      />

      {/* <!-- Page Header Close --> */}

      {/* <!-- Start:: row-1 --> */}

      <Row className="justify-content-center">
        <Col xl={12}>
          <Row>
            {team.map((member) => (
              <Col xxl={3} xl={4} lg={6} key={member.id}>
                <Card className={`custom-card`}>
                  <Card.Body className="p-4 text-center">
                    <div className="lh-1 mb-2">
                      <span className="avatar avatar-xxl avatar-rounded">
                        <Image
                          width={80}
                          height={80}
                          src="https://nextjs.spruko.com/bootstrap/app-router/vyzor-ts/preview/assets/images/faces/team/3.png"
                          alt=""
                        />
                      </span>
                    </div>
                    <div className="mb-3">
                      <span className="d-block fw-semibold text-capitalize">
                        {member.name}
                      </span>
                      <span className="d-block text-muted fs-12">
                        {member.role}
                      </span>
                      <span className="text-muted fs-13">{member.email}</span>
                    </div>
                    <div className="btn-list">
                      <SpkButton
                        Buttonvariant=""
                        Customclass="btn-wave btn btn-light btn-icon rounded-circle border btn"
                      >
                        <i className="ri-edit-line"></i>
                      </SpkButton>
                      <SpkButton
                        Buttonvariant=""
                        Customclass="btn-wave btn btn-danger btn-icon rounded-circle border btn"
                        onClick={() => handleDelete(member.id)}
                      >
                        <i className="ri-delete-bin-4-line"></i>
                      </SpkButton>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <ToastContainer />
        </Col>
      </Row>

      {/* <!-- End:: row-1 --> */}
    </Fragment>
  );
};

export default TeamMembers;
