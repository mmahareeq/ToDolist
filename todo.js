let date_now = new Date();

let empty = document.querySelector("#empty")
const add_Item = document.querySelector("#addtask");
const date_expire = document.querySelector("#expire");
const text = document.querySelector("#task")
const url ="https://610990bad71b6700176399bd.mockapi.io/todos";
let toDoList=[];
//add new task to list 
let AddTask = (data) =>
{   
    data.forEach( (item)=>{
   
    let AllTask = document.querySelector(".list")
    if(item.title === '' ){ return window.alert("You must enter the task and the expiration date ")}
     const newTask = {
       id:item.id,
       task:item.title,
       complete:item.completed,
    }
   
   let newli = document.createElement("LI");
   let DIV1 = document.createElement("DIV");
   let btn = document.createElement('BUTTON');
   AllTask.appendChild(newli);
   DIV1.id = newTask.id;
   newli.appendChild(DIV1);
   DIV1.appendChild(document.createElement("INPUT")).setAttribute("type","checkbox");
   DIV1.appendChild(document.createElement("LABEL")).innerText = newTask.task;
   DIV1.appendChild(document.createElement("SPAN")).innerText = newTask.complete?'completed' : "Not Completed";
   newli.appendChild(btn) 
  
   btn.appendChild(document.createElement("I")).className = "fa fa-trash";
   toDoList.push(newTask);
   reset();
    })
}

const fetchtoDo  = async(url)=>
{
    const response = await fetch(`${url}`)
    const data =await response.json();
    empty.removeChild(document.getElementsByTagName("h2")[0])
    
    
    AddTask(data);
}
fetchtoDo(url);

// remove task from list 
let removeItem = (evt) =>
{
   // first delet from array of task use method 
   // remove child from tree dom use removechild 
   //console.log(evt.target.className);
   
   if(evt.target.className === 'fa fa-trash')
     {   
         evt.path[3].removeChild(evt.path[2]);

         
     }
    
   
}

//change style 
let endTask= (evt) =>

{   
    let z = evt.path[1];
    let P = z.parentNode;
    let DIV = document.getElementById(z.id)
    //let DIV2 = DIV.getElementsByTagName('SPAN')[0];
    if(evt.target.checked)
    {
        
        evt.path[1].setAttribute('style','text-decoration:line-through;opacity:0.6;');
        let z = evt.path[1];
        
        let endTask = toDoList.find(x=>
            {if(x.id===z.id)
                {
                    x.complete=true;
                    DIV2.innerText=  "Completed";
                   // console.log(DIV2);
                  
                
                }}
            ); 
        let P = z.parentNode;
        P.setAttribute('style','background:#F4F9F9;')
        
    }
    else
    {
       z.removeAttribute('style');
       P.removeAttribute('style');
       //DIV2.innerText=  "Not Completed";
    }

}
// reset input 
let reset = ()=>{
     document.querySelectorAll('input[type="text"]')[0].value='';
     
     
}


if(toDoList.length== 0)
{
    empty.appendChild(document.createElement("H2")).innerText = "There are no tasks";

}

add_Item.addEventListener("click",async(e)=>{
    e.preventDefault();

    const response = await fetch(url,{method:'POST',
                                 headers:{'Content-Type':'application/json'}
                                ,body:JSON.stringify({title:text.value,completed:false,id:Math.random()})})
    const data =await response.json();
     //ddTask(data);
     console.log(data);
     const dataArr= [] ;
     dataArr.push(data);
     AddTask(dataArr);

});

document.addEventListener("change",(evt)=>{endTask(evt)});
document.addEventListener('click',(event)=>{removeItem(event );})
//removeItem(item)



