let randomizeArgs = document.getElementById('randomizeArgs');
randomizeArgs.addEventListener('click', randomArgs);

let randomizeChannel = document.getElementById('randomizeChannel');
randomizeChannel.addEventListener('click', randomChannel);

let randomizeUser = document.getElementById('randomizeUser');
randomizeUser.addEventListener('click', randomUser);

let randomizeTarget = document.getElementById('randomizeTarget');
randomizeTarget.addEventListener('click', randomTarget);

function randomID(){
    return Math.floor(Math.random() * (9999999999999999999 - 100000000000000000 + 1) + 100000000000000000);
};

function randomArgs() {
    let argsValues = ['Hello world', 'Boy do I love tagscript!', 'Imagine', 'Consider putting something here', 'args!!!', 'kiwis', 'discord', 'botlabs'];
    document.getElementById('tagscriptArgs').value = argsValues[Math.floor(Math.random() * argsValues.length)];
};

function randomChannel() {
    let channelNameValues = ['tagscript-chat', 'tagscript-is-so-cool', 'general', 'support', 'carl-bot', 'btagscript', 'main-chat'];
    document.getElementById('channelName').value = channelNameValues[Math.floor(Math.random() * channelNameValues.length)];

    let channelID = randomID();
    document.getElementById('channelID').value = channelID;

    let channelNSFWValues = ['true', 'false'];
    document.getElementById('channelNSFW').value = channelNSFWValues[Math.floor(Math.random() * channelNSFWValues.length)];

    document.getElementById('channelMention').value = '<#' + channelID + '>';

    let channelTopicValues = ['Shameless advertising', 'This channel is for tagscript', 'Tagscript is the coolest language to ever exist!', 'Javascript is pretty fun to learn!', 'Python is a pretty cool language'];
    document.getElementById('channelTopic').value = channelTopicValues[Math.floor(Math.random() * channelTopicValues.length)];

    let channelSlowmodeValues = ['0', '5', '30', '60', '120', '240', '480', '960', '1440'];
    document.getElementById('channelSlowmode').value = channelSlowmodeValues[Math.floor(Math.random() * channelSlowmodeValues.length)];
};

function randomUser() {
    let userNameValues = ['tagscript', 'tagscript-bot', 'tagscript-bot-2', 'carl-bot', 'btagscript', 'bot', 'turtle101', 'sentinelsfan'];
    document.getElementById('userName').value = userNameValues[Math.floor(Math.random() * userNameValues.length)];

    document.getElementById('userUsername').value = userNameValues[Math.floor(Math.random() * userNameValues.length)] + '#' + Math.floor(Math.random() * (9999 - 0 + 1) + 0);

    let userID = randomID();
    document.getElementById('userID').value = userID;

    document.getElementById('userCreatedAt').value = Math.floor(Math.random() * ((Math.floor(Date.now() / 1000)) - 0 + 1) + 0);

    document.getElementById('userJoinedAt').value = Math.floor(Math.random() * ((Math.floor(Date.now() / 1000)) - 0 + 1) + 0);;

    document.getElementById('userMention').value = '<@' + userID + '>';

    document.getElementById('userColor').value = Math.floor(Math.random()*16777215).toString(16).toUpperCase();

    let userRoleIDS = [];
    for (let i = 0; i < Math.floor(Math.random() * (10 - 1 + 1) + 1); i++) {
        userRoleIDS.push(randomID());
    }
    document.getElementById('userRoleIDs').value = userRoleIDS.join(' ');
};

function randomTarget() {
    let targetNameValues = ['Jerry', 'Ben', 'Asty', 'Asport', 'Arthur', 'Elise', 'Raffael', 'Deafiore', 'Panda', 'Oriel'];
    document.getElementById('targetName').value = targetNameValues[Math.floor(Math.random() * targetNameValues.length)];

    document.getElementById('targetUsername').value = targetNameValues[Math.floor(Math.random() * targetNameValues.length)] + '#' + Math.floor(Math.random() * (9999 - 0 + 1) + 0);

    let targetID = randomID();
    document.getElementById('targetID').value = targetID;

    document.getElementById('targetCreatedAt').value = Math.floor(Math.random() * ((Math.floor(Date.now() / 1000)) - 0 + 1) + 0);

    document.getElementById('targetJoinedAt').value = Math.floor(Math.random() * ((Math.floor(Date.now() / 1000)) - 0 + 1) + 0);;

    document.getElementById('targetMention').value = '<@' + targetID + '>';

    document.getElementById('targetColor').value = Math.floor(Math.random()*16777215).toString(16).toUpperCase();

    let targetRoleIDS = [];
    for (let i = 0; i < Math.floor(Math.random() * (10 - 1 + 1) + 1); i++) {
        targetRoleIDS.push(randomID());
    }
    document.getElementById('targetRoleIDs').value = targetRoleIDS.join(' ');
}

randomArgs();
randomChannel();
randomUser();
randomTarget();