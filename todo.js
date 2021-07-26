let toDoList=[
    
];
// toDoList = [ {id:1, task:"",expirein:},]


// remove task from list 
let removeItem = (item) =>
{
   // first delet from array of task use method 
   // remove child from tree dom use removechild 
   let z = item.parentNode;
   z.parentNode.removeChild(z);
   
}

// state done , not done , expire => detemine how mush expire in 
//each one min is calling 

let ExpireIn = () => 
{
    // calculate 
}
//change style 
let endTask= (i,event) =>

{   
    let z =  document.querySelector(` #${i.id}`);
    let P = z.parentNode;
    let g  = P.parentNode;
    if(document.querySelector(` #${i.id}`).checked)
    {
       P.setAttribute('style','text-decoration:line-through;opacity:0.6;');
       g.setAttribute('style','background:rgb(187, 183, 183);')
    } 
    else
    {
       P.removeAttribute('style');
       g.removeAttribute('style')
    }


}
// add new task to list 
let AddTask = (str,x) =>
{   
    let y = x.value.split("-");
    let AllTask = document.querySelector(".list")

   
   const newTask = {
       id:Math.random(),
       task:str.value,
       expirein:{
           day:parseInt(y[2]),
           mounth:parseInt(y[1]),
           year:parseInt(y[0])
       }
   }
   let newli = document.createElement("LI");
   let DIV1 = document.createElement("DIV");
   let btn = document.createElement("BUTTON");
   AllTask.appendChild(newli);
   DIV1.id = newTask.id;
   newli.appendChild(DIV1);
   DIV1.appendChild(document.createElement("INPUT")).setAttribute("type","checkbox");
   DIV1.appendChild(document.createElement("LABEL")).innerText = newTask.task;
   newli.appendChild(btn)   
   btn.appendChild(document.createElement("I")).className = "fa fa-trash";
   toDoList.push(newTask);
   

}
const add_Item = document.querySelector("#addtask");
const date_expire = document.querySelector("#expire");
const text = document.querySelector("#task")
add_Item.addEventListener("click",()=>AddTask(text,date_expire));
const check = document.querySelectorAll('input[name="task"]');
console.log(check)
check.forEach(item =>item.addEventListener("change",(evt)=>{endTask(item,evt)}));

const del_task = document.querySelectorAll('button');
del_task.forEach(item => item.addEventListener('click',()=>{removeItem(item)}))