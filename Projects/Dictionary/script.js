const res=document.getElementById("result");
const sound=document.getElementById("sound");
const btn=document.getElementById("searchbtn");
btn.addEventListener("click", async ()=>{
    let ip=document.getElementById("searchit").value;
    let url=`https://dictionaryapi.com/api/v3/references/collegiate/json/${ip}?key=eb8beaf2-0d05-4cab-9310-aca1e8ceb569`;
    //console.log(ip);
    await fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            result.innerHTML = `
            <div class="soln">
                <h3>${ip}</h3>
                <button onclick="playSound()"><i class="fa-solid fa-volume-high"></i></button>
            </div>
            <div class="detail">
                <p>${data[0].fl}</p>
                <p>/${data[0].hwi.prs[0].mw}/</p>
            </div>
            <div class="meaning">
                ${data[0].shortdef[0]}
            </div>`;
            let audio = `${data[0].hwi.prs[0].sound.audio}`;
            let subdirectory = "";
            if (audio.startsWith("bix")) subdirectory = "bix";
            else if (audio.startsWith("gg")) subdirectory = "gg";
            else if (!!audio.match(/^[.,:!?]/) || !!audio.match(/^[0-9]/))
            subdirectory = "number";
            else subdirectory = audio[0];
            sound.setAttribute("src", `https://media.merriam-webster.com/audio/prons/en/us/mp3/${subdirectory}/${audio}.mp3`);
            console.log(sound);
        })
        .catch(() => {
            result.innerHTML=`<h4 class="error" style="color: red;">Couldn't find the word you were looking for. <br>Please recheck for any spelling errors, and try again.</h4>`
        }
        )
});
function playSound(){
    sound.play();
}