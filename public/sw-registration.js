if('serviceWorker' in navigator){
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw-weather-app.js')
        .then(reg => console.log('Service Worker: Registered'))
        .catch(err => console.log('Service Worker not Registered: ', err))
    })
  }