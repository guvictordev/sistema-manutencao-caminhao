let dados =
JSON.parse(localStorage.getItem("manutencao"))
|| []

function cadastrar(){

let placa =
document.getElementById("placa").value.toUpperCase()

let servico =
document.getElementById("servico").value

let kmAtual =
document.getElementById("kmAtual").value

let kmProximo =
document.getElementById("kmProximo").value

let data =
document.getElementById("data").value

if(
placa=="" ||
servico=="" ||
kmAtual=="" ||
kmProximo=="" ||
data==""
){

alert("Preencha todos os campos")

return

}

let registro = {

placa,

servico,

kmAtual,

kmProximo,

data

}

dados.push(registro)

salvar()

mostrar()

limpar()

}

function salvar(){

localStorage.setItem(

"manutencao",

JSON.stringify(dados)

)

}

function mostrar(){

let lista =
document.getElementById("lista")

lista.innerHTML=""

let agrupado = {}

dados.forEach((d,i)=>{

if(!agrupado[d.placa]){

agrupado[d.placa] = []

}

agrupado[d.placa].push({

...d,

index:i

})

})

for(let placa in agrupado){

lista.innerHTML +=

`<h3>🚚 ${placa}</h3>`

agrupado[placa].forEach(d=>{

lista.innerHTML +=

`<li>

🔧 ${d.servico}

<br>

KM atual: ${d.kmAtual}

<br>

Próxima troca: ${d.kmProximo}

<br>

📅 ${d.data}

<span onclick="excluir(${d.index})">

❌

</span>

</li>`

})

}

}

function excluir(i){

if(confirm("Excluir manutenção?")){

dados.splice(i,1)

salvar()

mostrar()

}

}

function limpar(){

document.getElementById("placa").value=""

document.getElementById("servico").value=""

document.getElementById("kmAtual").value=""

document.getElementById("kmProximo").value=""

document.getElementById("data").value=""

}

mostrar()
