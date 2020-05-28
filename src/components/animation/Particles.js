import React from "react";
import Particles from "react-particles-js";

const particleProps = {
    particles: {
        number: {
            value: 1000,
            density: {
                enable: true,
                value_area: 10000
            }
        }
    }
};

export default function ParticleAnimation() {
    return(
        <div className="fixed-top w-100 h-100" style={{zIndex: 0}}>
            <Particles
                className="position-absolute w-100 h-100"
                params={particleProps}
            />
        </div>
    )
}