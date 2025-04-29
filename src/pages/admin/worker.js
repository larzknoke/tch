import LayoutAdmin from "@/components/ui/layouts/layout-admin";
function Worker() {
  return <div>Worker</div>;
}

export default Worker;

Worker.getLayout = function getLayout(page) {
  return <LayoutAdmin>{page}</LayoutAdmin>;
};
