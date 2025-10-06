"use client"

import Link from 'next/link';
import React, { Fragment } from 'react'

interface FooterProps { }

const Footer: React.FC<FooterProps> = () => {

  return (
    <Fragment>

      {/* <!-- Footer Start --> */}

      <footer className="footer mt-auto py-3 text-center">
        <div className="container">
          <span className="text-muted"> Copyright © <span id="year"> 2025 </span> .
            Designed with <span className="bi bi-heart-fill text-danger"></span> by <Link scroll={false} target='_blank' href="https://pixelsarena.com/">
              <span className="fw-medium text-primary">Pixelsarena Technologies</span>
            </Link> All
            rights
            reserved
          </span>
        </div>
      </footer>

      {/* <!-- Footer End --> */}

    </Fragment>
  )
}

export default Footer;