import { motion } from "framer-motion";
import { FaCar, FaClock, FaGasPump, FaShieldAlt, FaTimesCircle } from "react-icons/fa";
import { Link } from "react-router";
import Button from "../../UI/Button";

const TermsAndConditions = () => {
  const terms = [
    {
      icon: <FaCar className="text-3xl text-primary" />,
      title: "Vehicle Usage",
      text: "All rented vehicles must be used responsibly and in accordance with traffic laws. The renter is responsible for any damages caused during the rental period.",
    },
    {
      icon: <FaClock className="text-3xl text-primary" />,
      title: "Rental Period",
      text: "The rental period starts and ends as agreed in the booking. Late returns may incur additional fees.",
    },
    {
      icon: <FaGasPump className="text-3xl text-primary" />,
      title: "Fuel Policy",
      text: "Vehicles must be returned with the same fuel level as at the start of the rental. Additional charges apply for missing fuel.",
    },
    {
      icon: <FaShieldAlt className="text-3xl text-primary" />,
      title: "Insurance",
      text: "Basic insurance is included in all rentals. Additional coverage can be purchased during booking.",
    },
    {
      icon: <FaTimesCircle className="text-3xl text-primary" />,
      title: "Cancellation",
      text: "Cancellations made 24 hours before the rental start date are fully refundable. After that, a cancellation fee may apply.",
    },
  ];

  return (
    <div className="bg-base-200 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center mb-8"
        >
          Terms & Conditions
        </motion.h1>

        <div className="bg-base-100 shadow-lg rounded-xl p-6 space-y-6">
          {terms.map((term, index) => (
            <motion.section
              key={index}
              className="flex items-start gap-4"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              {term.icon}
              <div>
                <h2 className="text-xl font-semibold">{term.title}</h2>
                <p className="text-gray-600">{term.text}</p>
              </div>
            </motion.section>
          ))}
        </div>
      </div>
      <div className="mx-auto max-w-sm my-5">
          <Link to='/' ><Button label='Go Back Home'></Button></Link>
      </div>
    </div>
  );
};

export default TermsAndConditions;
