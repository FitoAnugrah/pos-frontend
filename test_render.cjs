const React = require('react');
const ReactDOMServer = require('react-dom/server');
require('@babel/register')({
  presets: ['@babel/preset-env', '@babel/preset-react']
});

const { MemoryRouter, Route, Routes } = require('react-router-dom');

const App = require('./src/features/member/pages/MemberTransactions.jsx').default;

try {
  const html = ReactDOMServer.renderToString(
    React.createElement(MemoryRouter, { initialEntries: ['/member/1/transactions'] },
      React.createElement(Routes, null,
        React.createElement(Route, { path: "/member/:id/transactions", element: React.createElement(App) })
      )
    )
  );
  console.log("SUCCESS:", html.length);
} catch (e) {
  console.error("ERROR:", e);
}
