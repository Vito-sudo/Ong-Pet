"use strict";
const toggle=document.getElementById("menuToggle"),nav=document.getElementById("navLinks");
if(toggle&&nav){toggle.addEventListener("click",()=>{const open=nav.classList.toggle("open");toggle.setAttribute("aria-expanded",String(open));});document.addEventListener("keydown",e=>{if(e.key==="Escape"){nav.classList.remove("open");toggle.setAttribute("aria-expanded","false");}});}
const form=document.getElementById("cadastroForm");
if(form){
 const cpf=document.getElementById("cpf"),phone=document.getElementById("telefone"),cep=document.getElementById("cep"),birth=document.getElementById("nascimento");
 const today=new Date();birth.max=[today.getFullYear(),String(today.getMonth()+1).padStart(2,"0"),String(today.getDate()).padStart(2,"0")].join("-");
 function digits(v,max){return v.replace(/\D/g,"").slice(0,max);}
 function validCPF(value){const n=digits(value,11);if(n.length!==11||/^(\d)\1{10}$/.test(n))return false;for(let len=9;len<=10;len++){let sum=0;for(let i=0;i<len;i++)sum+=Number(n[i])*(len+1-i);const check=(sum*10)%11%10;if(check!==Number(n[len]))return false;}return true;}
 cpf.addEventListener("input",()=>{let n=digits(cpf.value,11);cpf.value=n.replace(/^(\d{3})(\d)/,"$1.$2").replace(/^(\d{3})\.(\d{3})(\d)/,"$1.$2.$3").replace(/(\d{3})(\d{1,2})$/,"$1-$2");cpf.setCustomValidity(n.length===11&&!validCPF(n)?"Informe um CPF com dígitos verificadores válidos.":"");});
 phone.addEventListener("input",()=>{let n=digits(phone.value,11);phone.value=n.length>2?"("+n.slice(0,2)+") "+n.slice(2):n; if(n.length>6){const cut=n.length===11?7:6;phone.value="("+n.slice(0,2)+") "+n.slice(2,cut)+"-"+n.slice(cut);}});
 cep.addEventListener("input",()=>{const n=digits(cep.value,8);cep.value=n.length>5?n.slice(0,5)+"-"+n.slice(5):n;});
 form.addEventListener("submit",e=>{e.preventDefault();cpf.setCustomValidity(validCPF(cpf.value)?"":"Informe um CPF válido.");if(!form.reportValidity())return;document.getElementById("cadastroResultado").textContent="Cadastro validado na demonstração. Nenhum dado foi enviado ou armazenado. Para participação real, contate a equipe da ONG.";});
}
