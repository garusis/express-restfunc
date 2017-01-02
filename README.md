#express-restfunc
A RESTfunc implementation for ExpressJS

**RESTfunc** is an approach for REST APIs proposed by [screenfun](https://github.com/screenfun) that allows to make shorter, cleaner and more understandable requests ([Read more](https://goo.gl/ql209D)). 

**express-restfunc** is an implementation of this approach for ExpressJS. Includes basic functions and allows you to attach your own functions.

##Installation
```
npm i --save express-restfunc
```

##Usage

###Simple Usage (Enable basic RESTfunc functions on all of request)
```
const express = require('express');
const restfunc = require('express-restfunc');

const app = express();

app.use(restfunc());

/*
* Now you can make request like /my-test-endpoint?attr1=round(parse(12.4)))&attr2=laalala
* and you get on req.query somewhat like {"attr1":12,"attr2":"laalala"}
*/
```

###Enable your own functions on all of request
```
const express = require('express');
const restfunc = require('express-restfunc');

const app = express();

restfunc.attach('foo', function (arg) {
    return 'foo-' + arg;
});


app.use(restfunc());

/*
* Now you can make request like /my-test-endpoint?attr1=foo(round(parse(12.4))))&attr2=laalala
* and you get on req.query somewhat like {"attr1":"foo-12","attr2":"laalala"}
*/
```

###Enable your own scopes on all of request
If you want to make your request more readable and modular you could use scopes. 

```
const express = require('express');
const restfunc = require('express-restfunc');

const app = express();

restfunc.attach('math', {
    pow: function (base, exponent) {
        return Math.pow(base, exponent);
    }
});


app.use(restfunc());

/*
* Now you can make request like /my-test-endpoint?attr1=math.pow(2,8)&attr2=laalala
* and you get on req.query somewhat like {"attr1":256,"attr2":"laalala"}
*/
```



