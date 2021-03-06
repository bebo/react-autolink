import React  from 'react';
import assign from 'object-assign';

let ReactAutolink = () => {
  const delimiter = /((?:https?:\/\/)?(?:(?:[a-z0-9]?(?:[a-z0-9\-]{1,61}[a-z0-9])?\.[^\.|\s])+[a-z\.]*[a-z]+|(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3})(?::\d{1,5})*[a-z0-9@.,_\/~#&=;%+?\-\\(\\)]*)/ig;
  const matcher = /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi;
  const queryMatcher = /([?&].*=)/gi;

  let strStartsWith = (str, prefix) => {
    return str.slice(0, prefix.length) === prefix;
  };

  return {
    autolink(text, options = {}) {
      if (!text) return [];

      return text.split(delimiter).map(word => {
        let match = word.match(matcher);
        if (match) {
          let url = match[0];

          let segments = url.split('/');
          // no scheme given, so check host portion length
          if (segments[1] !== '' && segments[0].length < 5) {
            return word;
          }
          let displayUrl = url;
          url = url.replace('http://', '');
          url = url.replace('http//', '');
          let hasQueryStringMatch = url.match(queryMatcher);
          //url += (options && options.ref) ? (hasQueryStringMatch && hasQueryStringMatch.length ?
          // ('&ref='+options.ref) : ('?ref='+options.ref)) : '';
          return React.createElement(
            'a',
            assign({href: strStartsWith(url, 'http') ? url : `http://${url}`}, options),
            displayUrl
          );
        } else {
          return word;
        }
      });
    }
  };
};

export default ReactAutolink();
