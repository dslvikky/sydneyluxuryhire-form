import emailjs from '@emailjs/browser';
import type { EmailFormData } from '../types/form';

export const initEmailJS = () => {
  emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
};

export const sendEmail = async (formData: EmailFormData) => {
  try {
    const response = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      formData
    );
    return response;
  } catch (error) {
    console.error('EmailJS Error:', error);
    throw error;
  }
}; 