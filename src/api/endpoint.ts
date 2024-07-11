type EndpointMethod = 'POST' | 'GET' | 'PUT' | 'DELETE';

export interface Endpoint {
  url: string;
  method: EndpointMethod;
}

function createEndpoint(method: EndpointMethod, url: string): Endpoint {
  return {
    method,
    url,
  };
}

interface UnitEndpoint {
  getUnit: Endpoint;
  completeOn: Endpoint;
  getUnitQuestions: Endpoint;
}

const unitEndpoints: UnitEndpoint =  {
  getUnit: createEndpoint('GET', '/units'),
  getUnitQuestions: createEndpoint('GET', '/units'),
  completeOn: createEndpoint('GET', '/completeon')
}

interface AuthEndpoint { 
  me: Endpoint;
  generateRequest: Endpoint;
}

const authEndpoints:AuthEndpoint =  {
  generateRequest: createEndpoint('POST', '/auth/generate-guest'),
  me: createEndpoint('POST', '/auth/me')
}


interface EndpointList {
  auth: AuthEndpoint;
  unit: UnitEndpoint;
}

const endpoints: EndpointList = {
  auth: authEndpoints,
  unit: unitEndpoints
};

export default endpoints;