import React from 'react'

function Image() {
  return (
    <div>
      <div style={{ color: "red", width: "500px" }}>
        hello{" "}
        <img
          class="position-absolute w-100 h-100"
          src={require("../assets/img/about.jpg")}
          style={{ objectFit: "cover" }}
        />
      </div>
    </div>
  );
}

export default Image
