let dados =
JSON.parse(localStorage.getItem("manutencao"))
|| []

let editando = -1

function cadastrar(){

let registro = {

placa:
document.getElementById("placa").value.toUpperCase(),

servico:
document.getElementById("servico").value,

kmAtual:
document.getElementById("kmAtual").value,

kmProximo:
document.getElementById("kmProximo").value,

data:
document.getElementById("data").value

}

if(editando==-1){

dados.push(registro)

}else{

dados[editando] = registro

editando=-1

}

salvar()

mostrar()

limpar()

}

function mostrar(){

let lista =
document.getElementById("lista")

lista.innerHTML=""

dados.forEach((d,i)=>{

let alerta=""

if(
parseInt(d.kmAtual)
>=
parseInt(d.kmProximo)-1000
){

alerta =
"<div class='alerta'>⚠️ Próximo da troca</div>"

}

lista.innerHTML+=`

<li>

🚚 ${d.placa}

<br>

🔧 ${d.servico}

<br>

KM ${d.kmAtual}

→ ${d.kmProximo}

<br>

📅 ${d.data}

${alerta}

<br>

<span class="editar"
onclick="editar(${i})">

✏️

</span>

<span class="excluir"
onclick="excluir(${i})">

❌

</span>

</li>

`

})

}

function editar(i){

let d = dados[i]

document.getElementById("placa").value = d.placa

document.getElementById("servico").value = d.servico

document.getElementById("kmAtual").value = d.kmAtual

document.getElementById("kmProximo").value = d.kmProximo

document.getElementById("data").value = d.data

editando = i

}

function excluir(i){

if(confirm("Excluir?")){

dados.splice(i,1)

salvar()

mostrar()

}

}

function salvar(){

localStorage.setItem(

"manutencao",

JSON.stringify(dados)

)

}

function limpar(){

document.getElementById("placa").value=""

document.getElementById("servico").value=""

document.getElementById("kmAtual").value=""

document.getElementById("kmProximo").value=""

document.getElementById("data").value=""

}

function exportarPDF(){

const { jsPDF } = window.jspdf

let doc = new jsPDF()

doc.text(

"Relatório de Manutenção",

20,

20

)

let y=30

dados.forEach(d=>{

doc.text(

`${d.placa}
${d.servico}
KM ${d.kmAtual} → ${d.kmProximo}
${d.data}`,

20,

y

)

y+=20

})

doc.save("manutencao.pdf")

}

mostrar()
