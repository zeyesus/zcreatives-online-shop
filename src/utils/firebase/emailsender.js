import emailjs, { send } from "emailjs-com";
import { toast } from "react-toastify";
const sendEmail = async (email) => {
  const templateParams = {
    to_email: email,
    // Add any other template parameters here
  };

  emailjs
    .send(
      "service_ur5vq3l",
      "template_q6gq98j",
      templateParams,
      "ypZpa8KVc-E4vDSwB"
    )
    .then(
      (response) => {
        console.log("Email sent successfully", response.status, response.text);
        toast.success("Email sent successfully");
      },
      (error) => {
        console.error("Error sending email", error);
      }
    );
};
export default sendEmail;
