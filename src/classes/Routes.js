class Routes {
  constructor() {
    this.server = {
      protocol: 'https:',
      host: '/reactmarathon-api.netlify.app',
      prefix: 'api',
    };
    this.endPoints = {
      getPokemons: {
        pathName: 'pokemons',
      },
      getFight: {
        pathName: 'fight',
      },
    };
  }

  getQueryParams = (query) => {
    if (!query) {
      return '';
    }

    return Object.entries(query)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
  };

  getUrl = (endPointConfig, query) => {
    const {
      server: { protocol, host, prefix },
      endPoints,
    } = this;

    const url = [protocol, host, prefix, endPoints[endPointConfig].pathName].join('/');
    const queryParams = this.getQueryParams(query);

    return [url, queryParams].join('?');
  };

  getData = async (endPointConfig, query = null) => {
    const url = this.getUrl(endPointConfig, query);
    const res = await fetch(url);
    const data = res.json();

    return data;
  };
}

export default Routes;
