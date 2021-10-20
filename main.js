const personListAdres = document.querySelector(".person-list");
const moreBtn = document.querySelector(".moreBtn");

addPersonCart(1, 9);

moreBtn.addEventListener('click', () => {
    let a = document.querySelectorAll(".person-list-item").length;
    if (a <= 60){
        addPersonCart(a + 1, 10);
    }
    else{
        addPersonCart(a + 1, 10);
        moreBtn.style.display = "none";
    }
})


function addPersonCart (startIndex, quantity){
    for (let i = startIndex; i <= (startIndex + quantity); i++){
        fetch(`https://rickandmortyapi.com/api/character/${i}`)
            .then(req => {
                return req.json();
            })
            .then((data) => {
                blockInserter(blockConstructor(data), personListAdres)
            })
            .catch(error => {
                console.err("Error: ", error);
            })
    }
}

function blockConstructor(objectData) {
    return `
                    <div class="person-list-item__img">
                        <img src="${objectData.image}" alt="${objectData.name}-img">
                    </div>
                    <div class="person-list-item__info">
                        <h3>
                                ${objectData.name}
                        </h3>
                        <h5>
                            <span class="life-indicate ${objectData.status}">
                                ${objectData.status}
                            </span>
                        </h5>
                        <div class="person-list-item__info__sub">
                            <h4>
                                Gender:
                            </h4>
                            <h5>
                                ${objectData.gender}
                            </h5>
                        </div>
                        <div class="person-list-item__info__sub">
                            <h4>
                                Species:
                            </h4>
                            <h5>
                                ${objectData.species}
                            </h5>
                        </div>
                    </div>
    `;

}
function blockInserter(item, forPosition){
    const element = document.createElement("article");
    element.classList.add("person-list-item");
    element.innerHTML = item;
    forPosition.append(element);
}
