import Slider from "react-slick";
import image2 from '../../assets/image3.png'
import image3 from '../../assets/image4.png'
import image4 from '../../assets/image5.png'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function SampleNextArrow(props) {
  const {onClick ,style} = props;
  return (
    <div
      className="slick-arrow"
      style={style}
      onClick={onClick}
    >
      <FaChevronRight
        size={40} 
        color="#000000ff" 
        style={{position:"absolute",top:"50%",right:"-5%",cursor:"pointer",transform: "translateY(-50%)"}}
      />
    </div>
  );
}
function SamplePreviousArrow(props) {
  const { onClick ,style} = props;
  return (
    <div
      className="slick-arrow"
      style={style}
      onClick={onClick}
    >
      <FaChevronLeft
        size={40} 
        color="#000000ff" 
        style={{position:"absolute",top:"50%",left:"-5%",cursor:"pointer",transform: "translateY(-50%)"}}
      />
    </div>
  );
}
export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePreviousArrow/>,
    cssEase: "linear"
  };
  return (
    <div className="vh-100 p-5">
    <Slider {...settings} className="container h-50 my-slider-crop">
      <div>
        <img src={image2} alt="" className="w-100 mx-auto d-block"/>
      </div>
      <div>
        <img src={image3} alt="" className="w-100 mx-auto d-block"/>
      </div>
      <div>
        <img src={image4} alt="" className="w-100 mx-auto d-block"/>
      </div>
    </Slider>
  </div>
  );
}