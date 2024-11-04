"use client";

import { sendContactUsSubmissionTemplate } from "@/actions/email";
import useContactHook from "@/hooks/useContactHook";
import { cn } from "@/lib/utils";
import { useColorModeValue } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { X, SendHorizonal, Loader } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

const icon = {
  hidden: {
    opacity: 0,
    pathLength: 0,
    fill: "rgba(255, 255, 255, 0)",
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    fill: "rgba(255, 255, 255, 1)",
  },
};

const ContactModal = () => {
  const { isOpen, onClose } = useContactHook();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const borderColor = useColorModeValue("#f97316", "#ec4899");
  const bgColor = useColorModeValue("bg-white/90", "bg-zinc-900/80");
  const textColor = useColorModeValue("text-gray-800", "text-gray-200");
  const placeholderColor = useColorModeValue("text-gray-700", "text-gray-300");
  const backdropColor = useColorModeValue("bg-black/20", "bg-black/40");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await sendContactUsSubmissionTemplate(formData);

      if (response.isSuccess) {
        alert("Thank you for reaching out! We'll get back to you soon.");
        setFormData({
          fullname: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        onClose();
      } else {
        setErrorMessage(response.message || "Something went wrong.")
        alert(`Submission failed: ${response.message}`);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={`fixed inset-0 flex items-center justify-center ${backdropColor} backdrop-blur-sm z-[999]`}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`${bgColor} border-4 border-zinc-500 backdrop-blur rounded-2xl shadow-lg shadow-zin-300 max-w-5xl w-full p-8 grid md:grid-cols-2 grid-cols-1 gap-12 mx-4 relative`}
          >
            <button
              className="p-1 rounded-full absolute top-4 right-4 backdrop-blur bg-white/20"
              onClick={onClose}
            >
              <X className="w-5 h-5" />
            </button>
            <div className="md:flex items-center justify-center hidden">
              <div className="w-full p-5 flex place-content-center overflow-hidden bg-slate-300/30 rounded-[30px]">
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 100"
                  className="w-[56%] overflow-visible stroke-2 rounded"
                  style={{
                    stroke: borderColor,
                  }}
                >
                  <motion.path
                    d="M0 100V0l50 50 50-50v100L75 75l-25 25-25-25z"
                    variants={icon}
                    initial="hidden"
                    animate="visible"
                    transition={{
                      default: { duration: 2, ease: "easeInOut" },
                      fill: { duration: 2, ease: [1, 0, 0.8, 1] },
                    }}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                </motion.svg>
              </div>
            </div>

            <div>
              <h2
                className={`text-2xl font-bold text-center ${textColor} mb-6`}
              >
                Get in Touch
              </h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-y-6">
                <div className="">
                  <label
                    className={`block text-sm font-medium ${placeholderColor}`}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full h-10 border-zinc-600 bg-transparent border-b focus:outline-none focus:border-b-2 focus:border-blue-500`}
                    required
                  />
                </div>
                <div className="">
                  <label
                    className={`block text-sm font-medium ${placeholderColor}`}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`mt-1 h-10 block w-full bg-transparent border-b border-zinc-600 focus:outline-none focus:border-b-2 focus:border-blue-500`}
                    required
                  />
                </div>
                <div className="">
                  <label className={`block text-sm font-medium ${placeholderColor}`}>
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`mt-1 h-10 block w-full bg-transparent border-b border-zinc-600 focus:outline-none focus:border-b-2 focus:border-blue-500`}
                    required
                  />
                </div>
                <div className="">
                  <label className={`block text-sm font-medium ${placeholderColor}`}>
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full bg-transparent border-b border-zinc-600 focus:outline-none focus:border-b-2 focus:border-blue-500 resize-none`}
                    rows={4}
                    required
                  />
                </div>
                {errorMessage && 
                  <p className="text-sm text-red-500">{errorMessage}</p>
                }
                <Button
                  type="submit"
                  className={`mt-4 px-6 py-4 text-base text-white rounded-lg hover:bg-blue-600 flex flex-row items-center w-fit self-end`}
                  style={{
                    backgroundColor: borderColor,
                  }}
                  disabled={isSubmitting}
                >
                  Send
                  {isSubmitting ? <Loader className="w-5 h-5 ml-2 animate-spin"/>: <SendHorizonal className="w-5 h-5 ml-2" />}
                </Button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
