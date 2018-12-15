const api = require("vk-easy");
const { TOKEN } = require("./config");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports = ({user_id: userId, text, payload, peer_id, group_id: group_id, conversation_message_id: message_id, attachements}) => {

    const randomId = Math.round(Math.random()*100000000);
    const token = "740a0dafd66d763ca438828b95e5b2f5e54fc43b48fe38e6f26bb16c8e0d4dd4ce92b178d7b684175f97c";
    
    var translateVerification = text;
    if(text.search(/!translate/i) === 0){
        var translateCommand = text;
        var translateText = translateCommand.slice(11);
        var urlTranslateText = translateText.replace(/ /g, "%20");
        const yandexTranslate = {
            key : "trnsl.1.1.20181210T225328Z.da5698f0c31a8c23.dde4081b590790222a42c088bfc94613646ce752",
            api: "https://translate.yandex.net/api/v1.5/tr.json/translate",
            translate : function(){
                var ajax = new XMLHttpRequest();
                var text = "&text=" + urlTranslateText;
                var lang = "&lang=en-ru"
                url = yandexTranslate.api + "?key=" + yandexTranslate.key + text + lang;
                ajax.open("GET", url, true);
                ajax.onreadystatechange = function(){
                    if (ajax.readyState == 4) {
                        if (ajax.status == 200) { 
                            const translation = JSON.parse(ajax.responseText);
                            const readyTranslate = translation.text[0];
                            console.log(readyTranslate);
                            api("messages.send", {
                                user_id: userId,
                                random_id: randomId,
                                peer_id: peer_id,
                                message: readyTranslate,
                                access_token: token
                            }).then(console.log);  
                        }
                    }
                };
                ajax.send();
                console.log("AJAX COMPLETE");
            }
        };
        yandexTranslate.translate();

    }

    switch(text){

        case "!анекдот":

            const getJoke = {
                api: "http://umorili.herokuapp.com/api/get?site=bash.im&name=bash&num=50",
        
                jokeFunction : function(){
                    var ajax = new XMLHttpRequest();   
                    var url = getJoke.api;
                    ajax.open("GET", url, true);
                    ajax.onreadystatechange = function(){
                        if (ajax.readyState == 4 && ajax.status == 200){
                            var jsonJoke = JSON.parse(ajax.responseText);
                            var randomJoke = Math.round(Math.random()*50);
                            var readyJoke = jsonJoke[randomJoke].elementPureHtml;
                            var uncodedJoke1 = readyJoke.replace(/&quot/gm, " \" ");
                            var uncodedJoke = uncodedJoke1.replace(/<br \/>/gm, "");
                            api("messages.send", {
                                user_id: userId,
                                random_id: randomId,
                                peer_id: peer_id,
                                message:uncodedJoke,
                                access_token: token
                            }).then(console.log);
                            console.log(uncodedJoke);                   
                        }
        
                        else if( ajax.readyState == 4 && ajax.status == 403){                        
                            console.log("ERROR");
                        }
                    };
                    ajax.send();
                }
        
            }
            getJoke.jokeFunction();

            break;

        case "[club174937600|@club174937600] !погода":
        case "[club174937600|AP v0.5s] !погода":
        case "!forecast":
        case "! Погода":
        case "! погода":
        case "!погода":
        case "! Forecast":

            const yandexForecast = {

                key : "6f44afb0-ad30-4d53-8368-0c6832189514",
                api: "https://api.weather.yandex.ru/v1/forecast?lat=55.75396&lon=37.620393&extra=true",
        
                forecast : function(){
                    var ajax = new XMLHttpRequest();   
                    var url = yandexForecast.api;

                    console.log(url);
                    ajax.open("GET", url, true);
                    ajax.setRequestHeader("X-Yandex-API-Key", "6f44afb0-ad30-4d53-8368-0c6832189514");
                    ajax.onreadystatechange = function(){
                        if (ajax.readyState == 4 && ajax.status == 200){
                            const readyForecast = JSON.parse(ajax.responseText);
                            const city = readyForecast.info.tzinfo.name;
                            const temp = readyForecast.fact.temp;
                            const feelsLike = readyForecast.fact.feels_like;
                            const windSpeed = readyForecast.fact.wind_speed;
                            api("messages.send", {
                                user_id: userId,
                                random_id: randomId,
                                peer_id: peer_id,
                                message:"Регион: " + city + ", температура: " + temp + ", по ощущениям: " + feelsLike + " скорость ветра: " + windSpeed + "м/c",
                                access_token: token
                            }).then(console.log);

                            console.log(readyForecast);
                            console.log(readyForecast.info);
                        
                        }
        
                        else if( ajax.readyState == 4 && ajax.status == 403){                        
                            console.log("ERROR");
                        }
                    };
                    ajax.send();
                }
        
            }
            yandexForecast.forecast();

        break;

        case "!translateInfo":
            api("messages.send", {
                user_id: userId,
                random_id: randomId,
                peer_id: peer_id,
                message:'Перевод выполнен с помощью сервиса "Яндекс.переводчик" для некоммерческих целей. Подробней на https://translate.yandex.ru/',
                access_token: token
            }).then(console.log);
            break;

        case "[club174937600|@club174937600] !help":
        case "[club174937600|AP v0.5s] !help":
        case "!help" :
        case "!Help" :
        case "! help" :
        case "! Help" :
        case "!HELP" :
            api("messages.send", {
                user_id: userId,
                random_id: randomId,
                peer_id: peer_id,
                message:'Для комфортного взаимодействия используй команду !keyboard, !time - время, !weather - погода, !sex - узнать ориентацию, !анекдот - случайный и несмешной анекдот, !ng - сколько осталось до нового года, !flip - орел/решка',
                access_token: token
            }).then(console.log);
            break;

        case "[club174937600|@club174937600] !sex":
        case "[club174937600|AP v0.5s] !sex":
        case "!sex":
        case "!Sex":
        case "! Sex":
        case "! sex":
        case "!SEX" :
            
            (function sexRandom (){
                const sexPercent = Math.round(Math.random()*100);

                if(sexPercent === 0){
                    api("messages.send", {
                        user_id: userId,
                        random_id: randomId,
                        peer_id: peer_id,
                        message:'ТЫ АБСОЛЮТНЫЙ НАТУРАЛ!ТАК ЧТО ТЫ ЗАБЫЛ В ЭТОМ ЧАТЕ?!',
                        access_token: token
                    }).then(console.log);    
                }
                else if(sexPercent === 100){
                    api("messages.send", {
                        user_id: userId,
                        random_id: randomId,
                        peer_id: peer_id,
                        message:'ТЫ ЧИСТОКРОВНЫЙ ГЕЙ, СМОТРЕТЬ АНИМЕ, ИГРАТЬ В CS И КУРИТЬ ICOS У ТЕБЯ В КРОВИ!(p.s. даже не думай размножаться)',
                        access_token: token
                    }).then(console.log);    
                }
                else{
                    api("messages.send", {
                        user_id: userId,
                        random_id: randomId,
                        peer_id: peer_id,
                        message:'Ты пидор c вероятностью ' + sexPercent + '%',
                        access_token: token
                    }).then(console.log); 
                }

                
            })();
            break;

        case "!flip" :

            (function coinRandom (){
                const coinFlip = Math.round(Math.random()*1);

                if(coinFlip === 0){
                    api("messages.send", {
                        user_id: userId,
                        random_id: randomId,
                        peer_id: peer_id,
                        message:'РЕШКА',
                        access_token: token
                    }).then(console.log);    
                }
                else{
                    api("messages.send", {
                        user_id: userId,
                        random_id: randomId,
                        peer_id: peer_id,
                        message:'ОРЕЛ',
                        access_token: token
                    }).then(console.log); 
                }

                
            })();
            break;



        case "[club174937600|@club174937600] !PogChamp":
        case "[club174937600|AP v0.5s] !PogChamp":
        case "PogChamp":
        case "Pog":
        case "POGCHAMP":
        case "POG":
        case "pogchamp":
        case "погчамп":
        case "Погчамп":
        case "погчемп":
        case "ПОГ":
        case "пог":
        case "погчэмп":
        case "погерс":
        case "Погерс":
        case "поггерс":
    
            api("messages.send", {
                user_id: userId,
                random_id: randomId,
                peer_id: peer_id,
                attachment:"photo-174937600_456239074" ,
                access_token: token
            }).then(console.log);
            break;

        case "[club174937600|@club174937600] !OMEGALUL":
        case "[club174937600|AP v0.5s] !OMEGALUL":
        case "OMEGALUL":
        case "OMEGA":
        case "omegalul":
        case "Omegalul":
        case "Омега":
        case "омега":
        case "омегалул":
        case "Омегалул":
    
            api("messages.send", {
                user_id: userId,
                random_id: randomId,
                peer_id: peer_id,
                attachment:"photo-174937600_456239078" ,
                access_token: token
            }).then(console.log);
            break;

        case "[club174937600|@club174937600] !LUL":
        case "[club174937600|AP v0.5s] !LUL":
        case "LUL":
        case "ЛУЛ":
        case "lul":
        case "Лул":
        case "лул":
        case "лол":
        case "lol":
        case "LOL":
        case "Лол":
        case "ЛОЛ":
    
            api("messages.send", {
                user_id: userId,
                random_id: randomId,
                peer_id: peer_id,
                attachment:"photo-174937600_456239079" ,
                access_token: token
            }).then(console.log);
            break;

        case "!Kappa":
        case "Kappa":
        case "Каппа":
        case "!каппа":
        case "KAPPA":
        case "Kappa":
        case "каппа":

        api("messages.send", {
            user_id: userId,
            random_id: randomId,
            peer_id: peer_id,
            attachment:"photo-174937600_456239101" ,
            access_token: token
        }).then(console.log);
            break;


        case "[club174937600|@club174937600] !roflanDovolen":
        case "[club174937600|AP v0.5s] !roflanDovolen":
        case "roflanDovolen":
        case "рофландоволен":
        case "доволен":
        case "довольны":
        case "РофланДоволен":
        case "Рофландоволен":
        case "Рофланебало":
        case "рофланебало":
    
            api("messages.send", {
                user_id: userId,
                random_id: randomId,
                peer_id: peer_id,
                attachment:"photo-174937600_456239075" ,
                access_token: token
            }).then(console.log);
            break;

        case "[club174937600|@club174937600] !roflanPominki":
        case "[club174937600|AP v0.5s] !roflanPominki":
        case "roflanPominki":
        case "рофланпоминки":
        case "поминки":
        case "РофланПоминки":
        case "Рофланпоминки":
    
            api("messages.send", {
                user_id: userId,
                random_id: randomId,
                peer_id: peer_id,
                attachment:"photo-174937600_456239076" ,
                access_token: token
            }).then(console.log);
            break;

        case "[club174937600|@club174937600] !roflanPomoika":
        case "[club174937600|AP v0.5s] !roflanPomoika":
        case "roflanPomoika":
        case "рофланпомойка":
        case "помойка":
        case "Рофланпомойка":
        case "РофланПомойка":
    
            api("messages.send", {
                user_id: userId,
                random_id: randomId,
                peer_id: peer_id,
                attachment:"photo-174937600_456239077" ,
                access_token: token
            }).then(console.log);
            break;

        case "!аниме":
        case "!anime":

            var animeTyans = ["photo-174937600_456239081", "photo-174937600_456239082", 
                              "photo-174937600_456239083", "photo-174937600_456239084", 
                              "photo-174937600_456239085", "photo-174937600_456239086", 
                              "photo-174937600_456239087", "photo-174937600_456239088",
                              "photo-174937600_456239089", "photo-174937600_456239090",
                              "photo-174937600_456239091", "photo-174937600_456239092", 
                              "photo-174937600_456239093", "photo-174937600_456239094", 
                              "photo-174937600_456239095", "photo-174937600_456239096", 
                              "photo-174937600_456239097", "photo-174937600_456239098",
                              "photo-174937600_456239099", "photo-174937600_456239100"];
            var animeRandom = Math.round(Math.random() * (animeTyans.length - 1) );
            var animeResult = animeTyans[animeRandom];

            api("messages.send", {
                user_id: userId,
                random_id: randomId,
                peer_id: peer_id,
                attachment:animeResult ,
                access_token: token
            }).then(console.log);
            break;

        case "[club174937600|@club174937600] !Руслан":
        case "[club174937600|AP v0.5s] !Руслан":
        case "!Руслан":
        case "!руслан":
        case "!ruslan":
        case "!Ruslan":
        
            api("messages.send", {
                user_id: userId,
                random_id: randomId,
                peer_id: peer_id,
                message:'Пошел нахуй',
                access_token: token
            }).then(console.log);
            break;

        case "!Юра":
        case "!юра":
            api("messages.send", {
                user_id: userId,
                random_id: randomId,
                peer_id: peer_id,
                message:'Как же он хорош, просто богоподобен, лучший кожаный ублюдок из тех, что я знаю!Руслан, пошел нахуй',
                access_token: token
            }).then(console.log);
            break;

        case "!извини":
        case "!Извини":
            api("messages.send", {
                user_id: userId,
                random_id: randomId,
                peer_id: peer_id,
                message:'Извини, я больше так не буду!',
                access_token: token
            }).then(console.log);
            break;

        case "!Элья":
        case "!Илья":
        case "!элья":
        case "!илья":
            api("messages.send", {
                user_id: userId,
                random_id: randomId,
                peer_id: peer_id,
                message:'Чо пацаны, аниме?!',
                access_token: token
            }).then(console.log);
                break;

        case "!Вова":
        case "!вова":
            api("messages.send", {
                user_id: userId,
                random_id: randomId,
                peer_id: peer_id,
                message:'Россия для русских - Москва для москвичей',
                access_token: token
            }).then(console.log);
                break;

        case "!дота":
        case "!Дота":
        case "!dita":
            api("messages.send", {
                user_id: userId,
                random_id: randomId,
                peer_id: peer_id,
                message:'В доту будем?',
                access_token: token
            }).then(console.log);
                break;

        case "[club174937600|@club174937600] !joke":
        case "[club174937600|AP v0.5s] !joke":
        case "!joke":
        case "!Joke":
        case "! joke":
        case "! Joke":
        case "!JOKE" :
            api("messages.send", {
                user_id: userId,
                random_id: randomId,
                peer_id: peer_id,
                message:'Здесь должен быть анекдот про проводника, но вы итак его знаете',
                access_token: token
            }).then(console.log);
            break;

        case "[club174937600|@club174937600] !ng":
        case "[club174937600|AP v0.5s] !ng":
        case "!ng":
        case "!Ng":
        case "! ng":
        case "! Ng":
        case "!NG" :

            (function newYearTime(time){

                function addZero(i) {
                    if( i < 10 ){
                        i = "0" + i;
                    }
                    return i;
                }
            
                const date = new Date();
                const month = date.getMonth();
                const dayDate = date.getDate();
                const h = date.getHours() + 1;
                const m = date.getMinutes() + 1;
                const s = date.getSeconds() + 1;
                const timeNow = h + " hours " + m + " minutes " + s + " seconds" + month;
                time = timeNow;
                var allDays = 30;

                switch(month){
                    case 0:
                    case 2:
                    case 4:
                    case 6:
                    case 7:
                    case 9:
                    case 11:
                    
                    allDays = 31;
                    break;
                    
                    case 1 :
                    allDays = 28;
                    break;
                }
        

                const sixtySeconds = 60;
                const sixtyMinutes = 60;
                const twentyFour = 24;
                const twelweMonth = 12;
                const TIME = "До нового года осталось" + " " + (twelweMonth - month - 1) + " " + "месяцев" + " " + (allDays - dayDate) + " " + "дней" + " " + (twentyFour - h) + " " + "часов" + " " + (sixtyMinutes - m)  + " " + "минут" + " " + (sixtySeconds - s) + " " + "секунд" 

                console.log(TIME);

                api("messages.send", {
                    user_id: userId,
                    random_id: randomId,
                    peer_id: peer_id,
                    message:TIME,
                    access_token: token
                }).then(console.log);
            })();
            break;

        case "[club174937600|@club174937600] !sticker":
        case "[club174937600|AP v0.5s] !sticker":
        case "!sticker":
        case "!Sticker":
        case "! sticker":
        case "! Sticker":
        case "!STICKER" :
            const randomStikerId = Math.round(Math.random()*160) + 1;
            api("messages.send", {
                user_id: userId,
                random_id: randomId,
                sticker_id: randomStikerId,
                peer_id: peer_id,
                access_token: token
            }).then(console.log);
            break;

        case "[club174937600|@club174937600] !weather":
        case "[club174937600|AP v0.5s] !weather":

        case "!keyboard":
        case "!Keyboard":
        case "! keyboard":
        case "! Keyboard":
        case "!KEYBOARD":
        const keyboard = JSON.stringify(
            { 
                "one_time": false, 
                "buttons": [ 
                    [{ 
                    "action": { 
                        "type": "text", 
                        "payload": "{\"button\": \"1\"}", 
                        "label": "!help" 
                    }, 
                    "color": "positive" 
                    }, 
                    { 
                    "action": { 
                        "type": "text", 
                        "payload": "{\"button\": \"2\"}", 
                        "label": "!лотерея" 
                    }, 
                    "color": "positive" 
                    },
                    { 
                    "action": { 
                        "type": "text", 
                        "payload": "{\"button\": \"3\"}", 
                        "label": "!time" 
                    }, 
                    "color": "positive" 
                    }], 
                    [{ 
                    "action": { 
                        "type": "text", 
                        "payload": "{\"button\": \"4\"}", 
                        "label": "!ng" 
                    }, 
                    "color": "positive" 
                    },
                    {
                    "action": { 
                        "type": "text", 
                        "payload": "{\"button\": \"5\"}", 
                        "label": "!выход" 
                    },
                    "color": "negative" 
                    },
                    { 
                    "action": { 
                        "type": "text", 
                        "payload": "{\"button\": \"6\"}", 
                        "label": "!погода" 
                    }, 
                    "color": "positive" 
                    }],
                    [{ 
                    "action": { 
                        "type": "text", 
                        "payload": "{\"button\": \"7\"}", 
                        "label": "!joke" 
                    }, 
                    "color": "positive" 
                    },
                    { 
                    "action": { 
                        "type": "text", 
                        "payload": "{\"button\": \"8\"}", 
                        "label": "!sticker" 
                    }, 
                    "color": "positive" 
                    },
                    { 
                    "action": { 
                        "type": "text", 
                        "payload": "{\"button\": \"9\"}", 
                        "label": "!sex" 
                    }, 
                    "color": "positive" 
                    }],
                ] 
            } 
        )
        api("messages.send", {
            user_id: userId,
            random_id: randomId,
            message:'Клавиатура успешно открыта!',
            peer_id: peer_id,
            keyboard: keyboard,
            access_token: token
        }).then(console.log);
        break;

        case "[club174937600|@club174937600] !выход":
        case "[club174937600|AP v0.5s] !выход":
        case "!выход" :
            const keyboardOff = JSON.stringify(
                { 
                    "one_time": true, 
                    "buttons": [] 
                } 
            )
            api("messages.send", {
                user_id: userId,
                random_id: randomId,
                peer_id: peer_id,
                message: "Клавиатура благополучно закрыта!",
                keyboard: keyboardOff,
                access_token: token
            }).then(console.log);
            break;

        case "[club174937600|@club174937600] !мышь":
        case "[club174937600|AP v0.5s] !мышь":
        case "!мышь" :
            api("messages.send", {
                user_id: userId,
                random_id: randomId,
                attachment:"audio43613043_456239242",
                peer_id: peer_id,
                access_token: token
            }).then(console.log);
            break;

        // case "[club174937600|@club174937600] !mone":
        // case "[club174937600|AP v0.5s] !mone":
        // case "!mone" :
        //     api("messages.send", {
        //         user_id: userId,
        //         random_id: randomId,
        //         attachment:"photo-174937600_456239080",
        //         peer_id: peer_id,
        //         access_token: token
        //     }).then(console.log);
        //     break;

        case "[club174937600|@club174937600] !лотерея":
        case "[club174937600|AP v0.5s] !лотерея":
        case "!лотерея" :
        case "!lottery" :
        case "! лотерея" :
        case "!Лотерея" :
        case "! Лотерея" :
        (function lottery() {
            const randomNumber1 = Math.round(Math.random()*10000000000)+1;
            const randomNumber2 = Math.round(Math.random()*10000000000)+1;
          
            if(randomNumber1 === randomNumber2){
                api("messages.send", {
                    user_id: userId,
                    random_id: randomId,
                    peer_id: peer_id,
                    message: "НЫЫЫЫА! +1000 рублей, +мораль! GG WP",
                    access_token: token
                }).then(console.log);
            }

            else{
                api("messages.send", {
                    user_id: userId,
                    random_id: randomId,
                    peer_id: peer_id,
                    message: "Поррражеееение!",
                    access_token: token
                }).then(console.log);
            }

        })();
            break;

        case "!change" :
            api("messages.editChat", {
                chat_id:139,
                title: "New title",
                peer_id: peer_id,
                access_token: token
            }).then(console.log);
            break;

        case "[club174937600|@club174937600] !time":
        case "[club174937600|AP v0.5s] !time":
        case "!time":
        case "!Time":
        case "! time":
        case "! Time":
        case "!TIME":
            (function currentTime(time){

                function addZero(i) {
                    if( i < 10 ){
                        i = "0" + i;
                    }
                    return i;
                }
            
                const date = new Date();
                const h = addZero(date.getHours() + 3);
                const m = addZero(date.getMinutes());
                const s = addZero(date.getSeconds());
                const timeNow = h + " hours " + m + " minutes " + s + " seconds";
                time = timeNow;
                
                api("messages.send", {
                    user_id: userId,
                    message:time,
                    peer_id: peer_id,
                    random_id: randomId,
                    access_token: token
                }).then(console.log);

            })();
            break;

    // case "!pin" :
//     api("messages.pin", {
//         peer_id:174937600,
//         random_id: randomId,
//         user_id: userId,
//         message_id: 1189, 
//         access_token: token
//     }).then(console.log);
//     break;

// case "!delete" :
//     api("messages.deleteConversation", {
//         peer_id: 2000000139,
//         offset:1, 
//         count: 9999,
//         access_token: token
//     }).then(console.log);
//     break;

// case "!pin" :
// api("messages.pin", {
//     peer_id: peer_id,
//     message_id: message_id,
//     access_token: token
// }).then(console.log);
//     break;


        // case "!123" :
        //     api("messages.getHistoryAttachments", {
        //         peer_id: "174937600",
        //         chat_id: "174937600",
        //         media_type: "photo",
        //         start_from: 5,
        //         photo_sizes: 0,
        //         group_id: 174937600,
        //         access_token: token
        //     }).then(console.log);
        //     break;

        // case "!online" :
        //     api("groups.enableOnline", {
        //         user_id: 43613043,
        //         peer_id: 2000000139, 
        //         group_id: 174937600,
        //         access_token: token
        //     }).then(console.log);
        //     api("messages.send", {
        //         user_id: userId,
        //         random_id: randomId,
        //         message: "Сообщество теперь онлайн",
        //         access_token: token
        //     }).then(console.log);
        //     break;

        // case "!offline" :
        //     api("groups.disableOnline", {
        //         user_id: 43613043,
        //         peer_id: 2000000139, 
        //         group_id: 174937600,
        //         access_token: token
        //     }).then(console.log);
        //     api("messages.send", {
        //         user_id: userId,
        //         random_id: randomId,
        //         message: "Сообщество теперь оффлайн",
        //         access_token: token
        //     }).then(console.log);
        //     break;

        // case "!onlineStatus" :
        //     api("groups.getOnlineStatus", {
        //         user_id: userId,
        //         group_id: 174937600,
        //         access_token: token
        //     }).then(console.log);
        //     break;

        // case "!list" :
        //     api("groups.getMembers", {
        //         user_id: userId,
        //         group_id: 174937600,
        //         // fields: "sex, bdate, city, country",
        //         access_token: token
        //     }).then(console.log);
        //     break;

        // case "!member" :
        //     api("groups.isMember", {
        //         user_id: userId,
        //         group_id: 174937600,
        //         extended: 1,
        //         access_token: token
        //     }).then(console.log);
        //     break;

        default:
            console.log("It`s ok");
            break;
    };
}
