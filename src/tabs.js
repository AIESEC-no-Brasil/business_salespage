export const init = () => {
  document.addEventListener("DOMContentLoaded", () => {
    hideTabs();
    
    document.querySelectorAll(".tab-link").forEach(tabLink => {
      tabLink.addEventListener("click", evt => {
        const benefitName = evt.currentTarget.dataset.target;
        hideTabs();

        const tablinks = document
          .querySelectorAll(".tab-link")
          .forEach(tabLink => {
            tabLink.classList.remove("is-active");
          });
        document.getElementById(benefitName).style.display = "block";
        evt.currentTarget.classList.add("is-active");
      });
    });
    document.querySelector('.tab-link').click()
  });
};

const hideTabs = () => {
  Array.from(document.getElementsByClassName("tab-content")).map(tabContent => {
    tabContent.style.display = "none";
  });
};
