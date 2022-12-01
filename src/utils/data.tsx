export const drags: any[] = [
  {
    state: "Pendiente",
    tasks: [
      {
        id: "gary",
        name: "Carlos Bueno Tavares",
        thumb: "/images/gary.png",
      },
      {
        id: "cato",
        name: "Ines Tavares Peña",
        thumb: "/images/cato.png",
      },
      {
        id: "kvn",
        name: "Amable Valenzuela Terrero",
        thumb: "/images/kvn.png",
      },
      {
        id: "mooncake",
        name: "Mooncake",
        thumb: "/images/mooncake.png",
      },
      {
        id: "quinn",
        name: "Quinn Ergon",
        thumb: "/images/quinn.png",
      },
    ],
  },
  {
    state: "En proceso",
    tasks: [],
  },
  {
    state: "Revision",
    tasks: [
      {
        id: "garyyy",
        name: "Carlos Bueno Tavares",
        thumb: "/images/gary.png",
      },
    ],
  },
  {
    state: "Completado",
    tasks: [
      {
        id: "garyyyy",
        name: "Carlos Bueno Tavares",
        thumb: "/images/gary.png",
      },
      {
        id: "catoooo",
        name: "Ines Tavares Peña",
        thumb: "/images/cato.png",
      },
      {
        id: "kvnnnn",
        name: "KVN",
        thumb: "/images/kvn.png",
      },
      {
        id: "mooncakeeee",
        name: "Mooncake",
        thumb: "/images/mooncake.png",
      },
      {
        id: "quinnnnn",
        name: "Quinn Ergon",
        thumb: "/images/quinn.png",
      },
    ],
  },
];

export const menu = [
  {
    label: "Administrador",
    icon: "pi pi-prime",
    items: [
      { label: "Dashboard", icon: "pi pi-home", to: "/" },
      { label: "Direcciones", icon: "pi pi-star", to: "/direcciones" },
    ],
  },
  {
    label: "Documentos",
    icon: "pi pi-briefcase",
    to: "/documentos",
  },
  {
    label: "Mantenimiento",
    icon: "pi pi-share-alt",
    to: "/flujos",
  },
  {
    label: "Mis tareas",
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
