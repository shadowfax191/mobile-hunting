const loadPhone = async (searchText,isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    displayPhones(data.data,isShowAll)
}

const displayPhones = (phones,isShowAll) => {
    const phoneContainer= document.getElementById('phon-container')
    phoneContainer.textContent=''
    
    const showAll=document.getElementById('show-all')
    if(phones.length > 9 && !isShowAll ){
        showAll.classList.remove('hidden')
    }
    else{
        showAll.classList.add('hidden')
    }
    if(!isShowAll){
        phones = phones.slice(0,9);
    }
    phones.forEach(phone => {
        const phonecard = document.createElement('div')
        phonecard.classList = `card p-4 border-4 border-cyan-600 bg-base-100 shadow-xl`
        phonecard.innerHTML = `<figure><img src="${phone.image}" /></figure>
        <div class="card-body ">
          <h2 class="card-title mx-auto">${phone.phone_name}</h2>
          <p></p>
          <div class="card-actions justify-center">
            <button onClick="showDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
          </div>
        </div>
        `;
        phoneContainer.appendChild(phonecard)
    });

    spinner(false)
}

const showDetails =async (id) =>{
    console.log('clicked',id)
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data= await res.json()
    console.log(data)
    showPhoneDetails(data.data);
}

const showPhoneDetails =(phone)=>{
    my_modal_5.showModal();
    document.getElementById('phone-name').innerText = phone.name 
    document.getElementById('show-detail-container').innerHTML=`
    <img class="mx-auto " src="${phone.image}" alt="">
    <P><span>Storage:</span> ${phone.mainFeatures.storage} </P>
    `
}
const handleSearch =(isShowAll)=>{
    spinner(true);
    const searchField= document.getElementById('search-field')
    const searchText =searchField.value 
    
    loadPhone(searchText,isShowAll)
    
}

const spinner =(isLoading)=>{
    const loading= document.getElementById('spinner')
    if(isLoading){
        loading.classList.remove('hidden')
    }
    else{
        loading.classList.add('hidden')
    }
    
}

const showAll= ()=>{
    handleSearch(true)
}
// loadPhone()