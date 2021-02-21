
//GETTER  ----------------------------------

//this is an asyncronous request 
// takes time to do 
// returns to us a promise when done
// .get gets the data
// .then is then run when we recieve back our snapshot
//   snapshot a representation of our data
//   callback function .then()


// show to console (you have to inspect the given element to see the encrypted data) add .data() method to convert the firestore data to your data
//db.collection('cafes').get().then((snapshot) => {
//    console.log(snapshot.docs);
//})


////.get will get all docs in the collection
//db.collection('cafes').get().then((snapshot) => {
//    snapshot.docs.forEach(doc => {
//        console.log(doc.data())
//    })
//})




const cafeList = document.querySelector('#cafe-list');

//create elements and render cafe 
function renderCafe(doc){
    let li = document.createElement("li");
    let name = document.createElement('span'); //I probs woruld of done a h2
    let city = document.createElement('span');
    
    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;  
    city.textContent = doc.data().city;
    
    li.appendChild(name);
    li.appendChild(city);
    
    cafeList.appendChild(li);
}


db.collection('cafes').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderCafe(doc);
    })
})








// SETTER  --------------------------------------
// saving data to the db

//Note consts should be togeather at top 
const form = document.querySelector('#add-cafe-form');


//listen for a submit event

form.addEventListener('submit', (e) => {
    e.preventDefault(); //stops page reloading by default on click
    
    //.add takes in an object as the value
    db.collection('cafes').add({
        name: form.name.value,
        city: form.city.value
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
    
    
})



