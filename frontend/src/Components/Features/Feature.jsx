import React from "react";
import "./Feature.css";
import { feature_list } from "../../assets/assets";

const Feature = () => {
  return (
    <div className="feature">
      <div className="feature_heading">
        <h1>Key Features</h1>
        <p>
          Our platform provides everything you need to record and analyze
          sickness data.
        </p>
      </div>
      <div className="feature_display">
        {feature_list.map((feature) => (
          <div className="feature_card">
            <img src={feature.feature_image} alt={feature.feature_name} />
            <h3>{feature.feature_name}</h3>
            <div className="desc">
              <p>{feature.feature_description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feature;
