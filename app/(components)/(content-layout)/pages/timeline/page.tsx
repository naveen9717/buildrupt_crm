"use client"

import SpkBadge from "@/shared/@spk-reusable-components/general-reusable/reusable-uielements/spk-badge";
import SpkTimelineCard from "@/shared/@spk-reusable-components/reusable-pages/spk-timelinecard";
import { Activities, ActivityLogs, ProjectTimeline, TimelineData } from "@/shared/data/pages/timelinedata";
import Pageheader from "@/shared/layouts-components/pageheader/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Image from "next/image";
import React, { Fragment } from "react";
import { Card, Col, Row } from "react-bootstrap";

interface TimelineProps { }

const Timeline: React.FC<TimelineProps> = () => {

    return (

        <Fragment>

            {/* <!-- Page Header --> */}

            <Seo title="Timeline" />

            <Pageheader title="Pages" currentpage="Timeline" activepage="Notification" />

            {/* <!-- Page Header Close --> */}

            {/* <!-- Start:: row-1 --> */}

          

            {/* <!-- End:: row-1 --> */}

            {/* <!-- Start:: row-2 --> */}

           

            {/* <!-- End:: row-2 --> */}

            {/* <!-- Start:: row-3 --> */}

            <Row className="">
         
                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Header>
                            <div className="card-title">
                                Notification Timeline
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <ul className="list-unstyled timeline-list-3">
                                {ProjectTimeline.map((event, index) => (
                                    <li key={index}>
                                        <div className="d-flex align-items-center gap-3 mb-1 flex-wrap">
                                            <div className="fw-semibold fs-15">{event.title}</div>
                                            <SpkBadge variant="" Customclass={`bg-${event.badgeColor}`}>{event.time}</SpkBadge>
                                        </div>
                                        <div className="fs-13 text-muted" dangerouslySetInnerHTML={{ __html: event.description }} />
                                    </li>
                                ))}
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* <!-- End:: row-3 --> */}

        </Fragment>
    )
};

export default Timeline;