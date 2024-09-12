let i = 150;

self.onmessage = function(event) {
  if (event.data === 'start') {
    i+=50;
    self.postMessage(i); 
  }
};
