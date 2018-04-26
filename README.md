# PoC
This is a proof of concept to solve the issue of loading certain components
only available for logged users.

See https://redd.it/8ex3dy for discussion.

```
npm install
npm run build
npm run server
```

## TL;DR

By using dynamic imports ([see webpack docs](https://webpack.js.org/guides/code-splitting/#dynamic-imports))
we can split all private code to a separate bundle (we can choose any name):
```
import(/* webpackChunkName: "private" */'./Component')
```

If accessing that bundle requires authentication, only logged users will be
able to view those components.

We can provide a fallback (for instance not showing any content by rendering
`null`) by catching the rejected promise of the dynamic import:

```
import(/* webpackChunkName: "private" */'./Component')
.catch(_ => ({
  Component: () => null,
}))
.then(({Component}) =>
  /* here we can use <Component /> */
)
```

This example uses BasicAuth, but any other means of restricting access to the
bundle would do.
