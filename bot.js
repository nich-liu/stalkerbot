var send = require("./send");

function respond() {
    var request = JSON.parse(this.req.chunks[0]),
        // any of these special characters will start an
        // attempt to contruct a message in "postMessage"
        botRegex = /[\*\.\/]/;
    var string = request.text.toString();

    if (request.text && botRegex.test(string)) {
        this.res.writeHead(200);
        postMessage(request);
        this.res.end();
    } else {
        // message irrelevant to Stalkerbot
        console.log("\"A red herring\" - Stalkerbot v0.2.");
        this.res.writeHead(200);
        this.res.end();
    }
}

function postMessage(request) {
    var botResponse;
    

// emoji module
// TODO: split modules into seperate folder
  var emojiDict = {
        stalkersheet:"https://docs.google.com/a/princeton.edu/spreadsheets/d/1se8RIc_K1jlK_DUZi-Y2SyIV231wYSKrMav_WgnFIyg/edit?usp=sharing",
        POSITIVE: "",
        bask: "ヽ(´ー｀)ノ",
        cheers: "（ ^_^）o自自o（^_^ ）",
        cool: "( •_•)>⌐■-■",
        excited: "＼(＾▽＾)／",
        fistpump:"╭( ･ㅂ･)و ̑̑",
        happy: "// (⌒‿⌒)",
        horny: "( ͡°з ͡°)",
        hug:"(⊃｡•́‿•̀｡)⊃",
        hugs:"(⊃｡•́‿•̀｡)⊃  ⊂(｡•́‿•̀｡⊂)",
        jazzed:"♬٩(ˊ•͈ ꇴ •͈ˋ)و♬",
        joy: "ヾ（＾ヮ＾)ﾉ",
        lol:"ʱªʱªʱª (ᕑᗢूᓫ∗)",
        love: "( ˘ ³˘)♥",
        proud: "ヽ(´ー｀)ノ",
        wholesome: "ʘ‿ʘ",
        wink: "(^_<)〜☆",
        wow: "ヽ(°〇°)ﾉ",
        NEGATIVE: "",
        "to arms": "ヽ(｀⌒´)ﾉ",
        afraid:"₍₍ ᕕ(´◓⌓◔)ᕗ⁾⁾",
        angry:"ᕕ༼✿•̀︿•́༽ᕗ",
        bloated:"༼    ಠ   ͟ʖ  ಠ   ༽",
        confused: "¿ⓧ_ⓧﮌ",
        cry: "ಥ_ಥ",
        dead:"୧| ✖ ﹏ ✖ |୨",
        deadinside: "(　〇□〇）",
        depressed:"┏༼ •́ ╭╮ •̀ ༽┓",
        done: "(⇀_⇀)",
        ew: "(＞﹏＜)",
        flip: "(╯°□°）╯︵ ┻━┻",
        fuck: "Ƒ ư ɕ ƙ (╬ﾟ◥益◤ﾟ) ╬ﾟ",
        hangry:"໒( ˵ ° ۝ ° ˵ )७",
        help:"乁໒( ͒ ⌂ ͒ )७ㄏ",
        ifuckedupmylab: "（；￣д￣）",
        mad: "ꉂ `o´ )",
        nervous:"╰(”◕﹏◕”)つ",
        really: "ಠ_ಠ",
        sad:"(╯︵╰,)",
        scared:"₍₍ ᕕ(´◓⌓◔)ᕗ⁾⁾",
        stupid: "◔_◔",
        thriving: "(ಥ﹏ಥ)",
        NEUTRAL: "",
        "fuck it": "t(-_-t)",
        apathetic:"¯_(⊙_ʖ⊙)_/¯",
        apology: "๑•́ㅿ•̀๑) ᔆᵒʳʳᵞ",
        bird: "凸(¬‿¬)",
        dance: "ヾ(-_- )ゞ",
        duh:"། – _ – །",
        jazzy: "♬♫♪◖(●。●)◗♪♫♬",
        late: "ε=ε=ε=┌(;*´Д`)ﾉ",
        maxgetyourmindoutofthegutter: "╰། ￣ ۝ ￣ །╯",
        meh: "¯\(°_o)/¯",
        nich: "(⌐▨_▨)",
        running: "ε=ε=ε=┌(;*´Д`)ﾉ",
        rush: "ε=ε=ε=┌(;*´Д`)ﾉ",
        shocked:"╰། ◉ ◯ ◉ །╯",
        shook:"(ʘ言ʘ╬)",
        shrug: "¯\\_(ツ)_/¯",
        asleep: "(-, – )…zzzZZZ",
        sleepy: "Ƶƶ(☄￣▵—▵￣)",
        sorry: "＜(。_。)＞",
        wut:"(・・ ) ?",
        OTHER: "",
        "critical mass": "(・_・)ノ(・_・)ノ(°▽°)/", 
        "ho sher": "( ͡°з ͡°)(̿▀̿ ̿Ĺ̯̿̿▀̿ ̿)̄ ",
        bear: "ʕ •ᴥ•ʔ",
        bow: "(シ_ _)シ",
        dongers: "ヽ( ͝° ͜ʖ͡°)ﾉ",
        evil: "ಠ‿ಠ",
        lenny: "( ͡° ͜ʖ ͡°)",
        pikachu: "Y● ❛ ̫.❛●)´෴ϞϞ",
        rohan: "ಠ‿ಠ",
        santa:"ꉂ ꀞꀞꀞ(ᕑᗢूᓫ∗)˒˒",
        spotted: "( ⚆ _ ⚆ )",
        stalk: "ƪ(ړײ)ƪ",
        stalkerbot:"└[ ◕ 〜 ◕ ]┘",
        testinginwrongchat:"ԅ⁞ ◑ ₒ ◑ ⁞ᓄ",
        varietypack: "ヽ༼ຈل͜ຈ༽ﾉ ༼ ºل͟º ༽ ୧༼ ͡◉ل͜ ͡◉༽୨ (ง ͠° ل͜ °)ง ヽ༼ʘ̚ل͜ʘ̚༽ﾉ୧༼ಠ益ಠ༽୨乁( ◔ ౪◔)ㄏ─=≡Σ((( つ◕ل͜◕)つ (ง •̀_•́)ง┌(° ͜ʖ͡°)┘(ง ͠ ͠° ل͜ °)งᕙ༼◕ل͜◕༽ᕗ Sorry, I dropped my Ultra Variety Pack™ bag of Dongers."
    };
    for (var key in emojiDict) {
      // match if preceded directly by * or /
      // match ends at word boundary("\b"), 
      // prevents collision between stalker/stalkerbot, dead/deadinside, etc
        var regEx = new RegExp("(\\/|\\*)"+key+"\\b");
      console.log(regEx);
        if (regEx.test(request.text)) {
            botResponse = emojiDict[key]
          send.post(botResponse);
        };
    }
  
//dice rolling module  
var diceRegex = /.roll/;
    if (diceRegex.test(request.text)) {
      var keyword= /\d*?\.roll\s*([^\n\r]{1})/g;
      var number = keyword.exec(request.text)[1];
      var rollResult =Math.ceil(Math.random() * number);
      console.log(JSON.stringify(request)); 
      send.post("🎲 "+rollResult+" 🎲");
    }
  
//urban dictionary module  
var urbanRegex = /.ud/;
    const ud = require('urban-dictionary');
    if (urbanRegex.test(request.text)) {
        var keyword = /.*\.ud\s*([^\n\r]*)/g;
        var match = keyword.exec(request.text);
        if (match) {
            var searchterm = match[1];
            ud.term(searchterm, function (error, entries, tags, sounds) {
                if (error) {
                    console.error(error.message)
                } else {
                    var definition = entries[0].definition;
                    send.post(definition);
                }
            });
        }
    }
}


exports.respond = respond;