let tbody = document.getElementById('tbody')
let table_cap = document.getElementById('cap-t')
let annee = 2022
let mois = ['janvier','fevrier', 'mars', 'avril', 'mais', 'juin', 'juillet', 'aout', 'septembre', 'octobre', 'novembre', 'decembre']

let d = new Date()
let ann_cour = d.getFullYear()
let mois_cour = d.getMonth()
let jr_cour = d.getDay()
console.log(jr_cour)

let tableau = JSON.parse(localStorage.getItem('calender') || '[]')


affichecap(mois_cour, ann_cour)

function affichecap(m, a) {
    table_cap.innerHTML = `<input type="button" id="presed" onclick="pres()" class="btn btn-sm fs-5" value="<"/> <h5>${mois[m]} ${a}</h5><input type="button" id="suiv" onclick="suiv()" class="btn btn-sm fs-5" value=">"/>`
}


function suiv() {
    if (mois_cour == mois.length - 1) {
        ann_cour = ann_cour + 1
        mois_cour = 0
        affichecap(mois_cour, ann_cour)
    }
    else {

        mois_cour = mois_cour + 1
        affichecap(mois_cour, ann_cour)
    }
    affiche_mois(ann_cour, mois_cour)
    jr_cour = d.getDate()
let td = document.getElementById('c'+jr_cour)
if (mois_cour == d.getMonth())
{td.style.backgroundColor='steelblue'}

}

function pres() {

    {
        if (mois_cour == 0) {
            ann_cour = ann_cour - 1
            mois_cour = mois.length - 1
            affichecap(mois_cour, ann_cour)
        }
        else {

            mois_cour = mois_cour - 1
            affichecap(mois_cour, ann_cour)
        }
    }

    affiche_mois(ann_cour, mois_cour)
    jr_cour = d.getDate()
let td = document.getElementById('c'+jr_cour)
if (mois_cour == d.getMonth())
{td.style.backgroundColor='steelblue'}
   
}



/* fonction equivalente meme concept et differente methode 
function affiche_table(m) {
    let fm = 0
    let aux = ``
    
    let j = 0
    

    if (m == 0 || m == 2 || m == 4 || m == 9 || m == 6 || m == 7 || m == 11) {
        fm = 31
    }
    else if (m == 1) {
        fm = 28
    }
    else { fm = 30 }



    if  (j < jr_cour)
    {aux += `<tr>`
        for (i = 0; i < jr_cour; i++) 
        { aux += `<td>  </td>` }
        for (c = 1; c < 8-jr_cour ; c++)
        {
            aux += `<td> ${c}</td>`
        }
        aux += `</tr>`
   
    }  
    let k = 8 - jr_cour

    do {
        
       aux += `<tr>`
        j = 1
        for (i = k; i < k + 7; i++) {
            if (i > fm) {
            if (j== 6)
                  {jr_cour = 0}
            else
                {jr_cour = j -1}
                  
            break
       
            }

            else {
                aux += `<td > ${i} </td>`
                j++
            }

        }

        aux += `</tr>`
        k = k + 7
    }
    while (k < fm)

    tbody.innerHTML = aux
}

affiche_table(mois_cour)*/

   function verif(d)
{    
    
    let div = document.getElementById('d'+d)
    let note_jr = document.getElementById('note_jr')
    note_jr.value = div.innerText

    note_jr.onkeyup = () => { 
    
        if (note_jr.value =='' || note_jr.value == "zero evenement")
        {
            
            div.innerHTML = "zero evenement"

        }   
        
        else  
        {
            div.innerHTML = note_jr.value.substr(0,6)
            
        }
        
    }   
   
    if (div.innerHTML !== "zero evenement")
    {
        div.classList.remove('d-none')
        let obje_mem ={ 
            even : note_jr.value.substr(0,6),
            index : d,
            a :ann_cour,
            m : mois_cour
        }
          let bool = false     
        for(i=0;i<tableau.length;i++) {
           if (tableau[i].index == obje_mem.index && tableau[i].even !== obje_mem.even)
           { tableau.replace(tableau[i],obje_mem)
              bool = true   }
           else if (tableau[i].index == obje_mem.index && tableau[i].even == obje_mem.even )
           {tableau.splice(i,1)
               bool =true }
           

        }
        if ( bool == false)
        {tableau.push(obje_mem)}    
    }
    else
    {
        div.classList.add('d-none')
    } 
    
    localStorage.calender = JSON.stringify(tableau)    
} 


function affiche_mois(ann, mois) {
    
    let mon = mois ; 
    let d = new Date(ann, mon);

    let table = '<tr>';

    
    for (let i = 0; i < getDay(d); i++) {
        table += '<td></td>';
    }

    
    
    
    while (d.getMonth() == mon) {

        table += `<td id="c${d.getDate()}" onclick="verif(this.id)"  class ="text-center" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne" >  ${d.getDate()} <div  style="width: 20px; height: 10px; background-color: red; font-size: 8px" id="dc${d.getDate()}" class="d-none" >zero evenement</div></td>`;
       
        
        if (getDay(d) % 7 == 6) { 
            table += '</tr><tr>';
        }

        d.setDate(d.getDate() + 1);
    }

   
    if (getDay(d) != 0) {
        for (let i = getDay(d); i < 7; i++) {
            table += '<td></td>';
        }
    }

    
    table += '</tr>'

    tbody.innerHTML = table; 
    
    for(let i=0; i< tableau.length; i++)
    {
        var div = document.getElementById(`d${tableau[i].index}`)

       
        
        if (tableau[i].a == ann && tableau[i].m == mon)
        {
       
        console.log(div.innerHTML)
        div.innerHTML = tableau[i].even
         div.classList.remove('d-none')
        }
    }
    
     
       
        
    


}

function getDay(date) { 
    let day = date.getDay();
    if (day == 0) day = 7; 
    return day - 1;
}

affiche_mois(ann_cour, mois_cour)

jr_cour = d.getDate()
let td = document.getElementById('c'+jr_cour)
td.style.backgroundColor='steelblue'


