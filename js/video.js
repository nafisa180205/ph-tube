console.log('video')

function getTimeString(time){
    const hour = parseInt(time /3600)
    let remainingSecond = (time % 3600)
    const minute = parseInt(remainingSecond / 60)
    remainingSecond = remainingSecond % 60
    return `${hour}hrs ${minute}min  ago`
    //${remainingSecond} second
}

const removeActiveClass = () =>{

    const buttons = document.getElementsByClassName('category-btn')
    for(const btn of buttons){
        btn.classList.remove('active')
        
    }

}


// load
const loadCategories = () =>{
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then( (res) => res.json())
        .then( (data) => displayCategories(data.categories))
        .catch((error) => console.log(error))
    
}
const loadVideos = (searchText = "") =>{
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then( (res) => res.json())
        .then( (data) => displayVideos(data.videos))
        .catch((error) => console.log(error))
    
}

const loadCategoryVideos = (id) =>{
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then( (res) => res.json())
        .then( (data) => {
            removeActiveClass() 
            const activeBtn = document.getElementById(`btn-${id}`)
            activeBtn.classList.add('active')
            displayVideos(data.category)
            console.log(activeBtn)

        })
        .catch((error) => console.log(error))
}

const loadDetails = async(videoID) =>{
    console.log(videoID)
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoID}`
    const res = await fetch(url)
    const data = await res.json()
    displayDetails(data.video)
    
}

const displayDetails = (video) =>{
    console.log(video)
    const detailsContainer = document.getElementById('modal-content')

    detailsContainer.innerHTML = `
    <img src=${video.thumbnail}>
    <p>
    ${video.description}
    </p>
    `

    //way-1 show modal
    // document.getElementById('showModalData').click()

    // way-2 show modal

    document.getElementById('customModal').showModal()
}

const cardDemo ={
        "category_id": "1001",
        "video_id": "aaab",
        "thumbnail": "https://i.ibb.co/QPNzYVy/moonlight.jpg",
        "title": "Midnight Serenade",
        "authors": [
          {
            "profile_picture": "https://i.ibb.co/fDbPv7h/Noha.jpg",
            "profile_name": "Noah Walker",
            "verified": false
          }
        ],
        "others": {
          "views": "543K",
          "posted_date": ""
        },
        "description": "'Midnight Serenade' by Noah Walker is a soulful journey into the depths of the night, capturing the mystique and allure of a moonlit evening. With 543K views, this song brings together tender melodies and evocative lyrics, making it a favorite among listeners seeking a contemplative yet uplifting experience. Immerse yourself in this musical masterpiece and feel the calm embrace of the night."
      
      
}

const displayVideos = (videos) =>{
    const videoContainer = document.getElementById('videos')
    videoContainer.innerHTML = ''

    if(videos.length == 0){
        videoContainer.classList.remove('grid')
        videoContainer.innerHTML = `
        
        <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center">
            <img src="./asset/icon.png">
            <h2 class="text-3xl font-bold text-center">
            Oops!! Sorry, There is no <br> content here
            </h2>
        </div>
        `
        return

    }
    else{
        videoContainer.classList.add('grid')
    }


    videos.forEach((video) =>{
         const card = document.createElement('div')
         card.classList = 'card card-compact '
         card.innerHTML=`
            <figure class="h-[200px] relative">
                <img class="h-full w-full object-cover"
                src=${video.thumbnail}
                alt="Shoes" />

                 ${
                    video.others.posted_date?.length == 0 ? '':`<span class=" absolute bottom-2 right-2 bg-black text-gray-300 p-1 rounded"> ${getTimeString(video.others.posted_date)}
                    </span>`

                 }

                
            </figure>
            <div class="px-0 py-2 flex gap-2">
                <div>
                    <img class="w-8 h-8 rounded-full object-cover" src=${video.authors[0].profile_picture}>
                </div>

                <div>
                    <h2 class="font-bold">
                        ${video.title}
                    </h2>

                    <div class=" flex items-center gap-2">
                        <p class="text-gray-400">
                        ${video.authors[0].profile_name}
                        
                        </p>
                        ${video.authors[0].verified === true ? '<img class="w-5 h-5" src="https://img.icons8.com/?size=100&id=p9jKUHLk5ejE&format=png&color=000000"></img> ' : ''}
                    </div>

                    <div class="flex justify-between items-center gap-10 pt-5">
                        <p class="text-gray-400">
                        ${video.others.views}
                        </p>

                        <button onclick="loadDetails('${video.video_id}')" class="btn btn-sm">
                        details
                        </button>
                    </div>
                </div>
            </div>

         `
         videoContainer.appendChild(card) 

    })
}

// display
const displayCategories = (categories) =>{
    const categoryContainer =document.getElementById('categories')
    categories.forEach( (item) =>{
        console.log(item)
        const buttonContainer = document.createElement('div')
        buttonContainer.innerHTML=`
        <button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class="btn" category-btn>
            ${item.category}
        </button>
        `
        categoryContainer.appendChild(buttonContainer)
    })
}


document.getElementById('search-input').addEventListener('keyup', (e)=>{
    loadVideos(e.target.value)

})

loadCategories()

loadVideos()