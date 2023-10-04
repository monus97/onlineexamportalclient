import { Carousel } from "react-bootstrap";
import { useSelector } from "react-redux";
import Image from "../components/image";
import Login from "./login";
import Register from "./registerPage";

function Home() {

  return (
    <>
      {/* <div className="container" style={{ margin: "20px", height: "300px" }}>
      <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <ExampleCarouselImage text="First slide" />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <ExampleCarouselImage text="Second slide" />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <ExampleCarouselImage text="Third slide" />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
      </div>  */}
      <div class="container-fluid py-5">
        <div class="container py-5">
          <div class="row">
            <div class="col-lg-5 mb-5 mb-lg-0" style={{ minHeight: "500px" }}>
              <div class="position-relative h-100">
                <img
                  class="position-absolute w-100 h-100"
                  src={require("../assets/img/about.jpg")}
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
            <div class="col-lg-7">
              <div class="section-title position-relative mb-4">
                <h6 class="d-inline-block position-relative text-secondary text-uppercase pb-2">
                  About Us
                </h6>
                <h1 class="display-4">
                  First Choice For Online Education Anywhere
                </h1>
              </div>
              <p>
                Tempor erat elitr at rebum at at clita aliquyam consetetur. Diam
                dolor diam ipsum et, tempor voluptua sit consetetur sit.
                Aliquyam diam amet diam et eos sadipscing labore. Clita erat
                ipsum et lorem et sit, sed stet no labore lorem sit. Sanctus
                clita duo justo et tempor consetetur takimata eirmod, dolores
                takimata consetetur invidunt magna dolores aliquyam dolores
                dolore. Amet erat amet et magna
              </p>
              <div class="row pt-3 mx-0">
                <div class="col-3 px-0">
                  <div class="bg-success text-center p-4 about_conter">
                    <h1 class="text-white" data-toggle="counter-up">
                      123
                    </h1>
                    <h6 class="text-uppercase text-white">
                      Available<span class="d-block">Subjects</span>
                    </h6>
                  </div>
                </div>
                <div class="col-3 px-0">
                  <div class="bg-primary text-center p-4 about_conter">
                    <h1 class="text-white" data-toggle="counter-up">
                      1234
                    </h1>
                    <h6 class="text-uppercase text-white">
                      Online<span class="d-block">Courses</span>
                    </h6>
                  </div>
                </div>
                <div class="col-3 px-0">
                  <div class="bg-secondary text-center p-4 about_conter">
                    <h1 class="text-white" data-toggle="counter-up">
                      123
                    </h1>
                    <h6 class="text-uppercase text-white">
                      Skilled<span class="d-block">Instructors</span>
                    </h6>
                  </div>
                </div>
                <div class="col-3 px-0">
                  <div class="bg-warning text-center p-4 about_conter">
                    <h1 class="text-white" data-toggle="counter-up">
                      1234
                    </h1>
                    <h6 class="text-uppercase text-white">
                      Happy<span class="d-block">Students</span>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container-fluid bg-image" style={{ margin: "90px 0" }}>
        <div class="container">
          <div class="row">
            <div class="col-lg-7 my-5 pt-5 pb-lg-5">
              <div class="section-title position-relative mb-4">
                <h6 class="d-inline-block position-relative text-secondary text-uppercase pb-2">
                  Why Choose Us?
                </h6>
                <h1 class="display-4">
                  Why You Should Start Learning with Us?
                </h1>
              </div>
              <p class="mb-4 pb-2">
                Aliquyam accusam clita nonumy ipsum sit sea clita ipsum clita,
                ipsum dolores amet voluptua duo dolores et sit ipsum rebum,
                sadipscing et erat eirmod diam kasd labore clita est. Diam
                sanctus gubergren sit rebum clita amet.
              </p>
              <div class="d-flex mb-3">
                <div class="btn-icon bg-primary mr-4">
                  <i class="fa fa-2x fa-graduation-cap text-white"></i>
                </div>
                <div class="mt-n1">
                  <h4>Skilled Instructors</h4>
                  <p>
                    Labore rebum duo est Sit dolore eos sit tempor eos stet,
                    vero vero clita magna kasd no nonumy et eos dolor magna
                    ipsum.
                  </p>
                </div>
              </div>
              <div class="d-flex mb-3">
                <div class="btn-icon bg-secondary mr-4">
                  <i class="fa fa-2x fa-certificate text-white"></i>
                </div>
                <div class="mt-n1">
                  <h4>International Certificate</h4>
                  <p>
                    Labore rebum duo est Sit dolore eos sit tempor eos stet,
                    vero vero clita magna kasd no nonumy et eos dolor magna
                    ipsum.
                  </p>
                </div>
              </div>
              <div class="d-flex">
                <div class="btn-icon bg-warning mr-4">
                  <i class="fa fa-2x fa-book-reader text-white"></i>
                </div>
                <div class="mt-n1">
                  <h4>Online Classes</h4>
                  <p class="m-0">
                    Labore rebum duo est Sit dolore eos sit tempor eos stet,
                    vero vero clita magna kasd no nonumy et eos dolor magna
                    ipsum.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-5" style={{ minHeight: "500px" }}>
              <div class="position-relative h-100">
                <img
                  class="position-absolute w-100 h-100"
                  src={require("../assets/img/feature.jpg")}
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
