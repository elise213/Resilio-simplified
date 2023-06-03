import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import imgLogo from "../../images/HDLOGOTRANSP.png"
import { Context } from "../store/appContext";
import AddFave from "./AddFave";
import { SimpleMap2 } from "./SimpleMap2";


export const ResourceInfo = (props) => {
  const { store, actions } = useContext(Context);

  function filterNonNullValues(schedule) {
    const result = {};
    Object.keys(schedule).forEach(key => {
      if (schedule[key] !== null && key !== "id" && key !== "resource_id") {
        result[key] = schedule[key];
      }
    });
    return result;
  }

  const schedule2 = filterNonNullValues(props.schedule);
  console.log("schedule 2", schedule2);

  const formattedSchedule = {};

  Object.keys(schedule2).forEach(key => {
    const day = key.replace(/End|Start/g, ''); // Extract the day from the key
    if (!formattedSchedule[day]) {
      const start = schedule2[`${day}Start`];
      const end = schedule2[`${day}End`];
      const formattedStart = formatTime(start);
      const formattedEnd = formatTime(end);
      formattedSchedule[day] = `${formattedStart} - ${formattedEnd}`;
    }
  });

  function formatTime(time) {
    const [hour, minute] = time.split(':');
    let formattedTime = time;

    if (parseInt(hour) > 12) {
      formattedTime = `${parseInt(hour) - 12}:${minute} p.m.`;
    } else {
      formattedTime = `${hour}:${minute} a.m.`;
    }

    return formattedTime;
  }


  return (
    <div className="offering-card ">


      <div className="resource-name">
        <h1 className="resource-title">{props.name}</h1>
      </div>



      <div className="pic-and-info">
        <div className="empty-50">
          <Link to={"/"}>
            <p className="back-to-search">
              <i className="fa-solid fa-arrow-left-long me-4"></i>
              Back to Search Results
            </p>
          </Link>


        </div>

        <div className="details-column">


          <div>
            <i className="fa-solid fa-map-location-dot me-4"></i>
            <div>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(props.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="resource-card-text"
              >
                {props.address}
              </a>
            </div>
          </div>


          <div>
            <i className="fa-solid fa-calendar-days me-4 mt-4"></i>
            <span className="resource-card-text">Schedule:</span>
            {Object.entries(formattedSchedule).map(([day, schedule], index) => (
              <div key={index}>
                <span className="resource-card-text ms-5">{day.charAt(0).toUpperCase() + day.slice(1)}: {schedule}</span>
              </div>
            ))}
          </div>



          <div>
            <i className="fa-solid fa-wifi me-4 mt-4"></i>
            <a href={"https://www." + props.website} className="resource-card-text">{props.website}</a>
          </div>
          <div className="mt-4">
            <h1 className="description">{props.description}</h1>
          </div>
        </div>
      </div >
      <div className="map-carousel-column">
        <div className="res-map-container">
          <SimpleMap2 latitude={props.latitude} longitude={props.longitude} />
        </div>

        {/* _______CAROUSEL_______ */}
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-interval="false">
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 4"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item carousel-frame active">
              <img
                src={props.image}
                className="d-block w-100 carousel-image"
                onError={(e) => {
                  e.target.src = ""
                }}
              // onError={({ currentTarget }) => {
              //   currentTarget.onerror = null;
              //   currentTarget.src = { imgLogo };
              // }}
              />
            </div>
            {props.image2 != "" && (
              <div className="carousel-item carousel-frame">
                <img
                  src={props.image2}
                  className="d-block w-100 carousel-image"
                  onError={(e) => {
                    e.target.src = imgLogo
                  }}
                />
              </div>
            )}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div >
  );
}
