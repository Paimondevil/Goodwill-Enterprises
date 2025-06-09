import { useRef } from "react";
import "./portfolio.scss";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const items = [
  {
    id: 1,
    title: "Business Printing",
    client: "Supertech Pvt. Ltd.",
    img: "...",
    desc: "We were genuinely impressed with the quality and creativity delivered by Goodwill Enterprises. From banners to notepads and letterheads, every detail was handled with professionalism and care. We highly recommend them.",
    rating: 5,
  },
  {
    id: 2,
    title: "School & Office Supplies",
    client: "Lovely Public Sr. Sec. School",
    img: "...",
    desc: "The precision and punctuality of Goodwill Enterprises impressed us deeply. The quality of our customized books and diaries is outstanding. Their design team truly understands educational branding.",
    rating: 4.5,
  },
  {
    id: 3,
    title: "Promotional & Packaging",
    client: "Takemori (UK)",
    img: "...",
    desc: "We ordered visiting cards internationally, and were delighted by the result. Fast delivery, excellent quality, and a seamless experience — we’ll definitely continue working with them.",
    rating: 5,
  },
  {
    id: 4,
    title: "Banners & More",
    client: "South Zone Restaurant",
    img: "...",
    desc: "We’re regulars! From menu cards to LED boards and flex banners, everything was well-designed and on point. Highly recommended for consistent quality and service.",
    rating: 5,
  },
];


const Single = ({ item }) => {
  const ref = useRef();

  const { scrollYProgress } = useScroll({
    target: ref,
  });

  const y = useTransform(scrollYProgress, [0, 1], [-300, 300]);

  return (
    <section >
      <div className="container">
        <div className="wrapper">
          <div className="imageContainer" ref={ref}>
            <img src={item.img} alt="" />
          </div>
          <motion.div className="textContainer" style={{ y }}>
            <h2><u>{item.title}</u></h2>
            <p style={{ fontWeight: "bold", fontSize: "18px" }}>⭐ {item.client}</p>
            <p style={{ marginTop: "5px" }}>{item.desc}</p>

            {(() => {
              const fullStars = Math.floor(item.rating);
              const hasHalfStar = item.rating % 1 >= 0.25 && item.rating % 1 <= 0.75;
              const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
              const full = "★".repeat(fullStars);
              const half = hasHalfStar ? "⯨" : ""; // Your preferred half star symbol
              const empty = "☆".repeat(emptyStars);
              
              return (
                <p style={{ marginTop: "10px", fontStyle: "italic" }}>
                  Rating ({item.rating}/5): {full}{half}{empty}
                </p>
              );
            })()}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const ref = useRef();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "start start"],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  return (
    <div className="portfolio" ref={ref}>
      <div className="progress">
        <h1>Client Testimonials</h1>
        <motion.div style={{ scaleX }} className="progressBar"></motion.div>
      </div>
      {items.map((item) => (
        <Single item={item} key={item.id} />
      ))}
    </div>
  );
};

export default Portfolio;
