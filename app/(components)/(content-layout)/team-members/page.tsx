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
// ✅ Skeletons (added only)
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface NavsTabsProps {}

const TeamMembers: React.FC<NavsTabsProps> = () => {
  const [team, setTeam] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/login/team-member`, {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((data) => {
        setTeam(data || []);
        setLoading(false);
        console.log("teams", data); // (kept, just logs the fetched data)
      })
      .catch((err) => {
        console.error("Error fetching team:", err);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: number) => {
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

  // ---------- Skeleton card (added only) ----------
  const MemberCardSkeleton = () => (
    <Card className="custom-card">
      <Card.Body className="p-4 text-center">
        <div className="lh-1 mb-2">
          <Skeleton circle width={80} height={80} />
        </div>
        <div className="mb-3">
          <div className="d-block fw-semibold text-capitalize">
            <Skeleton width={140} height={16} />
          </div>
          <div className="d-block text-muted fs-12">
            <Skeleton width={90} height={12} />
          </div>
          <div className="text-muted fs-13">
            <Skeleton width={160} height={12} />
          </div>
        </div>
        <div className="btn-list d-flex justify-content-center gap-2">
          <Skeleton width={40} height={40} circle />
          <Skeleton width={40} height={40} circle />
        </div>
      </Card.Body>
    </Card>
  );

  return (
    <SkeletonTheme
      baseColor="#e9ecef"
      highlightColor="#f8f9fa"
      duration={1.05}
      borderRadius={8}
    >
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
              {loading
                ? // ✅ Show skeleton grid while loading (added only)
                  Array.from({ length: 8 }).map((_, idx) => (
                    <Col xxl={3} xl={4} lg={6} key={idx} className="mb-4">
                      <MemberCardSkeleton />
                    </Col>
                  ))
                : // ✅ ORIGINAL CARD LIST — unchanged
                  team.map((member) => (
                    <Col xxl={3} xl={4} lg={6} key={member.id} className="mb-4">
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
                            <span className="text-muted fs-13">
                              {member.email}
                            </span>
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

            {/* Toasts (kept) */}
            <ToastContainer />
          </Col>
        </Row>
        {/* <!-- End:: row-1 --> */}
      </Fragment>
    </SkeletonTheme>
  );
};

export default TeamMembers;
