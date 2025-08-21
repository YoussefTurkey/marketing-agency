// Projects
export type IProject = {
  id: number;
  src: string;
  nameAr: string;
  nameEn: string;
  link: string;
  slug: string;
};
export const project: IProject[] = [
  {
    id: 1,
    src: "/images/project1.webp",
    nameAr: "المشروع-01",
    nameEn: "project-01",
    link: "/projects/project-01",
    slug: 'project-01'
  },
  {
    id: 2,
    src: "/images/project2.webp",
    nameAr: "المشروع-02",
    nameEn: "project-02",
    link: "/projects/project-02",
    slug: 'project-02'
  },
  {
    id: 3,
    src: "/images/project3.webp",
    nameAr: "المشروع-03",
    nameEn: "project-03",
    link: "/projects/project-03",
    slug: 'project-03'
  },
  {
    id: 4,
    src: "/images/project4.webp",
    nameAr: "المشروع-04",
    nameEn: "project-04",
    link: "/projects/project-04",
    slug: 'project-04'
  },
  {
    id: 5,
    src: "/images/project1.webp",
    nameAr: "المشروع-05",
    nameEn: "project-05",
    link: "/projects/project-05",
    slug: 'project-05'
  },
  {
    id: 6,
    src: "/images/project2.webp",
    nameAr: "المشروع-06",
    nameEn: "project-06",
    link: "/projects/project-06",
    slug: 'project-06'
  },
  {
    id: 7,
    src: "/images/project3.webp",
    nameAr: "المشروع-07",
    nameEn: "project-07",
    link: "/projects/project-07",
    slug: 'project-07'
  },
  {
    id: 8,
    src: "/images/project4.webp",
    nameAr: "المشروع-08",
    nameEn: "project-08",
    link: "/projects/project-08",
    slug: 'project-08'
  },
];

// Teams
export type ITeam = {
  id: number;
  nameAr: string;
  nameEn: string;
  slug: string;
  image: string;
  roleAr: string;
  roleEn: string;
  bioAr: string[];
  bioEn: string[];
  link: string;
};
export const teams: ITeam[] = [
  {
    id: 1,
    nameAr: "أحمد حسن",
    nameEn: "Ahmed Hassan",
    slug: "ahmed-hassan",
    image: "/images/person.webp",
    roleAr: "مهندس واجهات",
    roleEn: "Frontend Engineer",
    bioAr: [
      "أحمد متخصص في الريأكت والنكست...",
      "أحمد متخصص في الريأكت والنكست...",
      "أحمد متخصص في الريأكت والنكست...",
      "أحمد متخصص في الريأكت والنكست...",
      "أحمد متخصص في الريأكت والنكست...",
    ],
    bioEn: [
      "Ahmed specializes in React and Next.js...",
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    ],
    link: "/teams/ahmed-hassan",
  },
  {
    id: 2,
    nameAr: "محمد ربيع",
    nameEn: "Mohamed Rabeaa",
    slug: "mohamed-rabeaa",
    image: "/images/person2.webp",
    roleAr: "مصمم تجربة المستخدم",
    roleEn: "UI/UX Designer",
    bioAr: [
      "محمد يركز على تصميم الأنظمة وأبحاث المستخدمين...",
      "محمد يركز على تصميم الأنظمة وأبحاث المستخدمين...",
      "محمد يركز على تصميم الأنظمة وأبحاث المستخدمين...",
      "محمد يركز على تصميم الأنظمة وأبحاث المستخدمين...",
      "محمد يركز على تصميم الأنظمة وأبحاث المستخدمين...",
    ],
    bioEn: [
      "Mohamed focuses on design systems and user research...",
      "Mohamed focuses on design systems and user research...",
      "Mohamed focuses on design systems and user research...",
      "Mohamed focuses on design systems and user research...",
      "Mohamed focuses on design systems and user research...",
    ],
    link: "/teams/mohamed-rabeaa",
  },
  {
    id: 3,
    nameAr: "أحمد حسن",
    nameEn: "Ahmed Hassan",
    slug: "ahmed-hassan",
    image: "/images/person.webp",
    roleAr: "مهندس واجهات",
    roleEn: "Frontend Engineer",
    bioAr: [
      "أحمد متخصص في الريأكت والنكست...",
      "أحمد متخصص في الريأكت والنكست...",
      "أحمد متخصص في الريأكت والنكست...",
      "أحمد متخصص في الريأكت والنكست...",
      "أحمد متخصص في الريأكت والنكست...",
    ],
    bioEn: [
      "Ahmed specializes in React and Next.js...",
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    ],
    link: "/teams/ahmed-hassan",
  },
  {
    id: 4,
    nameAr: "محمد ربيع",
    nameEn: "Mohamed Rabeaa",
    slug: "mohamed-rabeaa",
    image: "/images/person2.webp",
    roleAr: "مصمم تجربة المستخدم",
    roleEn: "UI/UX Designer",
    bioAr: [
      "محمد يركز على تصميم الأنظمة وأبحاث المستخدمين...",
      "محمد يركز على تصميم الأنظمة وأبحاث المستخدمين...",
      "محمد يركز على تصميم الأنظمة وأبحاث المستخدمين...",
      "محمد يركز على تصميم الأنظمة وأبحاث المستخدمين...",
      "محمد يركز على تصميم الأنظمة وأبحاث المستخدمين...",
    ],
    bioEn: [
      "Mohamed focuses on design systems and user research...",
      "Mohamed focuses on design systems and user research...",
      "Mohamed focuses on design systems and user research...",
      "Mohamed focuses on design systems and user research...",
      "Mohamed focuses on design systems and user research...",
    ],
    link: "/teams/mohamed-rabeaa",
  },
  {
    id: 5,
    nameAr: "أحمد حسن",
    nameEn: "Ahmed Hassan",
    slug: "ahmed-hassan",
    image: "/images/person.webp",
    roleAr: "مهندس واجهات",
    roleEn: "Frontend Engineer",
    bioAr: [
      "أحمد متخصص في الريأكت والنكست...",
      "أحمد متخصص في الريأكت والنكست...",
      "أحمد متخصص في الريأكت والنكست...",
      "أحمد متخصص في الريأكت والنكست...",
      "أحمد متخصص في الريأكت والنكست...",
    ],
    bioEn: [
      "Ahmed specializes in React and Next.js...",
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    ],
    link: "/teams/ahmed-hassan",
  },
  {
    id: 6,
    nameAr: "محمد ربيع",
    nameEn: "Mohamed Rabeaa",
    slug: "mohamed-rabeaa",
    image: "/images/person2.webp",
    roleAr: "مصمم تجربة المستخدم",
    roleEn: "UI/UX Designer",
    bioAr: [
      "محمد يركز على تصميم الأنظمة وأبحاث المستخدمين...",
      "محمد يركز على تصميم الأنظمة وأبحاث المستخدمين...",
      "محمد يركز على تصميم الأنظمة وأبحاث المستخدمين...",
      "محمد يركز على تصميم الأنظمة وأبحاث المستخدمين...",
      "محمد يركز على تصميم الأنظمة وأبحاث المستخدمين...",
    ],
    bioEn: [
      "Mohamed focuses on design systems and user research...",
      "Mohamed focuses on design systems and user research...",
      "Mohamed focuses on design systems and user research...",
      "Mohamed focuses on design systems and user research...",
      "Mohamed focuses on design systems and user research...",
    ],
    link: "/teams/mohamed-rabeaa",
  },
];

// Testimonials
type ITesti = {
  id: number;
  src: string;
  nameAr: string;
  nameEn: string;
  titleAr: string;
  titleEn: string;
  messageAr: string;
  messageEn: string;
};
export const testi: ITesti[] = [
  {
    id: 1,
    src: "/images/ceo.webp",
    nameAr: "إيميلي ستونس",
    nameEn: "Emily Stones",
    titleAr: "المدير التنفيذي لشركة جورو التسويقية",
    titleEn: "CEO, Marketing Guru",
    messageAr:
      "شكرًا لخدمتكم. أنا سعيد جدًا بالنتيجة. لقد شهدتُ نموًا هائلًا في أعمالي، وكل ذلك بفضل خدمتكم الرائعة.",
    messageEn:
      "Thank You for your service. I am very pleased with the result. I have seen exponencial growth in my business and its all thanks to your amazing service",
  },
  {
    id: 2,
    src: "/images/ceo.webp",
    nameAr: "إيميلي ستونس",
    nameEn: "Emily Stones",
    titleAr: "المدير التنفيذي لشركة جورو التسويقية",
    titleEn: "CEO, Marketing Guru",
    messageAr:
      "شكرًا لخدمتكم. أنا سعيد جدًا بالنتيجة. لقد شهدتُ نموًا هائلًا في أعمالي، وكل ذلك بفضل خدمتكم الرائعة.",
    messageEn:
      "Thank You for your service. I am very pleased with the result. I have seen exponencial growth in my business and its all thanks to your amazing service",
  },
  {
    id: 3,
    src: "/images/ceo.webp",
    nameAr: "إيميلي ستونس",
    nameEn: "Emily Stones",
    titleAr: "المدير التنفيذي لشركة جورو التسويقية",
    titleEn: "CEO, Marketing Guru",
    messageAr:
      "شكرًا لخدمتكم. أنا سعيد جدًا بالنتيجة. لقد شهدتُ نموًا هائلًا في أعمالي، وكل ذلك بفضل خدمتكم الرائعة.",
    messageEn:
      "Thank You for your service. I am very pleased with the result. I have seen exponencial growth in my business and its all thanks to your amazing service",
  },
  {
    id: 4,
    src: "/images/ceo.webp",
    nameAr: "إيميلي ستونس",
    nameEn: "Emily Stones",
    titleAr: "المدير التنفيذي لشركة جورو التسويقية",
    titleEn: "CEO, Marketing Guru",
    messageAr:
      "شكرًا لخدمتكم. أنا سعيد جدًا بالنتيجة. لقد شهدتُ نموًا هائلًا في أعمالي، وكل ذلك بفضل خدمتكم الرائعة.",
    messageEn:
      "Thank You for your service. I am very pleased with the result. I have seen exponencial growth in my business and its all thanks to your amazing service",
  },
  {
    id: 5,
    src: "/images/ceo.webp",
    nameAr: "إيميلي ستونس",
    nameEn: "Emily Stones",
    titleAr: "المدير التنفيذي لشركة جورو التسويقية",
    titleEn: "CEO, Marketing Guru",
    messageAr:
      "شكرًا لخدمتكم. أنا سعيد جدًا بالنتيجة. لقد شهدتُ نموًا هائلًا في أعمالي، وكل ذلك بفضل خدمتكم الرائعة.",
    messageEn:
      "Thank You for your service. I am very pleased with the result. I have seen exponencial growth in my business and its all thanks to your amazing service",
  },
];

// FAQs
type IFAQ = {
  id: number;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
};
export const faq: IFAQ[] = [
    {
      id: 1,
      titleAr: "كم سنة من الخبرة لديك؟",
      titleEn: "How many years of experience do you have?",
      descAr:
        "انا عاوز اكتب كلام عربي، انا عاوز اكتب كلام عربي، انا عاوز اكتب كلام عربي، انا عاوز اكتب كلام عربي، انا عاوز اكتب كلام عربي، ",
      descEn:
        "Donec rutrum, mauris at blandit convallis, orci nulla volutpatsapien, id pulvinar leo ligula eget nunc. In quis magna magna. Nullam mattis eget.",
    },
    {
      id: 2,
      titleAr: "كم سنة من الخبرة لديك؟",
      titleEn: "How many years of experience do you have?",
      descAr:
        "انا عاوز اكتب كلام عربي، انا عاوز اكتب كلام عربي، انا عاوز اكتب كلام عربي، انا عاوز اكتب كلام عربي، انا عاوز اكتب كلام عربي، ",
      descEn:
        "Donec rutrum, mauris at blandit convallis, orci nulla volutpatsapien, id pulvinar leo ligula eget nunc. In quis magna magna. Nullam mattis eget.",
    },
    {
      id: 3,
      titleAr: "كم سنة من الخبرة لديك؟",
      titleEn: "How many years of experience do you have?",
      descAr:
        "انا عاوز اكتب كلام عربي، انا عاوز اكتب كلام عربي، انا عاوز اكتب كلام عربي، انا عاوز اكتب كلام عربي، انا عاوز اكتب كلام عربي، ",
      descEn:
        "Donec rutrum, mauris at blandit convallis, orci nulla volutpatsapien, id pulvinar leo ligula eget nunc. In quis magna magna. Nullam mattis eget.",
    },
    {
      id: 4,
      titleAr: "كم سنة من الخبرة لديك؟",
      titleEn: "How many years of experience do you have?",
      descAr:
        "انا عاوز اكتب كلام عربي، انا عاوز اكتب كلام عربي، انا عاوز اكتب كلام عربي، انا عاوز اكتب كلام عربي، انا عاوز اكتب كلام عربي، ",
      descEn:
        "Donec rutrum, mauris at blandit convallis, orci nulla volutpatsapien, id pulvinar leo ligula eget nunc. In quis magna magna. Nullam mattis eget.",
    },
  ];
