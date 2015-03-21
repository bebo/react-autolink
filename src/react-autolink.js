import React  from 'react';
import assign from 'object-assign';

function ReactAutolinkMixin() {
  const delimiter = /((?:https?:\/\/)?(?:(?:[a-z0-9][a-z0-9\-]{1,61}[a-z0-9]\.)+[a-z\.]*[a-z]+|(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3})(?::\d{1,5})*[a-z0-9.,_\/~#&=;%+?-]*)/ig;

  let strStartsWith = (str, prefix) => {
    return str.slice(0, prefix.length) === prefix;
  };

  return {
    autolink(text, options = {}) {
      if (!text) return null;

      return text.split(delimiter).map(word => {
        let match = word.match(delimiter);
        if (match) {
          let url = match[0];
          return React.createElement(
            'a',
            assign({href: strStartsWith(url, 'http') ? url : `http://${url}`}, options),
            url
          );
        } else {
          return word;
        }
      });
    }
  };
}

export default ReactAutolinkMixin();