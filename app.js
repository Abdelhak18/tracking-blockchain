const abi = [ /* L'ABI du contrat (voir ci-dessous) */ ];
const contractAddress = 'ADRESSE_DU_CONTRAT_DEPLOYE';

window.addEventListener('load', async () => {
  if (window.ethereum) {
    window.web3 = new Web3(ethereum);
    await ethereum.enable();
    window.contract = new web3.eth.Contract(abi, contractAddress);
    window.account = (await web3.eth.getAccounts())[0];
  } else {
    alert("Installez Metamask !");
  }
});

async function creerColis() {
  const id = document.getElementById("colisId").value;
  await contract.methods.creerColis(id).send({ from: window.account });
  alert("Colis créé !");
}

async function majEtat() {
  const id = document.getElementById("colisId").value;
  const etat = document.getElementById("etat").value;
  await contract.methods.majEtat(id, etat).send({ from: window.account });
  alert("État mis à jour !");
}

async function getHistorique() {
  const id = document.getElementById("colisId").value;
  const historique = await contract.methods.getHistorique(id).call();
  const list = document.getElementById("historiqueList");
  list.innerHTML = "";
  historique.forEach(e => {
    const li = document.createElement("li");
    li.textContent = e;
    list.appendChild(li);
  });
}
