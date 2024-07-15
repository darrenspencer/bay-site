// src/components/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to Bay Area Fun Healthy</h1>
      <p>
        I made this website because I wanted a comprehensive list of all of the fun healthy things to do in the Bay Area and see if somebody that can't code can use ChatGPT to make a website from scratch. It worked, but I got a bit bored. The running clubs and climbing gyms are comprehensive. The others are not super reliable. Contact me if you want to add a club: darrendavidspencer at gmail dot com. 
      </p>
      <nav>
        <ul>
          <li><Link to="/running-clubs">Running Clubs</Link></li>
          <li><Link to="/cycling-clubs">Cycling Clubs</Link></li>
          <li><Link to="/swimming-clubs">Swimming Clubs</Link></li>
          <li><Link to="/triathlon-clubs">Triathlon Clubs</Link></li>
          <li><Link to="/climbing-gyms">Climbing Gyms</Link></li>
          <li><Link to="/thermal-therapy">Thermal Therapy</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
