// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // <-- import navigate
// import Dashboard from './Dashboard';
// import { FaTrophy, FaClock, FaChartLine, FaUsers } from "react-icons/fa";
// import confetti from "canvas-confetti";

// const features = [
//   { icon: <FaTrophy />, title: "Gamified Experience", message: "Earn points & level up!" },
//   { icon: <FaClock />, title: "Flexible Scheduling", message: "Track habits daily, weekly, or monthly." },
//   { icon: <FaChartLine />, title: "Data Insights", message: "See your progress over time." },
//   { icon: <FaUsers />, title: "Personalized Dashboard", message: "Manage habits easily in one place." },
// ];

// const Home = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const navigate = useNavigate(); // <-- initialize navigate

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     setIsLoggedIn(!!token);
//   }, []);

//   const handleHeroClick = () => {
//     confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
//     navigate('/login'); // <-- navigate to login page
//   };

//   return (
//     <div className="home-container" style={{ padding: "20px 40px" }}>

//       {/* Hero Section */}
//       <div
//         style={{
//           display: "block",
//           width: "95%",
//           maxWidth: "100%",
//           background: "rgba(255,255,255,0.6)",
//           borderRadius: "12px",
//           padding: "30px 20px",
//           textAlign: "center",
//           marginBottom: "30px",
//           position: "relative",
//           overflow: "hidden",
//         }}
//       >
//         <h1 className="brand" style={{ margin: 0, fontSize: "3rem" }}>RoutineQuest</h1>
//         <h3 className="home-subheading" style={{ marginTop: "8px", fontSize: "1.5rem" }}>
//           Slay Procrastination like a Boss!!
//         </h3>
//         <button
//           onClick={handleHeroClick}
//           style={{
//             marginTop: "20px",
//             padding: "10px 20px",
//             borderRadius: "8px",
//             border: "none",
//             cursor: "pointer",
//             background: "#430633",
//             color: "#fff",
//             fontSize: "1rem",
//           }}
//         >
//           Get started
//         </button>

//         {/* Floating Emoji Marquee */}
//         <div style={{
//           position: "absolute",
//           top: "0",
//           left: "50%",
//           transform: "translateX(-50%)",
//           fontSize: "1.5rem",
//           animation: "emoji-marquee 6s linear infinite",
//         }}>
//           🎉✨🏆🎉✨🏆🎉✨🏆🎉✨🏆
//         </div>

//         <style>
//           {`
//             @keyframes emoji-marquee {
//               0% { transform: translateX(-50%) translateY(0); }
//               50% { transform: translateX(-50%) translateY(-20px); }
//               100% { transform: translateX(-50%) translateY(0); }
//             }
//           `}
//         </style>
//       </div>

//       {/* If logged in, show dashboard */}
//       {isLoggedIn ? (
//         <Dashboard />
//       ) : (
//         <>
//           {/* Welcome Box */}
//           <div className="home-box-custom" style={{
//             background: "rgba(240,240,240,0.8)",
//             padding: "20px",
//             borderRadius: "12px",
//             textAlign: "center",
//             marginBottom: "30px",
//           }}>
//             <h2 className="home-heading">Welcome to Routine Quest!</h2>
//             <p className="home-description">
//               Your personal habit tracking and productivity booster tool.
//             </p>
//           </div>

//           {/* Features Section */}
//           <div
//             style={{
//               display: "flex",
//               flexWrap: "wrap",
//               gap: "16px",
//               justifyContent: "center",
//               marginBottom: "40px",
//             }}
//           >
//             {features.map((feat, idx) => (
//               <div
//                 key={idx}
//                 style={{
//                   flex: "0 0 220px",
//                   background: "rgba(240,240,240,0.8)",
//                   padding: "20px",
//                   borderRadius: "12px",
//                   textAlign: "center",
//                   position: "relative",
//                   cursor: "pointer",
//                   transition: "transform 0.3s",
//                 }}
//                 onMouseEnter={(e) => {
//                   const msg = e.currentTarget.querySelector(".feature-message");
//                   if(msg) msg.style.opacity = 1;
//                   e.currentTarget.style.transform = "translateY(-6px)";
//                 }}
//                 onMouseLeave={(e) => {
//                   const msg = e.currentTarget.querySelector(".feature-message");
//                   if(msg) msg.style.opacity = 0;
//                   e.currentTarget.style.transform = "translateY(0)";
//                 }}
//               >
//                 <div style={{ fontSize: "2rem", marginBottom: "10px" }}>{feat.icon}</div>
//                 <h3 style={{ margin: 0 }}>{feat.title}</h3>
//                 <div
//                   className="feature-message"
//                   style={{
//                     position: "absolute",
//                     top: "-30px",
//                     left: "50%",
//                     transform: "translateX(-50%)",
//                     background: "#430633",
//                     color: "#fff",
//                     padding: "4px 8px",
//                     borderRadius: "5px",
//                     fontSize: "0.9rem",
//                     opacity: 0,
//                     transition: "opacity 0.3s",
//                     pointerEvents: "none",
//                   }}
//                 >
//                   {feat.message}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Motivation Section */}
//           <div
//             style={{
//               background: "rgba(255,255,255,0.5)",
//               borderRadius: "12px",
//               padding: "20px",
//               textAlign: "center",
//             }}
//           >
//             <h2>Stay Motivated!</h2>
//             <p>Complete your habits daily and watch your streaks grow. 🎯💪</p>
//             <p>Hover over features to see tips and boost your progress!</p>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Home;


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import { FaTrophy, FaClock, FaChartLine, FaUsers } from "react-icons/fa";
import confetti from "canvas-confetti";

const features = [
  { icon: <FaTrophy />, title: "Gamified Experience", message: "Earn points & level up!" },
  { icon: <FaClock />, title: "Flexible Scheduling", message: "Track habits daily, weekly, or monthly." },
  { icon: <FaChartLine />, title: "Data Insights", message: "See your progress over time." },
  { icon: <FaUsers />, title: "Personalized Dashboard", message: "Manage habits easily in one place." },
];

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleHeroClick = () => {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    navigate('/login');
  };

  return (
    <div className="home-container" style={{ padding: "20px 40px" }}>

      {/* Hero Section */}
      <div
        style={{
          display: "block",
          width: "95%",
          maxWidth: "100%",
          background: "rgba(255,255,255,0.6)",
          borderRadius: "12px",
          padding: "30px 20px",
          textAlign: "center",
          marginBottom: "30px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <h1 className="brand" style={{ margin: 0, fontSize: "3rem" }}>RoutineQuest</h1>
        <h3 className="home-subheading" style={{ marginTop: "8px", fontSize: "1.5rem" }}>
          Slay Procrastination like a Boss!!
        </h3>

        {/* Show Get Started button only if NOT logged in */}
        {!isLoggedIn && (
          <button
            onClick={handleHeroClick}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              background: "#430633",
              color: "#fff",
              fontSize: "1rem",
            }}
          >
            Get started
          </button>
        )}

        {/* Floating Emoji Marquee, hidden if logged in */}
        {!isLoggedIn && (
          <div style={{
            position: "absolute",
            top: "0",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "1.5rem",
            animation: "emoji-marquee 6s linear infinite",
          }}>
            🎉✨🏆🎉✨🏆🎉✨🏆🎉✨🏆
          </div>
        )}

        <style>
          {`
            @keyframes emoji-marquee {
              0% { transform: translateX(-50%) translateY(0); }
              50% { transform: translateX(-50%) translateY(-20px); }
              100% { transform: translateX(-50%) translateY(0); }
            }
          `}
        </style>
      </div>

      {/* If logged in, show Dashboard */}
      {isLoggedIn ? (
        <Dashboard />
      ) : (
        <>
          {/* Welcome Box */}
          <div className="home-box-custom" style={{
            background: "rgba(240,240,240,0.8)",
            padding: "20px",
            borderRadius: "12px",
            textAlign: "center",
            marginBottom: "30px",
          }}>
            <h2 className="home-heading">Welcome to Routine Quest!</h2>
            <p className="home-description">
              Your personal habit tracking and productivity booster tool.
            </p>
          </div>

          {/* Features Section */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "16px",
              justifyContent: "center",
              marginBottom: "40px",
            }}
          >
            {features.map((feat, idx) => (
              <div
                key={idx}
                style={{
                  flex: "0 0 220px",
                  background: "rgba(240,240,240,0.8)",
                  padding: "20px",
                  borderRadius: "12px",
                  textAlign: "center",
                  position: "relative",
                  cursor: "pointer",
                  transition: "transform 0.3s",
                }}
                onMouseEnter={(e) => {
                  const msg = e.currentTarget.querySelector(".feature-message");
                  if(msg) msg.style.opacity = 1;
                  e.currentTarget.style.transform = "translateY(-6px)";
                }}
                onMouseLeave={(e) => {
                  const msg = e.currentTarget.querySelector(".feature-message");
                  if(msg) msg.style.opacity = 0;
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "10px" }}>{feat.icon}</div>
                <h3 style={{ margin: 0 }}>{feat.title}</h3>
                <div
                  className="feature-message"
                  style={{
                    position: "absolute",
                    top: "-30px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "#430633",
                    color: "#fff",
                    padding: "4px 8px",
                    borderRadius: "5px",
                    fontSize: "0.9rem",
                    opacity: 0,
                    transition: "opacity 0.3s",
                    pointerEvents: "none",
                  }}
                >
                  {feat.message}
                </div>
              </div>
            ))}
          </div>

          {/* Motivation Section */}
          <div
            style={{
              background: "rgba(255,255,255,0.5)",
              borderRadius: "12px",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <h2>Stay Motivated!</h2>
            <p>Complete your habits daily and watch your streaks grow. 🎯💪</p>
            <p>Hover over features to see tips and boost your progress!</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
