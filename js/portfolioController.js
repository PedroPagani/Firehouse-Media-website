'use strict'



class PortfolioController {

    constructor() {

        this.fetchData();
        this.selectPort();
        

        this.portContainer = document.querySelector('.portfolio-video-grid')
        this.dataVideos = '';
        
        
    }
    
    // Fetch videos information
    fetchData() {
        fetch('../videos.json')
        .then(res => res.json())
        .then(data => {

            
            this.dataVideos = data;

            // Load page with 'destaques' render
            for(let d = 0; d < data.videos.categories[0].videosInfo.length; d++) {

                this.render(data.videos.categories[0].videosInfo[d])
            }
        })
        .catch(err => {
            console.log('Erro ao carregar portfolio');
        })
    }




    // When user click in port links, show the specific portfolio
    selectPort() {

        let linksPortEl = document.querySelectorAll('.portfolio-list li');
            
        for(let l = 0; l < linksPortEl.length; l++) {
               
            linksPortEl[l].addEventListener('click', () => {

                this.portContainer.innerHTML = '';

                let videosListInfo = this.dataVideos.videos.categories[l].videosInfo

                videosListInfo.forEach((t) => {

                    this.render(t);

                    this.showPortVideo();
                    
                })
            
            })
        }
        
        
        
    }

    // User click thumbs, show video modal
    showPortVideo() {
        
        let thumbs = document.querySelectorAll('.thumb');
        let iFrame = document.querySelector('iframe');

        let modal = document.getElementById('video-modal');
        let closeBtn = document.querySelector('.close-modal-btn');

        let blackBg = document.querySelector('.black-bg');

        thumbs.forEach((t) => {
            t.addEventListener('click', () => {

                if (!t.classList.contains('plus-btn')) {
                    
                    modal.dataset.modal = "open";
                    blackBg.style.display = "block";
                    //this.body.overflow = "hidden"
    
                    let linkVideo = t.getAttribute('data-link');
                    iFrame.setAttribute('src', linkVideo);
                }

            })
        })

        closeBtn.addEventListener('click', () => {

            modal.dataset.modal = "close";
            blackBg.style.display = "none";
            //this.body.overflow = "auto"
            iFrame.setAttribute('src', '');

        })



    }


    // Render all porfolio thumbs
    render(t) {

        let thumbContainer = document.createElement('div');
        thumbContainer.classList.add('thumb-container');

        let thumb = document.createElement('div');
        thumb.tabIndex = 0;
        thumb.classList.add('thumb');
        thumb.dataset.link = `${t.link}`;
        thumbContainer.appendChild(thumb);

        let overflowEl = document.createElement('div');
        overflowEl.classList.add('overflow');
        thumb.appendChild(overflowEl);

        let pictureEl = document.createElement('picture');
        overflowEl.appendChild(pictureEl);

        let sourceEl = document.createElement('source');
        sourceEl.setAttribute('media', '(max-width: 1024px)');
        sourceEl.setAttribute('srcset', `${t.smallThumb}`);
        pictureEl.appendChild(sourceEl);

        let imgEl = document.createElement('img');
        imgEl.classList.add('thumb-img');
        imgEl.setAttribute('src', `${t.largeThumb}`);                    
        imgEl.alt = `${t.title}`;
        pictureEl.appendChild(imgEl);

        let nameContainer = document.createElement('div');
        thumbContainer.appendChild(nameContainer)

        let name = document.createElement('h3');
        name.innerHTML = `${t.title}`;
        nameContainer.appendChild(name);

        this.portContainer.appendChild(thumbContainer);

        // Check if the thumb is a link for 'More Videos'
        if (t.title === 'Mais Vídeos') {

            let aEl = document.createElement('a');
            aEl.setAttribute('href', `${t.link}`);
            aEl.target = '_blank'

            aEl.appendChild(thumb);
            aEl.appendChild(nameContainer);


            thumbContainer.insertAdjacentElement('afterbegin', aEl);

            thumb.classList.add('plus-btn');

        }

    }


}