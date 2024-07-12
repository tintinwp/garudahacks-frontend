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
  createCompleteOn: Endpoint;
}

const unitEndpoints: UnitEndpoint =  {
  getUnit: createEndpoint('GET', '/units'),
  getUnitQuestions: createEndpoint('GET', '/units'),
  completeOn: createEndpoint('GET', '/completeon'),
  createCompleteOn: createEndpoint('POST', '/completeon')
}

interface AuthEndpoint { 
  me: Endpoint;
  generateRequest: Endpoint;
}

const authEndpoints:AuthEndpoint =  {
  generateRequest: createEndpoint('POST', '/auth/generate-guest'),
  me: createEndpoint('POST', '/auth/me')
}

interface LeaderboardEndpoint {
  getPaginatedLeaderboard : Endpoint,
  getRankedLeaderboard : Endpoint
}
const leaderboardEndpoint : LeaderboardEndpoint = {
  getPaginatedLeaderboard : createEndpoint("GET", "/users"),
  getRankedLeaderboard : createEndpoint("GET", "/rank")
}

interface TyperacingGameEndpoint{
  getGameInformation : Endpoint
}
const typeracingGameEndpoint : TyperacingGameEndpoint = {
  getGameInformation : createEndpoint("GET", "/games")
}

interface EndpointList {
  auth: AuthEndpoint;
  unit: UnitEndpoint;
  leaderboard : LeaderboardEndpoint;
  typeracingGameEndpoint : TyperacingGameEndpoint
}

const endpoints: EndpointList = {
  auth: authEndpoints,
  unit: unitEndpoints,
  leaderboard : leaderboardEndpoint,
  typeracingGameEndpoint: typeracingGameEndpoint
};

export default endpoints;