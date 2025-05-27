const membersContainer = document.getElementById('members-container');
const gridBtn = document.getElementById('grid');
const listBtn = document.getElementById('list');

async function getMembers() {
  const response = await fetch('data/members.json');
  const data = await response.json();
  displayMembers(data);
}

function displayMembers(members) {
  membersContainer.innerHTML = '';
  members.forEach(member => {
    const card = document.createElement('section');
    card.classList.add('member-card');
    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo">
      <h2>${member.name}</h2>
      <p>${member.description}</p>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
    `;
    membersContainer.appendChild(card);
  });
}

gridBtn.addEventListener('click', () => {
  membersContainer.classList.remove('list');
  membersContainer.classList.add('members');
});

listBtn.addEventListener('click', () => {
  membersContainer.classList.remove('members');
  membersContainer.classList.add('list');
});

document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

getMembers();

