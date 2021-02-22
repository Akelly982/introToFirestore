
//should take place after events to record result
//.then(() => {
//console.log("Document successfully updated!");
//})
//.catch((error) => {
//// The document probably doesn't exist.
//console.error("Error updating document: ", error);
//});



const cafeList = document.querySelector('#cafe-list');


//create elements and render cafe 
function renderCafe(doc){
    let li = document.createElement("li");
    let name = document.createElement('span'); //I probs woruld of done a h2
    let city = document.createElement('span');
    let cross = document.createElement('div');
    
    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;  
    city.textContent = doc.data().city;
    cross.textContent = "x";
    
    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);
    
    cafeList.appendChild(li);
    // end of item creation
    
    
    
    //DELETE ------------------------------
    // add deleteing data for the cross element setup
    
    cross.addEventListener('click', (e) => {
      e.stopPropagation //prevents further propagation of the given event.
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('cafes').doc(id).delete();
    })
    
    
    
}







// READ  ----------------------------------

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


// TO consoole.log
//.get will get all docs in the collection  
//db.collection('cafes').get().then((snapshot) => {
//    snapshot.docs.forEach(doc => {
//        console.log(doc.data())
//    })
//})


//Put here to easily switch between read types
switch(3) {
  case 1:
        
        //Standard GET
        // get the data from db firestore
        //gets all docs under cafe 
        
        db.collection('cafes').get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                renderCafe(doc);
            })
        })
        break;
        
  case 2:
        
        // Using WHERE (getting specific data)
        // Takes three prarameters 
        //  - The value we are looking it
        //  - how we want to evaluate it == , etc
        //  - what we want it to equal 
        //  examples
        //      -  https://firebase.google.com/docs/firestore/query-data/queries
        
        // you can also do where city < n 
        // returns values starting with characters after n 
        // in the alphabet

        db.collection('cafes').where('city', '==', 'highrule').get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                renderCafe(doc);
            })
        }) 
        break;
        
    case 3:
        
        //ORDER BY
        // Note capital letters come before lowercase letters
        db.collection('cafes').orderBy('name').get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                renderCafe(doc);
            })
        })
        break;
        
        
    case 4:
        console.log("Case 4 Blyat");
        //ORDER BY WHERE
        // This will give an error an will require an index
        // firebase requires you to create an index to support this query.
        // their will be a link in your console to create this index with firebase
        db.collection('cafes').where('city','==','highrule').orderBy('name').get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                renderCafe(doc);
            })
        })
        break;
        
        
  default:
    console.log("Switch Default debil!");
    
}











// CREATE  --------------------------------------
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
    .then(() => {
    console.log("Document successfully updated!");
    })
    .catch((error) => {
    // The document probably doesn't exist.
    console.error("Error updating document: ", error);
    });
    
    
    // all done reset values to zero
    form.name.value = '';
    form.city.value = '';
    
})















// UPDATE ------------------------------

//To create or overwrite a single document, use the set() method:

var updateBtn = document.querySelector('#akButton');

updateBtn.addEventListener('click', (e) =>{
    //alert("updateBTn clicked");
    db.collection('cafes').doc("LlRHi1mh9G3UMprORI4u").set({
        name: "myAwsomeBusinessName",
        city: "updaterCity"
    })
    .then(() => {
        console.log("Document successfully updated, Mate you are a great document updater!");
    })
    .catch((error) => {
        console.error("Fella/shela their appears to be an error with the update. ", error);
    });
     
})


