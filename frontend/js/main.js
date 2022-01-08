window.onload = () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);
  let $ = id => document.getElementById(id);

  if (!JSON.parse(localStorage.getItem('favorites')) || JSON.parse(localStorage.getItem('favorites')).length === 0) {
    let favorite = [];
    localStorage.setItem('favorites', JSON.stringify(favorite));
    $('favoritas').style.display = 'none';
  } else {
    $('favoritas').style.display = 'inline';
  } 


  fetch('http://localhost:3031/api/movies').then(respuesta => {
    return respuesta.json()
  }).then(peliculas => {
    let data = peliculas.data;

    data.forEach((movie) => {
      const card = document.createElement("div");
      card.setAttribute("class", "card");
      //card.setAttribute("href", "formulario.html?id=" + movie.id);

      const title = document.createElement('div');
      title.setAttribute("class", "title");

      const h2 = document.createElement("h2");
      h2.textContent = movie.title;

      const p = document.createElement("p");
      p.textContent = `Rating: ${movie.rating}`;

      const duracion = document.createElement("p");
      duracion.textContent = `Duración: ${movie.length}`;

      const star = document.createElement('button');
      star.innerHTML = '<i class="far fa-star"></i>'
      star.setAttribute("class", "star");
      star.setAttribute("id", "starOn" + movie.id);
      star.onclick = function () {
        $('starOn' + movie.id).hidden = true;
        $('starOff' + movie.id).hidden = false;
        const favorite = JSON.parse(localStorage.getItem('favorites'));
        favorite.push(movie.id);
        localStorage.setItem('favorites', JSON.stringify(favorite));
        console.log(favorite);
        $('favoritas').style.display = 'inline';
      }

      const star2 = document.createElement('button');
      star2.innerHTML = '<i class="fas fa-star"></i>'
      star2.setAttribute("class", "star");
      star2.setAttribute("id", "starOff" + movie.id);
      star2.hidden = true;
      star2.onclick = function () {
        $('starOff' + movie.id).hidden = true;
        $('starOn' + movie.id).hidden = false;
        const favorite = JSON.parse(localStorage.getItem('favorites'));
        let newFavorite = favorite.filter(fav => fav !== movie.id);
        localStorage.setItem('favorites', JSON.stringify(newFavorite));
      }

      let starsOn = JSON.parse(localStorage.getItem('favorites'));

      if(starsOn.includes(movie.id)){
          star.hidden = true;
          star2.hidden = false;  
      }

      const editar = document.createElement("a");
      editar.setAttribute("class", "btn");
      editar.innerText = 'Editar'
      editar.setAttribute("href", "formulario.html?id=" + movie.id);

      container.appendChild(card);
      card.appendChild(title);
      title.appendChild(h2);
      title.appendChild(star);
      title.appendChild(star2);
      card.appendChild(p);
      if (movie.genre !== null) {
        const genero = document.createElement("p");
        genero.textContent = `Genero: ${movie.genre.name}`;
        card.appendChild(genero);
      }
      card.appendChild(duracion);
      card.appendChild(editar)
    });
  }).catch(error => console.log(error))



};
