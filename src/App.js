import React from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import withCkan from 'ckan/lib/withCkan';
import GriddleContainer from 'ckan/containers/GriddleContainer';
import MyAwesomeNumberColumn from 'components/MyAwesomeNumberColumn';

const client = new ApolloClient({
  uri: '/graphql'
});

// From request params or other URL state.
// Keeping this on the app level makes it easy to customise
// and doesn't hardcode those assumptions deeper in the components.
const dataSourceId = 99;

// By making data handling a higher order component with a defined
// props API, it can be used in different viewer components.
const CkanGriddleContainer = withCkan(
  GriddleContainer,
  { dataSourceId }
);

// By making the actual App a small amount of userland code,
// it's easy to customise deeper component behaviour.
// Only common customisations would be exposed here,
// with the ability to just create your own <Griddle>
// instead to use the full API surface.
// You could replace Griddle with a thumbnail view
// without requiring changes to the withCkan() HoC.
const App = () => (
  <ApolloProvider client={client}>
    <CkanGriddleContainer
      columnComponentsForType={{
        'number': MyAwesomeNumberColumn
      }}
    />
  </ApolloProvider>
);

render(<App />, document.getElementById('root'));
