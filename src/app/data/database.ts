// Projects
type IProject = {
  id: number;
  src: string;
  alt: string;
  link: string;
};
export const project: IProject[] = [
  {
    id: 1,
    src: "/images/project1.webp",
    alt: "project-01",
    link: "/projects",
  },
  {
    id: 2,
    src: "/images/project2.webp",
    alt: "project-02",
    link: "/projects",
  },
  {
    id: 3,
    src: "/images/project3.webp",
    alt: "project-03",
    link: "/projects",
  },
  {
    id: 4,
    src: "/images/project4.webp",
    alt: "project-04",
    link: "/projects",
  },
  {
    id: 5,
    src: "/images/project1.webp",
    alt: "project-05",
    link: "/projects",
  },
  {
    id: 6,
    src: "/images/project2.webp",
    alt: "project-06",
    link: "/projects",
  },
  {
    id: 7,
    src: "/images/project3.webp",
    alt: "project-07",
    link: "/projects",
  },
  {
    id: 8,
    src: "/images/project4.webp",
    alt: "project-08",
    link: "/projects",
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
    roleAr: "مطور واجهات",
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
      "Ahmed specializes in React and Next.js...",
      "Ahmed specializes in React and Next.js...",
      "Ahmed specializes in React and Next.js...",
      "Ahmed specializes in React and Next.js...",
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
    roleAr: "مطور واجهات",
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
      "Ahmed specializes in React and Next.js...",
      "Ahmed specializes in React and Next.js...",
      "Ahmed specializes in React and Next.js...",
      "Ahmed specializes in React and Next.js...",
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
    roleAr: "مطور واجهات",
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
      "Ahmed specializes in React and Next.js...",
      "Ahmed specializes in React and Next.js...",
      "Ahmed specializes in React and Next.js...",
      "Ahmed specializes in React and Next.js...",
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
