import { redirect } from "next/navigation";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export default async function CategoryRootPage({ params }: CategoryPageProps) {
  const { category } = await params;
  redirect(`/dashboard/${category}/overview`);
}
