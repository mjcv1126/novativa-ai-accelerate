
import { useState, useEffect } from 'react';

export interface FakeStudent {
  id: number;
  name: string;
  country: string;
  image: string;
}

const fakeStudents: FakeStudent[] = [
  { id: 1, name: "María González", country: "México", image: "https://images.unsplash.com/photo-1494790108755-2616b612b04c?w=100&h=100&fit=crop&crop=face" },
  { id: 2, name: "Carlos Rodríguez", country: "Colombia", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" },
  { id: 3, name: "Ana López", country: "Argentina", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" },
  { id: 4, name: "Diego Martínez", country: "Chile", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
  { id: 5, name: "Sofia Herrera", country: "Perú", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face" },
  { id: 6, name: "Roberto Silva", country: "Ecuador", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face" },
  { id: 7, name: "Lucia Morales", country: "Uruguay", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face" },
  { id: 8, name: "Andrés Castillo", country: "Paraguay", image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=100&h=100&fit=crop&crop=face" },
  { id: 9, name: "Valentina Torres", country: "Bolivia", image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face" },
  { id: 10, name: "Fernando Vega", country: "Venezuela", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" },
  { id: 11, name: "Camila Ruiz", country: "Costa Rica", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face" },
  { id: 12, name: "Pablo Mendoza", country: "Panamá", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face" },
  { id: 13, name: "Isabella García", country: "Guatemala", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face" },
  { id: 14, name: "Joaquín Ramírez", country: "Honduras", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" },
  { id: 15, name: "Daniela Pérez", country: "El Salvador", image: "https://images.unsplash.com/photo-1494790108755-2616b612b04c?w=100&h=100&fit=crop&crop=face" },
  { id: 16, name: "Sebastián Cruz", country: "Nicaragua", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
  { id: 17, name: "Mariana Flores", country: "República Dominicana", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" },
  { id: 18, name: "Alejandro Vargas", country: "México", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face" },
  { id: 19, name: "Natalia Jiménez", country: "Colombia", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face" },
  { id: 20, name: "Eduardo Santos", country: "Argentina", image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=100&h=100&fit=crop&crop=face" },
  { id: 21, name: "Adriana Castro", country: "Chile", image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face" },
  { id: 22, name: "Gabriel Moreno", country: "Perú", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" },
  { id: 23, name: "Patricia Reyes", country: "Ecuador", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face" },
  { id: 24, name: "Ricardo Guerrero", country: "Uruguay", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face" },
  { id: 25, name: "Carmen Delgado", country: "Paraguay", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face" },
  { id: 26, name: "Óscar Medina", country: "Bolivia", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
  { id: 27, name: "Fernanda Aguilar", country: "Venezuela", image: "https://images.unsplash.com/photo-1494790108755-2616b612b04c?w=100&h=100&fit=crop&crop=face" },
  { id: 28, name: "Manuel Ortega", country: "Costa Rica", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face" },
  { id: 29, name: "Gloria Romero", country: "Panamá", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" },
  { id: 30, name: "Víctor Núñez", country: "Guatemala", image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=100&h=100&fit=crop&crop=face" },
  { id: 31, name: "Esperanza León", country: "Honduras", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face" },
  { id: 32, name: "Raúl Cabrera", country: "El Salvador", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" },
  { id: 33, name: "Mónica Herrera", country: "Nicaragua", image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face" },
  { id: 34, name: "Enrique Valdez", country: "República Dominicana", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face" },
  { id: 35, name: "Beatriz Soto", country: "México", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face" },
  { id: 36, name: "Ignacio Ramos", country: "Colombia", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
  { id: 37, name: "Rocío Peña", country: "Argentina", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face" },
  { id: 38, name: "Germán Figueroa", country: "Chile", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face" },
  { id: 39, name: "Leticia Campos", country: "Perú", image: "https://images.unsplash.com/photo-1494790108755-2616b612b04c?w=100&h=100&fit=crop&crop=face" },
  { id: 40, name: "Mauricio Espinoza", country: "Ecuador", image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=100&h=100&fit=crop&crop=face" },
  { id: 41, name: "Pilar Sandoval", country: "Uruguay", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" },
  { id: 42, name: "Rubén Cortés", country: "Paraguay", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" },
  { id: 43, name: "Silvia Rojas", country: "Bolivia", image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face" },
  { id: 44, name: "Tomás Miranda", country: "Venezuela", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face" },
  { id: 45, name: "Verónica Arias", country: "Costa Rica", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face" },
  { id: 46, name: "Álvaro Mendez", country: "Panamá", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
  { id: 47, name: "Amparo Fuentes", country: "Guatemala", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face" },
  { id: 48, name: "Esteban Quintero", country: "Honduras", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face" },
  { id: 49, name: "Dolores Vera", country: "El Salvador", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face" },
  { id: 50, name: "Nicolás Pacheco", country: "Nicaragua", image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=100&h=100&fit=crop&crop=face" },
  { id: 51, name: "Rosa Salinas", country: "República Dominicana", image: "https://images.unsplash.com/photo-1494790108755-2616b612b04c?w=100&h=100&fit=crop&crop=face" },
  { id: 52, name: "Armando Villa", country: "México", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" },
  { id: 53, name: "Claudia Montes", country: "Colombia", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" },
  { id: 54, name: "Héctor Navarro", country: "Argentina", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face" },
  { id: 55, name: "Yolanda Carvajal", country: "Chile", image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face" },
  { id: 56, name: "Benjamín Parra", country: "Perú", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
  { id: 57, name: "Graciela Lara", country: "Ecuador", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face" },
  { id: 58, name: "Emilio Hidalgo", country: "Uruguay", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face" },
  { id: 59, name: "Norma Escalante", country: "Paraguay", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face" },
  { id: 60, name: "Jaime Contreras", country: "Bolivia", image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=100&h=100&fit=crop&crop=face" },
  { id: 61, name: "Elsa Bermúdez", country: "Venezuela", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face" },
  { id: 62, name: "Rodrigo Ochoa", country: "Costa Rica", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" },
  { id: 63, name: "Alicia Maldonado", country: "Panamá", image: "https://images.unsplash.com/photo-1494790108755-2616b612b04c?w=100&h=100&fit=crop&crop=face" },
  { id: 64, name: "Lorenzo Ibarra", country: "Guatemala", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face" },
  { id: 65, name: "Teresa Galván", country: "Honduras", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" },
  { id: 66, name: "Arturo Castellanos", country: "El Salvador", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
  { id: 67, name: "Blanca Morales", country: "Nicaragua", image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face" },
  { id: 68, name: "César Molina", country: "República Dominicana", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face" },
  { id: 69, name: "Lourdes Estrada", country: "México", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face" },
  { id: 70, name: "Ramón Guzmán", country: "Colombia", image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=100&h=100&fit=crop&crop=face" },
  { id: 71, name: "Elena Domínguez", country: "Argentina", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face" },
  { id: 72, name: "Francisco Acosta", country: "Chile", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" },
  { id: 73, name: "Guadalupe Serrano", country: "Perú", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face" },
  { id: 74, name: "Iván Paredes", country: "Ecuador", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face" },
  { id: 75, name: "Josefina Bravo", country: "Uruguay", image: "https://images.unsplash.com/photo-1494790108755-2616b612b04c?w=100&h=100&fit=crop&crop=face" },
  { id: 76, name: "Leopoldo Vásquez", country: "Paraguay", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
  { id: 77, name: "Magdalena Cabrera", country: "Bolivia", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" },
  { id: 78, name: "Norberto Luna", country: "Venezuela", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face" },
  { id: 79, name: "Olga Téllez", country: "Costa Rica", image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face" },
  { id: 80, name: "Patricio Zavala", country: "Panamá", image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=100&h=100&fit=crop&crop=face" },
  { id: 81, name: "Remedios Córdoba", country: "Guatemala", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face" },
  { id: 82, name: "Salvador Arroyo", country: "Honduras", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" },
  { id: 83, name: "Úrsula Mercado", country: "El Salvador", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face" },
  { id: 84, name: "Wilfredo Ayala", country: "Nicaragua", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face" },
  { id: 85, name: "Ximena Herrera", country: "República Dominicana", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face" },
  { id: 86, name: "Zacarías Mejía", country: "México", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
  { id: 87, name: "Amelia Chávez", country: "Colombia", image: "https://images.unsplash.com/photo-1494790108755-2616b612b04c?w=100&h=100&fit=crop&crop=face" },
  { id: 88, name: "Bautista Franco", country: "Argentina", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face" },
  { id: 89, name: "Celestino Robles", country: "Chile", image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=100&h=100&fit=crop&crop=face" },
  { id: 90, name: "Delfina Solís", country: "Perú", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" },
  { id: 91, name: "Ezequiel Barrera", country: "Ecuador", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" },
  { id: 92, name: "Florencia Cuevas", country: "Uruguay", image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face" },
  { id: 93, name: "Gonzalo Ríos", country: "Paraguay", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face" },
  { id: 94, name: "Hortensia Villalobos", country: "Bolivia", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face" },
  { id: 95, name: "Isaías Montoya", country: "Venezuela", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
  { id: 96, name: "Jacinta Muñoz", country: "Costa Rica", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face" },
  { id: 97, name: "Lamberto Varela", country: "Panamá", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face" },
  { id: 98, name: "Marisol Cervantes", country: "Guatemala", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face" },
  { id: 99, name: "Néstor Aguirre", country: "Honduras", image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=100&h=100&fit=crop&crop=face" },
  { id: 100, name: "Otilia Delgado", country: "El Salvador", image: "https://images.unsplash.com/photo-1494790108755-2616b612b04c?w=100&h=100&fit=crop&crop=face" }
];

export const useEnrollmentNotifications = () => {
  const [currentNotification, setCurrentNotification] = useState<FakeStudent | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showRandomNotification = () => {
      const randomIndex = Math.floor(Math.random() * fakeStudents.length);
      const student = fakeStudents[randomIndex];
      
      setCurrentNotification(student);
      setIsVisible(true);
      
      // Hide notification after 4 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 4000);
    };

    // Show first notification after 3 seconds
    const initialTimeout = setTimeout(showRandomNotification, 3000);
    
    // Then show every 10 seconds
    const interval = setInterval(showRandomNotification, 10000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  return {
    currentNotification,
    isVisible
  };
};
