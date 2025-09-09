function MiniCarousel() {
  return (
    <div className="h-auto overflow-hidden flex justify-center items-center relative">
      <div>
        <div className="carousel w-full ">
          <div id="item1" className="carousel-item w-full flex justify-center">
            <img src="/image/banner/banner1.png" alt="trade-pic" />
          </div>
          <div id="item2" className="carousel-item w-full flex justify-center">
            <img src="/image/banner/banner.png" alt="trade-pic" />
          </div>
          <div id="item3" className="carousel-item w-full flex justify-center">
            <img src="/image/banner/banner3.png" alt="trade-pic" />
          </div>
        </div>
        {/* <div className="flex w-full justify-center gap-2 py-2">
          <a href="#item1" className="btn btn-xs">
            1
          </a>
          <a href="#item2" className="btn btn-xs">
            2
          </a>
          <a href="#item3" className="btn btn-xs">
            3
          </a>
        </div> */}
        {/* <img className="rounded-full" width="55" height="55" alt="" src={img} /> */}
      </div>
    </div>
  );
}

export default MiniCarousel;
