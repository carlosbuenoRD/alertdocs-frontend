import { ToastOptions } from "react-toastify";

export const menuAdmin = [
  {
    label: "Dashboard",
    icon: "pi pi-home",
    to: "/dashboard",
  },
  {
    label: "Areas",
    icon: "pi pi-star",
    to: "/areas",
  },
  {
    label: "Procesos",
    icon: "pi pi-sitemap",
    to: "/procesos",
  },
  {
    label: "Mantenimiento",
    icon: "pi pi-share-alt",
    to: "/flujos",
  },
];

export const menu = [
  {
    label: "Mi perfil",
    icon: "pi pi-user",
    to: "/perfil",
  },
];

export const areas = [
  "Direccion de Tecnologia y comunicacion",
  "Viceministerio Tecnico Administrativo",
  "Direccion de Recursos Humanos",
  "Direccion de Control Interno",
];

export const users = [
  {
    _id: "636d1ebf4c11875243a1db72",
    username: "manuel.martinez",
    name: "Manuel Marinez Gomez",
    activities: [],
    password: "123456",
    __v: 0,
  },
  {
    _id: "636d1eed4c11875243a1db74",
    username: "marcos.moreno",
    name: "Marcos Moreno Hernandez",
    activities: [],
    password: "123456",
    __v: 0,
  },
  {
    _id: "636d1f054c11875243a1db76",
    username: "carlos.bueno",
    name: "Carlos A. Bueno Tavares",
    activities: [],
    password: "123456",
    __v: 0,
  },
];

export const barData = {
  labels: [
    "Direccion administrativa",
    "Recursos Humano",
    "Control Interno",
    "Direccion Financiera",
    "Direccion de tecnologia",
  ],
  datasets: [
    {
      label: "Eficiencia de tiempo",
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgb(255, 99, 132)",
      data: [65, 59, 80, 81, 56, 55, 40],
    },
    {
      label: "Tiempo en devoluciones",
      backgroundColor: "rgb(54, 162, 235)",
      borderColor: "rgb(54, 162, 235)",
      data: [9, 12, 2, 4, 20, 1, 16],
    },
  ],
};

export const toastConfig: ToastOptions = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  theme: "light",
};

export const colors = [
  "blue",
  "green",
  "yellow",
  "cyan",
  "pink",
  "indigo",
  "teal",
  "orange",
  "bluegray",
  "purple",
  "blue",
  "gray",
  "yellow",
];
