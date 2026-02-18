let dados =
JSON.parse(localStorage.getItem("manutencao"))
|| []

function cadastrar(){

let registro = {

caminhao:
document.getElementById("caminhao").value,

km:
document.getElementById("km").value,

servico:
document.getElementById("servico").value,

data:
document.getElementById("data").value,

status:
document.getElementById("status").value

}

dados.push(registro)

salvar()

mostrar()

dashboard()

}

function salvar(){

localStorage.setItem(
"manutencao",
JSON.stringify(dados)
)

}

function mostrar(lista=dados){

let ul =
document.getElementById("lista")

ul.innerHTML=""

lista.forEach((d,i)=>{

ul.innerHTML +=

`<li class="${
d.status=="Pendente"
?"pendente"
:"concluido"
}">

${d.caminhao}

|

${d.servico}

|

KM ${d.km}

|

${d.data}

|

${d.status}

<span class="excluir"

onclick="excluir(${i})">

X

</span>

</li>`

})

}

function excluir(i){

dados.splice(i,1)

salvar()

mostrar()

dashboard()

}

function dashboard(){

document.getElementById("total")
.innerText = dados.length

document.getElementById("pendentes")
.innerText =
dados.filter(
d=>d.status=="Pendente"
).length

document.getElementById("concluidos")
.innerText =
dados.filter(
d=>d.status=="Concluído"
).length

}

function filtrar(){

let busca =
document.getElementById("busca")
.value.toLowerCase()

let filtro =
dados.filter(d=>

d.caminhao
.toLowerCase()
.includes(busca)

)

mostrar(filtro)

}

mostrar()

dashboard()
