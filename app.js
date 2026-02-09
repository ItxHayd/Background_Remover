const file = imgInput.files[0];
const img = new Image();
img.src = URL.createObjectURL(file);
img.onload = async () => {
    const canvas = document.createElement('canvas');
    const MAX = 1024; // max width/height
    let w = img.width;
    let h = img.height;
    if (w > h && w > MAX) { h = (h/w)*MAX; w = MAX; }
    else if (h > MAX) { w = (w/h)*MAX; h = MAX; }
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, w, h);
    const blob = await new Promise(r => canvas.toBlob(r, 'image/png'));
    const formData = new FormData();
    formData.append('file', blob, 'resized.png');

    const response = await fetch('https://corporate-bette-backgroundremover-c8890279.koyeb.app/bg-remover', { method:'POST', body: formData });
    const resultBlob = await response.blob();
    resultImg.src = URL.createObjectURL(resultBlob);
};
