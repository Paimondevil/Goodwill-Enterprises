import { useRef } from "react";
import "./services.scss";
import { motion, useInView } from "framer-motion";

const variants = {
  initial: {
    x: -500,
    y: 100,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      staggerChildren: 0.1,
    },
  },
};

const Services = () => {
  const ref = useRef();

  const isInView = useInView(ref, { margin: "-100px" });

  return (
    <motion.div
      className="services"
      variants={variants}
      initial="initial"
      // animate="animate"
      // whileInView="animate"
      ref={ref}
      animate={"animate"}
    >
      <motion.div className="textContainer" variants={variants}>
        <p>
          Precision Prints That Speak 
          <br/>Your Brand’s Language
        </p>
        <hr />
      </motion.div>
      <motion.div className="titleContainer" variants={variants}>
        <div className="title">
          <img src="/people.jpg" alt="" />
          <h1>
            <motion.b whileHover={{color:"orange"}}>Custom</motion.b> Prints
          </h1>
        </div>
        <div className="title">
          <h1>
            For Your <motion.b whileHover={{color:"rgb(18, 28, 150,0.7)"}}> Unique</motion.b> Brand.
          </h1>
        </div>
      </motion.div>
      <motion.div className="listContainer" variants={variants}>
      <motion.div className="box" whileHover={{ background: "lightgray", color: "black" }}>
        <h2 style={{ textAlign: "center", fontWeight: "bold" }}>🖨️ Business Printing</h2>
        <p style={{ textAlign: "justify" }}>
          <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>Brochures, Letterheads, Visiting Cards, Handbills.</p><br />
          Give your brand a polished look with high-quality multicolour prints that make a lasting impression — from eye-catching brochures to sharp, professional cards.
        </p><br />
        <button>Go</button>
      </motion.div>

      <motion.div className="box" whileHover={{ background: "lightgray", color: "black" }}>
        <h2 style={{ textAlign: "center", fontWeight: "bold" }}>🎒 School & Office Supplies</h2>
        <p style={{ textAlign: "justify" }}>
          <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>Registers, Diaries, Stationery, Custom School Materials.</p><br />
          We print everything schools and offices need — from daily-use registers and school diaries to custom-branded stationery for smooth operations.
        </p><br />
        <button>Go</button>
      </motion.div>

      <motion.div className="box" whileHover={{ background: "lightgray", color: "black" }}>
        <h2 style={{ textAlign: "center", fontWeight: "bold" }}>🛍️ Promotional & Packaging</h2><br />
        <p style={{ textAlign: "justify" }}>
          <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>Stickers, Carry Bags, KNPO Forms.</p><br />
          Spread your brand effortlessly with printed carry bags, labels, and stickers — or streamline business with custom KNPO and packaging solutions.
        </p><br />
        <button>Go</button>
      </motion.div>

      <motion.div className="box" whileHover={{ background: "lightgray", color: "black" }}>
        <h2 style={{ textAlign: "center", fontWeight: "bold" }}>💡 Banners & More</h2><br />
        <p style={{ textAlign: "justify" }}>
          <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>Flex Banners, Standees, LED Boards & Beyond.</p><br />
          From flex banners to glowing LED boards, we help your message stand out loud and clear — and we offer even more custom print jobs to meet your needs.
          <br />
          <span style={{ fontWeight: "bold", fontSize: "0.8rem" }}><i>And yes — we do all types of printing jobs. Just ask!</i></span>
        </p><br />
        <button>Go</button>
      </motion.div>
    </motion.div>
  </motion.div>
  );
};

export default Services;
