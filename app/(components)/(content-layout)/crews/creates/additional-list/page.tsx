"use client";

import StickyHeadTable, {
  CustomizedTables,
  DataTabless,
  Deletetable,
  ExportCSV,
} from "@/shared/data/tables/tablesdata";
import Pageheader from "@/shared/layouts-components/pageheader/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import SpkListCard from "@/shared/@spk-reusable-components/application-reusable/spk-listcard";
import Link from "next/link";
import DataTable from "react-data-table-component";
import SpkButton from "@/shared/@spk-reusable-components/general-reusable/reusable-uielements/spk-buttons";
import SpkTooltips from "@/shared/@spk-reusable-components/general-reusable/reusable-uielements/spk-tooltips";
import SpkBadge from "@/shared/@spk-reusable-components/general-reusable/reusable-uielements/spk-badge";

interface DataTablesProps {}

const AdditionalTables: React.FC<DataTablesProps> = () => {
  const [items, setItems] = useState([]);
  const [photoCounts, setPhotoCounts] = useState([]);
  const [videoCounts, setVideoCounts] = useState([]);
  const [additionalCounts, setAdditionalCounts] = useState([]);

  function getStatusColor(status: string): string {
    switch (status) {
      case "active":
        return "success";
      default:
        return "secondary";
    }
  }

  const fetchItems = async () => {
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/crews/additional`)
      .then((res) => res.json())
      .then((data) => setItems(data.data));
  };

  async function fetchCounts() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/crews/count`);
      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();
      console.log(data);
      setPhotoCounts(data.photoCount || 0);
      setVideoCounts(data.videoCount || 0);
      setAdditionalCounts(data.additionalCount || 0);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
    }
  }

  useEffect(() => {
    fetchItems();
    fetchCounts();
  }, []);

  const capitalizeFirst = (str) => {
    if (!str || typeof str !== "string" || str.trim() === "") return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const taskData = [
    {
      title: "Total Photo Crew",
      count: photoCounts,
      price: "0",
      priceColor: "primary",
      iconColor: "success fw-medium",
      icon: "ri-arrow-up-s-line me-1 align-middle",
      percent: "3.25%",
      svgIcon: (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
            <rect width="256" height="256" fill="none"></rect>
            <path d="M216,40H40A16,16,0,0,0,24,56V208a8,8,0,0,0,11.58,7.15L64,200.94l28.42,14.21a8,8,0,0,0,7.16,0L128,200.94l28.42,14.21a8,8,0,0,0,7.16,0L192,200.94l28.42,14.21A8,8,0,0,0,232,208V56A16,16,0,0,0,216,40ZM176,144H80a8,8,0,0,1,0-16h96a8,8,0,0,1,0,16Zm0-32H80a8,8,0,0,1,0-16h96a8,8,0,0,1,0,16Z"></path>
          </svg>
        </>
      ),
      cardClass: "dashboard-main-card primary",
      avatarClass: "avatar-lg",
    },
    {
      title: "Total Video Crew",
      count: videoCounts,
      price: "0",
      priceColor: "secondary",
      iconColor: "danger fw-medium",
      icon: "ri-arrow-down-s-line me-1 align-middle",
      percent: "1.16%",
      svgIcon: (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
            <rect width="256" height="256" fill="none"></rect>
            <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z"></path>
          </svg>
        </>
      ),
      cardClass: "dashboard-main-card secondary",
      avatarClass: "avatar-lg",
    },
    {
      title: "Total Additional Crew",
      count: additionalCounts,
      price: "0",
      priceColor: "success",
      iconColor: "success fw-medium",
      icon: "ri-arrow-up-s-line me-1 align-middle",
      percent: "0.25%",
      svgIcon: (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
            <rect width="256" height="256" fill="none"></rect>
            <path d="M100,116.43a8,8,0,0,0,4-6.93v-72A8,8,0,0,0,93.34,30,104.06,104.06,0,0,0,25.73,147a8,8,0,0,0,4.52,5.81,7.86,7.86,0,0,0,3.35.74,8,8,0,0,0,4-1.07ZM88,49.62v55.26L40.12,132.51C40,131,40,129.48,40,128A88.12,88.12,0,0,1,88,49.62ZM232,128A104,104,0,0,1,38.32,180.7a8,8,0,0,1,2.87-11L120,123.83V32a8,8,0,0,1,8-8,104.05,104.05,0,0,1,89.74,51.48c.11.16.21.32.31.49s.2.37.29.55A103.34,103.34,0,0,1,232,128Z"></path>
          </svg>
        </>
      ),
      cardClass: "dashboard-main-card success",
      avatarClass: "avatar-lg",
    },
  ];

  const columns = [
    { name: "S.NO", selector: (row) => row.id, sortable: true },
    {
      name: "NAME",
      selector: (row) => capitalizeFirst(row.name),
      sortable: true,
    },
    {
      name: "STATUS",
      selector: (row) => (
        <span className={`fw-medium text-${getStatusColor(row.status)}`}>
          {capitalizeFirst(row.status)}
        </span>
      ),
      sortable: true,
    },
    {
      name: "ACTIONS",
      cell: (row) => (
        <>
          <SpkTooltips placement="top" title="Edit">
            <SpkButton
              Buttonvariant=""
              onClickfunc={() => handleEdit(row)}
              Customclass="btn btn-primary-light btn-icon btn-sm"
            >
              <i className="ri-edit-line"></i>
            </SpkButton>
          </SpkTooltips>
          <SpkButton
            Buttonvariant=""
            onClickfunc={() => handleDelete(row.id)}
            Customclass="btn btn-danger-light btn-icon ms-1 btn-sm task-delete-btn"
          >
            <i className="ri-delete-bin-5-line"></i>
          </SpkButton>
        </>
      ),
    },
  ];

  const handleEdit = (item) => {
    console.log("Edit clicked:", item);
    // You can trigger a modal or setForm(item)
  };

  const handleDelete = async (id) => {
    await fetch(`${process.env.NEXT_PUBLIC_URL}/api/crews/additional`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/crews/additional`
    );
    const data = await res.json();
    setItems(data.data);
  };

  return (
    <Fragment>
      <Seo title="Additional Crew" />

      <Pageheader
        title="Tables"
        currentpage="Additional Crew"
        activepage="Additional Crew"
      />

      {/* <!-- Start::row-1 --> */}

      {/* <!--End::row-1 --> */}
      <Row>
        <Col xl={12}>
          <Row>
            {taskData.map((idx, index) => (
              <Col xl={4} lg={6} key={index}>
                <SpkListCard
                  titleClass="mb-2 fs-12"
                  listCard={true}
                  cardClass={idx.cardClass}
                  list={idx}
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* <!-- Start:: row-2 --> */}

      <Row>
        <Col xl={12}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">Total Additional Crew</div>
              <div className="d-flex">
                <Link
                  scroll={false}
                  href="/crews/creates/create-additional"
                  className="btn btn-sm btn-primary me-2"
                >
                  <i className="ri-add-line me-1 fw-medium align-middle"></i>New
                  Additional Crew
                </Link>
              </div>
            </Card.Header>
            <Card.Body>
              <DataTable columns={columns} data={items} pagination striped />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* <!-- End:: row-2 --> */}

      {/* <!-- Start:: row-3 --> */}

      {/* <!-- End:: row-5 --> */}
    </Fragment>
  );
};

export default AdditionalTables;
