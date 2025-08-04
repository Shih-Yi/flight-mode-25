import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import ClientHome from "./components/ClientHome";

type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

type SectionType = 'default' | 'boarding';

// Generate metadata for dynamic Open Graph images
export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const section = (searchParams?.section as SectionType) || 'default';
  
  const images: Record<SectionType, string> = {
    default: '/flight-mode25.png',
    boarding: '/flight-mode25-boarding.png', 
  };

  const titles: Record<SectionType, string> = {
    default: 'Flight Mode 2025 - Onboard with God',
    boarding: 'Flight Mode 2025 - Boarding in Progress...',
  };

  const descriptions: Record<SectionType, string> = {
    default: 'Join us for an unforgettable weekend of worship, fellowship, and spiritual renewal. 25-27 October, 2025 at Wainui Park Camp.',
    boarding: 'Boarding in Progress... Passengers please proceed to boarding area',
  };

  const selectedImage = images[section] || images.default;
  const selectedTitle = titles[section] || titles.default;
  const selectedDescription = descriptions[section] || descriptions.default;

  return {
    title: selectedTitle,
    description: selectedDescription,
    openGraph: {
      title: selectedTitle,
      description: selectedDescription,
      images: [{
        url: selectedImage,
        width: 1200,
        height: 630,
        alt: selectedTitle,
      }],
      type: 'website',
      siteName: 'Flight Mode 2025',
    },
    twitter: {
      card: 'summary_large_image',
      title: selectedTitle,
      description: selectedDescription,
      images: [selectedImage],
    },
  };
}

export default function Home({ searchParams }: PageProps) {
  return <ClientHome />;
}
