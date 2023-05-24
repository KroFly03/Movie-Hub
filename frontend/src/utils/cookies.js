export function setCookie(name, value, options) {
  options = {
    path: '/',
    ...options
  };

  if (options.expires && options.expires.toUTCString) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (const optionKey in options) {
    if (options.hasOwnProperty(optionKey)) {
      updatedCookie += "; " + optionKey;
      const optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += "=" + optionValue;
      }
    }
  }

  document.cookie = updatedCookie
}

export function getCookie(name) {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");

  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
}

export function deleteCookie(name) {
  const date = new Date();
  date.setTime(date.getTime() + (-1));
  document.cookie = name+"=; expires="+date.toUTCString()+"; path=/";
}