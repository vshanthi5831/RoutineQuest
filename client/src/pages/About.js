
import React, { useState } from "react";

const About = () => {
  const [bgImage, setBgImage] = useState(""); // state for background

  const headingStyle = {
    fontSize: "1.4rem",
    fontWeight: "bold",
    color: "#430633"
  };

  const accordionStyle = {
    fontSize: "1.2rem",
    lineHeight: "1.8",
    color: "#6b2d59"
  };

  const listStyle = {
    marginLeft: "20px",
    marginTop: "10px"
  };

  // Add your image URLs or paths here
const bgImages = {
  one: "url('/one.png')",
  two: "url('/two.png')",
  three: "url('/three.png')",
  four: "url('/four.png')"
};

  const handleAccordionClick = (id) => {
    setBgImage(bgImages[id] || "");
  };

  return (
    <div
      className="home-container"
      style={{
        backgroundImage: bgImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background 0.8s ease-in-out",
        minHeight: "100vh", // full screen
        padding: "20px 40px"
      }}
    >
    <div
      style={{
      display: "block",
      width: "100%",              // same width as accordion container
      maxWidth: "100%",           // safe for large screens
      background: "rgba(255, 255, 255, 0.5)",
      padding: "12px 20px",
      borderRadius: "10px",
      marginBottom: "10px"
    }}
    >
    <h1 className="brand" style={{ margin: 0 }}>RoutineQuest</h1>
    <h3 className="home-subheading">Slay Procrastination like a Boss!!</h3>
    </div>

      <div id="accordionFlushExample" style={{ width: "100%", padding: "20px 0" }}>
        <br /><br />

        {/* Accordion Item 1 - No Myths */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseOne"
              aria-expanded="false"
              aria-controls="flush-collapseOne"
              style={headingStyle}
              onClick={() => handleAccordionClick("one")}
            >
              No Myths - lets burst one
            </button>
          </h2>
          <div
            id="flush-collapseOne"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body" style={accordionStyle}>
              Good habits don’t automatically make someone a “good person”.  
              But consistently cultivating good habits <strong>does</strong> shape a strong, productive, and meaningful life.
              <br /><br />
              Habits are the invisible architecture of your day—they silently build resilience, clarity, and focus.  
              Even small daily routines like planning your day, drinking water, reading, or stretching create long-term benefits.  
              <br /><br />
              Remember: life isn’t about perfection; it’s about persistence. Habits compound silently but powerfully over time.  
              The more intentional your actions, the more empowered your life becomes.
            </div>
          </div>
        </div>

        {/* Accordion Item 2 - Motto */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseTwo"
              aria-expanded="false"
              aria-controls="flush-collapseTwo"
              style={headingStyle}
              onClick={() => handleAccordionClick("two")}
            >
              Motto - What's without objective
            </button>
          </h2>
          <div
            id="flush-collapseTwo"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body" style={accordionStyle}>
              <em>
                "Step by step, day by day,  
                The small choices guide the way.  
                Start with little, aim for more,  
                And soon you’ll open every door."
              </em>
              <br /><br />
              Progress isn’t magic; it’s cumulative.  
              Each micro-action compounds over time—like droplets forming a river.  
              Even when results seem invisible, your efforts are quietly building your future.
            </div>
          </div>
        </div>

        {/* Accordion Item 3 - Be Cool */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseThree"
              aria-expanded="false"
              aria-controls="flush-collapseThree"
              style={headingStyle}
              onClick={() => handleAccordionClick("three")}
            >
              Be Cool - coolness comes with calmness within
            </button>
          </h2>
          <div
            id="flush-collapseThree"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body" style={accordionStyle}>
              Great habits transform ordinary routines into extraordinary lives.  
              Some to practice:
              <ul style={listStyle}>
                <li><strong>Yoga:</strong> Align your body and mind, reduce stress, improve flexibility.</li>
                <li><strong>Reading:</strong> Even a word a day creates a “walking library” over months.</li>
                <li><strong>Meditation:</strong> Clear your mind and strengthen focus.</li>
                <li><strong>Journaling:</strong> Document growth, reflect, and stay mindful.</li>
                <li><strong>Morning Walks:</strong> Refresh energy, spark creativity, boost mood.</li>
                <li><strong>Learning Something New:</strong> Five minutes daily compounds into mastery.</li>
                <li><strong>Gratitude Practice:</strong> Write 3 things you are grateful for each day.</li>
                <li><strong>Digital Detox:</strong> Limit mindless scrolling and reclaim your time.</li>
              </ul>
              <br />
              Habits are momentum engines. Start small, stay consistent, and the results will amaze you.
            </div>
          </div>
        </div>

        {/* Accordion Item 4 - Begin */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseFour"
              aria-expanded="false"
              aria-controls="flush-collapseFour"
              style={headingStyle}
              onClick={() => handleAccordionClick("four")}
            >
              Begin - Hop on
            </button>
          </h2>
          <div
            id="flush-collapseFour"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body" style={accordionStyle}>
              Don’t wait for the “perfect moment” or the “ideal day”.  
              Start today, even with tiny actions:
              <ul style={listStyle}>
                <li>Write your first journal entry.</li>
                <li>Read a paragraph or learn a new word.</li>
                <li>Do five minutes of stretching, yoga, or meditation.</li>
                <li>Reflect on one positive action from today.</li>
              </ul>
              <br />
              Momentum builds with action. Begin, repeat, improve—over time, these small steps create remarkable transformation.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
