var data = new Data();

np.html(html => html.html([
  html.head([
    html.meta({charset: 'utf-8'}),
    html.title('nope.js - tutorial'),
    html.link({
      type: 'stylesheet',
      rel: 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/css/bootstrap.min.css'
    })
  ]),
  html.body([
    html.h1('nope.js - tutorial'),
    html.div([
      html.h2('Quick Start'),
      html.p('First things first!').style(np.style(css => [
        css.position('absolute'),
        css.top('10px')
      ])).text(np.bind(() => data.quickstart))
    ])
    html.component(c => c.chapters({ data: Data.chapters })),
    np.each(np.bind(() => data.chapters), (index, item) => [
      html.h2(item.title),
      html.p([item.content.substr(0, 300), "..."].join())
    ]);
  ])
]));
