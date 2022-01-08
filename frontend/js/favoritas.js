window.onload = () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);
  let $ = id => document.getElementById(id);

  if (!JSON.parse(localStorage.getItem('favorites')) || JSON.parse(localStorage.getItem('favorites')).length === 0) {
    $('favoritas').style.display = 'none';
    const card = document.createElement("div");
    card.setAttribute("class", "card");
    const h1 = document.createElement("h1");
    h1.textContent = 'Aún no hay peliculas en favoritas';

    container.appendChild(card);
    card.appendChild(h1);
  } else {
    $('favoritas').style.display = 'inline';
  }

  let favorite = JSON.parse(localStorage.getItem('favorites'));

  fetch('http://localhost:3031/api/movies').then(respuesta => {
    return respuesta.json()
  }).then(peliculas => {

    let data = peliculas.data;

    let movies = data.filter(movie => favorite.includes(movie.id));


    movies.forEach((movie) => {
      const card = document.createElement("div");
      card.setAttribute("class", "card");

      const h1 = document.createElement("h1");
      h1.textContent = movie.title;

      const p = document.createElement("p");
      p.textContent = `Rating: ${movie.rating}`;

      const duracion = document.createElement("p");
      duracion.textContent = `Duración: ${movie.length}`;

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
      if (movie.genre !== null) {
        const genero = document.createElement("p");
        genero.textContent = `Genero: ${movie.genre.name}`;
        card.appendChild(genero);
      }
      card.appendChild(duracion);
    });
  }).catch(error => console.log(error))


};
