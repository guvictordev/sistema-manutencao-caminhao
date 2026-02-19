let dados =
JSON.parse(localStorage.getItem("manutencao"))
|| []

let editando = -1


function cadastrar(){

let registro = {

frota:
document.getElementById("frota").value,

veiculo:
document.getElementById("veiculo").value,

carreta:
document.getElementById("carreta").value,

servico:
document.getElementById("servico").value,

fornecedor:
document.getElementById("fornecedor").value,

km:
document.getElementById("km").value,

data:
document.getElementById("data").value

}


if(editando==-1){

dados.push(registro)

}else{

dados[editando]=registro
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

lista.innerHTML+=

`

<li>

🚚 Frota: ${d.frota}<br>

Veículo: ${d.veiculo}<br>

Carreta: ${d.carreta}<br>

🔧 ${d.servico}<br>

🏢 ${d.fornecedor}<br>

KM: ${d.km}<br>

📅 ${d.data}

<br><br>

<span class="editar"
onclick="editar(${i})">

Editar

</span>


<span class="excluir"
onclick="excluir(${i})">

Excluir

</span>

</li>

`

})

}



function editar(i){

let d=dados[i]

document.getElementById("frota").value=d.frota

document.getElementById("veiculo").value=d.veiculo

document.getElementById("carreta").value=d.carreta

document.getElementById("servico").value=d.servico

document.getElementById("fornecedor").value=d.fornecedor

document.getElementById("km").value=d.km

document.getElementById("data").value=d.data


editando=i

window.scrollTo(0,0)

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

document.getElementById("frota").value=""

document.getElementById("veiculo").value=""

document.getElementById("carreta").value=""

document.getElementById("servico").value=""

document.getElementById("fornecedor").value=""

document.getElementById("km").value=""

document.getElementById("data").value=""

}



function exportarPDF(){

const { jsPDF } = window.jspdf

let doc = new jsPDF()

doc.text("Relatório de Manutenção",20,20)

let y=30

dados.forEach(d=>{

doc.text(

`Frota: ${d.frota}
Veículo: ${d.veiculo}
Carreta: ${d.carreta}
Serviço: ${d.servico}
Fornecedor: ${d.fornecedor}
KM: ${d.km}
Data: ${d.data}`,

20,

y

)

y+=30

})

doc.save("relatorio.pdf")

}



mostrar()
