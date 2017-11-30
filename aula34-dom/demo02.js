window.onload = function() {

  const favs = document.getElementById('tableFavourites')
  const txtFavLeague =  document.getElementById('txtFavLeague')
  const btAddFav =  document.getElementById('btAddFav')

  function addFavourite() {
    favs.innerHTML += '<tr>' + txtFavLeague.value + '</tr>'
  }

  btAddFav.addEventListener('click', addFavourite)  
}