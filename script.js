function encodeImage() {
    const input = document.getElementById('imageInput');
    const file = input.files[0];
  
    const reader = new FileReader();
  
    reader.onloadend = function() {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const image = new Image();
  
      image.onload = function() {
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0);
  
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
  
        for (let i = 0; i < data.length; i += 4) {
          const red = data[i];
          const green = data[i + 1];
          const blue = data[i + 2];
          
          data[i] = 255 - red;
          data[i + 1] = 255 - green;
          data[i + 2] = 255 - blue;
        }
  
        context.putImageData(imageData, 0, 0);
        const encodedImage = canvas.toDataURL('image/jpeg');
  
        const img = document.getElementById('encodedImage');
        img.src = encodedImage;
      }
  
      image.src = URL.createObjectURL(file);
    }
  
    reader.readAsDataURL(file);
  }
  
  function decodeImage() {
    const img = document.getElementById('encodedImage');
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const image = new Image();
  
    image.onload = function() {
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0);
  
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
  
      for (let i = 0; i < data.length; i += 4) {
        const red = data[i];
        const green = data[i + 1];
        const blue = data[i + 2];
        
        data[i] = 255 - red;
        data[i + 1] = 255 - green;
        data[i + 2] = 255 - blue;
      }
  
      context.putImageData(imageData, 0, 0);
      const decodedImage = canvas.toDataURL('image/jpeg');
  
      const img = document.getElementById('decodedImage');
      img.src = decodedImage;
    }
  
    image.src = img.src;
  }