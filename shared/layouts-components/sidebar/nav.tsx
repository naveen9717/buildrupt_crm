import SpkBadge from "@/shared/@spk-reusable-components/general-reusable/reusable-uielements/spk-badge";
import * as Svgicons from "./menusvg-icons";

const badgePrimary = (
  <SpkBadge variant="" Customclass="bg-primary-transparent ms-2">
    9
  </SpkBadge>
);
const badgeSucccess = (
  <SpkBadge variant="" Customclass="bg-success-transparent ms-2">
    6
  </SpkBadge>
);
const badgeWarning = (
  <SpkBadge variant="" Customclass="bg-warning-transparent ms-2">
    5
  </SpkBadge>
);
const badgeInfo = (
  <SpkBadge variant="" Customclass="bg-info-transparent ms-2">
    4
  </SpkBadge>
);
const badgedanger = (
  <SpkBadge variant="" Customclass="bg-danger-transparent ms-2">
    6
  </SpkBadge>
);
const badgeSuccess = (
  <SpkBadge variant="" Customclass="bg-success-transparent ms-2">
    8
  </SpkBadge>
);

export const MENUITEMS: any = [
  {
    menutitle: "MAIN",
  },
  {
    title: "Dashboards",
    icon: Svgicons.Dashboardicon,
    type: "sub",
    active: false,
    dirchange: false,
    children: [
      {
        path: "/dashboards/sales",
        icon: Svgicons.Salesicon,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
        title: "Sales",
      },
      {
        path: "#",
        icon: Svgicons.Emailicon,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
        title: "Coming Soon",
      },
      {
        path: "#",
        icon: Svgicons.Courseicon,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
        title: "Coming Soon",
      },
      {
        path: "#",
        type: "link",
        icon: Svgicons.Medicalicon,
        active: false,
        selected: false,
        dirchange: false,
        title: "Coming Soon",
      },
      {
        path: "#",
        type: "link",
        icon: Svgicons.Leafleticon,
        active: false,
        selected: false,
        dirchange: false,
        title: "Coming Soon",
      },
      {
        path: "#",
        type: "link",
        icon: Svgicons.Apexicon,
        active: false,
        selected: false,
        dirchange: false,
        title: "Coming Soon",
      },
      {
        path: "#",
        type: "link",
        icon: Svgicons.Datatablesicon,
        active: false,
        selected: false,
        dirchange: false,
        title: "Coming Soon",
      },
    ],
  },

  {
    menutitle: "WEB APPS",
  },

  {
    title: "Crew",
    icon: Svgicons.Profileicon,
    type: "sub",
    background: "hor-rightangle",
    active: false,
    selected: false,
    dirchange: false,
    children: [
      {
        title: "Vendors",
        type: "sub",
        icon: Svgicons.Taskicon,
        active: false,
        selected: false,
        dirchange: false,
        doublToggle: false,
        children: [
          {
            path: "/crews/creates/photo-list",
            type: "link",
            active: false,
            selected: false,
            dirchange: false,
            title: "Lists",
          },

          {
            path: "/crews/creates/create-photo",
            type: "link",
            active: false,
            selected: false,
            dirchange: false,
            title: "Create",
          },
        ],
      },

      {
        title: "Additional",
        type: "sub",
        icon: Svgicons.Taskicon,
        active: false,
        selected: false,
        dirchange: false,
        doublToggle: false,
        children: [
          {
            path: "/crews/creates/additional-list",
            type: "link",
            active: false,
            selected: false,
            dirchange: false,
            title: "Lists",
          },

          {
            path: "/crews/creates/create-additional",
            type: "link",
            active: false,
            selected: false,
            dirchange: false,
            title: "Create",
          },
        ],
      },
      {
        path: "#",
        type: "link",
        icon: Svgicons.Medicalicon,
        active: false,
        selected: false,
        dirchange: false,
        title: "Coming Soon",
      },
      {
        path: "#",
        type: "link",
        icon: Svgicons.Leafleticon,
        active: false,
        selected: false,
        dirchange: false,
        title: "Coming Soon",
      },
      {
        path: "#",
        type: "link",
        icon: Svgicons.Apexicon,
        active: false,
        selected: false,
        dirchange: false,
        title: "Coming Soon",
      },
      {
        path: "#",
        type: "link",
        icon: Svgicons.Emptyicon,
        active: false,
        selected: false,
        dirchange: false,
        title: "Coming Soon",
      },
    ],
  },

  {
    title: "Projects",
    icon: Svgicons.Projectsicon,
    type: "sub",
    active: false,
    selected: false,
    dirchange: false,
    children: [
      {
        title: "Projects",
        type: "sub",
        icon: Svgicons.Projectsicon,
        active: false,
        selected: false,
        dirchange: false,
        doublToggle: false,
        children: [
          {
            path: "/projects/projects-list",
            type: "link",
            active: false,
            selected: false,
            dirchange: false,
            title: "Lists",
          },

          {
            path: "/projects/create-project",
            type: "link",
            active: false,
            selected: false,
            dirchange: false,
            title: "Create",
          },
          {
            title: "Shoots",
            type: "sub",
            icon: Svgicons.Taskicon,
            active: false,
            selected: false,
            dirchange: false,
            doublToggle: false,
            children: [
              {
                path: "/projects/shoots/shoots-list",
                type: "link",
                active: false,
                selected: false,
                dirchange: false,
                title: "Lists",
              },

              {
                path: "/projects/shoots/create-shoot",
                type: "link",
                active: false,
                selected: false,
                dirchange: false,
                title: "Create",
              },
            ],
          },
          {
            title: "Deliverables",
            type: "sub",
            icon: Svgicons.Taskicon,
            active: false,
            selected: false,
            dirchange: false,
            doublToggle: false,
            children: [
              {
                path: "/projects/deliverables/deliverables-list",
                type: "link",
                active: false,
                selected: false,
                dirchange: false,
                title: "Lists",
              },

              {
                path: "/projects/deliverables/create-deliverable",
                type: "link",
                active: false,
                selected: false,
                dirchange: false,
                title: "Create",
              },
            ],
          },
          {
            title: "Tasks",
            type: "sub",
            icon: Svgicons.Taskicon,
            active: false,
            selected: false,
            dirchange: false,
            doublToggle: false,
            children: [
              {
                path: "/projects/tasks/tasks-list",
                type: "link",
                active: false,
                selected: false,
                dirchange: false,
                title: "Lists",
              },

              {
                path: "/projects/tasks/create-task",
                type: "link",
                active: false,
                selected: false,
                dirchange: false,
                title: "Create",
              },
            ],
          },
        ],
      },

      {
        path: "#",
        type: "link",
        icon: Svgicons.Medicalicon,
        active: false,
        selected: false,
        dirchange: false,
        title: "Coming Soon",
      },
      {
        path: "#",
        type: "link",
        icon: Svgicons.Leafleticon,
        active: false,
        selected: false,
        dirchange: false,
        title: "Coming Soon",
      },
      {
        path: "#",
        type: "link",
        icon: Svgicons.Apexicon,
        active: false,
        selected: false,
        dirchange: false,
        title: "Coming Soon",
      },
      {
        path: "#",
        type: "link",
        icon: Svgicons.Emptyicon,
        active: false,
        selected: false,
        dirchange: false,
        title: "Coming Soon",
      },
    ],
  },

  {
    menutitle: "PAGES",
  },

  {
    menutitle: "GENERAL",
  },
  {
    path: "/pages/timeline",
    icon: Svgicons.Timelineicon,
    title: "Notifications",
    type: "link",
    active: false,
    dirchange: false,
    selected: false,
  },

  {
    path: "/calendars",
    icon: Svgicons.Fullicon,
    title: "Calendars",
    type: "link",
    active: false,
    dirchange: false,
    selected: false,
  },

  {
    menutitle: "MAPS & ICONS",
  },

  {
    title: "Settings",
    icon: Svgicons.Mapsicon,
    type: "sub",
    background: "hor-rightangle",
    active: false,
    selected: false,
    dirchange: false,
    children: [
      {
        path: "/finance",
        icon: Svgicons.Vectoricon,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
        title: "Accounts",
      },
      {
        path: "/team-members",
        icon: Svgicons.Leafleticon,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
        title: "Team Members",
      },

      {
        path: "/login/profile-settings",
        type: "link",
        icon: Svgicons.Profilesettingicon,
        active: false,
        selected: false,
        dirchange: false,
        title: "Profile Settings",
      },
      {
        path: "#",
        type: "link",
        icon: Svgicons.Apexicon,
        active: false,
        selected: false,
        dirchange: false,
        title: "Coming Soon",
      },
      {
        path: "#",
        type: "link",
        icon: Svgicons.Apexicon,
        active: false,
        selected: false,
        dirchange: false,
        title: "Coming Soon",
      },
    ],
  },

  {
    path: "/team-members/",
    icon: Svgicons.Hrmicon,
    title: "Team Members",
    type: "link",
    active: false,
    dirchange: false,
    selected: false,
  },
];
