const removeBtn = document.querySelector("#removeBtn");
const DownloadLink = document.querySelector("#downloadLink");
const imgInput = document.querySelector("#imgInput");
const resultImg = document.querySelector("#resultImg");
const preview = document.querySelector("#preview");
const logo = document.querySelector("#logo");
const logotext = document.querySelector("#logotext");

imgInput.addEventListener("change", () => {
    const file = imgInput.files[0];
    if (!file) return;

    preview.src = URL.createObjectURL(file);
    preview.classList.remove("hidden");

    logo.classList.add("hidden");
    logotext.classList.add("hidden");

    // reset result when new image selected
    resultImg.src = "";
    DownloadLink.removeAttribute("href");
});

removeBtn.addEventListener("click", async () => {
    const file = imgInput.files[0];
    if (!file) {
        console.log("file not found!!");
        return;
    }

    removeBtn.innerText = "Processing...";

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(
        "https://bg-remove.hayd.workers.dev/bg-remover",
        {
            method: "POST",
            body: formData,
        }
    );

    if (!response.ok) {
        console.error("Server error:", response.status);
        const text = await response.text();
        console.log(text);

        removeBtn.innerText = "Remove Background";
        return;
    }

    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);

    resultImg.src = imageUrl;
    resultImg.classList.remove("hidden");

    DownloadLink.href = imageUrl;
    DownloadLink.style.display = "inline";

    removeBtn.innerText = "Remove Background";
});