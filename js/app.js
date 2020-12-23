/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
// var AllSections ;
const fragment = document.createDocumentFragment();
const sectionList = document.querySelectorAll('section');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
function createNavItemHTML(id, name){
    const itemHTML = `<a class ="menu__link" data-id="${id}">${name}</a>`;
    return itemHTML;
}
function getActiveElem() {
    maxSection = sectionList[0];
    minVal = 1000000;
    for (item of sectionList) {
        let bounding = item.getBoundingClientRect();
        if (bounding.top > -300 & bounding.top < minVal) {
            minVal = bounding.top;
            maxSection = item;
        };
    };
    return maxSection;
};

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNavigation(){
    for (let i=0; i < sectionList.length; i++){
        const newMenuItem = document.createElement('li');
        const sectionName = sectionList[i].getAttribute('data-nav')
        const sectionId = sectionList[i].getAttribute('id')
        newMenuItem.innerHTML = createNavItemHTML(sectionId, sectionName)
         fragment.appendChild(newMenuItem);
    }
    const navBarList = document.getElementById('navbar__list')
    navBarList.appendChild(fragment);
}

// Add class 'active' to section when near top of viewport
function setActive () {
    window.addEventListener('scroll', function (event) {
        let section = getActiveElem();
        section.classList.add('your-active-class');
        // set other sections as inactive
        for (let item of sectionList) {
            if (item.id != section.id & item.classList.contains('your-active-class')) {
                item.classList.remove('your-active-class');
            }
        }
        // set corresponding header style
        const active = document.querySelector('li > a[data-id="' + section.id + '"]');
        active.classList.add('active__link');
        // remove from other headers
        const headers = document.querySelectorAll('.menu__link');
        for (let item of headers) {
            if (item.dataset.id != active.dataset.id & item.classList.contains('active__link')) {
                item.classList.remove('active__link');
            }
        };
    });
};

// Scroll to anchor ID using scrollTO event
function scrollToElement(event){
    if(event.target.nodeName === 'A'){
        const sectionId = event.target.getAttribute('data-id');
        const section = document.getElementById(sectionId);
        section.scrollIntoView({behavior: "smooth"});
    }
}



/**
 * End Main Functions
 * Begin Events
 * 
*/

const navBarList = document.getElementById('navbar__list')
navBarList.addEventListener('click', function(event){
    scrollToElement(event)
})
// Build menu 
buildNavigation()
// Scroll to section on link click

// Set sections as active
setActive();
