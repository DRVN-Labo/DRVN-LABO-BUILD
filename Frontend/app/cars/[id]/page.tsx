import { CarDetailClient } from "./car-detail-client";

interface CarDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CarDetailPage({ params }: CarDetailPageProps) {
  const { id } = await params;
  return <CarDetailClient id={id} />;
}
