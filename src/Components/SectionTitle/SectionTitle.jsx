const SectionTitle = ({ heading, subheading }) => {
  return (
    <div className="text-center my-8 w-1/3 mx-auto">
      <p className="italic text-amber-700 mb-1">---{subheading}---</p>
      <p className="text-xl md:text-3xl font-medium my-1 py-2 border border-x-0 border-y-slate-400">
        {heading}
      </p>
    </div>
  );
};

export default SectionTitle;
