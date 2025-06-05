const Cover = ({ img, title, subtitle }) => {
  return (
    <div
      className="hero h-[400px] md:h-[500px]"
      style={{
        backgroundImage: `url(${img})`,
        backgroundPosition: "center",
      }}
    >
      <div className="hero-overlay bg-opacity-65 w-full md:w-2/3 h-1/4 md:h-2/4 absolute"></div>
      <div className="hero-content text-white text-center relative z-10">
        <div className="max-w-md">
          <h1 className="mb-5 text-3xl md:text-5xl font-bold uppercase">
            {title}
          </h1>
          <p className="mb-5 ">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

export default Cover;
