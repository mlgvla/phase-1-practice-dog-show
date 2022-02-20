document.addEventListener("DOMContentLoaded", () => {
  getDogs()
  document.getElementById("dog-form").addEventListener("submit", saveDog)
})

function getDogs() {
  fetch("http://localhost:3000/dogs")
    .then(r => r.json())
    .then(dogs => displayDogs(dogs))
}

function displayDogs(dogs) {
  let tableBody = document.getElementById("table-body")
  tableBody.innerHTML = ""

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
  dogForm.dataset.id = dog.id
  dogForm.name.value = dog.name
  dogForm.breed.value = dog.breed
  dogForm.sex.value = dog.sex
}

function saveDog(e) {
  e.preventDefault()
  let dogForm = document.getElementById("dog-form")

  let dog = e.target
  let dogId = dog.dataset.id

  let formData = {
    name: dog.name.value,
    breed: dog.breed.value,
    sex: dog.sex.value,
  }
  dogForm.reset()
  saveDogToDB(formData, dogId)
}

function saveDogToDB(formData, dogId) {
  fetch(`http://localhost:3000/dogs/${dogId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then(r => r.json())
    .then(() => getDogs())
}
