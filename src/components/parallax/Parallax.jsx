import { useEffect, useRef } from "react";
import "./parallax.scss";
import { motion, useAnimation, useInView } from "framer-motion";

const Parallax = ({ type }) => {
  const ref = useRef();
  const isInView = useInView(ref, { once: true, margin: "-30% 0px -30% 0px" });

  /* Animation controllers */
  const sunEnterControls = useAnimation();  // only used for `services`
  const sunExitControls  = useAnimation();
  const textControls     = useAnimation();
  const oldCloudsControls = useAnimation(); // morning clouds
  const newCloudsControls = useAnimation(); // evening clouds
  const starsControls     = useAnimation(); // stars
  const moonControls      = useAnimation(); // moon
  const planetsControls   = useAnimation(); // planets
  const bgControls        = useAnimation(); // background gradient

  /* Master sequence */
  useEffect(() => {
    if (!isInView) return;

    /* Day‑time sequence for `services` page */
    const runServices = async () => {
      await sunEnterControls.start({
        x: "0vw",
        y: "-20vh",
        opacity: 1,
        transition: { duration: 2, ease: "easeInOut" },
      });

      await textControls.start({ opacity: 1, transition: { duration: 1 } });
      await new Promise((r) => setTimeout(r, 500));

      // Move sun to fixed stop position, keep visible (no fade out)
      sunExitControls.start({
        x: "30vw",    // Adjust as needed for stopping position (right corner, slightly above mid)
        y: "30vh",
        opacity: 1,
        transition: { duration: 2, ease: "easeOut" },
      });

      oldCloudsControls.start({ opacity: 0, transition: { duration: 2 } });
      newCloudsControls.start({ opacity: 1, transition: { duration: 2 } });

      bgControls.start({
        background:
          "linear-gradient(180deg,rgb(240,165,14),rgb(8,12,128))",
        transition: { duration: 2 },
      });
    };

    /* Sunset → night sequence for portfolio / default pages */
    const runPortfolio = async () => {
      // 1️⃣  Sun starts in place (right‑edge) and sets (vanishes)
      await sunExitControls.start({
        y: "60vh",
        opacity: 0,
        transition: { duration: 2, ease: "easeInOut" },
      });

      // 2️⃣  Clouds fade out, no stars yet
      await newCloudsControls.start({ opacity: 0, transition: { duration: 1.5 } });

      // 3️⃣  Heading appears (stars still hidden)
      await textControls.start({ opacity: 1, transition: { duration: 1 } });

      // 4️⃣  Moon and planets rise together
      moonControls.start({
        x: "0vw",
        y: "-25vh",
        opacity: 1,
        transition: { duration: 2 },
      });

      planetsControls.start({
        opacity: 1,
        y: "-10vh",
        transition: { duration: 2 },
      });

      // 5️⃣  Stars fade in now, with moon
      starsControls.start({
        opacity: 1,
        transition: { duration: 1.5, delay: 1 }, // slight delay for effect
      });

      // 6️⃣  Background to deep‑night
      bgControls.start({
        background: "linear-gradient(180deg,#0c0c1d,#0c0c1d)",
        transition: { duration: 2 },
      });
    };

    /* Kick off the correct sequence */
    if (type === "services") {
      runServices();
    } else {
      runPortfolio();
    }
  }, [isInView, type]);

  /* Initial states depend on page type */
  const initialSun =
    type === "services"
      ? { x: "-40vw", y: "30vh", opacity: 0 }
      : { x: "30vw", y: "0vh", opacity: 1 };

  const initialCloudNew = type === "services" ? { opacity: 0 } : { opacity: 1 };

  return (
    <motion.div
      className="parallax"
      ref={ref}
      initial={{
        background:
          type === "services"
            ? "linear-gradient(180deg,rgb(216,216,230), rgb(109,109,113))"
            : "linear-gradient(180deg,rgb(240,165,14),rgb(8,12,128))",
      }}
      animate={bgControls}
    >
      {/* Heading */}
      <motion.h1 initial={{ opacity: 0 }} animate={textControls}>
        {type === "services" ? "What We Do?" : "What We Did?"}
      </motion.h1>

      {/* Overlay dim screen */}
      <div className="dim-screen" />

      {/* Clouds */}
      <motion.div
        className="cloud cloud--static"
        initial={{ opacity: type === "services" ? 1 : 0 }}
        animate={oldCloudsControls}
      >
        <img src="morning.png" alt="Clouds" />
      </motion.div>

      <motion.div
        className="cloud cloud--new"
        initial={initialCloudNew}
        animate={newCloudsControls}
      >
        <img src="evening.png" alt="Evening Clouds" />
      </motion.div>

      {/* Stars */}
      <motion.div className="stars" initial={{ opacity: 0 }} animate={starsControls} />

      {/* Moon */}
      <motion.div
        className="moon"
        initial={{ x: "-40vw", y: "30vh", opacity: 0 }}
        animate={moonControls}
      />

      {/* Sun */}
      <motion.div className="sun" initial={initialSun} animate={sunEnterControls}>
        <motion.img src="sun.png" alt="Sun" animate={sunExitControls} />
      </motion.div>

      {/* Terrain layers */}
      <motion.div className="city" />
      <motion.div className="mountains" />

      {/* Planets (only on non-services) */}
      {type !== "services" && (
        <motion.div
          className="planets"
          initial={{ opacity: 0, y: "0vh" }}
          animate={planetsControls}
          style={{ backgroundImage: `url("/planets.png")` }}
        />
      )}
    </motion.div>
  );
};

export default Parallax;
