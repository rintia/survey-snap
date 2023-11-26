

const Banner = () => {
    return (
        <div className="relative min-h-[600px] mb-32" style={{backgroundImage: 'url(https://i.ibb.co/wzVs3GR/banner.jpg)'}}>
        <div className="hero-overlay  bg-opacity-60"></div>
        <div className=" absolute top-20 left-10 text-left text-neutral-content">
          <div className="max-w-md ">
            <h1 className="mb-5 text-[#ED7D31] text-7xl font-bold">Your Partner For Online Job Market</h1>
            <p className="mb-5">Get your work done by the right person. And post your job right here, right now</p>
            <button className="btn btn-outline text-[#ED7D31]">Get Started</button>
          </div>
        </div>
      </div>
    );
};

export default Banner;