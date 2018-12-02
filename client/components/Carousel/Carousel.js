import Carousel from "nuka-carousel";

const NukaCarousel = props => {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr)" }}>
      <Carousel
        autoplay={props.autoplay}
        cellAlign={props.cellAlign}
        slidesToShow={props.slidesToShow}
        pauseOnHover={props.pauseOnHover}
        speed={props.speed}
        transitionMode={props.transitionMode}
        withoutControls={props.withoutControls}
        wrapAround={props.infinite}
      >
        {props.children}
      </Carousel>
    </div>
  );
};

export default NukaCarousel;
