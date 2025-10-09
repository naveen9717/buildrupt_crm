"use client";

import SpkBadge from "@/shared/@spk-reusable-components/general-reusable/reusable-uielements/spk-badge";
import Pageheader from "@/shared/layouts-components/pageheader/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Image from "next/image";
import React, { Fragment, useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
interface NotificationProps {}

const Notification: React.FC<NotificationProps> = () => {
  const [items, setItems] = useState(null); // null = still loading
  function badgeColor(status: string | number): string {
    const statusStr = String(status);
    switch (statusStr) {
      case "1":
        return "primary-transparent";
      case "2":
        return "pink-transparent";
      case "3":
        return "secondary-transparent";
      case "4":
        return "yellow-transparent";
      case "5":
        return "success-transparent";
      case "7":
        return "warning-transparent";
      case "9":
        return "info-transparent";
      case "10":
        return "teal-transparent";
      case "11":
        return "blue-transparent";
      case "12":
        return "black-transparent";
      default:
        return "orange-transparent";
    }
  }
  const fetchData = async () => {
    try {
      const savedLoginData = localStorage.getItem("LoginData");
      const loginData = savedLoginData ? JSON.parse(savedLoginData) : null;
      const memberId = loginData?.id;

      if (!memberId) return console.warn("No member ID found");

      // ✅ Pass memberId as a query param
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/notification?memberId=${memberId}`,
        { cache: "no-store" } // optional: avoids cached data
      );

      const result = await res.json();
      setItems(result.data || []);
    } catch (err) {
      console.error("Fetch failed:", err);
      setItems([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ While loading → show Skeletons
  if (items === null) {
    return (
      <ul className="list-unstyled">
        {Array.from({ length: 4 }).map((_, index) => (
          <li key={index} className="mb-3">
            <div className="d-flex align-items-center gap-3 mb-1 flex-wrap">
              <Skeleton width={150} height={18} /> {/* project name */}
              <Skeleton width={100} height={18} /> {/* badge */}
            </div>
            <Skeleton count={2} height={14} /> {/* notes lines */}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <Fragment>
      {/* <!-- Page Header --> */}

      <Seo title="Notification" />

      <Pageheader
        title="Timeline"
        currentpage="Notification"
        activepage="Notification"
      />

      {/* <!-- Page Header Close --> */}

      {/* <!-- Start:: row-1 --> */}

      <Row className="">
        <Col xl={12}>
          <Card className="custom-card">
            <Card.Header>
              <div className="card-title">Notification Timeline</div>
            </Card.Header>
            <Card.Body>
              <ul className="list-unstyled timeline-list-3">
                {items.map((event, index) => (
                  <li key={index}>
                    <div className="d-flex align-items-center gap-3 mb-1 flex-wrap">
                      <div className="fw-semibold fs-15">
                        {event.project_name}
                      </div>
                      <SpkBadge
                        variant=""
                        Customclass={`bg-${badgeColor(
                          new Date(event.date).getMonth() + 1
                        )}`}
                      >
                        {new Date(event.date)
                          .toLocaleString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })
                          .replace(",", " -")}
                      </SpkBadge>
                    </div>
                    <div
                      className="fs-13 text-muted"
                      dangerouslySetInnerHTML={{ __html: event.notes }}
                    />
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* <!-- End:: row-3 --> */}
    </Fragment>
  );
};

export default Notification;
