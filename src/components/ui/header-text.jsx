function HeaderText({ text }) {
  return (
    <div className="flex  items-end mb-5">
      <h1 className="whitespace-nowrapOFF uppercase text-balance">{text}</h1>
      {/* <div className="w-full h-0.5 mb-2 ml-3 bg-tch-blue" /> */}
    </div>
  );
}

export default HeaderText;
