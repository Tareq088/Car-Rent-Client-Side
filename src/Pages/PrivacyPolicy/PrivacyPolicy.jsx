import { motion } from "framer-motion";
import { FaUserShield, FaCreditCard, FaShareAlt, FaCookieBite, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router";
import Button from "../../UI/Button";

const PrivacyPolicy = () => {
  const policies = [
    {
      icon: <FaUserShield className="text-3xl text-primary" />,
      title: "Information Collection",
      text: "We collect your personal details such as name, email, phone number, and driving license information to process bookings and verify identity.",
    },
    {
      icon: <FaCreditCard className="text-3xl text-primary" />,
      title: "Payment Security",
      text: "All transactions are processed through secure payment gateways. We do not store your credit/debit card information on our servers.",
    },
    {
      icon: <FaShareAlt className="text-3xl text-primary" />,
      title: "Data Sharing",
      text: "Your information will never be sold to third parties. It may be shared with authorities if required by law.",
    },
    {
      icon: <FaCookieBite className="text-3xl text-primary" />,
      title: "Cookies",
      text: "We use cookies to enhance your browsing experience. You can disable cookies in your browser settings.",
    },
    {
      icon: <FaEnvelope className="text-3xl text-primary" />,
      title: "Contact Us",
      text: "If you have any privacy concerns, please email us at support@carrent.com.",
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
          Privacy Policy
        </motion.h1>

        <div className="bg-base-100 shadow-lg rounded-xl p-6 space-y-6">
          {policies.map((policy, index) => (
            <motion.section
              key={index}
              className="flex items-start gap-4"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              {policy.icon}
              <div>
                <h2 className="text-xl font-semibold">{policy.title}</h2>
                <p className="text-gray-600">{policy.text}</p>
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

export default PrivacyPolicy;
