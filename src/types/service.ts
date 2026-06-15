// ============================================================
// types/service.ts
// ============================================================

export interface Paragraph {
  text: string;
}

export interface Section {
  title: string;
  title2Text: string;
  showTitle2: boolean;
  paragraphs: Paragraph[];
}

export interface ProcessStep {
  num: string;
  title: string;
  desc: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ServiceFormValues {
  name: string;
  slug: string;
  active: boolean;

  heroBanner: {
    heading: string;
    description: string;
    text: string;
  };

  headingDesc: Section[];

  processSection: {
    title: string;
    title2Text: string;
    showTitle2: boolean;
    description: string;
    steps: ProcessStep[];
  };

  faqSection: {
    title: string;
    title2Text: string;
    showTitle2: boolean;
    faqs: FAQ[];
  };

  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}

export interface ServiceDocument extends ServiceFormValues {
  _id: string;
  createdAt: string;
  updatedAt: string;
    thumbnail?: {
    imageUrl?: string;
    publicId?: string;
  }
  heroBanner: ServiceFormValues["heroBanner"] & {
    image?: string;
    publicId?: string;
  };
}