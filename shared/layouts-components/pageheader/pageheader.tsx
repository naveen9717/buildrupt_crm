"use client";

import Link from "next/link";
import React, { Fragment } from "react";
import { useRouter } from "next/navigation";

import SpkButton from "@/shared/@spk-reusable-components/general-reusable/reusable-uielements/spk-buttons";
import SpkTooltips from "@/shared/@spk-reusable-components/general-reusable/reusable-uielements/spk-tooltips";
const Pageheader = (props: any) => {
  const router = useRouter();
  return (
    <Fragment>
      <div className="mb-3 page-header-breadcrumb">
        <div className="d-flex align-center justify-content-between flex-wrap gap-2">
          <div className="d-flex">
            <div
              className="icons-list-item me-2"
              key={1}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              data-bs-title="bi bi-arrow-left-circle"
              onClick={() => router.back()} // ✅ go back
              style={{ cursor: "pointer" }} // ✅ show pointer
            >
              <SpkTooltips placement="top" title="Back">
                <i className={`bi bi-bi bi-arrow-left-circle fs-5`}></i>
              </SpkTooltips>
            </div>
            <h1 className="page-title fw-medium fs-16 mb-0 mt-1">
              {props.activepage}
            </h1>
          </div>
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <Link scroll={false} href="#!">
                {props.title}
              </Link>
            </li>
            {props.subtitle && (
              <li className="breadcrumb-item">
                <Link scroll={false} href="#!">
                  {props.subtitle}
                </Link>
              </li>
            )}
            <li className="breadcrumb-item active" aria-current="page">
              {props.currentpage}
            </li>
          </ol>
        </div>
      </div>
    </Fragment>
  );
};

export default Pageheader;
