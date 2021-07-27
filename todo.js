let toDoList=[
    
];
let content = 0 ; 
// toDoList = [ {id:1, task:"",expirein:},]
let date_now = new Date();
let month = date_now.getMonth()+1;
let year = date_now.getFullYear();
let day = date_now.getDate();
const empty = document.querySelector("#empty")
const add_Item = document.querySelector("#addtask");
const date_expire = document.querySelector("#expire");
const text = document.querySelector("#task")
// remove task from list 
let removeItem = (evt) =>
{
   // first delet from array of task use method 
   // remove child from tree dom use removechild 
   //console.log(evt.target.className);
   
   if(evt.target.className === 'fa fa-trash')
     {  
        // console.log(evt.path[2]);
         evt.path[3].removeChild(evt.path[2]);
     }
    
   
}

// state done , not done , expire => detemine how mush expire in 
//each one min is calling 

let ExpireIn = (item) => 
{
    // calculate 
    if(item.expirein.year ==year && item.expirein.month == month)
        {
            if(item.expirein.day == day)
            { 
                return "Expires in "+ 0 + "days";
            }else if(item.expirein.day>day)
            {
                content= item.expirein.day - day ;
                return "Expires in "+ content + "days";
    
            }
            else
            {
                content = day - item.expirein.day ;
                return "Expired "+ content + "days ago";
            }
        }
}
//change style 
let endTask= (evt) =>

{   
    let z = evt.path[1];
    let P = z.parentNode;
    if(evt.target.checked)
    {
        console.log(evt);
        evt.path[1].setAttribute('style','text-decoration:line-through;opacity:0.6;');
        let z = evt.path[1];
        let P = z.parentNode;
        
        P.setAttribute('style','background:#F4F9F9;')
        
    }
    else
    {
       z.removeAttribute('style');
       P.removeAttribute('style')
    }

}
// reset input 
let reset = ()=>{
     document.querySelector('input[type="text"]').value='';
     document.querySelector('input[type="date"]').value='';
      
  
  }
// add new task to list 
let AddTask = (str,x) =>
{ 
    let y = x.value.split("-");
    let AllTask = document.querySelector(".list")
    if(str.value === '' || x.value === undefined){ return window.alert("You must enter the task and the expiration date ")}
    empty.removeChild(document.getElementsByTagName("h2")[0]);
   const newTask = {
       id:Math.random(),
       task:str.value,
       expirein:{
           day:parseInt(y[2]),
           month:parseInt(y[1]),
           year:parseInt(y[0])
       },
       EX:0
   }
   let result  = ExpireIn(newTask);
   newTask.EX= content;
   let newli = document.createElement("LI");
   let DIV1 = document.createElement("DIV");
   let btn = document.createElement('BUTTON');
   AllTask.appendChild(newli);
   DIV1.id = newTask.id;
   newli.appendChild(DIV1);
   DIV1.appendChild(document.createElement("INPUT")).setAttribute("type","checkbox");
   DIV1.appendChild(document.createElement("LABEL")).innerText = newTask.task;
   DIV1.appendChild(document.createElement("SPAN")).innerText = result;
   newli.appendChild(btn) 
  
   btn.appendChild(document.createElement("I")).className = "fa fa-trash";
   toDoList.push(newTask);
   reset();

}



if(toDoList.length== 0)
{
    empty.appendChild(document.createElement("H2")).innerText = "There are no tasks";

}

add_Item.addEventListener("click",()=>AddTask(text,date_expire));

document.addEventListener("change",(evt)=>{endTask(evt)});

document.addEventListener('click',(event)=>{removeItem(event );})
//removeItem(item)
setInterval(function(){
    if(toDoList.length != 0 ){
      toDoList.forEach(item => {
        let span_p = document.getElementById(`${item.id}`);
        let change_content = span_p.parentNode;
        ExpireIn(item);
        
        item.EX = content;
        
      
        
        
    }
    
    )}
},60*1000);


