export default class Song {
  constructor({
    id,
    mid,
    singer,
    name,
    album,
    duration,
    image,
    url,
    aliaName
  }) {
    this.id = id;
    this.singer = singer;
    this.name = name;
    this.album = album;
    this.aliaName = aliaName;
    // this.duration = duration
    this.image = image;
    // this.url = url
  }
}

function singerName(arr) {
  let name = [];
  name = arr.map(item => {
    // console.log(arr)
    return item.name;
  });

  return name.join("/");
}

export function createNewSong(music) {
  return new Song({
    id: music.id,
    singer: singerName(music.song.artists),
    name: music.name,
    // aliaName: music.song.alias.join('-'),
    album: music.song.album.name,
    image: music.song.album.picUrl
  });
}

export function createRecommendListSong(music) {
  return new Song({
    id: music.id,
    singer: singerName(music.ar),
    name: music.al.name,
    // aliaName: music.song.alias.join('-'),
    album: music.description,
    image: music.al.picUrl
  });
}

export function createSong(music) {
  return new Song({
    id: music.id,
    singer: singerName(music.ar),
    name: music.name,
    // aliaName: filiterAliaName(music.alia),
    album: music.al.name,
    image: music.al.picUrl
  });
}

export function createSearchSong(music) {
  return new Song({
    id: music.id,
    singer: singerName(music.ar),
    name: music.name,
    // aliaName: filiterAliaName(music.alias),
    album: music.album.name
    // image: `http://p1.music.126.net/-2o0OyBFtfCCoBqL1Q-TjA==/${music.album.picId}.jpg`
    // // url: `http://dl.stream.qqmusic.qq.com/C400${musicData.songid}.m4a?vkey=${getUrl(musicData.songid)}&guid=3304491888&uin=0&fromtag=66`
  });
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function shuffle(arr) {
  let _arr = arr.slice(0);
  for (let i = 0; i < arr.length; i++) {
    let j = getRandomInt(0, i);
    let t = _arr[i];
    _arr[i] = _arr[j];
    _arr[j] = t;
  }

  return _arr;
}

// 截流函数
export function debounce(func, delay) {
  let timer;

  return function(...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

export function addClass(el, className) {
  if (hasClass(el, className)) {
    return;
  }
  let newClass = el.className.split(" ");
  newClass.push(className);
  el.className = newClass.join(" ");
}

export function hasClass(el, className) {
  let reg = new RegExp("(^|\\s)" + className + "(\\s|$)");
  return reg.test(el.className);
}

export function getData(el, name, val) {
  const prefix = "data-";
  name = prefix + name;
  if (val) {
    // 如果有 val 就添加这个 val 到 dom 中
    // name="val"
    return el.setAttribute(name, val);
  } else {
    // 没有 val ，就获取 dom 中的 name
    return el.getAttribute(name);
  }
}

// 能力检测
let elementStyle = document.createElement("div").style;

let vendor = (() => {
  // 定义游览器前缀
  let transformNames = {
    webkit: "webkitTransform",
    Moz: "MozTransform",
    O: "OTransform",
    ms: "msTransform",
    standard: "transform"
  };

  // 遍历前缀，如果游览器支持的话，就返回对应 key
  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key;
    }
  }

  // 如果都不支持，那肯定是有问题的，返回 false
  return false;
})();

export function prefixStyle(style) {
  if (vendor === false) {
    return false;
  }
  // 如果 vendor 为标准，就不改变 style
  if (vendor === "standard") {
    return style;
  }

  // 否则返回 vender(也就是 webkit Moz O ms 中的一个) + 样式首字母大写
  // 例如：webkit + transform ---> webkitTransform
  return vendor + style.charAt(0).toUpperCase() + style.substr(1);
}
