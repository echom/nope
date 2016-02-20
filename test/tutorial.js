var data = {
  title: 'nope.js - tutorial',

};

var tutorial = np.html(html => html.html([
  html.head([
    html.meta({charset: 'utf-8'}),
    html.title('nope.js - tutorial'),
    html.link({
      type: 'text/css',
      rel: 'stylesheet',
      href: 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/css/bootstrap.min.css'
    })
  ]),
  html.body([
    html.h1('nope.js - tutorial'),
    html.div([
      html.h2('Quick Start'),
      html.p('First things first!')
    ])
  ])
]));
