if ('serviceWorker' in navigator) {
  console.log('puedes usar los servicewoerker en tu navegador')
  navigator.serviceWorker
    .register('./sw.js')
    .then((res) => console.log('service woeker cargado correctamente', res))
    .catch((err) =>
      console.log('serviceworker no se ha poddido registrar ', err)
    )
} else {
  console.log('NO puedes usar los servicewoerker en tu navegador')
}

$(document).ready(function () {
  $('#menu a').click(function (e) {
    e.preventDefault()
    $('html, body').animate({
      scrollTop: $($(this).attr('href')).offset().top
    })
    return false
  })
})
