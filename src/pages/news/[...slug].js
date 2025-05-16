import Sidebar from "@/components/sidebar";
import Layout from "@/components/ui/layouts/layout";
import { useRouter } from "next/router";

export default function NewsPage() {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-16">
      <div className="flex flex-col md:flex-row gap-8 md:gap-16">
        <div className="w-full md:w-2/3">
          <p>News: {router.query.slug}</p>
        </div>
        <div className="w-full md:w-1/3 gap-12 flex flex-col">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

NewsPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
