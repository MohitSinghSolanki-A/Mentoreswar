import React from "react";
import "./mentorship.css";

const services = [
    { id: 1, title: "Guidance", description: "Personalized career guidance from experts.", image: "/images/guidance.png" },
    { id: 2, title: "1-on-1 Sessions", description: "Book a private session with mentors.", image: "/images/session.png" },
    { id: 3, title: "Test Series", description: "Prepare with curated test series.", image: "/images/test-series.png" },
    { id: 4, title: "Mock Interviews", description: "Ace interviews with mock sessions.", image: "/images/mock-interview.png" }
];

const MentorshipServices = () => {
    return (
        <div className="mentorship-container">
            <h2 className="mentorship-title">Our Mentorship Services</h2>
            <div className="mentorship-list">
                {services.map((service, index) => (
                    <div key={service.id} className={`service-item ${index % 2 === 0 ? "left" : "right"}`}>
                        <div className="service-text">
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                        </div>
                        <div className="service-image">
                            <img src={service.image} alt={service.title} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MentorshipServices;
