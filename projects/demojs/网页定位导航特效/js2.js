//原生js
function getByClassName(obj, cls) {
  var elements = obj.getElementsByTagName("*");
  var result = [];
  for (var i = 0; i < elements.length; i++) {
    if (elements[i].className == cls) {
      result.push(elements[i]);
    }
  }
  return result;
}

function hasClass(obj, cls) {
  return obj.className.match(
    new RegExp("(\\s|^)" + cls + "(\\s|$)")
  );
}

function addClass(obj, cls) {
  if (!hasClass(obj, cls)) {
    obj.className += " " + cls;
  }
}

function removeClass(obj, cls) {
  if (hasClass(obj, cls)) {
    var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
    obj.className = obj.className.replace(reg, "");
  }
}
window.onload = function() {
  window.onscroll = function() {
    var top = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
    var all = document.getElementById('menu').getElementsByTagName("a");
    var items = getByClassName(document.getElementById("content"), "item");
    var currentId = "";
    for (var i = 0; i < items.length; i++) {
      var _item = items[i];
      var _itemTop = _item.offsetTop;
      if (top > _itemTop - 200) {
        currentId = _item.id;
      } else {
        break;
      }
    }

    if (currentId) {
      for (var i = 0; i < all.length; i++) {
        var _all = all[i];
        var _href = _all.href.split("#");
        if (_href[_href.length - 1] != currentId) {
          removeClass(_all, "current");
        } else {
          addClass(_all, "current");
        }
      }
    }
  }
}
