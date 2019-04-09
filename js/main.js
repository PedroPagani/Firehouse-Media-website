




class siteController {

    constructor() {
        
        this.body = document.querySelector('body');
        this.menuSlide = document.querySelector('[data-menu]');
        this.headerIsOpen = document.querySelector('[data-show]');
        this.form = document.querySelector('form');
        this.menuSlideOpen = false;

        this.init();
        this.portController = new PortfolioController();
        
    }
    
    
    // Start the page
    init() {

        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.register('./sw.js').then((reg) => {
                console.log('registrou ' + reg);
            }).catch((error) => {
                console.log('erro ao registrar sw ' + error);
            })
        }
        
        //Make body not scroll
        this.body.style.overflow = "hidden";

        window.onload = () => {

            
            this.body.style.overflow = "auto";

            this.closeLoadingScreen()
            this.slickInit();
            this.menuLinksClick();
            this.showHeaderScroll();
            this.iconBtnClick();

            

            

            // Validate form when submit is clicked
            this.form.addEventListener('submit', (e) => {


                let teste = this.submitValidate(e);
                console.log(teste);
                return teste;
                

            })


        }

    }

    closeLoadingScreen() {
        

        document.querySelector('[data-disappear]').dataset.disappear = "close"

        setTimeout(() => {
            document.querySelector('[data-disappear]').style.display = "none";
        }, 600);

        
    }



/* 
    MENU LINKS
 */

    menuLinksClick() {

        
        let portSection = document.querySelectorAll('.offset-top');
        
        let offSetList = []

        
        // make an array with all offsetTop of the sections
        for(let i = 0; i < portSection.length; i++) {

            offSetList.push(portSection[i].offsetTop);
            
            
        }
        
        this.menuClick(offSetList);
        

    }

    // Here me add click event to all menu links to scroll the page
    menuClick(offSetList) {
        
        let menuLinks = document.querySelectorAll('.click li');


        // Need to remaker this code, I use switch to get the inner.HTML of each menu link
        menuLinks.forEach((ml) => {
            ml.addEventListener('click', () => {

                this.headerIsOpen.dataset.show = "close";
                // close the menu slide when click in any link
                this.menuSlide.dataset.menu = "close";
                this.menuSlideOpen = false;

                switch (ml.innerHTML) {
                    case "Vídeos":

                        window.scrollTo({
                            top: offSetList[0],
                            behavior: 'smooth'
                        })
                    break;

                    case "Clientes":

                        window.scrollTo({
                            top: offSetList[1],
                            behavior: 'smooth'
                        })
                    break;

                    case "Sobre":

                        window.scrollTo({
                            top: offSetList[2],
                            behavior: 'smooth'
                        })
                    break;

                    case "Contato":

                        window.scrollTo({
                            top: offSetList[3],
                            behavior: 'smooth'
                        })
                    break;

                }
            })

        })

    }
    

    // Show menu slide when click the icon button
    iconBtnClick() {

        let iconBtn = document.querySelectorAll('.icon-click');
        
        

        // click event for each button
        iconBtn.forEach((iB) => {
            iB.addEventListener('click', () => {
                
                if (this.menuSlide.dataset.menu === "close") {
                    this.menuSlideOpen = true;

                    this.menuSlide.dataset.menu = "open";

                    if (iB.id === "home-icon") {
                        this.headerIsOpen.dataset.show = "open";
                    }


                } else {

                    this.menuSlideOpen = false;

                    this.menuSlide.dataset.menu = "close";
                }

            })
        })

    }
    

    // CRIAR UMA FUNÇÃO NO UTILS!!!
    showHeaderScroll() {
        
        

        let positions = []
        

        window.onscroll = () => {

            if (!this.menuSlideOpen) {

                let currentPos = window.pageYOffset;
                
                positions.push(currentPos);
    
                if (positions.length > 2) {
                    
                    if (currentPos > 50) {
                        
                        if (positions[0] < positions[1]) {
                
                
                            this.headerIsOpen.dataset.show = "close";
                            positions = [];
                
                
                        } else {
                
                
                            this.headerIsOpen.dataset.show = "open";
                            positions = [];
                
                        }
                    } else {
                        this.headerIsOpen.dataset.show = "close";
                    }
                    
                }
                    
            }
        }
            


    } // end showHEaderScroll()


    submitValidate(e) {


        const fields = document.querySelectorAll('form [name]');
        
        let isValid = true
        
        fields.forEach((f) => {


            if (['name', 'email', 'phone', 'jobs', 'text', 'g-recaptcha-response'].indexOf(f.name) > -1 && !f.value) {

                f.classList.add('required');
                e.preventDefault();
                isValid = false;

                if (f.name === 'g-recaptcha-response') {

                    if (!f.value) {
                        alert("Captcha não selecionado");
                    }
                }        

            } 
            
            
        }) 

        if (isValid) {
            return true;
        } else {
            return false;
        }
                
    }







  

    slickInit() {

        $('.responsive').slick({
            lazyLoad: 'progressive',
            dots: false,
            pauseOnHover: false,
            pauseOnFocus: false,
            autoplay: true,
            autoplaySpeed: 300,
            infinite: true,
            speed: 800,
            slidesToShow: 4,
            slidesToScroll: 1,
            responsive: [
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                  infinite: true,
                  dots: true
                }
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1
                }
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1
                }
              }
              // You can unslick at a given breakpoint now by adding:
              // settings: "unslick"
              // instead of a settings object
            ]
          });
    
    }

} // END CLASS

const teste = new siteController();






























 