"use client";

import SpkBadge from "@/shared/@spk-reusable-components/general-reusable/reusable-uielements/spk-badge";
import SpkTimelineCard from "@/shared/@spk-reusable-components/reusable-pages/spk-timelinecard";
import {
  ProjectTimeline,
  TimelineData,
} from "@/shared/data/pages/timelinedata";
import Pageheader from "@/shared/layouts-components/pageheader/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Image from "next/image";
import React, { Fragment, useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";

interface TimelineProps {}

const Notification: React.FC<TimelineProps> = () => {
  const [items, setItems] = useState([]);
  function badgeColor(status: string): string {
    switch (status) {
      case "1":
        return "primary-transparent";
      case "3":
        return "secondary-transparent";
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
  const fetchItems = async () => {
    try {
      const savedLoginData = localStorage.getItem("LoginData");
      const loginData = savedLoginData ? JSON.parse(savedLoginData) : null;
      const memberId = loginData?.id;

      if (!memberId) {
        console.warn("No member ID found in LoginData");
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/notification/${memberId}`,
        {
          method: "GET",
          cache: "no-store", // prevents cached responses
        }
      );

      if (!res.ok) throw new Error("Failed to fetch notifications");

      const result = await res.json();
      setItems(result.data || []); // safely handle if no notifications
      console.log("notifications", result.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <Fragment>
      {/* <!-- Page Header --> */}

      <Seo title="Timeline" />

      <Pageheader
        title="Pages"
        currentpage="Timeline"
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
                {items?.map((event, index) => (
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
