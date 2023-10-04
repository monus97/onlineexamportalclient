import React from "react";

function Main() {
  return (
    <div>
      <section class=" slider_section position-relative">
        <div class="container">
          <div
            id="carouselExampleIndicators"
            class="carousel slide"
            data-ride="carousel"
          >
            <div class="carousel-inner">
              <div class="carousel-item active">
                <div class="row" style={{ width: "33pc" }}>
                  <div class="col-md-6">
                    <div class="detail-box">
                      <h1>
                        A Perfect Learning Center <br />
                        <span>For Your Kids</span>
                      </h1>
                      <p>
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page when
                        looking at its layout. The point of using Lorem Ipsum is
                        that it has a more-or-less normal distribution of
                        letters, as
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Main;
