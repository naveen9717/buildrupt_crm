"use client";

import StickyHeadTable, {
  CustomizedTables,
  DataTabless,
  Deletetable,
  ExportCSV,
} from "@/shared/data/tables/tablesdata";
import { useRouter, useParams } from "next/navigation";

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

const PhotoViewTables: React.FC<DataTablesProps> = () => {
  const [photo, setPhoto] = useState(null);
  const [items, setItems] = useState([]); // <- must be an array
  const [crews, setCrews] = useState([]);

  const [photoCounts, setPhotoCounts] = useState([]);
  const [additionalCounts, setAdditionalCounts] = useState([]);
  const router = useRouter();
  const { photoId } = useParams();
  const [loading, setLoading] = useState(true);

  function getStatusColor(status: string): string {
    switch (status) {
      case "active":
        return "success";
      default:
        return "secondary";
    }
  }

  const fetchItems = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/crews/photo/view/${photoId}`
      );
      const data = await res.json();

      // ✅ expenses (if you still need them somewhere else)
      setItems(Array.isArray(data?.expenses) ? data.expenses : []);

      // ✅ combined crews (photo + video already unified in API)
      setCrews(Array.isArray(data?.crews) ? data.crews : []);
      console.log("fetched data", data);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  async function fetchCounts() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/crews/count`);
      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();
      console.log(data);
      setPhotoCounts(data.photoCount || 0);
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
      count: photoCounts,
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

  const eventsdetails = [
    {
      name: "S.NO",
      cell: (row, index) => index + 1,
      sortable: false, // usually serial numbers aren’t sortable
      width: "70px", // optional: fix column width
    },
    {
      name: "TYPE",
      selector: (row) => capitalizeFirst(row?.crew_type),
      sortable: true,
    },
    {
      name: "EVENT DATE",
      selector: (row) => capitalizeFirst(row.date),
      sortable: true,
    },
    {
      name: "EVENT",
      selector: (row) => capitalizeFirst(row?.shoot_type),
      sortable: true,
    },
    {
      name: "COUPLE",
      selector: (row) => capitalizeFirst(row.project_name),
      sortable: true,
    },
    {
      name: "PRICE",
      selector: (row) => `₹ ${row.dayslot_price.toLocaleString("en-IN")}`,
      sortable: true,
    },
  ];
  const paymentdetails = [
    {
      name: "S.NO",
      cell: (row, index) => index + 1,
      sortable: false, // usually serial numbers aren’t sortable
      width: "70px",
    },
    {
      name: "DATE",
      selector: (row) => capitalizeFirst(row.expenses[0]?.date),
      sortable: true,
    },

    {
      name: "COUPLE",
      selector: (row) => capitalizeFirst(row.projects_name),
      sortable: true,
    },
    {
      name: "PAID",
      selector: (row) => "paid",
      sortable: true,
    },
    {
      name: "BALANCE",
      selector: (row) => {
        // Convert cost to number
        const projectCost = Number(row.projects_cost ?? 0);

        // Sum all expenses in this row (handle multiple or single)
        const totalExpenses = (row.expenses || []).reduce(
          (sum, exp) => sum + Number(exp.amount ?? 0),
          0
        );

        return `₹ ${totalExpenses.toLocaleString("en-IN")}`;
      },
      sortable: true,
    },
  ];

  // `/projects/${projectId}/shoots/${shootId}`
  const handleEdit = (photo_id: string) => {
    router.push(`${process.env.NEXT_PUBLIC_URL}/crews/photo/${photo_id}`);
    // You can trigger a modal or setForm(item)
  };

  const handleDelete = async (id) => {
    await fetch(`${process.env.NEXT_PUBLIC_URL}/api/crews/photo`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/crews/photo`);
    const data = await res.json();
    setItems(data.data);
  };

  return (
    <Fragment>
      <Seo title="Photo Crew Details" />

      <Pageheader
        title="Tables"
        currentpage="Photo Crew Details"
        activepage="Photo Crew Details"
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
        <Col xl={6}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">Events Details</div>
            </Card.Header>
            <Card.Body>
              <DataTable
                columns={eventsdetails}
                data={crews}
                pagination
                striped
              />
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6}>
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="card-title">Payments Details</div>
            </Card.Header>
            <Card.Body>
              <DataTable
                columns={paymentdetails}
                data={items}
                pagination
                striped
              />
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

export default PhotoViewTables;
