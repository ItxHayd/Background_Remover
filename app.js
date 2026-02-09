const removeBtn = document.querySelector("#removeBtn")
const DownloadLink = document.querySelector("#downloadLink")
const imgInput = document.querySelector("#imgInput")
const resultImg = document.querySelector("#resultImg")


removeBtn.addEventListener("click",async()=>{
    const file = imgInput.files[0];
    if(!file){
        console.log("file not found!!");
        return;
    }
    
    


    const formData = new FormData();
    formData.append("file",file);

    const response =  await fetch("https://corporate-bette-backgroundremover-c8890279.koyeb.app/bg-remover", {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
    console.error("Server returned an error:", response.status);
    const text = await response.text();
    console.log(text);
    return;
    }

    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);

    resultImg.src = imageUrl;
    DownloadLink.href = imageUrl;
    DownloadLink.style.display = "inline";
});
