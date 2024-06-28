const colorPicker = document.getElementById("textcolorpicker");
const canvascolor = document.getElementById("backcolorpicker");
const canvas = document.getElementById("mycanvas");
const clear = document.getElementById("clr");
const save = document.getElementById("save");
const retreive = document.getElementById("retreive");
const fontPicker = document.getElementById("fontSize")
const ctx = canvas.getContext("2d");

colorPicker.addEventListener('change', (e) =>{
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle = e.target.value;
})

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    lastX = event.offsetX;
    lastY = event.offsetY;
})

canvas.addEventListener('mousemove', (e)=>{
    if(isDrawing)
        {
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(event.offsetX, event.offsetY);
            ctx.stroke();

            lastX = event.offsetX;
            lastY = event.offsetY;

        }
})

canvas.addEventListener('mouseup',(e)=>{
    isDrawing = false;
})

canvascolor.addEventListener('change', (e)=>{
    ctx.fillStyle = e.target.value;
    ctx.fillRect(0, 0, 800, 400);
})

fontPicker.addEventListener('change', (e)=>{
    ctx.lineWidth = e.target.value;
})

clear.addEventListener('click', ()=>{
    let flag = confirm("Are you sure you want to clear?");
    if(flag)
        ctx.clearRect(0, 0, 800, 400);
})

save.addEventListener('click', ()=>{
    localStorage.setItem('canvasContents', canvas.toDataURL());

    let link = document.createElement('a');
    link.download = 'signature.png';
    link.href = canvas.toDataURL();
    link.click();
})

retreive.addEventListener('click', ()=>{
    let saved = localStorage.getItem('canvasContents');
    if(saved)
        {
            let img = new Image();
            img.src = saved;
            ctx.drawImage(img, 0, 0);
        }
})