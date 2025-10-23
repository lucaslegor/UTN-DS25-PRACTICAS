// Importar imágenes de los libros
import codigoDaVinci from '../assets/Images/codigoDaVinci.webp';
import cienAños from '../assets/Images/cienAños.webp';
import donQuijote from '../assets/Images/donquijote.webp';
import orgulloPrejuicio from '../assets/Images/orgullo-y-prejuicio.jpg';
import libro1984 from '../assets/Images/1984.webp';
import principito from '../assets/Images/principito.webp';
import ciencia from '../assets/Images/ciencia.jpg';
import historiaTiempo from '../assets/Images/historia del tiempo.webp';
import genEgoista from '../assets/Images/genegoista.webp';
import cosmos from '../assets/Images/cosmos.webp';
import origen from '../assets/Images/origen.webp';
import dobleHelice from '../assets/Images/doble helice.jpg';
import segundaGuerra from '../assets/Images/segunda guerra.webp';
import loboSuelto from '../assets/Images/lobo suelto.jpg';
import cruyff from '../assets/Images/cruyff.webp';
import locoFutbol from '../assets/Images/locofutbol.webp';
import boxeo from '../assets/Images/del-boxeo.jpg';
import nacidosCorrer from '../assets/Images/nacidos-para-correr.jpg';
import natacion from '../assets/Images/natacion.webp';

export const librosPorTema = {
  literatura: [
    {
      titulo: "El Código Da Vinci",
      autor: "Dan Brown",
      descripcion: "Una trepidante novela de misterio que combina arte, religión y conspiración en una trama fascinante.",
      imagen: codigoDaVinci,
      precio: 29999
    },
    {
      titulo: "Cien Años de Soledad",
      autor: "Gabriel García Márquez",
      descripcion: "La obra maestra del realismo mágico que narra la historia de la familia Buendía a lo largo de siete generaciones.",
      imagen: cienAños,
      precio: 34999
    },
    {
      titulo: "Don Quijote de la Mancha",
      autor: "Miguel de Cervantes",
      descripcion: "La obra cumbre de la literatura española que narra las aventuras del ingenioso hidalgo Don Quijote.",
      imagen: donQuijote,
      precio: 39999
    },
    {
      titulo: "Orgullo y Prejuicio",
      autor: "Jane Austen",
      descripcion: "Una historia de amor y superación de prejuicios en la Inglaterra del siglo XIX.",
      imagen: orgulloPrejuicio,
      precio: 44999
    },
    {
      titulo: "1984",
      autor: "George Orwell",
      descripcion: "Una distopía que explora los peligros del totalitarismo y la vigilancia masiva.",
      imagen: libro1984,
      precio: 49999
    },
    {
      titulo: "El Principito",
      autor: "Antoine de Saint-Exupéry",
      descripcion: "Un cuento poético que explora temas universales como el amor, la amistad y el sentido de la vida.",
      imagen: principito,
      precio: 54999
    }
  ],
  ciencia: [
    {
      titulo: "El mundo como yo lo veo",
      autor: "Albert Einstein",
      descripcion: "Una colección de ensayos que revelan la visión del mundo del genio de la física.",
      imagen: ciencia,
      precio: 59999
    },
    {
      titulo: "Breve Historia del Tiempo",
      autor: "Stephen Hawking",
      descripcion: "Un viaje fascinante por los misterios del universo y la física moderna.",
      imagen: historiaTiempo,
      precio: 64999
    },
    {
      titulo: "El Gen Egoísta",
      autor: "Richard Dawkins",
      descripcion: "Una revolucionaria teoría sobre la evolución y el comportamiento animal.",
      imagen: genEgoista,
      precio: 69999
    },
    {
      titulo: "Cosmos",
      autor: "Carl Sagan",
      descripcion: "Un viaje épico a través del universo y la historia de la ciencia.",
      imagen: cosmos,
      precio: 74999
    },
    {
      titulo: "El Origen de las Especies",
      autor: "Charles Darwin",
      descripcion: "La obra fundamental que revolucionó nuestra comprensión de la evolución.",
      imagen: origen,
      precio: 79999
    },
    {
      titulo: "La Doble Hélice",
      autor: "James D. Watson",
      descripcion: "El relato personal del descubrimiento de la estructura del ADN.",
      imagen: dobleHelice,
      precio: 54999
    }
  ],
  historia: [
    {
      titulo: "La Segunda Guerra Mundial",
      autor: "Martin Gilbert",
      descripcion: "Un análisis completo del conflicto global que cambió el mundo.",
      imagen: segundaGuerra,
      precio: 59999
    }
  ],
  deportes: [
    {
      titulo: "Un Lobo suelto",
      autor: "Daniel Krupa",
      descripcion: "Gimnasia una pasión y un estilo de vida incomprendido para muchos",
      imagen: loboSuelto,
      precio: 34999
    },
    {
      titulo: "Mi Turno, Fútbol Total",
      autor: "Johan Cruyff",
      descripcion: "La filosofía del fútbol según uno de los más grandes jugadores de la historia.",
      imagen: cruyff,
      precio: 39999
    },
    {
      titulo: "Los 7 locos del futbol",
      autor: "Ricardo Gotta",
      descripcion: "Es una búsqueda por esa característica biográfica, más cerca de la anécdota.",
      imagen: locoFutbol,
      precio: 44999
    },
    {
      titulo: "El Boxeo",
      autor: "Joyce Carol Oates",
      descripcion: "Un análisis literario y cultural del noble arte del boxeo.",
      imagen: boxeo,
      precio: 49999
    },
    {
      titulo: "Nacido para Correr",
      autor: "Christopher McDougall",
      descripcion: "Una fascinante exploración de la capacidad humana para correr.",
      imagen: nacidosCorrer,
      precio: 54999
    },
    {
      titulo: "La Natación",
      autor: "Terry Laughlin",
      descripcion: "Técnicas y métodos para mejorar tu estilo de natación.",
      imagen: natacion,
      precio: 59999
    }
  ]
};
