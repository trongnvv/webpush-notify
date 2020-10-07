self.addEventListener('push', event => {
    const data = event.data.json();
    console.log('event', event)
    console.log('data', data)
    self.registration.showNotification(data.title, {
        body: 'Yay it works!',
    });
});