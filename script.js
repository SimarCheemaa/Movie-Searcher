let search = document.getElementById("search");
let text = document.getElementById("movieName");
let section2 = document.getElementById("section2");
let api_key = "356710c458235a0cf5fd4568ff068ea6";
// let request = "https://api.themoviedb.org/3/movie/550?api_key=356710c458235a0cf5fd4568ff068ea6"
let query = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=`;
// let token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNTY3MTBjNDU4MjM1YTBjZjVmZDQ1NjhmZjA2OGVhNiIsInN1YiI6IjYzMWNmNzQyYmQzMjA5MDA3YWQwN2Y0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZTK-DA7ibrO2fPFzhgY-g6YbfnSxlIkeICxnzIZ_AdA"
// Add a button that can switch between Movies and Music and ETc so that you can search the appropriate database 

search.addEventListener('click', function() {
    if (text.value == "") {
        alert("Please Enter A Valid Name")
    } else {
        section2.innerHTML = "";
        let link = makeQuery(text.value);
        fetch(link).then(res => res.json()).then(data => {
            for (var i=0; i < data['results'].length; i++) {
                let list = document.createElement("li");
                list.innerText += data['results'][i]['title'] + '\n\n'
                list.className = "movie_names"
                list.onclick = (function() {
                        section2.innerHTML = "";
                        let poster = document.createElement('img');
                        let paragraph = document.createElement("p");
                        let link = makeQuery(this.innerText);
                        section2.appendChild(poster);
                        fetch(link).then(res => res.json()).then(data => {
                            let description = data['results'][0]['overview'];
                            let name = data['results'][0]['title'];
                            let date = data['results'][0]['release_date'];
                            let image = data['results'][0]['poster_path'];
                            let photo_link = "https://image.tmdb.org/t/p/w500/" + image;
                            fetch(photo_link)
                                .then(response => response.blob())
                                .then(imageBlob => {
                                const imageObjectURL = URL.createObjectURL(imageBlob);
                                console.log(imageObjectURL);
                                poster.src = imageObjectURL;
                                poster.style.width = "200px";
                            });
                            paragraph.innerText += name + "\n\n" + "Date: " + date + '\n\n';
                            paragraph.innerText += description;
                        })
                        section2.appendChild(paragraph);
                        })
                section2.appendChild(list);
            }
        })
        text.value = "";
    }
})


function makeQuery(name) {
    let temp = name.split(' ');
    let link = query;
    for (var i = 0; i < temp.length; i++) {
        link += temp[i] + "+";
    }
    return link.slice(0,-1)
}