let pagina = 1;
const btnAnterior = document.getElementById("btn-anterior");
const btnSiguiente = document.getElementById("btn-siguiente");
const enlaces = Array.from(document.querySelectorAll(".items"));

const Next = () => {
  //primero busca el enlace que esta activo y lo desactiva, luego busca el que esta desactivado y lo activa
  let active = enlaces.find((x) => x.className === "page-item active items");
  let desactive = enlaces.find((x) => parseInt(x.outerText) === pagina);
  active.className = "page-item items";
  desactive.className = "page-item active items";
};

const enlaceSiguiente = () => {
  if (pagina <= parseInt(enlaces[2].outerText)) {
    Next();
  } else {
    let num = pagina;
    for (let i = 0; i < enlaces.length; i++) {
      enlaces[i].innerHTML = `<a class="page-link" href="#">${num}</a>`;
      num += 1;
    }
	Next();
  }
};

const enlaceAnterior = () => {
  if (pagina >= parseInt(enlaces[0].outerText)) {
    Next();
  } else {
    let num = pagina -2 ;
    for (let i = 0; i < enlaces.length; i++) {
      enlaces[i].innerHTML = `<a class="page-link" href="#">${num}</a>`;
      num += 1;
    }
    Next();
  }
};

btnSiguiente.addEventListener("click", () => {
  if (pagina < 1000) {
    pagina += 1;
    cargarPeliculas();
    enlaceSiguiente();
  }
});
btnAnterior.addEventListener("click", () => {
  if (pagina > 1) {
    pagina -= 1;
    cargarPeliculas();
    enlaceAnterior();
  }
});




const cargarPeliculas = async () => {
  try {
    const respuesta = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=d3180dc13d1c51958d9c16f65ebd7ad9&language=es-AR&page=${pagina}`
    );
    console.log(respuesta);
    //si la respuesta es correcta
    if (respuesta.status == 200) {
      const datos = await respuesta.json();
      let peliculas = "";
	  datos.results.forEach((pelicula) => {
        peliculas +=  `<div class="container col  ">
						<div class="card p-1 mb-4" style="width: 18rem;">
  						<img src="https://image.tmdb.org/t/p/w500${pelicula.poster_path}" class="card-img-top" alt="...">
  							<div class="card-body ">
    							<h5 class="card-title text-truncate">${pelicula.title}</h5>
    							<p class="card-text">created by: ${pelicula.release_date}</p>
    							<a href="#" class="btn btn-primary">Go somewhere</a>
  							</div>
						</div>
					</div>
		`;
      });
      console.log(datos);
      document.getElementById("container").innerHTML = peliculas;
    } else if (respuesta.status === 401) console.log("pusiste la llave mal");
    else if (respuesta.status === 404)
      console.log("la pelicula que buscar no exite pibe");
    else console.log("hubo un error y no sabemos que paso");
  } catch (error) {
    console.log(error);
  }
};
cargarPeliculas();