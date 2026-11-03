import React from "react";
import "./Galaxy.css";

const stars = Array.from({ length: 150 }, (_, i) => ({
  left: `${(i * 47.73) % 100}%`,
  top: `${(i * 29.17 + (i % 7) * 3) % 100}%`,
  size: `${1 + (i % 3)}px`,
  delay: `${(i % 17) * -0.42}s`,
  duration: `${2.5 + (i % 6) * 0.7}s`,
}));

export default function Galaxy() {
  return (
    <div className="hv-galaxy" aria-hidden="true">
      <div className="hv-nebula hv-nebula-a" />
      <div className="hv-nebula hv-nebula-b" />
      <div className="hv-nebula hv-nebula-c" />
      <div className="hv-starfield">
        {stars.map((star, i) => (
          <i
            key={i}
            className="hv-star"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              animationDelay: star.delay,
              animationDuration: star.duration,
            }}
          />
        ))}
      </div>

      <div className="hv-planet hv-planet-saturn">
        <span className="hv-saturn-ring" />
        <span className="hv-planet-crater crater-a" />
        <span className="hv-planet-crater crater-b" />
      </div>
      <div className="hv-planet hv-planet-purple">
        <span className="hv-planet-highlight" />
      </div>
      <div className="hv-planet hv-planet-blue">
        <span className="hv-planet-highlight" />
      </div>
      <div className="hv-moon hv-moon-one" />
      <div className="hv-moon hv-moon-two" />

      <div className="hv-orbit hv-orbit-one" />
      <div className="hv-orbit hv-orbit-two" />

      <div className="hv-astronaut hv-astronaut-left">
        <span className="hv-astronaut-emoji">🧑‍🚀</span>
        <span className="hv-astronaut-trail" />
      </div>
      <div className="hv-astronaut hv-astronaut-right">
        <span className="hv-astronaut-emoji">👨‍🚀</span>
      </div>

      <span className="hv-comet hv-comet-one" />
      <span className="hv-comet hv-comet-two" />
      <span className="hv-twinkle hv-twinkle-one">✦</span>
      <span className="hv-twinkle hv-twinkle-two">✧</span>
      <span className="hv-twinkle hv-twinkle-three">✦</span>
    </div>
  );
}
