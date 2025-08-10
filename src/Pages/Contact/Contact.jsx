import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

const Contact = () => {
  const cardData = [
    {
      icon: <FaMapMarkerAlt className="text-4xl text-primary" />,
      title: "Our Location",
      text: "123 Main Street, Dhaka, Bangladesh",
    },
    {
      icon: <FaEnvelope className="text-4xl text-primary" />,
      title: "Email Address",
      text: "support@carrent.com",
    },
    {
      icon: <FaPhoneAlt className="text-4xl text-primary" />,
      title: "Phone Number",
      text: "+880 1234-567890",
    },
  ];

  return (
    <div className="py-12 bg-base-200">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="font-bold text-center text-2xl text-amber-800 py-10">Contact Us</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {cardData.map((item, index) => (
            <motion.div
              key={index}
              className="card bg-base-100 shadow-xl p-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex flex-col items-center space-y-4">
                {item.icon}
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-gray-600">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
