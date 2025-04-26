
// Country codes with flags using emoji and expected phone lengths
export const countries = [
  // Central America
  { code: "506", name: "Costa Rica", flag: "🇨🇷", minLength: 8, maxLength: 8 },
  { code: "504", name: "Honduras", flag: "🇭🇳", minLength: 8, maxLength: 8 },
  { code: "503", name: "El Salvador", flag: "🇸🇻", minLength: 8, maxLength: 8 },
  { code: "502", name: "Guatemala", flag: "🇬🇹", minLength: 8, maxLength: 8 },
  { code: "505", name: "Nicaragua", flag: "🇳🇮", minLength: 8, maxLength: 8 },
  { code: "507", name: "Panamá", flag: "🇵🇦", minLength: 8, maxLength: 8 },
  { code: "501", name: "Belice", flag: "🇧🇿", minLength: 8, maxLength: 8 },
  
  // North America
  { code: "52", name: "México", flag: "🇲🇽", minLength: 10, maxLength: 10 },
  { code: "1", name: "Estados Unidos", flag: "🇺🇸", minLength: 10, maxLength: 10 },
  { code: "1", name: "Canadá", flag: "🇨🇦", minLength: 10, maxLength: 10 },
  
  // South America
  { code: "54", name: "Argentina", flag: "🇦🇷", minLength: 10, maxLength: 10 },
  { code: "591", name: "Bolivia", flag: "🇧🇴", minLength: 8, maxLength: 8 },
  { code: "55", name: "Brasil", flag: "🇧🇷", minLength: 10, maxLength: 11 },
  { code: "56", name: "Chile", flag: "🇨🇱", minLength: 9, maxLength: 9 },
  { code: "57", name: "Colombia", flag: "🇨🇴", minLength: 10, maxLength: 10 },
  { code: "593", name: "Ecuador", flag: "🇪🇨", minLength: 9, maxLength: 9 },
  { code: "594", name: "Guayana Francesa", flag: "🇬🇫", minLength: 9, maxLength: 9 },
  { code: "592", name: "Guyana", flag: "🇬🇾", minLength: 7, maxLength: 7 },
  { code: "595", name: "Paraguay", flag: "🇵🇾", minLength: 9, maxLength: 9 },
  { code: "51", name: "Perú", flag: "🇵🇪", minLength: 9, maxLength: 9 },
  { code: "597", name: "Surinam", flag: "🇸🇷", minLength: 7, maxLength: 7 },
  { code: "598", name: "Uruguay", flag: "🇺🇾", minLength: 8, maxLength: 9 },
  { code: "58", name: "Venezuela", flag: "🇻🇪", minLength: 10, maxLength: 10 },
  
  // Caribbean
  { code: "1787", name: "Puerto Rico", flag: "🇵🇷", minLength: 7, maxLength: 7 },
  { code: "1809", name: "República Dominicana", flag: "🇩🇴", minLength: 7, maxLength: 7 },
  { code: "53", name: "Cuba", flag: "🇨🇺", minLength: 8, maxLength: 8 },
  { code: "1876", name: "Jamaica", flag: "🇯🇲", minLength: 7, maxLength: 7 },
  { code: "509", name: "Haití", flag: "🇭🇹", minLength: 8, maxLength: 8 },
  
  // Europe
  { code: "49", name: "Alemania", flag: "🇩🇪", minLength: 10, maxLength: 11 },
  { code: "43", name: "Austria", flag: "🇦🇹", minLength: 10, maxLength: 11 },
  { code: "32", name: "Bélgica", flag: "🇧🇪", minLength: 9, maxLength: 9 },
  { code: "359", name: "Bulgaria", flag: "🇧🇬", minLength: 9, maxLength: 9 },
  { code: "385", name: "Croacia", flag: "🇭🇷", minLength: 9, maxLength: 9 },
  { code: "45", name: "Dinamarca", flag: "🇩🇰", minLength: 8, maxLength: 8 },
  { code: "421", name: "Eslovaquia", flag: "🇸🇰", minLength: 9, maxLength: 9 },
  { code: "386", name: "Eslovenia", flag: "🇸🇮", minLength: 8, maxLength: 8 },
  { code: "34", name: "España", flag: "🇪🇸", minLength: 9, maxLength: 9 },
  { code: "372", name: "Estonia", flag: "🇪🇪", minLength: 7, maxLength: 8 },
  { code: "358", name: "Finlandia", flag: "🇫🇮", minLength: 9, maxLength: 10 },
  { code: "33", name: "Francia", flag: "🇫🇷", minLength: 9, maxLength: 9 },
  { code: "30", name: "Grecia", flag: "🇬🇷", minLength: 10, maxLength: 10 },
  { code: "36", name: "Hungría", flag: "🇭🇺", minLength: 9, maxLength: 9 },
  { code: "353", name: "Irlanda", flag: "🇮🇪", minLength: 9, maxLength: 9 },
  { code: "354", name: "Islandia", flag: "🇮🇸", minLength: 7, maxLength: 7 },
  { code: "39", name: "Italia", flag: "🇮🇹", minLength: 10, maxLength: 10 },
  { code: "371", name: "Letonia", flag: "🇱🇻", minLength: 8, maxLength: 8 },
  { code: "370", name: "Lituania", flag: "🇱🇹", minLength: 8, maxLength: 8 },
  { code: "352", name: "Luxemburgo", flag: "🇱🇺", minLength: 9, maxLength: 9 },
  { code: "356", name: "Malta", flag: "🇲🇹", minLength: 8, maxLength: 8 },
  { code: "31", name: "Países Bajos", flag: "🇳🇱", minLength: 9, maxLength: 9 },
  { code: "48", name: "Polonia", flag: "🇵🇱", minLength: 9, maxLength: 9 },
  { code: "351", name: "Portugal", flag: "🇵🇹", minLength: 9, maxLength: 9 },
  { code: "44", name: "Reino Unido", flag: "🇬🇧", minLength: 10, maxLength: 10 },
  { code: "420", name: "República Checa", flag: "🇨🇿", minLength: 9, maxLength: 9 },
  { code: "40", name: "Rumania", flag: "🇷🇴", minLength: 9, maxLength: 9 },
  { code: "46", name: "Suecia", flag: "🇸🇪", minLength: 9, maxLength: 10 },
];
