document.addEventListener("DOMContentLoaded", () => {
  getDogs()
})

function getDogs() {
  fetch("http://localhost:3000/dogs")
    .then(r => r.json())
    .then(dogs => displayDogs(dogs))
}

function displayDogs(dogs) {
  let tableBody = document.getElementById("table-body")

  dogs.forEach(dog => {
    let tableRow = document.createElement("tr")
    let tableDataName = document.createElement("td")
    let tableDataBreed = document.createElement("td")
    let tableDataSex = document.createElement("td")
    let tableDataBtn = document.createElement("td")
    let editBtn = document.createElement("button")
    editBtn.id = dog.id
    editBtn.innerHTML = "Edit Dog"
    editBtn.addEventListener("click", e => editDog(e.target.id))

    tableDataName.innerHTML = dog.name
    tableDataBreed.innerHTML = dog.breed
    tableDataSex.innerHTML = dog.sex
    tableDataBtn.appendChild(editBtn)

    tableRow.append(tableDataName, tableDataBreed, tableDataSex, tableDataBtn)
    tableBody.appendChild(tableRow)
  })
}

function editDog(dogId) {
  fetch(`http://localhost:3000/dogs/${dogId}`)
    .then(r => r.json())
    .then(dog => fillForm(dog))
}

function fillForm(dog) {
  let dogForm = document.getElementById("dog-form")
  dogForm.name.value = dog.name
  dogForm.breed.value = dog.breed
  dogForm.sex.value = dog.sex
}
