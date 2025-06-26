import Cover from "../../SharedPages/Cover/Cover";
import contact from "../../../assets/contact.jpg";
import { Helmet } from "react-helmet";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { FaPhoneAlt } from "react-icons/fa";
import ContactForm from "../ContactForm/ContactForm";
import { FaLocationDot } from "react-icons/fa6";
import { MdTimer } from "react-icons/md";

const ContactUs = () => {
  return (
    <div>
      <Helmet>
        <title>Al Dente | Contact</title>
      </Helmet>
      <Cover
        img={contact}
        title={"contact us"}
        subtitle={"You can reach us any time you want"}
      ></Cover>
      <div className="max-w-screen-lg mx-auto">
        <SectionTitle
          heading={"our location"}
          subheading={"visit us"}
        ></SectionTitle>
        <div className=" flex flex-col md:flex-row justify-between gap-3 w-3/4 mx-auto m-16">
          <div className="flex flex-col items-center">
            <div className="bg-orange-500 flex justify-center py-2 w-60">
              <FaPhoneAlt className="text-white"></FaPhoneAlt>
            </div>
            <div className="bg-slate-400 text-black text-center  p-5 w-3/4 h-full mx-auto">
              <h1 className="text-lg font-medium">PHONE</h1>
              <p>+880178856480</p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-orange-500 flex justify-center py-2 w-60">
              <FaLocationDot className="text-white"></FaLocationDot>
            </div>
            <div className="bg-slate-400 text-black text-center  p-5 w-3/4 h-full mx-auto ">
              <h1 className="text-lg font-medium">ADDRESS</h1>
              <p>19/3 Uposhohor, Rajshahi</p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-orange-500 flex justify-center py-2 w-60">
              <MdTimer className="text-white"></MdTimer>
            </div>
            <div className="bg-slate-400 text-black text-center p-5 w-3/4 h-full mx-auto">
              <h1 className="text-lg font-medium">WORKING HOURS</h1>
              <p>Saturday to Friday</p>
              <p>10am - 10pm</p>
            </div>
          </div>
        </div>
        <SectionTitle
          heading={"contact form"}
          subheading={"send us a message"}
        ></SectionTitle>
        <ContactForm></ContactForm>
      </div>
    </div>
  );
};

export default ContactUs;
