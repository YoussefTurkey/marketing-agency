export interface ProcessStep {
  head: string;
  body: string;
}

export interface ProjectInfo {
  servicesEn: string[];
  servicesAr: string[];
  clientEn: string;
  clientAr: string;
  countryEn: string;
  countryAr: string;
  industryEn: string;
  industryAr: string;
}

export interface PortfolioItem {
  id?: string;
  titleEn: string;
  titleAr: string;
  categoryEn: string;
  categoryAr: string;
  info: ProjectInfo;
  link: string;
  image: string;
  images: string[];
  articleEn: string;
  articleAr: string;
  processEn: ProcessStep[];
  processAr: ProcessStep[];
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
