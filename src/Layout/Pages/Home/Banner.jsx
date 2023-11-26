

const Banner = () => {
    return (
        <div  className=" hero relative min-h-[600px] mb-32" style={{backgroundImage: 'url(https://i.ibb.co/bdjMWd7/kk.jpg)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
        <div className="hero-overlay  bg-opacity-80"></div>
        <div className=" hero-content text-center text-neutral-content">
          <div className="max-w-md ">
            <h1 className="mb-5 text-[#61B15A] text-7xl font-bold">Find All The Surveys In One Place</h1>
            <p className="mb-5">Participate on different surveys all around the world</p>
            <button className="btn btn-outline text-[#61B15A]">Explore Now</button>
          </div>
        </div>
      </div>
    );
};

export default Banner;