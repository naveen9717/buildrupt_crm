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
import { useRouter } from "next/navigation";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface DataTablesProps {}

const ProjectsTables: React.FC<DataTablesProps> = () => {
  const [items, setItems] = useState<any[]>([]);
  const [taskCounts, setTaskCounts] = useState<number>(0);
  const [shootCounts, setShootCounts] = useState<number>(0);
  const [deliverableCounts, setDeliverableCounts] = useState<number>(0);
  const [projectCounts, setProjectCounts] = useState<number>(0);

  // loading flags
  const [loadingCounts, setLoadingCounts] = useState(true);
  const [loadingItems, setLoadingItems] = useState(true);

  const router = useRouter();

  const capitalizeFirst = (str?: string) =>
    !str || !str.trim() ? "" : str.charAt(0).toUpperCase() + str.slice(1);

  function getStatusColor(status: string): string {
    switch (status) {
      case "groom":
        return "success";
      case "bride":
        return "orange";
      case "mother":
        return "info";
      default:
        return "secondary";
    }
  }

  // ----- fetchers with loading -----
  const fetchItems = async () => {
    try {
      setLoadingItems(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/projects`, {
        cache: "no-store",
      });
      const data = await res.json();
      setItems(data?.data ?? []);
    } finally {
      setLoadingItems(false);
    }
  };

  const fetchCounts = async () => {
    try {
      setLoadingCounts(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/projects/count`,
        { cache: "no-store" }
      );
      if (!res.ok) throw new Error("Count API failed");
      const data = await res.json();
      setTaskCounts(data?.taskCount ?? 0);
      setShootCounts(data?.shootCount ?? 0);
      setDeliverableCounts(data?.deliverableCount ?? 0);
      setProjectCounts(data?.projectCount ?? 0);
    } catch (err) {
      console.error(err);
      setTaskCounts(0);
      setShootCounts(0);
      setDeliverableCounts(0);
      setProjectCounts(0);
    } finally {
      setLoadingCounts(false);
    }
  };

  useEffect(() => {
    fetchItems();
    fetchCounts();
  }, []);

  // ----- KPI data (keep all fields so SpkListCard + SpkBadge can show) -----
  const taskData = [
    {
      title: "Total Shoots",
      count: shootCounts,
      percent: "3.25%",
      year: "This Year",
      price: "0",
      priceColor: "primary",
      iconColor: "success", // for badge bg/text
      icon: "ri-arrow-up-s-line me-1 align-middle",
      svgIcon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
          <rect width="256" height="256" fill="none" />
          <path d="M216,40H40A16,16,0,0,0,24,56V208a8,8,0,0,0,11.58,7.15L64,200.94l28.42,14.21a8,8,0,0,0,7.16,0L128,200.94l28.42,14.21a8,8,0,0,0,7.16,0L192,200.94l28.42,14.21A8,8,0,0,0,232,208V56A16,16,0,0,0,216,40ZM176,144H80a8,8,0,0,1,0-16h96a8,8,0,0,1,0,16Zm0-32H80a8,8,0,0,1,0-16h96a8,8,0,0,1,0,16Z" />
        </svg>
      ),
      cardClass: "dashboard-main-card primary",
      avatarClass: "avatar-lg",
    },
    {
      title: "Total Tasks",
      count: taskCounts,
      percent: "1.16%",
      year: "This Year",
      price: "0",
      priceColor: "secondary",
      iconColor: "danger",
      icon: "ri-arrow-down-s-line me-1 align-middle",
      svgIcon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
          <rect width="256" height="256" fill="none" />
          <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z" />
        </svg>
      ),
      cardClass: "dashboard-main-card secondary",
      avatarClass: "avatar-lg",
    },
    {
      title: "Total Deliverables",
      count: deliverableCounts,
      percent: "0.25%",
      year: "This Year",
      price: "0",
      priceColor: "success",
      iconColor: "success",
      icon: "ri-arrow-up-s-line me-1 align-middle",
      svgIcon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
          <rect width="256" height="256" fill="none" />
          <path d="M100,116.43a8,8,0,0,0,4-6.93v-72A8,8,0,0,0,93.34,30,104.06,104.06,0,0,0,25.73,147a8,8,0,0,0,4.52,5.81,7.86,7.86,0,0,0,3.35.74,8,8,0,0,0,4-1.07ZM88,49.62v55.26L40.12,132.51C40,131,40,129.48,40,128A88.12,88.12,0,0,1,88,49.62ZM232,128A104,104,0,0,1,38.32,180.7a8,8,0,0,1,2.87-11L120,123.83V32a8,8,0,0,1,8-8,104.05,104.05,0,0,1,89.74,51.48c.11.16.21.32.31.49s.2.37.29.55A103.34,103.34,0,0,1,232,128Z" />
        </svg>
      ),
      cardClass: "dashboard-main-card success",
      avatarClass: "avatar-lg",
    },
    {
      title: "Total Projects",
      count: projectCounts,
      percent: "0.46%",
      year: "This Year",
      price: "1,105",
      priceColor: "warning",
      iconColor: "success",
      icon: "ri-arrow-up-s-line me-1 align-middle",
      svgIcon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
          <rect width="256" height="256" fill="none" />
          <path d="M200,75.64V40a16,16,0,0,0-16-16H72A16,16,0,0,0,56,40V76a16.07,16.07,0,0,0,6.4,12.8L114.67,128,62.4,167.2A16.07,16.07,0,0,0,56,180v36a16,16,0,0,0,16,16H184a16,16,0,0,0,16-16V180.36a16.09,16.09,0,0,0-6.35-12.77L141.27,128l52.38-39.59A16.09,16.09,0,0,0,200,75.64ZM184,40V64H72V40Zm0,176H72V180l56-42,56,42.35Z" />
        </svg>
      ),
      cardClass: "dashboard-main-card warning",
      avatarClass: "avatar-lg",
    },
  ];

  const columns = [
    {
      name: "S.NO",
      selector: (row: any) => row.id,
      sortable: true,
      width: "90px",
    },
    {
      name: "NAME",
      selector: (row: any) => capitalizeFirst(row.name),
      sortable: true,
    },
    { name: "COST", selector: (row: any) => `₹ ${row.cost}`, sortable: true },
    {
      name: "RELATION",
      selector: (row: any) => (
        <span className={`fw-medium text-${getStatusColor(row.status)}`}>
          {row.relation}
        </span>
      ),
      sortable: true,
    },
    { name: "PHONE", selector: (row: any) => row.phone, sortable: true },
    { name: "EMAIL", selector: (row: any) => row.email, sortable: true },
    {
      name: "ACTIONS",
      cell: (row: any) => (
        <SpkTooltips placement="top" title="View">
          <SpkButton
            Buttonvariant=""
            onClickfunc={() => handleEdit(row.id)}
            Customclass="btn btn-success-light btn-icon btn-sm"
          >
            <i className="ri-eye-line"></i>
          </SpkButton>
        </SpkTooltips>
      ),
      ignoreRowClick: true,
      allowOverflow: true, // (RDT column prop) make sure you don't spread columns onto DOM
      button: true,
    },
  ];

  const handleEdit = (project_id: string) => {
    router.push(
      `${process.env.NEXT_PUBLIC_URL}/projects/project/${project_id}`
    );
  };

  // ----- skeleton helpers -----
  const KPIShimmer = () => (
    <div className="p-3 border rounded-2 shadow-sm d-flex align-items-center gap-3">
      <Skeleton circle width={40} height={40} />
      <div className="flex-fill">
        <Skeleton width={140} height={14} />
        <Skeleton width={80} height={22} />
      </div>
    </div>
  );

  const TableSkeleton = ({
    rows = 8,
    cols = 7,
  }: {
    rows?: number;
    cols?: number;
  }) => (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            {Array.from({ length: cols }).map((_, i) => (
              <th key={i}>
                <Skeleton height={14} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, r) => (
            <tr key={r}>
              {Array.from({ length: cols }).map((_, c) => (
                <td key={c}>
                  <Skeleton height={14} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <SkeletonTheme
      baseColor="#e9ecef"
      highlightColor="#f8f9fa"
      borderRadius={8}
      duration={1.1}
    >
      <Fragment>
        <Seo title="Projects Data" />
        <Pageheader
          title="Tables"
          currentpage="Projects Data"
          activepage="Projects Data"
        />

        {/* KPI cards */}
        <Row>
          <Col xl={12}>
            <Row>
              {loadingCounts
                ? Array.from({ length: 4 }).map((_, i) => (
                    <Col xl={3} lg={6} key={i}>
                      <KPIShimmer />
                    </Col>
                  ))
                : taskData.map((idx, index) => (
                    <Col xl={3} lg={6} key={index}>
                      {/* keep SpkListCard (not removed) and pass full list */}
                      <SpkListCard
                        titleClass="mb-2 fs-12"
                        listCard
                        cardClass={idx.cardClass}
                        list={idx}
                      />

                      {/* ensure SpkBadge + percent visibly show (non-destructive add) */}
                    </Col>
                  ))}
            </Row>
          </Col>
        </Row>

        {/* Projects table */}
        <Row className="mt-3">
          <Col xl={12}>
            <Card className="custom-card">
              <Card.Header className="justify-content-between">
                <div className="card-title">Total Projects</div>
                <div className="d-flex">
                  <Link
                    scroll={false}
                    href="/projects/create-project"
                    className="btn btn-sm btn-primary me-2"
                  >
                    <i className="ri-add-line me-1 fw-medium align-middle"></i>
                    New Projects
                  </Link>
                </div>
              </Card.Header>
              <Card.Body>
                {loadingItems ? (
                  <TableSkeleton rows={8} cols={7} />
                ) : (
                  <DataTable
                    columns={columns}
                    data={items}
                    pagination
                    striped
                    // If you prefer RDT's built-in loader:
                    // progressPending={loadingItems}
                    // progressComponent={<TableSkeleton rows={6} cols={7} />}
                  />
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Fragment>
    </SkeletonTheme>
  );
};

export default ProjectsTables;
