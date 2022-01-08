window.onload = () => {
    let $ = id => document.getElementById(id);

    let query = new URLSearchParams(location.search);
    let id = query.get('id');

    if (!JSON.parse(localStorage.getItem('favorites')) || JSON.parse(localStorage.getItem('favorites')).length === 0) {
        $('favoritas').style.display = 'none';
    } else {
        $('favoritas').style.display = 'inline';
    }

    fetch('http://localhost:3031/api/movies/' + id).then(respuesta => {
        return respuesta.json()
    }).then(pelicula => {
        let data = pelicula.data;

        $('title').value = data.title;
        $('rating').value = data.rating;
        $('awards').value = data.awards;
        $('release_date').value = dayjs(data.release_date).format('YYYY-MM-DD');
        $('length').value = data.length;

    }).catch(error => console.log(error))

    $('botonAgregar').addEventListener('click', () => {
        let createData = {
            title: $('title').value,
            rating: $('rating').value,
            awards: $('awards').value,
            release_date: $('release_date').value,
            length: $('length').value
        }

        let config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(createData)
        }

        fetch('http://localhost:3031/api/movies/create', config).then(respuesta => {
            return respuesta.json()
        }).then(info => {
            console.log(info)
        }).catch(error => console.log(error))
    })


    $('botonEditar').addEventListener('click', () => {
        let updatedData = {
            title: $('title').value,
            rating: $('rating').value,
            awards: $('awards').value,
            release_date: $('release_date').value,
            length: $('length').value
        }

        let config = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        }

        fetch('http://localhost:3031/api/movies/update/' + id, config).then(respuesta => {
            return respuesta.json()
        }).then(info => {
            console.log(info)
        }).catch(error => console.log(error))
    })

    $('botonBorrar').addEventListener('click', () => {
        let deleteMovie = confirm('¿Quiere eliminar esta película?');

        if (deleteMovie) {
            let config = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            fetch('http://localhost:3031/api/movies/delete/' + id, config).then(respuesta => {
                return respuesta.json()
            }).then(info => {
                console.log(info)
            }).catch(error => console.log(error))
        }

    })
}