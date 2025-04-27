export default function BallLoader(props) {
  const color = props.color || "text-white";
  return (
    <div class="tennis-loading">
      <div class="shadow"></div>
      <div class="tennis-ball"></div>
    </div>
  );
}
