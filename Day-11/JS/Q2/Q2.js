const sections = [
  { title: 'Section 1', content: 'Content for section 1. This is some detailed information.' },
  { title: 'Section 2', content: 'Content for section 2. This is some detailed information.' },
  { title: 'Section 3', content: 'Content for section 3. This is some detailed information.' }
];

const accordion = document.getElementById("accordion");
let activeIndex = null;

function renderAccordion() {
  accordion.innerHTML = "";

  sections.forEach((section, index) => {
    const div = document.createElement("div");

    const header = document.createElement("h3");
    header.textContent = section.title;
    header.onclick = () => toggleSection(index);

    const content = document.createElement("div");
    content.textContent = section.content;
    content.style.maxHeight = activeIndex === index ? "100px" : "0";
    content.style.overflow = "hidden";
    content.style.transition = "max-height 0.3s ease";

    div.appendChild(header);
    div.appendChild(content);
    accordion.appendChild(div);
  });
}

function toggleSection(index) {
  activeIndex = activeIndex === index ? null : index;
  renderAccordion();
}

renderAccordion();
