import {
  LayoutGrid,
  LucideIcon,
  BookOpen,
  UserCog,
  User,
  FileText,
  BarChart,
  ScrollText,
  Layers,
  Calendar,
  MoonStar,
  Image,
  PanelsTopLeft,
  Monitor,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  if (pathname.includes("/dashboard/pimpinan")) {
    return [
      {
        groupLabel: "",
        menus: [
          {
            href: "/dashboard/pimpinan",
            label: "Dashboard",
            icon: LayoutGrid,
            submenus: [],
          },
        ],
      },
      {
        groupLabel: "Menu",
        menus: [
          {
            href: "/dashboard/pimpinan/kurikulum",
            label: "Admin & Kurikulum",
            icon: BookOpen,
            active: pathname.includes("/dashboard/pimpinan/kurikulum"),
          },
          {
            href: "/dashboard/pimpinan/tendik",
            label: "Tenaga Pendidik",
            icon: UserCog,
            active: pathname.includes("/dashboard/pimpinan/tendik"),
          },
          // {
          //   href: "/dashboard/pimpinan/kesiswaan",
          //   label: "Kesiswaan",
          //   icon: Users,
          // },
          // {
          //   href: "/dashboard/pimpinan/asset",
          //   label: "Manajemen Asset",
          //   icon: Building2,
          // },
          {
            href: "/dashboard/pimpinan/ppdb",
            label: "Monitoring PPDB",
            icon: ScrollText,
          },
          {
            href: "/dashboard/pimpinan/hybrid-learning",
            label: "Hybrid Learning",
            icon: Layers,
          },
        ],
      },
    ];
  }

  if (pathname.includes("/dashboard/kepala-sekolah")) {
    return [
      {
        groupLabel: "",
        menus: [
          {
            href: "/dashboard/kepala-sekolah",
            label: "Dashboard",
            icon: LayoutGrid,
            submenus: [],
          },
        ],
      },
      {
        groupLabel: "Menu",
        menus: [
          {
            href: "/dashboard/kepala-sekolah/kurikulum",
            label: "Kurikulum",
            icon: BookOpen,
            active: pathname.includes("/dashboard/kepala-sekolah/kurikulum"),
          },
          {
            href: "/dashboard/kepala-sekolah/tendik",
            label: "Tendik",
            icon: UserCog,
            active: pathname.includes("/dashboard/kepala-sekolah/tendik"),
          },
          // {
          //   href: "/dashboard/kepala-sekolah/kesiswaan",
          //   label: "Kesiswaan",
          //   icon: Users,
          // },
          // {
          //   href: "/dashboard/kepala-sekolah/ppdb",
          //   label: "PPDB",
          //   icon: ScrollText,
          // },
          // {
          //   href: "/dashboard/kepala-sekolah/sarana-prasarana",
          //   label: "Sarana Prasarana",
          //   icon: Building2,
          // },
        ],
      },
      {
        groupLabel: "Settings",
        menus: [
          {
            href: "/dashboard/kepala-sekolah/profile",
            label: "Profile",
            icon: User,
          },
        ],
      },
    ];
  }

  if (pathname.includes("/dashboard/guru")) {
    return [
      {
        groupLabel: "",
        menus: [
          {
            href: "/dashboard/guru",
            label: "Dashboard",
            icon: LayoutGrid,
            submenus: [],
          },
        ],
      },
      {
        groupLabel: "Menu",
        menus: [
          {
            href: "/dashboard/guru/administrasi",
            label: "Administrasi",
            icon: FileText,
            active: pathname.includes("/dashboard/guru/administrasi"),
          },
          {
            href: "/dashboard/guru/kinerja",
            label: "Kinerja",
            icon: BarChart,
            active: pathname.includes("/dashboard/guru/kinerja"),
          },
          {
            href: "/dashboard/guru/mata-pelajaran",
            label: "Mata Pelajaran",
            icon: BookOpen,
            active: pathname.includes("/dashboard/guru/mata-pelajaran"),
          },
          {
            href: "/dashboard/guru/pembelajaran",
            label: "Pembelajaran",
            icon: FileText,
            active: pathname.includes("/dashboard/guru/pembelajaran"),
            submenus: [
              {
                href: "/dashboard/guru/pembelajaran/materi",
                label: "Materi",
                active: pathname.includes("/dashboard/guru/pembelajaran/materi"),
              },
              {
                href: "/dashboard/guru/pembelajaran/tugas",
                label: "Tugas",
                active: pathname.includes("/dashboard/guru/pembelajaran/tugas") && !pathname.includes("/dashboard/guru/pembelajaran/rekap-tugas"),
              },
              {
                href: "/dashboard/guru/pembelajaran/rekap-tugas",
                label: "Rekap Tugas",
                active: pathname.includes("/dashboard/guru/pembelajaran/rekap-tugas"),
              },
            ],
          },
           {
            href: "/dashboard/guru/monitoring",
            label: "Monitoring",
            icon: Monitor,
            active: pathname.includes("/dashboard/guru/monitoring"),
            submenus: [
              {
                href: "/dashboard/guru/monitoring/presensi",
                label: "Presensi",
                active: pathname.includes("/dashboard/guru/monitoring/presensi"),
              },
              {
                href: "/dashboard/guru/monitoring/amaliah-harian",
                label: "Amaliah Harian",
                active: pathname.includes("/dashboard/guru/monitoring/amaliah-harian") && !pathname.includes("/dashboard/guru/monitoring/amaliah-harian"),
              },
            ],
          },
        ],
      },
      {
        groupLabel: "Settings",
        menus: [
          {
            href: "/dashboard/guru/profile",
            label: "Profile",
            icon: User,
          },
        ],
      },
    ];
  }

  if (pathname.includes("/dashboard/siswa")) {
    return [
      {
        groupLabel: "",
        menus: [
          {
            href: "/dashboard/siswa",
            label: "Dashboard",
            icon: LayoutGrid,
            submenus: [],
          },
        ],
      },
      {
        groupLabel: "Menu",
        menus: [
          {
            href: "/dashboard/siswa/mata-pelajaran",
            label: "Mata Pelajaran",
            icon: BookOpen,
            active: pathname.includes("/dashboard/siswa/mata-pelajaran"),
          },
          {
            href: "/dashboard/siswa/presensi",
            label: "Presensi",
            icon: Calendar,
            active: pathname.includes("/dashboard/siswa/presensi"),
          },
          {
            href: "/dashboard/siswa/mutabaahyaumiah",
            label: "Mutabaah Yaumiah",
            icon: MoonStar,
            active: pathname.includes("/dashboard/siswa/mutabaahyaumiah"),
          },
        ],
      },
    ];
  }

  if (pathname.includes("/dashboard/admin")) {
    return [
      {
        groupLabel: "",
        menus: [
          {
            href: "/dashboard/admin",
            label: "Dashboard",
            icon: LayoutGrid,
            submenus: [],
          },
        ],
      },
      {
        groupLabel: "Menu",
        menus: [
          {
            href: "/dashboard/admin/manajemen-kelas",
            label: "Manajemen Kelas",
            icon: PanelsTopLeft,
            active: pathname.includes("/dashboard/admin/manajemen-kelas"),
          },
          {
            href: "/dashboard/admin/manajemen-banner",
            label: "Manajemen Banner",
            icon: Image,
            active: pathname.includes("/dashboard/admin/manajemen-banner"),
          },
          // {
          //   href: "/dashboard/admin/mutabaahyaumiah",
          //   label: "Mutabaah Yaumiah",
          //   icon: MoonStar,
          //   active: pathname.includes("/dashboard/admin/mutabaahyaumiah"),
          // },
        ],
      },
    ];
  }

  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
  ];
}
