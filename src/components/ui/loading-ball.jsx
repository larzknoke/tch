export default function BallLoader(props) {
  const color = props.color || "text-white";
  return (
    <div className={`tennis-loading ${color}`}>
      <div className="shadow"></div>
      <div className="tennis-ball"></div>
    </div>
  );
}
