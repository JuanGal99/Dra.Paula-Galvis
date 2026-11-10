const contact = {
  sectionLabel: "Let's talk",
  title: "Contact",
  validation: {
    countryRequired: "Please select a country.",
    invalidEmail: "Please enter a valid email address.",
  },
  form: {
    name: "Full Name",
    email: "Email",
    country: "Country",
    selectCountry: "Select your country",
    phone: "Phone / WhatsApp (optional)",
    phoneHint: "Include your country code.",
    invalidPhone: "Use numbers only, with your country code. Example: +1 555 123 4567",
    treatment: "Treatment of interest (optional)",
    selectTreatment: "Select a treatment",
    consent:
      "I freely, expressly and in advance authorize Paula Andrea Galvis Pérez to process my personal data in order to answer my request, including any health data I choose to share (sensitive data, which I am not required to provide), and to store it with services located outside Colombia, in accordance with the",
    consentLink: "Personal Data Processing Policy",
    message: "Message",
    submit: "Send message",
    sending: "Sending...",
    successTitle: "Thank you!",
    successMessage: "Your message has been sent.",
    errorSend: "Could not send your message. Please try again.",
    errorConnection: "Could not connect to the server.",
    countries: {
      US: "United States",
      CA: "Canada",
      GB: "United Kingdom",
      ES: "Spain",
      MX: "Mexico",
      PR: "Puerto Rico",
      DO: "Dominican Republic",
      PA: "Panama",
      CR: "Costa Rica",
      EC: "Ecuador",
      PE: "Peru",
      CL: "Chile",
      AR: "Argentina",
      CO: "Colombia",
      OTHER: "Other",
    },
    placeholders: {
      name: "Your full name",
      phone: "+1 555 123 4567",
      email: "Your email",
      message: "How can we help you?"
    }
  },
  contactInfo: {
    title: "Contact Information",
    address: "Bucaramanga and Ocaña, Colombia",
    phoneTitle: "Phone",
    phone: "+57 3178870588",
    emailTitle: "Email",
    email: "pagalvisp@gmail.com",
    socialTitle: "Social Media",
  },
  // Mensaje preescrito que aparece al abrir WhatsApp
  whatsappMessage: "Hi, I would like more information about dental treatments in Colombia.",
  whatsappLabel: "Contact us on WhatsApp",
};

export default contact;
