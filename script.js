let dados =
JSON.parse(localStorage.getItem("manutencao"))
|| []

let editando = -1

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
"<div class='alerta'>⚠️ Próximo da manutenção</div>"

}

lista.innerHTML +=

`<li>

🚚 <b>${d.placa}</b><br>

🔧 ${d.servico}<br>

KM ${d.kmAtual} → ${d.kmProximo}<br>

📅 ${d.data}

${alerta}

<br><br>

<span class="editar"
onclick="editar(${i})">

✏️ Editar

</span>

<span class="excluir"
onclick="excluir(${i})">

❌ Excluir

</span>

</li>`

})

}

function editar(i){

let d = dados[i]

document.getElementById("placa").value =
d.placa

document.getElementById("servico").value =
d.servico

document.getElementById("kmAtual").value =
d.kmAtual

document.getElementById("kmProximo").value =
d.kmProximo

document.getElementById("data").value =
d.data

editando = i

window.scrollTo(0,0)

}

function excluir(i){

if(confirm("Excluir manutenção?")){

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

doc.setFontSize(16)

doc.text(
"Relatório de Manutenção",
20,
20
)

let y=30

dados.forEach(d=>{

doc.setFontSize(12)

doc.text(
`Placa: ${d.placa}`,
20,
y
)

y+=6

doc.text(
`Serviço: ${d.servico}`,
20,
y
)

y+=6

doc.text(
`KM: ${d.kmAtual} → ${d.kmProximo}`,
20,
y
)

y+=6

doc.text(
`Data: ${d.data}`,
20,
y
)

y+=10

})

doc.save(
"relatorio_manutencao.pdf"
)

}

mostrar()
