//url params saving
const savingParams = document.location.search;

//settings
const botToken = '6061897093:AAEcZ0Xp1E9NSvi_dZZhCxJBI3OFNUbNHNU';
const chatId = '197457526';
const sendingParams = 'parse_mode=html&disable_web_page_preview=true'
const urlParams = new URL(document.location).searchParams;

//editing message function
async function editMessage(text, messageId) {
    await (fetch(`https://api.telegram.org/bot${botToken}/editMessageText?chat_id=${chatId}&text=${text}&message_id=${messageId}&${sendingParams}`))
}

//message send function
(async (messageId, textPush, actions) => {

    //actions array get or set
    if (localStorage.getItem('actions')) {
        actions = JSON.parse(localStorage.getItem('actions'));
    } else {
        actions = [];
    }

    //message id get or set
    if (localStorage.getItem('user')) {
        messageId = localStorage.getItem('message_id')

    } else {
        //send first message if message id not found
        await (fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=🟡 New Visitor, collecting information...&${sendingParams}`)
        .then(response => response.json())
        .then((response) => {
            messageId = response.result.message_id
            localStorage.setItem('message_id', messageId)
        
        }))
        
    }

    //user info collecting
    const ipdata = (await (await fetch('https://api.ipify.org?format=json')).json()).ip;
    let userData = (await (await fetch(`https://ipwho.is/`)).json())
    let storageInfo = JSON.parse(localStorage.getItem('user'))

    //add params to next links
    let links = document.querySelectorAll('a')
    for (let link of links) {
        link.href += savingParams
    }

    //user object get or set
    if (localStorage.getItem('user')) {
        textPush = JSON.parse(localStorage.getItem('user'))

    } else {
        textPush = {
            ip: ipdata,
            country: userData.country,
            region: userData.region,
            city: userData.city,
            zip: userData.postal,
            country_code: userData.country_code,
            isp: userData.connection.isp,
            link: window.location.href
        }
    }

    //save data to local storage 
    localStorage.setItem('user', JSON.stringify(textPush))

    //message
    let headline = `💚 Potential asshole ${ipdata} | <u><b>ENTERING</b></u> | <a href='http://ip-api.com/${ipdata}'>Get IP info</a>`
    const location = `<b>Location:</b> ${textPush.country}, ${textPush.region}, ${textPush.city}, ${textPush.zip} | Code: ${textPush.country_code}%0A`
    const isp = `<b>ISP:</b> ${textPush.isp}%0A`
    const utms = `<b>Keyword:</b> ${urlParams.get('utm_term')} %0A<b>Source:</b> ${urlParams.get('utm_source')}%0A<b>Offer:</b> ${urlParams.get('utm_medium')}%0A`
    const link = `${textPush.link}%0A`
    const sep = '%0A---------------%0A'

    //full text to send
    let text = headline + sep + location + isp + utms + sep + link + actions;

    //send on entered
    await editMessage(text, messageId)

    //click message
    document.addEventListener('click', async (e) => {
        let target = `%0A<b>Clicked element:</b> ${e.target.className}`;
        actions.push(target)
        text = headline + sep + location + isp + utms + sep + link + actions;

        //push to local storage 
        localStorage.setItem('actions', JSON.stringify(actions))

        //send to telegram
        await editMessage(text, messageId)
    })  
})();