import React from "react";
import NotFoundPicture from "../../assets/images/background_img/404Notfound.jpg";

const NotFound = () => {
  return (
    <div className="not-found-page">
      <img src={NotFoundPicture} alt="error 404" />

      <div className="title">
        <p>Opsss, The Page Not Found!</p>
      </div>
    </div>
  );
};

export default NotFound;
