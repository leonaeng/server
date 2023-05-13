//anchor scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

//url params saving
const savingParams = document.location.search;

//settings
const botToken = '5540054266%3AAAG3rhSNTdbAIhCJieGPUVaDyu8xUDyd-7s';
const chatId = '5180826412';
const sendingParams = 'parse_mode=html&disable_web_page_preview=true'
const urlParams = new URL(document.location).searchParams;

//message send function
(async () => {
    const ipdata = (await (await fetch('https://api.ipify.org?format=json')).json()).ip;
    // const userData = (await (await fetch(`https://ipapi.co/json/`)).json())
    let userData = (await (await fetch(`https://ipwho.is/`)).json())

    //add params to next links
    let links = document.querySelectorAll('a')
    for (let link of links) {
        link.href += savingParams
    }

    //entering message
    let headline = `💚 New visitor ${ipdata} | <u><b>ENTERING</b></u> | <a href='http://ip-api.com/${ipdata}'>Get IP info</a>`
    const location = `<b>Location:</b> ${userData.country}, ${userData.region}, ${userData.city}, ${userData.postal} | Code: ${userData.country_code}%0A`
    const isp = `<b>ISP:</b> ${userData.connection.isp}%0A`
    const utms = `<b>Keyword:</b> ${urlParams.get('utm_term')} %0A<b>Source:</b> ${urlParams.get('utm_source')}%0A<b>Offer:</b> ${urlParams.get('utm_medium')}%0A`
    const link = `${window.location.href}`
    const sep = '%0A---------------%0A'
    let text = headline + sep + location + isp + utms + sep + link

    //send
    fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${text}&${sendingParams}`) ;

    //click message
    document.addEventListener('click', async (e) => {
        let target = `<b>Clicked element:</b> ${e.target.className}`;
        console.log(target)
        headline = `💚 Visitor ${ipdata} | <u><b>CLICKED</b></u> | <a href='http://ip-api.com/${ipdata}'>Get IP info</a>`
        text = headline + sep + location + isp + utms + target + sep + link

        //send
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${text}&${sendingParams}`)
    })
    
})();

