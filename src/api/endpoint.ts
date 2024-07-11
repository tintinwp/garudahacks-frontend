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

interface CRUDEndpoint {
  create: Endpoint;
  delete: Endpoint;
  update: Endpoint;
  get: Endpoint;
}


interface EndpointList {
}

const endpoints: EndpointList = {
};

export default endpoints;