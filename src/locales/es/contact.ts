const contact = {
  sectionLabel: "Hablemos",
  title: "Contacto",
  validation: {
    countryRequired: "Por favor, selecciona un país.",
    invalidEmail: "Por favor, ingresa un correo válido.",
  },
  form: {
    name: "Nombre completo",
    email: "Correo electrónico",
    country: "País",
    selectCountry: "Selecciona tu país",
    phone: "Teléfono / WhatsApp (opcional)",
    phoneHint: "Incluye el código de país.",
    invalidPhone: "Escribe solo números, con el código de país. Ejemplo: +57 300 123 4567",
    treatment: "Tratamiento de interés (opcional)",
    selectTreatment: "Selecciona un tratamiento",
    consent:
      "Autorizo de forma libre, previa y expresa a Paula Andrea Galvis Pérez para tratar mis datos personales con el fin de responder mi solicitud, incluidos los datos de salud que decida compartir (datos sensibles, cuya entrega es facultativa), y para almacenarlos en servicios ubicados fuera de Colombia, según la",
    consentLink: "Política de Tratamiento de Datos",
    message: "Mensaje",
    submit: "Enviar mensaje",
    sending: "Enviando...",
    successTitle: "¡Gracias!",
    successMessage: "Tu mensaje ha sido enviado.",
    errorSend: "Error al enviar. Intenta nuevamente.",
    errorConnection: "Error al conectar con el servidor.",
    countries: {
      US: "Estados Unidos",
      CA: "Canadá",
      GB: "Reino Unido",
      ES: "España",
      MX: "México",
      PR: "Puerto Rico",
      DO: "República Dominicana",
      PA: "Panamá",
      CR: "Costa Rica",
      EC: "Ecuador",
      PE: "Perú",
      CL: "Chile",
      AR: "Argentina",
      CO: "Colombia",
      OTHER: "Otro",
    },
    placeholders: {
      name: "Tu nombre completo",
      phone: "+57 300 123 4567",
      email: "tucorreo@ejemplo.com",
      message: "¿En qué podemos ayudarte?"
    }
  },
  contactInfo: {
    title: "Datos de contacto",
    address: "Bucaramanga y Ocaña, Colombia",
    phoneTitle: "Teléfono",
    phone: "+57 3178870588",
    emailTitle: "Correo electrónico",
    email: "pagalvisp@gmail.com",
    socialTitle: "Redes sociales",
  },
  // Mensaje preescrito que aparece al abrir WhatsApp
  whatsappMessage: "Hola, quiero más información sobre tratamientos odontológicos en Colombia.",
  whatsappLabel: "Contactar por WhatsApp",
};

export default contact;
