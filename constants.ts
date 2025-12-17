import { Level } from './types';

export const MAX_HP = 100;
export const DAMAGE_PER_MISTAKE = 20;
export const HINT_COST = 50;

export const LEVELS: Level[] = [
  {
    id: 1,
    title: "Nivel 1: Fundamentos y NumPy",
    description: "La base de todo. Aprende a organizar los números como si fueran soldados en fila.",
    monsterName: "Golem de Bloques",
    monsterEmoji: "🗿",
    questions: [
      {
        id: 101,
        text: "¿Cuál es el orden lógico para trabajar con datos?",
        options: [
          "Modelar -> Limpiar -> Recoger -> Mirar",
          "Recoger -> Entender -> Limpiar -> Explorar -> Predecir",
          "Explorar -> Recoger -> Limpiar -> Predecir",
          "Limpiar -> Predecir -> Recoger -> Entender"
        ],
        correctAnswer: 1,
        explanation: "Piénsalo como cocinar: 1. Compras ingredientes (Recoger), 2. Ves qué compraste (Entender), 3. Lavas las verduras (Limpiar), 4. Pruebas sabores (Explorar) y 5. Sirves el plato (Predecir/Modelar).",
        hint: "No puedes lavar (limpiar) una manzana que todavía no has comprado (recogido)."
      },
      {
        id: 102,
        text: "¿Por qué NumPy (Arrays) es mucho más rápido que las Listas normales de Python?",
        options: [
          "Porque está escrito en Java.",
          "Porque las listas de Python no aceptan decimales.",
          "Porque procesa todo el bloque de números a la vez (como un tren vs coches individuales).",
          "Porque usa la tarjeta gráfica automáticamente."
        ],
        correctAnswer: 2,
        explanation: "Imagina una lista de Python como 10 coches: cada uno tiene su propio motor y conductor (lento). Un Array de NumPy es como un tren con 10 vagones: un solo motor mueve todo a la vez. Eso se llama 'Vectorización'.",
        hint: "Python normal va paso a paso. NumPy mueve todo el bloque de memoria de golpe."
      },
      {
        id: 103,
        text: "Mira este código. ¿Qué resultado nos da `arr.shape` (la forma)?",
        codeSnippet: `import numpy as np
# Imagina un edificio de apartamentos
arr = np.array([
  [1, 2, 3],  # Piso 1 (3 ventanas)
  [4, 5, 6]   # Piso 2 (3 ventanas)
])
print(arr.shape)`,
        options: [
          "(3, 2)",
          "(2, 3)",
          "6",
          "(2,)"
        ],
        correctAnswer: 1,
        explanation: "La propiedad `.shape` nos dice las dimensiones. Primero contamos las filas (los pisos del edificio) y luego las columnas (las ventanas por piso). Tenemos 2 filas y 3 columnas: (2, 3).",
        hint: "Cuenta primero hacia abajo (filas), luego hacia la derecha (columnas)."
      },
      {
        id: 104,
        text: "¿Qué propiedad usas si quieres saber la CANTIDAD TOTAL de números que hay en tu array?",
        options: [
          ".count()",
          ".length",
          ".ndim",
          ".size"
        ],
        correctAnswer: 3,
        explanation: "Usamos `.size` (tamaño). Si tienes una caja de huevos de 2 filas y 6 columnas, `.shape` es (2,6), pero `.size` es 12 (el total de huevos).",
        hint: "Es la palabra en inglés para 'Tamaño'."
      },
      {
        id: 105,
        text: "¿Qué es el 'Broadcasting' (Retransmisión) en NumPy?",
        options: [
          "Enviar datos por Wifi.",
          "Convertir números a letras.",
          "El truco de NumPy para operar arrays de distintos tamaños (estira el pequeño).",
          "Borrar los datos."
        ],
        correctAnswer: 2,
        explanation: "Imagina que quieres sumar 1 a una lista de 100 números. En lugar de escribir 1 cien veces, el Broadcasting 'estira' ese 1 imaginariamente para que coincida con los 100 números y se sume a cada uno.",
        hint: "Es como 'estirar' un array pequeño para que cubra al grande."
      },
      {
        id: 106,
        text: "¿Qué función crea un array vacío lleno de ceros (útil para empezar)?",
        codeSnippet: "np._______((3, 4))",
        options: [
          "np.vacio",
          "np.zeros",
          "np.nulos",
          "np.nada"
        ],
        correctAnswer: 1,
        explanation: "`np.zeros` crea una plantilla llena de ceros. Es como comprar una libreta en blanco antes de empezar a escribir datos reales.",
        hint: "Es el número 0 en inglés y en plural."
      },
      {
        id: 107,
        text: "¿Cuál es la diferencia entre `np.arange(10)` y `range(10)`?",
        options: [
          "Son idénticos.",
          "arange te devuelve un Array potente de NumPy, range es una lista simple de Python.",
          "range permite decimales, arange no.",
          "arange es más lento."
        ],
        correctAnswer: 1,
        explanation: "Aunque ambos generan números del 0 al 9, `np.arange` te da un Array de NumPy listo para hacer cálculos matemáticos rápidos. `range` es nativo de Python y es más básico.",
        hint: "Uno tiene el prefijo 'np' (NumPy) y crea Arrays, el otro no."
      },
      {
        id: 108,
        text: "Si tenemos la lista `[10, 20, 30, 40]`. ¿Qué nos da el corte `[1:3]`?",
        options: [
          "[10, 20, 30]",
          "[20, 30]",
          "[20, 30, 40]",
          "[10, 20]"
        ],
        correctAnswer: 1,
        explanation: "En Python, el primer número (1) se INCLUYE, pero el último (3) se EXCLUYE. Posición 0=10, Posición 1=20 (entra), Posición 2=30 (entra), Posición 3=40 (fuera). Resultado: 20 y 30.",
        hint: "Empieza en la posición 1. Para ANTES de llegar a la posición 3."
      },
      {
        id: 109,
        text: "NumPy es estricto. ¿Qué pasa si intentas meter un decimal `3.5` en un array de enteros `[1, 2]`?",
        options: [
          "Convierte TODO a enteros (borra el decimal).",
          "Convierte TODO a decimales (float) para no perder información.",
          "Convierte todo a texto.",
          "Da error y se cierra."
        ],
        correctAnswer: 1,
        explanation: "NumPy necesita que todos los datos sean iguales para ser rápido. Ante la duda, elige el tipo más completo. Como el 3.5 tiene decimales, convierte el 1 y el 2 en 1.0 y 2.0 (Floats).",
        hint: "El sistema prefiere 'promocionar' los enteros a decimales antes que borrar la parte '.5' del dato nuevo."
      },
      {
        id: 110,
        text: "¿Sobre qué otra librería está construido Pandas?",
        options: [
          "Matplotlib",
          "NumPy",
          "Excel",
          "Word"
        ],
        correctAnswer: 1,
        explanation: "Pandas es básicamente una versión 'de lujo' de NumPy. Usa los motores de NumPy por debajo, pero le añade etiquetas (nombres de columnas) para que sea fácil de usar para humanos.",
        hint: "Es la librería que acabamos de estudiar en este nivel. La de los Arrays."
      }
    ]
  },
  {
    id: 2,
    title: "Nivel 2: Estadística Visual",
    description: "Detecta las mentiras en los datos. No todo promedio es la verdad.",
    monsterName: "Dragón de la Curva",
    monsterEmoji: "🐉",
    questions: [
      {
        id: 201,
        text: "Imagina una clase de preescolar. Todos miden 1 metro, pero entra un gigante de 5 metros. ¿Qué pasa con el Promedio (Media)?",
        options: [
          "No cambia.",
          "Se dispara hacia arriba y nos engaña (parece que los niños son muy altos).",
          "Baja drásticamente.",
          "Se rompe la calculadora."
        ],
        correctAnswer: 1,
        explanation: "El promedio es muy sensible a los extremos. Si metes un gigante, el promedio dirá que los niños miden 2 metros, lo cual es falso. Por eso a veces el promedio miente.",
        hint: "El gigante 'arrastra' el promedio hacia él."
      },
      {
        id: 202,
        text: "Siguiendo el ejemplo anterior, ¿qué medida NO se deja engañar por el gigante?",
        options: [
          "La Media (Promedio)",
          "La Moda",
          "La Mediana",
          "El Rango"
        ],
        correctAnswer: 2,
        explanation: "La Mediana ordena a todos por altura y coge al que está justo en el medio. Como en el medio sigue habiendo un niño normal, el gigante no afecta al resultado. La mediana es 'robusta'.",
        hint: "Es el valor que está justo en el centro de la fila."
      },
      {
        id: 203,
        text: "¿Qué gráfico usarías para ver cuántas personas hay en diferentes rangos de edad (de 0-10, 11-20, etc.)?",
        options: [
          "Scatterplot (Puntos)",
          "Histograma (Barras pegadas)",
          "Pie Chart (Quesito)",
          "Mapa"
        ],
        correctAnswer: 1,
        explanation: "El Histograma agrupa los datos en 'cubos' (rangos) y levanta una barra según cuántos datos caen en ese cubo. Es ideal para ver distribuciones.",
        hint: "Necesitas barras que muestren la 'historia' de la distribución."
      },
      {
        id: 204,
        text: "Si decimos que la venta de helados y la temperatura tienen una 'Correlación Positiva', ¿qué significa?",
        options: [
          "Que no tienen nada que ver.",
          "Que cuando hace más calor, se venden MÁS helados.",
          "Que cuando hace más calor, se venden MENOS helados.",
          "Que los helados provocan calor."
        ],
        correctAnswer: 1,
        explanation: "Correlación Positiva significa que ambas variables se mueven en la misma dirección. Si sube el calor, suben las ventas. (Negativa sería: si sube la lluvia, bajan las ventas).",
        hint: "Positivo = Las dos suben juntas de la mano."
      },
      {
        id: 205,
        text: "¿Qué es un 'Outlier'?",
        options: [
          "Un dato mentiroso.",
          "Un valor que es muy diferente a los demás (atípico).",
          "El mejor dato de todos.",
          "Un error de código."
        ],
        correctAnswer: 1,
        explanation: "Un Outlier (valor atípico) es un dato que se sale de la norma. Puede ser un error (alguien escribió 200 años de edad) o un dato real curioso (un millonario en un barrio obrero).",
        hint: "Es la oveja negra, el dato que se sale del rebaño."
      },
      {
        id: 206,
        text: "¿Qué es la Desviación Estándar (Standard Deviation)?",
        options: [
          "Un error estándar.",
          "Cuánto se alejan, en promedio, los datos del centro.",
          "El valor máximo menos el mínimo.",
          "La suma de todos los datos."
        ],
        correctAnswer: 1,
        explanation: "Mide la dispersión. Si la desviación es baja, todos los datos están pegaditos al promedio (como huevos en una caja). Si es alta, están muy esparcidos (como canicas en el suelo).",
        hint: "Piensa en qué tanto se 'desvían' o separan los datos de la media."
      },
      {
        id: 207,
        text: "¿Por qué separamos los datos en 'Entrenamiento' (Train) y 'Prueba' (Test)?",
        options: [
          "Para ahorrar espacio.",
          "Para ver si el modelo realmente aprendió o solo memorizó las respuestas.",
          "Para confundir al ordenador.",
          "No hace falta, es una manía de los programadores."
        ],
        correctAnswer: 1,
        explanation: "Es como estudiar para un examen. Si te doy las preguntas del examen para estudiar (Train) y luego te pongo EXACTAMENTE las mismas preguntas en el examen, sacarás un 10 pero no habrás aprendido. Necesito probarte con preguntas nuevas (Test).",
        hint: "No tiene mérito acertar preguntas que ya te sabías de memoria."
      },
      {
        id: 208,
        text: "¿Qué gráfico usas para ver si hay relación entre Altura y Peso (dos números)?",
        options: [
          "Gráfico de Barras",
          "Diagrama de Dispersión (Nube de puntos)",
          "Histograma",
          "Mapa de calor"
        ],
        correctAnswer: 1,
        explanation: "El diagrama de dispersión (Scatterplot) pinta un punto por cada persona. Si los puntos forman una línea hacia arriba, hay relación. Es el mejor detector de patrones entre dos variables.",
        hint: "Imaginas puntos dispersos en un papel milimetrado."
      },
      {
        id: 209,
        text: "¿Qué significa 'Imputar' valores nulos?",
        options: [
          "Acusarlos de un delito.",
          "Borrarlos para siempre.",
          "Rellenar los huecos vacíos con un valor lógico (como el promedio).",
          "Dejarlos como están."
        ],
        correctAnswer: 2,
        explanation: "A veces no podemos permitirnos borrar datos. Imputar es 'inventarnos' el dato que falta usando la lógica (ej: si no sé tu edad, pondré la edad promedio de la clase para no romper el cálculo).",
        hint: "Es lo contrario de borrar. Es rellenar o parchar el hueco."
      },
      {
        id: 210,
        text: "Si divides tus datos ordenados en 4 partes iguales, ¿cómo se llaman los cortes?",
        options: [
          "Tercios",
          "Cuartiles",
          "Porcentajes",
          "Medianas"
        ],
        correctAnswer: 1,
        explanation: "Cuartiles (de Cuarto). Q1 es el 25%, Q2 es el 50% (la Mediana) y Q3 es el 75%. Sirven para ver dónde se concentra la gente.",
        hint: "Viene de la palabra 'Cuarto' (1/4)."
      }
    ]
  },
  {
    id: 3,
    title: "Nivel 3: Pandas en Acción",
    description: "La herramienta suprema. Tablas, filtros y transformaciones.",
    monsterName: "Hydra de Excel",
    monsterEmoji: "🐍",
    questions: [
      {
        id: 301,
        text: "¿Qué es, sencillamente, un DataFrame de Pandas?",
        options: [
          "Un gráfico 3D.",
          "Una tabla supervitaminada (como una hoja de Excel programable).",
          "Una lista de correos.",
          "Un servidor de internet."
        ],
        correctAnswer: 1,
        explanation: "Piensa en un DataFrame siempre como una Hoja de Excel. Tiene filas, columnas y nombres. La diferencia es que puedes programarla para procesar millones de filas en segundos.",
        hint: "Es lo que usas en Python cuando echas de menos el Excel."
      },
      {
        id: 302,
        text: "Tienes una tabla gigante. ¿Cómo ves solo las primeras 5 filas para hacerte una idea?",
        options: [
          "df.mirar()",
          "df.head()",
          "df.top()",
          "df.inicio()"
        ],
        correctAnswer: 1,
        explanation: "El método `.head()` (cabeza) te muestra la cabecera del archivo, por defecto las 5 primeras líneas. Es lo primero que hace todo Data Scientist al cargar datos.",
        hint: "En inglés, es la parte superior del cuerpo humano."
      },
      {
        id: 303,
        text: "¿Cómo preguntamos: '¿Hay algún dato vacío (hueco) en mi tabla?'",
        codeSnippet: "df._________().sum()",
        options: [
          "is_empty",
          "vacios",
          "isna",
          "error"
        ],
        correctAnswer: 2,
        explanation: "`isna()` (Is Not Available / Es NA) devuelve VERDADERO si hay un hueco. Al sumar, cuenta cuántos huecos hay en total.",
        hint: "Son las siglas de 'Is Not Available' (No disponible) o 'Is NA'."
      },
      {
        id: 304,
        text: "Queremos el salario promedio POR departamento. ¿Qué comando mágico hace esto?",
        options: [
          "df.ordenar('departamento')",
          "df.groupby('departamento')['salario'].mean()",
          "df.pivotear()",
          "df.filtrar()"
        ],
        correctAnswer: 1,
        explanation: "`groupby` (agrupar por) es como separar la ropa en cestas: Pone a todos los de Ventas en una cesta, a los de IT en otra... y luego calcula el promedio de cada cesta por separado.",
        hint: "Busca la opción que dice literalmente 'agrupar por'."
      },
      {
        id: 305,
        text: "Tus fechas están guardadas como texto ('2023-01-01'). ¿Cómo las conviertes a fechas reales?",
        codeSnippet: "pd._________(df['fecha'])",
        options: [
          "to_calendar",
          "to_string",
          "to_datetime",
          "fix_date"
        ],
        correctAnswer: 2,
        explanation: "`pd.to_datetime` convierte texto tonto en objetos de Fecha inteligentes. Así luego puedes preguntar '¿Qué mes es?' o '¿Qué día de la semana fue?'.",
        hint: "Traduce 'a fecha y hora' al inglés."
      },
      {
        id: 306,
        text: "¿Cómo filtras para quedarte SOLO con las ventas mayores a 100?",
        codeSnippet: "df[ _________ ]",
        options: [
          "df['ventas'] > 100",
          "df.ventas.big(100)",
          "filtro > 100",
          "df.borrar_pequeños(100)"
        ],
        correctAnswer: 0,
        explanation: "Pones la condición dentro de los corchetes. `df['ventas'] > 100` crea una lista de Si/No. Pandas usa esa lista para mostrarte solo los que dicen Sí.",
        hint: "Dentro del corchete debes poner la condición lógica: Columna > Número."
      },
      {
        id: 307,
        text: "¿Qué función cuenta cuántas veces aparece cada valor? (Ej: Cuántos 'Hombres' y cuántas 'Mujeres')",
        codeSnippet: "df['genero']._________()",
        options: [
          "contar()",
          "unique()",
          "value_counts()",
          "sumar_todo()"
        ],
        correctAnswer: 2,
        explanation: "`value_counts()` es la función reina. Te dice: 'Hombres: 50, Mujeres: 40'. Cuenta los valores únicos y te da el ranking.",
        hint: "Cuenta los valores (Counts Values)."
      },
      {
        id: 308,
        text: "Quieres borrar la columna 'temp' porque no sirve. ¿Qué usas?",
        options: [
          "df.borrar('temp')",
          "df.drop('temp', axis=1)",
          "df.olvidar('temp')",
          "df.limpiar('temp')"
        ],
        correctAnswer: 1,
        explanation: "`drop` (soltar/tirar) sirve para eliminar. `axis=1` significa 'columna' (si fuera axis=0 borrarías una fila).",
        hint: "En inglés: Soltar o dejar caer."
      },
      {
        id: 309,
        text: "Tienes dos tablas (Clientes y Pedidos) y quieres unirlas usando el ID del cliente. ¿Cómo se llama esa operación?",
        options: [
          "Pegamento",
          "Merge (Fusión)",
          "Append (Añadir)",
          "Mix (Mezcla)"
        ],
        correctAnswer: 1,
        explanation: "`merge` (o Join en SQL) es la operación de buscar coincidencias entre dos tablas y crear una super-tabla con la información de ambas combinada.",
        hint: "Es el término estándar para 'Fusión' de datos."
      },
      {
        id: 310,
        text: "Al guardar tu CSV limpio, Pandas suele añadir una columna extra con números (0,1,2...). ¿Cómo evitas eso?",
        codeSnippet: "df.to_csv('final.csv', _________)",
        options: [
          "index=False",
          "clean=True",
          "numbers=None",
          "header=False"
        ],
        correctAnswer: 0,
        explanation: "Esos números son el 'índice'. Si no lo necesitas, debes decirle explícitamente `index=False` para que no lo escriba en el archivo.",
        hint: "Tienes que decirle Falso al Índice."
      }
    ]
  },
  {
    id: 4,
    title: "Nivel 4: Análisis Exploratorio (EDA)",
    description: "El Guardián del Dataset exige respuestas. Conoce tus datos antes de modelar.",
    monsterName: "Beholder de los Gráficos",
    monsterEmoji: "👁️",
    questions: [
      {
        id: 401,
        text: "Acabas de cargar un dataset. ¿Qué es lo PRIMERO que deberías ejecutar para ver su estructura y tipos de datos?",
        options: [
          "df.print()",
          "df.info()",
          "df.draw()",
          "df.model()"
        ],
        correctAnswer: 1,
        explanation: "`df.info()` es tu mejor amigo inicial. Te dice cuántas filas hay, si hay nulos y qué tipo de datos tiene cada columna (ej: si 'Precio' se cargó como Texto en vez de Número).",
        hint: "Busca la función que te da la 'Información' técnica."
      },
      {
        id: 402,
        text: "Al usar `df.describe()`, ves que la Media (mean) es 50, pero la Mediana (50%) es 10. ¿Qué te indica esto?",
        options: [
          "Que los datos están perfectos.",
          "Que hay valores extremadamente ALTOS (Outliers) arrastrando la media.",
          "Que hay valores extremadamente BAJOS arrastrando la media.",
          "Que hay un error en Pandas."
        ],
        correctAnswer: 1,
        explanation: "Cuando la Media es mucho mayor que la Mediana, significa que hay 'millonarios' (valores muy altos) que inflan el promedio artificialmente. La distribución está sesgada a la derecha.",
        hint: "Si el promedio sube mucho pero la gente normal (mediana) sigue baja, ¿quién entró en la sala?"
      },
      {
        id: 403,
        text: "¿Qué gráfico es el estándar para ver la distribución de una variable numérica (ej: Edad)?",
        options: [
          "Diagrama de Barras (Bar Plot)",
          "Histograma (Histogram)",
          "Gráfico de Pastel (Pie Chart)",
          "Mapa"
        ],
        correctAnswer: 1,
        explanation: "El Histograma agrupa los números en rangos continuos. El gráfico de barras se usa más para categorías (como 'País' o 'Color'). Para números continuos, usa histograma.",
        hint: "Es el que tiene barras pegadas una al lado de la otra."
      },
      {
        id: 404,
        text: "En un Boxplot (Diagrama de Caja), ¿qué representan los puntos que están fuera de los 'bigotes'?",
        options: [
          "La media.",
          "Outliers (Valores atípicos).",
          "Errores de sistema.",
          "Valores nulos."
        ],
        correctAnswer: 1,
        explanation: "El Boxplot está diseñado específicamente para cazar Outliers. Todo lo que esté más allá de los bigotes (normalmente 1.5 veces el rango intercuartil) se pinta como un punto solitario.",
        hint: "Son los datos que se salen de lo 'normal'."
      },
      {
        id: 405,
        text: "Ejecutas una Matriz de Correlación y ves que 'Edad' y 'Experiencia' tienen una correlación de 0.95. ¿Qué haces?",
        options: [
          "Celebrarlo, es bueno tener muchos datos repetidos.",
          "Preocuparte. Es 'Multicolinealidad'. Probablemente debas borrar una de las dos.",
          "Nada, el modelo lo arreglará.",
          "Multiplicarlas."
        ],
        correctAnswer: 1,
        explanation: "Si dos variables dicen casi lo mismo (0.95 es altísimo), confunden al modelo (Multicolinealidad). Es mejor quitar una para simplificar y estabilizar el análisis.",
        hint: "Tener información redundante no ayuda, estorba."
      },
      {
        id: 406,
        text: "¿Para qué sirve un 'Heatmap' (Mapa de Calor) en el análisis inicial?",
        options: [
          "Para ver la temperatura del servidor.",
          "Para visualizar rápidamente la matriz de correlación (colores intensos = relación fuerte).",
          "Para ver dónde viven los usuarios.",
          "Para calentar los datos."
        ],
        correctAnswer: 1,
        explanation: "El Heatmap colorea una tabla de números. Es la forma más rápida de detectar relaciones fuertes (rojo/azul intenso) o nulas (blanco/gris) entre variables.",
        hint: "Usa colores para representar intensidad numérica."
      },
      {
        id: 407,
        text: "Antes de empezar el EDA, ¿qué es vital revisar sobre los duplicados?",
        codeSnippet: "df._________().sum()",
        options: [
          "duplicated",
          "copy",
          "replicate",
          "twin"
        ],
        correctAnswer: 0,
        explanation: "`duplicated()` marca las filas que son copias exactas de otras. Si no las quitas, tu análisis de 'Cantidad de Clientes' será falso.",
        hint: "En inglés, busca la palabra para 'Duplicado'."
      }
    ]
  }
];