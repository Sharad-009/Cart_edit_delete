async function showData() {
  let dataFetch = await fetch("http://localhost:3000/Mobiles");
  let convert = await dataFetch.json();

  let div = document.querySelector(".main");
  div.innerHTML = convert
    .map(
      (e) =>
        `
    <div class="container">
      
    <div class="boxes">
            <thead>
              <div class="head">
                <h2>${e.name}</h2>

              </div>
              </thead>
              <hr>
            <tbody>
                <div ><img class="image" src="${e.img}" alt=""> </div> <br>
              <div class="para">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </div>
              </tbody>
              <hr>
              <tfoot>
              <div class="btn">
                <button id="btn" onclick="addMe('${e.id}')">Add Me</button>
              </div>
            </tfoot>
          </div>
          </div>`
    )
    .join(" ");
}

showData();

// inside data store in table to add to cart like data
async function addMe(id) {
  let dataFatch = await fetch(`http://localhost:3000/Mobiles/${id}`);
  let Dt = await dataFatch.json();
  let datashow = document.getElementById("tdata");
  datashow.innerHTML += `
  <tr>
  <td >${Dt.id}</td>
        <td >${Dt.name}</td>
        <td ><img src="${Dt.img}"  style="width:100px"></td>
        <td onclick=editdt('${Dt.id}')>Edit</td>
        <td onclick=deleteDta('${Dt.id}') >Delete</td>
        
        
        </tr>
        `;
  // inside data store in table to add to cart like data end....
}
// Add data by the user input to store or add data in  json file starts......
function addData() {
  let num = Math.round(Math.random() * 1000);
  num = num.toString();
  // console.log(num);
  let dataObj = {
    id: num,
    name: document.querySelector("#name1").value,
    img: document.querySelector("#img1").value,
  };
  fetch(`http://localhost:3000/Mobiles`, {
    method: "POST",
    headers: { "content-type": "application/JSON" },
    body: JSON.stringify(dataObj),
  });
  // console.log(dataObj.id, dataObj.name, dataObj.img);
}
// Add data by the user input to store or add data in  json file ends......

// delete data in the api stored data starts.......
function deleteDta(id) {
  fetch(`http://localhost:3000/Mobiles/${id}`, {
    method: "DELETE",
  });
}
// delete data in the api stored data ends.......

// Edit data in json file data .......
async function editdt(id) {
  let dataedi = await fetch(`http://localhost:3000/Mobiles/${id}`);
  let covi = await dataedi.json();
  let form = document.querySelector(".editData");
  form.innerHTML = `
   <form action="">
        <label for="">Id</label> <input type="text" value="${covi.id}" name="" id="id2" /> <br>
        <label for="">Name</label> <input type="text" name="" value="${covi.name}" id="name2" />
        <br />
        <label for="">Image Source</label>
        <input type="text" name="" value="${covi.img}" id="img2" /> <br />
        <!-- <label for="">About</label> <input type="text" name="" id="about2" /> -->
        <br />
        <input type="button" value="SAVE DATA" onclick="finalUpd('${covi.id}')" />
      </form>`;
}

function finalUpd(id) {
  let edData = {
    id: document.querySelector("#id2").value,
    name: document.querySelector("#name2").value,
    img: document.querySelector("#img2").value,
  };
  fetch(`http://localhost:3000/Mobiles/${id}`, {
    method: "PUT",
    headers: { "content-type": "application/JSON" },
    body: JSON.stringify(edData),
  });
}
// Edit data in json file data
