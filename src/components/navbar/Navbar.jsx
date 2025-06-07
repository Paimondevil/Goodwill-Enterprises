import Sidebar from "../sidebar/Sidebar";
import "./navbar.scss";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <div className="navbar">
      {/* Sidebar */}
      <Sidebar />
      <div className="wrapper">
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          MENU
        </motion.span>

        {/* New 'Check me out' text */}
        <motion.span
          className="checkmeout"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          GET IN TOUCH!
        </motion.span>

        <div className="social">
          <a href="mailto:29deveshgautam@gmail.com">
            <img src="message.png" alt="Email" />
          </a>
          <a href="tel:+19023382913">
            <img src="phone.png" alt="Phone" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
