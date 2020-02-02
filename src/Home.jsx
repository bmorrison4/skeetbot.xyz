import React from "react";
import DancingBaby from "./imgs/baby.gif";

function Home() {
    return (
        <>
            <p>
                Welcome to the special landing page for SkeetBot.XYZ, the host
                for my special <a href="https://discordapp.com/">Discord</a> bot!
                    There is nothing for you to do here, so go away!
            </p>
            <img src={DancingBaby} alt="dancing baby" />
        </>
    );
}

export default Home;